import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Home from "./screens/Home";
import Insta from "./screens/Insta";
import reset from "styled-reset";
import Youtube from "./screens/Youtube";
import Oop from "./screens/Oop";

const GlobalStyles = createGlobalStyle`
${reset}
body{
  font-family:'Open Sans', sans-serif;
}
`;
function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/instagram-clone" element={<Insta />}></Route>
        <Route path="/youtube-clone" element={<Youtube />}></Route>
        <Route path="/oop-practice" element={<Oop />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
