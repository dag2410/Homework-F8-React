import { useEffect, useState } from "react";
import "./ProductList.css";
import Loading from "../Loading";
import { useLocation } from "react-router-dom";

function ProductList({ currentPage, totalPage, per_page, products, onPerPageChange, onPageChange }) {
  const buttonNum = () => {
    const result = [];
    for (let i = 0; i < totalPage; i++) {
      let page = i + 1;
      result.push(
        <button
          className={`page-number ${currentPage === page ? "active" : ""}`}
          key={i}
          onClick={() => {
            onPageChange(page);
          }}
        >
          {i + 1}
        </button>
      );
    }
    return result.slice(currentPage - 1, currentPage + 8);
  };
  return (
    <div className="product-list-container">
      {products.length > 0 ? (
        <>
          <ul className="product-list">
            {products.map((product) => (
              <li className="product-item" key={product.id}>
                <img src={product.thumbnail} alt="" className="product-image" />
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">{product.price}</p>
                  <p className="product-stock">{product.stock}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="pagination-container">
            <div className="items-per-page">
              <label htmlFor="itemsPerPage">Hiển thị:</label>
              <select id="itemsPerPage" className="items-select" value={+per_page} onChange={onPerPageChange}>
                {[10, 20, 50, 100, 200].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* phân trang */}
            <div className="pagination">
              <button
                className="page-button"
                onClick={() => {
                  if (currentPage > 1) {
                    onPageChange(currentPage - 1);
                  }
                }}
                disabled={currentPage == 1}
              >
                ⬅ Trước{" "}
              </button>

              <div className="page-numbers">{buttonNum()}</div>

              <button
                className="page-button"
                onClick={() => {
                  if (currentPage < totalPage) {
                    onPageChange(currentPage + 1);
                  }
                }}
                disabled={currentPage == totalPage}
              >
                Tiếp ➡
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="empty-message">Không có sản phẩm nào.</p>
      )}
    </div>
  );
}

export default ProductList;
