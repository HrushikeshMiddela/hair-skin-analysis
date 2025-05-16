import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { result, probability, type } = location.state || {};

  if (!result || !probability) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">No Result Found</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Analysis Result</h1>
      <p className="text-lg mb-2">
        <strong>Type:</strong> {type.charAt(0).toUpperCase() + type.slice(1)}
      </p>
      <p className="text-lg mb-2">
        <strong>Detected:</strong> {result}
      </p>
      <p className="text-lg mb-6">
        <strong>Confidence:</strong> {(probability * 100).toFixed(2)}%
      </p>

      <button
        onClick={() => navigate("/history")}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        View History
      </button>
    </div>
  );
};

export default Result;
