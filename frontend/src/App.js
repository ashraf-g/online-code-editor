import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Features from "./pages/Features";
import ResetPass from "./pages/ResetPass";
import SavedCode from "./pages/SavedCode";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/features" element={<Features />}></Route>
        <Route exact path="/savedcode" element={<SavedCode />}></Route>
        <Route exact path="/reset" element={<ResetPass />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
