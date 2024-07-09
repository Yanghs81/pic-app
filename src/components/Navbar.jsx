import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import { FaHome, FaBars } from "react-icons/fa";
import { UserContext } from "./UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [nickName, setNickName] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(`${process.env.SV_URL}/checkSession`, {
          withCredentials: true,
        });
        console.log(
          "response-----",
          response.data.user.email,
          response.data.user.nickName
        );
        setUser(response.data.user.email);
        setNickName(response.data.user.nickName);
      } catch (error) {
        setUser(null);
      }
    };
    checkSession();
  }, [setUser]);

  const handleLogout = async () => {
    await axios.get(`${process.env.SV_URL}/logout`, {
      withCredentials: true,
    });
    setUser(null);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <header className="header">
      <Link className="home" to={"/"}>
        <FaHome />
      </Link>
      <div className="menu-icon" onClick={toggleMenu}>
        <FaBars />
      </div>

      <nav className={`menu-content ${menuOpen ? "show" : ""}`}>
        {user ? (
          <>
            <span className="hello">^^ 반갑습니다~ {nickName}님! </span>
            <Link className="link-logout" to="/" onClick={handleLogout}>
              Logout
            </Link>
            <Link className="link-mypage" to="/mypage">
              Mypage
            </Link>
          </>
        ) : (
          <>
            <Link className="link-login" to={"/login"}>
              Login
            </Link>
            <Link className="link-signup" to={"/signup"}>
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
