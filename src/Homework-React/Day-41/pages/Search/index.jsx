import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading/index";
import "./Search.css";
import { useLocation } from "react-router-dom";

const Search = () => {
  //Search
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(+params.get("page") || 1);
  const [totalPage, setTotalPage] = useState(0);
  const [per_page, setPer_Page] = useState(params.get("per_page") || 10);
  const [searchInput, setSearchInput] = useState(params.get("q") || "");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const isSearch = searchInput.length > 3;
  useEffect(() => {
    if (isSearch) {
      const timer = setTimeout(() => {
        if (isSearch) {
          fetch(`https://api01.f8team.dev/api/products?q=${searchInput}`)
            .then((res) => res.json())
            .then((data) => setSearchResult(data.data));
          // Cập nhật URL với search query
          params.set("q", searchInput);
          window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
        }
      }, 500);

      return () => clearTimeout(timer);
    } else {
      params.delete("q");
      history.replaceState(null, null, `${params}`);
    }
  }, [searchInput, isSearch, params]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://api01.f8team.dev/api/products?page=${currentPage}&per_page=${per_page}`);
        const data = await res.json();
        setProducts(data.data);
        setTotalPage(Math.ceil(data.total / per_page));
      } catch (error) {
        console.log("Lỗi", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, per_page]);

  const filterProducts = () => {
    return isSearch ? searchResult : products;
  };

  return (
    <div className="page-container">
      <h1 className="search-title">Tìm kiếm sản phẩm</h1>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Nhập tên sản phẩm..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button className="search-button">Tìm kiếm</button>
      </div>
      {loading ? (
        <Loading></Loading>
      ) : filterProducts().length > 0 ? (
        <ProductList
          products={filterProducts()}
          per_page={per_page}
          totalPage={totalPage}
          currentPage={currentPage}
          onPerPageChange={(e) => {
            setPer_Page(e.target.value);
            setCurrentPage(1);
          }}
          onPageChange={(page) => setCurrentPage(page)}
        />
      ) : (
        <p className="empty-message">Không tìm thấy sản phẩm nào.</p>
      )}
    </div>
  );
};

export default Search;
