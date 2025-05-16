import axios from "./axios"; // <-- custom axios instance that includes token (if you've added interceptor)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
 // custom axios instance with token

export const saveAnalysisResult = (data: {
  type: string;
  result: string;
  probability: number;
}) => axios.post("/analysis", data);


export const getAnalysisHistory = () =>
  axios.get("/analysis"); // ✅ CORRECT endpoint
