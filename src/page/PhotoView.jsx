import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import axios from "axios";
import "./PhotoView.css";

const PhotoView = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [heart, setHeart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  console.log("11");
  useEffect(() => {
    console.log("22");
    fetchPhoto();
  }, []);

  const fetchPhoto = async () => {
    console.log("33");
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.SV_URL}/photo/${id}`, {
        email: user,
      });
      console.log("44", user, id);
      const { data } = response;
      setPhoto(data);
      setLikes(data.photo_likes);
      setHeart(data.user_likes);
      setLoading(false);
    } catch (error) {
      console.log("55");
      setError("사진을 불러오는 중 에러가 발생했습니다.");
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (user) {
      console.log("66");
      try {
        const response = await axios.post(
          `${process.env.SV_URL}/photo/${id}/like`,
          {
            email: user,
            heart: !heart,
          }
        );
        const { data } = response;
        setLikes(data.photo_likes);
        setHeart(data.user_likes);
      } catch (error) {
        setError("좋아요 처리 중 에러가 발생했습니다.");
      }
    } else {
      console.log("77");
      setMsg("좋아요는 로그인이 필요해요");
    }
  };

  if (loading) {
    console.log("88");
    return <div>로딩 중...</div>;
  }
  if (error) return <div>{error}</div>;
  if (!photo) return <div>사진이 없습니다.</div>;

  return (
    <>
      <div className="photo-view">
        <img src={photo.url} alt={photo.description} className="large-photo" />
      </div>
      <div className="like-section">
        <button
          onClick={handleLike}
          className={`like-button ${heart ? "heart" : ""}`}
        >
          {heart ? "❤️" : "🤍"}
        </button>
        <span className="like-count">(좋아요: {likes})</span>
      </div>
      <div className="msg-section">{msg}</div>
    </>
  );
};

export default PhotoView;
