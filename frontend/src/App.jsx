import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Sites from "./pages/Sites";
import Environmental from "./pages/Environmental";
import Solar from "./pages/Solar";
import Wind from "./pages/Wind";
import Report from "./pages/Report";
import Profile from "./pages/Profile";
import GISMap from "./pages/GISMap";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/environment" element={<Environmental />} />
        <Route path="/solar" element={<Solar />} />
        <Route path="/wind" element={<Wind />} />
        <Route path="/report" element={<Report />} />
        <Route path="/map" element={<GISMap />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;