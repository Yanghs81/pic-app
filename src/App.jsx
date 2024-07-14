import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PopularPhotos from "./page/PopularPhotos";
import PhotoUpload from "./page/PhotoUpload";
import RecentPhotos from "./page/RecentPhotos";
import PhotoView from "./page/PhotoView";
import Login from "./page/Login";
import MyPage from "./page/MyPage";
import Signup from "./page/Signup";
import Home from "./page/Home";
import { UserProvider } from "./components/UserContext";
import { Link } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <div>
          <Navbar />
        </div>
        <Link className="popularPhotos" to={"/popularPhotos"}>
          popular
        </Link>
        <Link className="recentPhotos" to={"/recentPhotos"}>
          recent
        </Link>
        <Link className="photoUpload" to={"/photoUpload"}>
          upload
        </Link>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popularPhotos" element={<PopularPhotos />} />
          <Route path="/recentPhotos" element={<RecentPhotos />} />
          <Route path="/photoUpload" element={<PhotoUpload />} />
          <Route path="/photo/:id" element={<PhotoView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
