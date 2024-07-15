import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import "./MyPage.css";

const MyPage = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteMode, setDeleteMode] = useState(false);
  const [checkedPhotos, setCheckedPhotos] = useState([]);
  const [longPress, setLongPress] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchPhotos(currentPage);
  }, [currentPage]);

  const fetchPhotos = async (page) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SV_URL}/mypage`,
        {
          params: { page, limit: 12, user },
        }
      );
      setPhotos(response.data.photos);
      setTotalPages(Math.ceil(response.data.total / 12));
    } catch (error) {
      console.error("mypage 사진을 불러오는 중 에러 발생:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 12;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(currentPage - halfMaxPagesToShow, 1);
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    return (
      <>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            이전
          </button>
        )}
        {pageNumbers}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            다음
          </button>
        )}
      </>
    );
  };

  const handleMouseDown = () => {
    setLongPress(true);
    setTimeout(() => {
      if (longPress) {
        setDeleteMode(true);
      }
    }, 800); // 1초 이상 길게 누를 때 삭제 모드 활성화
  };

  const handleMouseUp = () => {
    setLongPress(false);
  };

  const handleCheckChange = (photo) => {
    setCheckedPhotos((prev) =>
      prev.includes(photo) ? prev.filter((p) => p !== photo) : [...prev, photo]
    );
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SV_URL}/deletePhotos`,
        { fileNames: checkedPhotos.map((photo) => photo.file_name) },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const remainingPhotos = photos.filter(
          (photo) => !checkedPhotos.includes(photo)
        );
        setPhotos(remainingPhotos);
        setDeleteMode(false);
        setCheckedPhotos([]);
        console.log("Delete successful", response);
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  const handleCancel = () => {
    setDeleteMode(false);
    setCheckedPhotos([]);
  };

  return (
    <div className="recent-photos">
      <h2>내가 올린 사진</h2>
      {deleteMode && (
        <div className="delete-actions">
          <button onClick={handleDelete}>삭제</button>
          <button onClick={handleCancel}>취소</button>
        </div>
      )}
      <div className="photos-grid">
        {photos.map((photo) => (
          <div
            key={photo.file_name}
            className="photo-item"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            {deleteMode && (
              <input
                type="checkbox"
                checked={checkedPhotos.includes(photo)}
                onChange={() => handleCheckChange(photo)}
              />
            )}
            <Link to={`/photo/${photo.file_name}`}>
              <img
                src={`${process.env.REACT_APP_SV_URL}/uploads/${photo.file_name}`}
                alt={photo.description}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">{renderPagination()}</div>
    </div>
  );
};

export default MyPage;
