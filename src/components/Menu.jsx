import { useEffect, useState } from "react";
import { getAllMenuItems, getAllCategories } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Menu.css";

const Menu = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuResponse = await getAllMenuItems();
        setMenuItems(menuResponse.data);

        const categoryResponse = await getAllCategories();
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleImageClick = (dishId) => {
    navigate(`/menu/${dishId}`);
  };

  const filteredMenuItems = selectedCategory
    ? menuItems.filter((item) => item.category.id === selectedCategory.id)
    : menuItems;

  return (
    <div className="menu-container">
      <h2>Danh sách món ăn</h2>

      <div className="category-list">
        <button
          className={`category-button ${!selectedCategory ? "active" : ""}`}
          onClick={() => handleCategoryClick(null)}
        >
          Tất cả
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-button ${
              selectedCategory && selectedCategory.id === cat.id ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="dish-grid">
        {filteredMenuItems.map((dish) => (
          <div className="dish-card" key={dish.id}>
            <img
              src={`http://localhost:8080${dish.imageUrl}`}
              alt={dish.name}
              className="dish-image"
            />
            <div className="dish-info">
              <div className="dish-name">{dish.name}</div>
              <div className="dish-price">{dish.price?.toLocaleString()} đ</div>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={() => handleImageClick(dish.id)}
            >
              Tùy chọn
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
