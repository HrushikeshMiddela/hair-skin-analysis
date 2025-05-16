import React, { useState, useRef, useContext, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Sun, Moon, Upload, Camera } from "lucide-react";

const skinModelURL = "https://teachablemachine.withgoogle.com/models/27XV_wcuj/";
const hairModelURL = "https://teachablemachine.withgoogle.com/models/o1R68h23F/";

const Dashboard = () => {
  const [modelType, setModelType] = useState<"skin" | "hair" | "">(""); 
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [captureMode, setCaptureMode] = useState<"upload" | "camera">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Reset image and result when modelType changes
  useEffect(() => {
    setImage(null);
    setResult("");
    stopCameraStream();
  }, [modelType]);

  // Camera functions
  const startCamera = async () => {
    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" }
      });
      setStream(cameraStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = cameraStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Failed to access camera. Please check permissions.");
    }
  };

  const stopCameraStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    // Clean up camera stream when component unmounts
    return () => {
      stopCameraStream();
    };
  }, []);

  useEffect(() => {
    if (captureMode === "camera") {
      startCamera();
    } else {
      stopCameraStream();
    }
  }, [captureMode]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
            setImage(file);
          }
        }, "image/jpeg");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleAnalyze = async () => {
    if (!image) return alert("Please upload or capture an image");
    setLoading(true);

    const img = document.createElement("img");
    img.src = URL.createObjectURL(image);
    await img.decode();

    const modelURL = modelType === "skin" ? skinModelURL : hairModelURL;

    try {
      const model = await tmImage.load(modelURL + "model.json", modelURL + "metadata.json");
      const prediction = await model.predict(img);
      const best = prediction.reduce((a, b) => (a.probability > b.probability ? a : b));
      setResult(`${best.className} (${(best.probability * 100).toFixed(2)}%)`);

      // Save to backend
      await axios.post(
        "http://localhost:5000/api/analysis",
        {
          type: modelType,
          result: best.className,
          probability: best.probability,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/result", {
        state: { result: best.className, probability: best.probability, type: modelType },
      });
    } catch (err) {
      console.error("Error during analysis or saving:", err);
      alert("Failed to analyze or save the result.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"} transition-colors duration-300`}>
      <Navbar />
      
      {/* Theme Toggle Button */}
      <div className="absolute top-6 right-6">
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full ${isDark ? "bg-gray-700 text-yellow-300" : "bg-blue-100 text-blue-800"}`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Greeting */}
        <div className={`mb-8 ${isDark ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-md`}>
          <h2 className="text-2xl font-medium">
            Hello, <span className="text-blue-500 font-bold">{user?.name}</span>!
          </h2>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Ready to start your analysis? Choose a type below and upload or capture an image.
          </p>
        </div>

        <h1 className="text-3xl font-semibold mb-8 border-b pb-2 border-blue-500">Start Your Analysis</h1>

        {/* Step 1: Select model type */}
        <div className="mb-8">
          <label className="block mb-2 font-medium">Choose Analysis Type:</label>
          <select
            value={modelType}
            onChange={(e) => setModelType(e.target.value as "skin" | "hair" | "")}
            className={`w-full md:w-48 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
            }`}
          >
            <option value="">-- Select --</option>
            <option value="skin">Skin Analysis</option>
            <option value="hair">Hair Analysis</option>
          </select>
        </div>

        {/* Step 2: Show upload/camera options only if modelType selected */}
        {modelType && (
          <div className={`p-6 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}>
            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-medium">Image Input</h3>
              
              {/* Toggle between upload and camera */}
              <div className={`flex rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                <button
                  onClick={() => setCaptureMode("upload")}
                  className={`px-4 py-2 flex items-center gap-2 rounded-l-lg transition ${
                    captureMode === "upload" 
                      ? isDark ? "bg-blue-600 text-white" : "bg-blue-500 text-white" 
                      : isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <Upload size={16} />
                  Upload
                </button>
                <button
                  onClick={() => setCaptureMode("camera")}
                  className={`px-4 py-2 flex items-center gap-2 rounded-r-lg transition ${
                    captureMode === "camera" 
                      ? isDark ? "bg-blue-600 text-white" : "bg-blue-500 text-white" 
                      : isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <Camera size={16} />
                  Camera
                </button>
              </div>
            </div>

            {captureMode === "upload" ? (
              /* Upload box */
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer border-4 border-dashed rounded-lg h-72 flex flex-col justify-center items-center transition ${
                  isDark 
                    ? "border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-400" 
                    : "border-gray-300 text-gray-400 hover:border-blue-500 hover:text-blue-600"
                }`}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded preview"
                    className="max-h-full max-w-full object-contain rounded"
                  />
                ) : (
                  <>
                    <Upload size={48} className="mb-3" />
                    <p className="text-lg">Click here to upload an image</p>
                    <p className={`text-sm mt-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      Supported formats: JPG, PNG, WEBP
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              /* Camera capture */
              <div className={`rounded-lg overflow-hidden ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
                <div className="relative">
                  {!image ? (
                    <>
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        className="w-full h-72 object-cover" 
                      />
                      <button
                        onClick={capturePhoto}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
                      >
                        <Camera size={24} />
                      </button>
                    </>
                  ) : (
                    <div className="relative h-72">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Captured photo"
                        className="w-full h-full object-contain"
                      />
                      <button
                        onClick={() => setImage(null)}
                        className="absolute bottom-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        Retake
                      </button>
                    </div>
                  )}
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              </div>
            )}

            {/* Analyze button */}
            <button
              onClick={handleAnalyze}
              disabled={loading || !image}
              className={`mt-6 px-6 py-3 rounded transition flex items-center justify-center gap-2 w-full md:w-auto ${
                loading || !image
                  ? "bg-gray-400 cursor-not-allowed text-gray-200"
                  : isDark
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing...</span>
                </>
              ) : (
                "Analyze Image"
              )}
            </button>

            {/* Result */}
            {result && (
              <div className={`mt-8 p-4 rounded-lg font-semibold ${
                isDark ? "bg-green-900 border border-green-700 text-green-300" : "bg-green-50 border border-green-400 text-green-700"
              }`}>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Result: {result}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;