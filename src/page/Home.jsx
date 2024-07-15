import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    picture();
  }, []);

  const [photo, setPhoto] = useState(null);

  const picture = async () => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_SV_URL}/`,
        method: "GET",
      });
      const { data } = response;
      setPhoto(data);
    } catch (error) {}
  };

  return (
    <div className="home">
      {photo ? (
        <img className="img" src={photo.url} alt="서버 이미지 작업중입니다" />
      ) : (
        <p>이미지 로딩 중...</p>
      )}
    </div>
  );
};

export default Home;
