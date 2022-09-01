import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./components/pages/board/Board";
import Signup from "./components/pages/user/Signup";
import Signin from "./components/pages/user/Signin";
import Profile from "./components/pages/user/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
