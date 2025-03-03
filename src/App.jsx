import { useState } from "react";
import "./App.css";
import Button from "./components/common/Button";
import ProductList from "./components/ui/ProductList";
import data from "./data";
import Header from "./layouts/Header";
function App() {
  const [isGrid, setIsGrid] = useState(false);
  return (
    <>
      <Header />
      <ProductList data={data} isGrid={isGrid} />

      <Button
        variant="grid"
        size="big"
        onClick={() => {
          setIsGrid(!isGrid);
        }}
      >
        {isGrid ? "List" : "Grid"}
      </Button>
    </>
  );
}

export default App;
