import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./components/pages/board/Board";
import Signup from "./components/pages/user/Signup";
import Signin from "./components/pages/user/Signin";
import Profile from "./components/pages/user/Profile";
import Post from "./components/pages/board/Post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/board" element={<Board />} />
        <Route path="/board/:postId" element={<Post />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/signin" element={<Signin />} />
        <Route path="/user/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
