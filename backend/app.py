import os
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://cat-vs-dog-prediction.vercel.app",
            "http://localhost:5173",
            "http://localhost:3000"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "model.tflite")

interpreter = None
input_details = None
output_details = None

try:
    try:
        from ai_edge_litert.interpreter import Interpreter as TFLInterpreter
    except ImportError:
        try:
            from tflite_runtime.interpreter import Interpreter as TFLInterpreter
        except ImportError:
            from tensorflow.lite.python.interpreter import Interpreter as TFLInterpreter
    interpreter = TFLInterpreter(model_path=MODEL_PATH)
    interpreter.allocate_tensors()
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    print(f"Model loaded successfully from: {MODEL_PATH}")
except Exception as e:
    print(f"Failed to load model from {MODEL_PATH}: {e}")


@app.route("/")
def home():
    return "Backend Running"

@app.route("/predict", methods=["POST"])
def predict():
    if interpreter is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        file = request.files["image"]
        img = Image.open(file)
        img = img.convert("RGB")
        img = img.resize((256, 256))
        img = np.array(img, dtype=np.float32)
        img = img / 255.0
        img = np.expand_dims(img, axis=0)

        interpreter.set_tensor(input_details[0]['index'], img)
        interpreter.invoke()
        prediction = interpreter.get_tensor(output_details[0]['index'])

        result = "Dog" if prediction[0][0] > 0.5 else "Cat"

        return jsonify({
            "prediction": result,
            "confidence": float(prediction[0][0])
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
