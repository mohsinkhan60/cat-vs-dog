import os
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)

CORS(
    app,
    origins=[
        "https://cat-vs-dog-prediction.vercel.app",
        "http://localhost:5173",
        "http://localhost:5000"
    ]
)

# ------------------------
# MODEL LOADING
# ------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

print("\n========== MODEL DEBUG ==========")
print("Current Directory:", os.getcwd())
print("Base Directory:", BASE_DIR)
print("Model Path:", MODEL_PATH)
print("Model Exists:", os.path.exists(MODEL_PATH))

model = None

try:
    with open(MODEL_PATH, "rb") as file:
        model = pickle.load(file)

    print("✅ MODEL LOADED SUCCESSFULLY")
    print("Model Type:", type(model))

except Exception as e:
    print("❌ MODEL LOAD ERROR:")
    print(str(e))


# ------------------------
# ROUTES
# ------------------------

@app.route("/")
def home():
    return jsonify({
        "message": "Backend Running",
        "model_loaded": model is not None
    })


@app.route("/predict", methods=["POST"])
def predict():

    if model is None:
        return jsonify({
            "error": "Model not loaded"
        }), 500

    try:

        if "image" not in request.files:
            return jsonify({
                "error": "No image uploaded"
            }), 400

        file = request.files["image"]

        img = Image.open(file)

        img = img.convert("RGB")

        img = img.resize((256, 256))

        img = np.array(img)

        img = img / 255.0

        img = np.expand_dims(img, axis=0)

        prediction = model.predict(img)

        confidence = float(prediction[0][0])

        result = "Dog" if confidence > 0.5 else "Cat"

        return jsonify({
            "prediction": result,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )