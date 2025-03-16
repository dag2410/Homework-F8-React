import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
const Products = () => {
  // Giữ page per_page khi refresh(1)
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(+params.get("page") || 1);
  const [totalPage, setTotalPage] = useState(0);
  const [per_page, setPer_Page] = useState(params.get("per_page") || 10);
  // const [searchInput, setSearchInput] = useState(params.get("q") || "");

  //Search
  // let timerId;
  // const isSearch = searchInput.length > 3;
  // useEffect(() => {
  //   if (isSearch) {
  //     clearTimeout(timerId);
  //     timerId = setTimeout(() => {
  //       fetch(` https://api01.f8team.dev/api/products?q=${currentPage}&page=${currentPage}&per_page=${per_page}`)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setSearchInput(data.data);
  //           params.set("q", searchInput);
  //           history.replaceState(null, null, `${params}`);
  //         });
  //     }, 500);
  //   } else {
  //     params.delete("q");
  //     history.replaceState(null, null, `${params}`);
  //   }
  // }, [searchInput, isSearch, params]);

  // fetch API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://api01.f8team.dev/api/products?page=${currentPage}&per_page=${per_page}`);
        const data = await res.json();
        setProducts(data.data);
        setTotalPage(data.last_page);
      } catch (error) {
        console.log("Lỗi", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, per_page]);

  // Giữ page per_page khi refresh(2)
  useEffect(() => {
    params.set("page", currentPage);
    params.set("per_page", per_page);
    history.replaceState(null, null, `?${params}`);
  }, [currentPage, per_page, params]);

  //Button

  //Search
  return (
    <div className="page-container">
      <h1 className="page-title">Danh Sách Sản Phẩm</h1>
      {loading ? (
        <Loading></Loading>
      ) : (
        <ProductList
          // filterProducts={filterProducts}
          products={products}
          per_page={per_page}
          totalPage={totalPage}
          currentPage={currentPage}
          onPerPageChange={(e) => {
            setPer_Page(e.target.value);
            setCurrentPage(1);
          }}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default Products;
