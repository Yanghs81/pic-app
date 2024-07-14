import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PopularPhotos.css";

const PopularPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPhotos(currentPage);
  }, [currentPage]);

  const fetchPhotos = async (page) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SV_URL}/popularPhotos`,
        {
          params: { page, limit: 12 },
        }
      );

      setPhotos(response.data.photos);
      setTotalPages(Math.ceil(response.data.total / 12));
    } catch (error) {
      console.error("사진을 불러오는 중 에러 발생:");
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

  return (
    <div className="recent-photos">
      <h2>인기 있는 사진</h2>
      <div className="photos-grid">
        {photos.map((photo) => (
          <Link to={`/photo/${photo.file_name}`} key={photo.file_name}>
            <img
              src={`${process.env.REACT_APP_SV_URL}/uploads/${photo.file_name}`}
              alt={photo.description}
            />
          </Link>
        ))}
      </div>
      <div className="pagination">{renderPagination()}</div>
    </div>
  );
};

export default PopularPhotos;
