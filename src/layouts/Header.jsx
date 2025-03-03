import React from "react";
import style from "./Header.module.css";
function Header() {
  return (
    <div>
      <div className={style.header}>
        <h1 className={style.headerLeft}>
          <a href="#!">Baitap</a>
        </h1>
        <div className={style.headerRight}>
          <a href="#!">Home</a>
          <a href="#!">About</a>
          <a href="#!">Products</a>
        </div>
      </div>
    </div>
  );
}

export default Header;
