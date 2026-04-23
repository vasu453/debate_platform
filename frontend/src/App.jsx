import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DebatePage from "./pages/DebatePage";
import Login from "./pages/Login";
import Landing from "./pages/Landing"; // 🔧 NEW

function App() {
  return (
    
    <BrowserRouter>
    <div className="container">
      <Routes>
        <Route path="/" element={<Landing />} />         {/* Landing */}
        <Route path="/login" element={<Login />} />      {/* Login */}
        <Route path="/home" element={<Home />} />        {/* App */}
        <Route path="/debate/:id" element={<DebatePage />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;