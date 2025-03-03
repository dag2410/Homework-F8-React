import React from "react";
import Button from "../common/Button";
import style from "./ProductList.module.css";
import App from "../../App";
const ProductList = ({ data, isGrid }) => {
  return (
    <div className={isGrid ? style.grid : style.list}>
      {data.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <h3>Price:{item.price}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
