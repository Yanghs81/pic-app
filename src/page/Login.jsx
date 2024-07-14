import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_SV_URL}/login`,
        method: "POST",
        withCredentials: true,
        data: {
          email: email,
          password: password,
        },
      });

      setUser(response.data.user.email);
      navigate("/popularPhotos");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>로그 인</h2>
      {error && <p>{error}</p>}
      <div className="group-email">
        <label className="label-email">ya@gmail.com</label>
        <input
          className="input-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
      </div>
      <div className="group-Password">
        <label className="label-Password">Password: 1234</label>
        <input
          className="input-Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      </div>

      <button className="button-login" type="submit">
        로그인
      </button>
    </form>
  );
};

export default Login;
