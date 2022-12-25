import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Home from "./screens/Home";
import Insta from "./screens/portfolios/Insta";
import reset from "styled-reset";
import Youtube from "./screens/portfolios/Youtube";
import YouRestful from "./screens/portfolios/You-restful";
import Portfolios from "./screens/Portfolios";

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
        <Route path="/portfolios" element={<Portfolios />}></Route>
        <Route path="/portfolios/instagram-clone" element={<Insta />}></Route>
        <Route path="/portfolios/youtube-graphql" element={<Youtube />}></Route>
        <Route
          path="/portfolios/youtube-restful"
          element={<YouRestful />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
