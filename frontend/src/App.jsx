import { useState } from "react";

const App = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");

  const predict = async () => {
    if (!image) return;

    const formData = new FormData();

    formData.append("image", image);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setResult(data.prediction);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">

      <h1 className="text-4xl font-bold">
        Cat vs Dog Classifier
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImage(e.target.files[0])
        }
      />

      <button
        onClick={predict}
        className="bg-blue-500 px-5 py-2 rounded"
      >
        Predict
      </button>

      {result && (
        <h2 className="text-2xl text-amber-50">
          Prediction: {result}
        </h2>
      )}

    </div>
  );
};

export default App;