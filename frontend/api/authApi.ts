import axios from "./axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signup = (data: any) => axios.post("/api/auth/signup", data);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = (data: any) => axios.post("/api/auth/login", data);
export const getProfile = () => axios.get("/api/auth/profile");
