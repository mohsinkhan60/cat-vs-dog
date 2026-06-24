from flask import Flask, request, jsonify
import pickle
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Load the pre-trained model
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print(data)
if __name__ == '__main__':
    app.run(debug=True)