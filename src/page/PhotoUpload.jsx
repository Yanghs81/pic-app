import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./PhotoUpload.css";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

const PhotoUpload = () => {
  const { user } = useContext(UserContext);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login"); // user가 없으면 로그인 페이지로 리디렉션
    }
  }, [user, navigate]);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(filePreviews);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    const fileNames = selectedFiles.map((file) => file.name);

    selectedFiles.forEach((file) => {
      formData.append("photos", file);
    });

    formData.append("fileNames", fileNames.join(",")); // 파일명을 FormData에 추가
    try {
      const response = await axios.post(
        `${process.env.SV_URL}/uploadPhotos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload successful", response);
    } catch (error) {
      console.error("Upload error", error);
    }
  };

  const handleCancel = () => {
    setSelectedFiles([]);
    setPreviewUrls([]);
  };

  return (
    <div className="photo-upload">
      <h2>사진 업로드</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <div className="preview-container">
        {previewUrls.map((url, index) => (
          <img key={index} src={url} alt={`preview-${index}`} />
        ))}
      </div>
      <div className="button-group">
        <button onClick={handleUpload}>확인</button>
        <button onClick={handleCancel}>취소</button>
      </div>
    </div>
  );
};

export default PhotoUpload;
