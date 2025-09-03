import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Lesson,
  Login,
  NotFound,
  Quiz,
  Register,
  Result,
} from "./Pages/Index";
import "./App.css";
import { Level } from "./Layout/Index";
import Test from "./Pages/Test/Test";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
      <Route index element={<Level />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/lesson/:id" element={<Lesson />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="/result" element={<Result />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};

export default App;
