import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Drawings from "./pages/drawings/Drawings";
import Navbar from "./pages/navigation/Navbar";
import Stories from "./pages/stories/Stories";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dessins" element={<Drawings />} />
        <Route path="/histoires" element={<Stories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
