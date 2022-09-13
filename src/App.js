import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListPage as PostListPage } from "./components/pages/board/ListPage";
import { SignupPage } from "./components/pages/user/SignupPage";
import { SigninPage } from "./components/pages/user/SigninPage";
import { ProfilePage } from "./components/pages/user/ProfilePage";
import { PostPage } from "./components/pages/board/PostPage";
import { CreatePage } from "./components/pages/board/CreatePage";
import { ModifyPage } from "./components/pages/board/ModifyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/board/list" element={<PostListPage />} />
        <Route path="/board/:postId" element={<PostPage />} />
        <Route path="/board/create" element={<CreatePage />} />
        <Route path="/board/modify/:postId" element={<ModifyPage />} />
        <Route path="/user/signup" element={<SignupPage />} />
        <Route path="/user/signin" element={<SigninPage />} />
        <Route path="/user/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
