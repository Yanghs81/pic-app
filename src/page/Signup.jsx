import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("url---", process.env.REACT_APP_SV_URL);
    axios
      .post(`${process.env.REACT_APP_SV_URL}/signup`, formData)
      .then((response) => {
        console.log("Signup successful", response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>회원 가입</h2>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Nick Name:</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          required
        />
      </div>

      <button className="button-signup" type="submit">
        회원가입
      </button>
    </form>
  );
};

export default Signup;
