import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import WorkoutPlans from "./pages/WorkoutPlans";
import ActivityLog from "./pages/ActivityLog";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlanDetails from "./pages/PlanDetails"; // Add PlanDetails if needed

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Login />} />

      {/* Other pages */}
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/workouts" element={<WorkoutPlans />} />
      <Route path="/workouts/:id" element={<PlanDetails />} /> {/* Plan Details */}
      <Route path="/log" element={<ActivityLog />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
