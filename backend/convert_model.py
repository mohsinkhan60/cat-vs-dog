import pickle
import tensorflow as tf

with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

with open('model.tflite', 'wb') as f:
    f.write(tflite_model)

print(f"Done! model.tflite size: {len(tflite_model) / 1024 / 1024:.2f} MB")
