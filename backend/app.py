import os
from flask import Flask, request, jsonify
import pickle
import numpy as np
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://cat-vs-dog-prediction.vercel.app", "http://localhost:5000", "http://localhost:5173"])

MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "model.pkl")

try:
    with open(MODEL_PATH, "rb") as file:
        model = pickle.load(file)
except Exception as e:
    print(f"Failed to load model: {e}")
    model = None


@app.route("/")
def home():
    return "Backend Running"

@app.route("/predict", methods=["POST"])
def predict():

    if model is None:
        return jsonify({
            "error": "Model not loaded"
        }), 500

    try:
        file = request.files["image"]

        img = Image.open(file)

        # RGB
        img = img.convert("RGB")

        # match training size
        img = img.resize((256, 256))

        # convert to array
        img = np.array(img)

        # normalize
        img = img / 255.0

        # add batch dimension
        img = np.expand_dims(img, axis=0)

        print(img.shape)

        prediction = model.predict(img)

        print(prediction)

        result = "Dog" if prediction[0][0] > 0.5 else "Cat"

        return jsonify({
            "prediction": result,
            "confidence": float(prediction[0][0])
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)