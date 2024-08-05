import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import { FaHome, FaBars } from "react-icons/fa";
import { UserContext } from "./UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SV_URL}/checkSession`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user.email);
      } catch (error) {
        setUser(null);
      }
    };
    checkSession();
  });

  const handleLogout = async () => {
    await axios.get(`${process.env.REACT_APP_SV_URL}/logout`, {
      withCredentials: true,
    });
    setUser(null);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <Link className="home" to={"/"} onClick={closeMenu}>
        <FaHome />
      </Link>
      {user && <span className="hello">{`반갑습니다`}</span>}
      <div className="menu-icon" onClick={toggleMenu}>
        <FaBars />
      </div>
      <nav className={`menu-content ${menuOpen ? "show" : ""}`}>
        {user ? (
          <>
            <Link className="link-logout" to="/" onClick={handleLogout}>
              Logout
            </Link>
            <Link className="link-mypage" to="/mypage" onClick={closeMenu}>
              Mypage
            </Link>
          </>
        ) : (
          <>
            <Link className="link-login" to={"/login"} onClick={closeMenu}>
              Login
            </Link>
            <Link className="link-signup" to={"/signup"} onClick={closeMenu}>
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
