import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Insta from "./screens/Insta";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/instagram-clone" element={<Insta />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
