import React, { useState } from "react";
import "./ProductForm.css";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ submitTitle = "Thêm sản phẩm" }) => {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    tags: "",
    brand: "",
    sku: "",
    weight: "",
    minimumOrderQuantity: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({}); // Reset lỗi trước khi gửi

    try {
      const res = await fetch("https://api01.f8team.dev/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...formData, tags: formData.tags.split(",").map((value) => value.trim()) }),
      });

      const data = await res.json();

      if (!res.ok) {
        const newError = {};
        Object.entries(data.errors || {}).forEach(([fieldName, message]) => {
          newError[fieldName] = message;
        });
        setError(newError);
        return;
      }

      navigate("/products");
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };

  return (
    <div className="product-form-container">
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="title" className="form-input" placeholder="Tên sản phẩm" value={formData.title} onChange={handleChange} />
          {error.title && <p className="error-message">{error.title}</p>}
        </div>

        <div className="form-group">
          <textarea name="description" className="form-textarea" placeholder="Mô tả sản phẩm" value={formData.description} onChange={handleChange} />
          {error.description && <p className="error-message">{error.description}</p>}
        </div>

        <div className="form-group">
          <input type="text" name="category" className="form-input" placeholder="Danh mục" value={formData.category} onChange={handleChange} />
          {error.category && <p className="error-message">{error.category}</p>}
        </div>

        <div className="form-group">
          <input type="number" name="price" className="form-input" placeholder="Giá ($)" value={formData.price} onChange={handleChange} />
          {error.price && <p className="error-message">{error.price}</p>}
        </div>

        <div className="form-group">
          <input type="number" name="discountPercentage" className="form-input" placeholder="Giảm giá (%)" value={formData.discountPercentage} onChange={handleChange} />
          {error.discountPercentage && <p className="error-message">{error.discountPercentage}</p>}
        </div>

        <div className="form-group">
          <input type="number" name="rating" className="form-input" placeholder="Đánh giá (0-5)" value={formData.rating} onChange={handleChange} />
          {error.rating && <p className="error-message">{error.rating}</p>}
        </div>

        <div className="form-group">
          <input type="number" name="stock" className="form-input" placeholder="Tồn kho" value={formData.stock} onChange={handleChange} />
          {error.stock && <p className="error-message">{error.stock}</p>}
        </div>

        <div className="form-group">
          <input type="text" name="tags" className="form-input" placeholder="Tags (cách nhau bằng dấu phẩy)" value={formData.tags} onChange={handleChange} />
          {error.tags && <p className="error-message">{error.tags}</p>}
        </div>

        <div className="form-group">
          <input type="text" name="brand" className="form-input" placeholder="Thương hiệu" value={formData.brand} onChange={handleChange} />
          {error.brand && <p className="error-message">{error.brand}</p>}
        </div>

        <div className="form-group">
          <input type="text" name="sku" className="form-input" placeholder="Mã SKU" value={formData.sku} onChange={handleChange} />
          {error.sku && <p className="error-message">{error.sku}</p>}
        </div>

        <div className="form-group">
          <input type="number" name="weight" className="form-input" placeholder="Trọng lượng (kg)" value={formData.weight} onChange={handleChange} />
          {error.weight && <p className="error-message">{error.weight}</p>}
        </div>

        <div className="form-group">
          <input type="number" name="minimumOrderQuantity" className="form-input" placeholder="Số lượng tối thiểu" value={formData.minimumOrderQuantity} onChange={handleChange} />
          {error.minimumOrderQuantity && <p className="error-message">{error.minimumOrderQuantity}</p>}
        </div>

        <div className="form-group">
          <input type="text" name="thumbnail" className="form-input" placeholder="URL hình ảnh" value={formData.thumbnail} onChange={handleChange} />
          {error.thumbnail && <p className="error-message">{error.thumbnail}</p>}
        </div>

        <button type="submit" className="submit-button">
          {submitTitle}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
