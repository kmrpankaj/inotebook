import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteState from "./context/NoteState";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";


function App() {
  return (
    <NoteState>
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

    </BrowserRouter>
    </NoteState>
  )
}

export default App;
