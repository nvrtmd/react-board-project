import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./components/pages/board/Board";
import Signup from "./components/pages/user/Signup";
import Signin from "./components/pages/user/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
