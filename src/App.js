import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteState from "./context/NoteState";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 1500)
  }
  return ( 
    <NoteState>
    <BrowserRouter>
      <Navbar/>
      <Alert message="This is amazing react course."/>

      <Routes>
        <Route path="/" element={<Home />} showAlert={showAlert} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login /> } showAlert={showAlert} />
        <Route path="/signup" element={<Signup />} showAlert={showAlert} />
      </Routes>

    </BrowserRouter>
    </NoteState>
  )
}

export default App;
