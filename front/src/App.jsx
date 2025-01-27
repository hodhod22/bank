import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ZarinpalCallback from "./components/ZarinpalCallback";
import ConfirmOrder from "./pages/ConfirmOrder";

const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" />;

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute roleRequired="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/zarinpal-callback"
          element={<ZarinpalCallback />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/confirm?" element={<ConfirmOrder />} />
      </Routes>
    </div>
  );
};

export default App;
