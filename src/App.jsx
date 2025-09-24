import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Lesson, Login, NotFound, Register, Result } from "./Pages/Index";
import "./App.css";
import { Level } from "./Layout/Index";
import Test from "./Pages/Test/Test";
import { Questions } from "./Components/Index";
import ScoreGame from "./Layout/ScoreGame/ScoreGame";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Level />} />
        <Route path="/lesson" element={<Lesson />}></Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/quiz/:id" element={<Questions />} />
      <Route path="/score" element={<ScoreGame />} />
    </Routes>
  );
};

export default App;
