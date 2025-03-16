import React, { useState } from "react";
import ProductForm from "../../components/ProductForm";
import Loading from "../../components/Loading/index";

const NewProduct = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1500);
  return (
    <div className="page-container">
      <h1 className="page-title">Tạo Sản Phẩm Mới</h1>

      {/* Loading nhé */}

      {/* <Loading /> */}
      {loading ? <Loading></Loading> : <ProductForm heading="Tạo Sản Phẩm Mới" submitTitle="Tạo sản phẩm" />}
    </div>
  );
};

export default NewProduct;
