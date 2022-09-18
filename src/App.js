import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WelcomePage } from "./components/pages/etc/WelcomePage";
import { ListPage as PostsListPage } from "./components/pages/board/ListPage";
import { ListPage as UsersListPage } from "./components/pages/admin/ListPage";
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
        <Route path="/" element={<WelcomePage />} />
        <Route path="/board/list" element={<PostsListPage />} />
        <Route path="/board/:postId" element={<PostPage />} />
        <Route path="/board/create" element={<CreatePage />} />
        <Route path="/board/modify/:postId" element={<ModifyPage />} />
        <Route path="/user/signup" element={<SignupPage />} />
        <Route path="/user/signin" element={<SigninPage />} />
        <Route path="/user/profile" element={<ProfilePage />} />
        <Route path="/admin/userlist" element={<UsersListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
