import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext  from "../context/AuthContext";

interface Analysis {
  _id: string;
  type: string;
  result: string;
  probability: number;
  createdAt: string;
}

const History = () => {
  const [history, setHistory] = useState<Analysis[]>([]);
  const { token } = useContext(AuthContext);


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/analysis", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    };
    fetchHistory();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Analysis History</h1>
      {history.length === 0 ? (
        <p className="text-center">No history found.</p>
      ) : (
        <div className="grid gap-4">
          {history.map((entry) => (
            <div key={entry._id} className="p-4 border rounded-md shadow-sm bg-white">
              <p>
                <strong>Type:</strong> {entry.type}
              </p>
              <p>
                <strong>Result:</strong> {entry.result}
              </p>
              <p>
                <strong>Confidence:</strong> {(entry.probability * 100).toFixed(2)}%
              </p>
              <p>
                <strong>Date:</strong> {new Date(entry.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
