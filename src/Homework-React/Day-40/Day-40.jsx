import { useEffect, useState } from "react";
import "../Day-40/Day-40.css";

function Day40() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const skip = (currentPage - 1) * limit;
    fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPosts(data.posts);
        console.log(data.posts);
        setTotalPage(Math.ceil(data.total / limit));
      });
  }, [currentPage, limit]);

  const renderPage = () => {
    const result = [];
    for (let i = 0; i < totalPage; i++) {
      let page = i + 1;
      result.push(
        <button
          className={`page-btn ${currentPage === page ? "active" : ""}`}
          key={i}
          onClick={() => {
            setCurrentPage(page);
          }}
        >
          {i + 1}
        </button>
      );
    }

    return result.slice(currentPage - 1, currentPage + 2);
  };

  const filteredPosts = () => {
    const search = searchInput.trim().toLowerCase();
    if (search.length < 3) {
      return posts;
    } else {
      return posts.filter((post) => post.title.toLowerCase().includes(search));
    }
  };

  return (
    <div className="app">
      <h1>Danh sách bài viết</h1>
      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          id="search-input"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          placeholder="Tìm kiếm bài viết..."
        />
      </div>
      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      )}
      {/* List of Posts */}
      <ul className="post-list">
        {filteredPosts().length > 0 ? (
          filteredPosts().map((p) => (
            <li className="post-item" key={p.id}>
              <h2>{p.title}</h2>
              <p>{p.body}</p>
              <div className="post-meta">
                <span className="views">👀 {p.views}</span>
                <span className="likes">👍{p.reactions.likes}</span>
                <span className="dislikes">👎 {p.reactions.dislikes}</span>
              </div>
              <div className="tags">
                <span className="tag">{p.tags[0]}</span>
                <span className="tag">{p.tags[1]}</span>
                <span className="tag">{p.tags[2]}</span>
              </div>
            </li>
          ))
        ) : (
          <p className="no-results">Không có bài viết nào.</p>
        )}
      </ul>
      {/* Pagination (Phân trang)*/}
      {!searchInput && (
        <div className="pagination-container ">
          <div className="records-per-page">
            <label htmlFor="records">Hiển thị:</label>
            <select
              id="records"
              className="records-select"
              onChange={(e) => {
                setLimit(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>
          <div className="pagination">
            <button
              className="page-btn prev "
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              disabled={loading || currentPage == 1}
            >
              « Trước
            </button>
            {renderPage()}
            <button
              className="page-btn next "
              onClick={() => {
                if (currentPage < totalPage) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              disabled={loading || currentPage == totalPage}
            >
              Sau »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Day40;
