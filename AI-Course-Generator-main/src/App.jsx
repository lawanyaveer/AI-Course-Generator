import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Course from "./pages/Course";
import CreateCourse from "./pages/CreateCourse";
import ViewCourse from "./pages/ViewCourse";

function App({ navigation }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("programminghub"));
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='/course' element={<Course />} />
        <Route path='/course/create' element={<CreateCourse />} />
        <Route path='/course/create/:id' element={<CreateCourse />} />
        <Route path='/course/view/:id' element={<ViewCourse />} />
      </Route>
    </Routes>
  );
}

export default App;
