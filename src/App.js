import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./components/pages/board/Board";
import Signup from "./components/pages/user/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
