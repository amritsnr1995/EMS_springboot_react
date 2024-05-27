import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ListEmployee from "./components/ListEmployee";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from "./components/Employee";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* http://localhost:3001/ */}
          <Route path="/" element={<ListEmployee />}></Route>
          {/* http://localhost:3001/employees */}
          <Route path="/employees" element={<ListEmployee />}></Route>
          <Route path="/add-employee" element={<Employee />}></Route>
          <Route path="/update-employee/:id" element={<Employee />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
