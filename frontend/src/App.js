import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import "./App.css";

function App(){

return(
     <Router>
           <ToastContainer position="top-right" autoClose={5000} />
     <Navbar />
         <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/welcome" element={<Welcome/>}/>
         </Routes>
     </Router>

)

}

export default App