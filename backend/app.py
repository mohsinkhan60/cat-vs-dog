from flask import Flask, request, jsonify
import pickle
import numpy as np
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model
with open("model.pkl", "rb") as file:
    model = pickle.load(file)


@app.route("/")
def home():
    return "Backend Running"

@app.route("/predict", methods=["POST"])
def predict():

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