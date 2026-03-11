import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./site.tsx";
import App_ from "./page.tsx";
import "./index.css";



function App() {
    return(
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app" element={<App_ />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>
    );
}

export default App;