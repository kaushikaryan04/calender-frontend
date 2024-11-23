import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calender from "./components/Caldender";
import EditPage from "./components/EditPage";
import AddEventPage from "./components/AddEventPage";
import LoginPage from "./components/Login";
import SignUpPage from "./components/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Calender />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/edit-event/:id" element={<EditPage />} />
        <Route path="/add-event" element={<AddEventPage />} />
      </Routes>
    </Router>
  );
};

export default App;
