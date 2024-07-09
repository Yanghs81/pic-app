import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RecentPhotos.css";

const RecentPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPhotos(currentPage);
  }, [currentPage]);

  const fetchPhotos = async (page) => {
    try {
      const response = await axios.get(`${process.env.SV_URL}/recentPhotos`, {
        params: { page, limit: 15 },
      });
      setPhotos(response.data.photos);
      setTotalPages(Math.ceil(response.data.total / 15));
    } catch (error) {
      console.error("recentPhotos사진을 불러오는 중 에러 발생:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 15;
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

  return (
    <div className="recent-photos">
      <h2>최근에 올린 사진</h2>
      <div className="photos-grid">
        {photos.map((photo) => (
          <Link to={`/photo/${photo.file_name}`} key={photo.file_name}>
            <img
              src={`${process.env.SV_URL}uploads/${photo.file_name}`}
              alt={photo.description}
            />
          </Link>
        ))}
      </div>
      <div className="pagination">{renderPagination()}</div>
    </div>
  );
};

export default RecentPhotos;
