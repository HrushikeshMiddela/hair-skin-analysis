import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Result from "./pages/Result";
import History from "./pages/History";
import ProtectedRoute from "./routes/ProtectedRoute";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
<Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
<Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />

      
    </Routes>
    </AuthProvider>
  );
}

export default App;
