import React, { useState } from "react";
import "../styles/Menu.css";

const categories = [
  "Bún, phở",
  "Cơm",
  "Bánh mì",
  "Món ăn kèm",
  "Lẩu",
  "Tráng miệng",
  "Salad",
  "Đồ uống",
];

const sampleDishes = {
  "Bún, phở": [
    { name: "Phở bò", image: require("../assets/images/pho-bo.jpg") },
    { name: "Bún chả", image: require("../assets/images/bun-cha.jpg") },
    { name: "Bún riêu", image: require("../assets/images/bun-rieu.jpg") },
    {
      name: "Bún măng vịt",
      image: require("../assets/images/bun-mang-vit.jpg"),
    },
    { name: "Phở gà", image: require("../assets/images/pho-ga.jpg") },
    { name: "Bún mọc", image: require("../assets/images/bun-moc.jpg") },
  ],
  Cơm: [
    { name: "Cơm tấm", image: require("../assets/images/com-tam.jpg") },
    { name: "Cơm chiên", image: require("../assets/images/com-chien.jpg") },
    { name: "Cơm gà", image: require("../assets/images/com-ga.jpg") },
    { name: "Cơm sườn", image: require("../assets/images/com-suon.jpg") },
    {
      name: "Cơm rang dưa bò",
      image: require("../assets/images/com-rang-dua-bo.jpg"),
    },
  ],
  "Bánh mì": [
    {
      name: "Bánh mì thịt",
      image: require("../assets/images/banh-mi-thit.jpg"),
    },
    {
      name: "Bánh mì chả cá",
      image: require("../assets/images/banh-mi-cha-ca.jpg"),
    },
    {
      name: "Bánh mì xíu mại",
      image: require("../assets/images/banh-mi-xiu-mai.jpg"),
    },
    {
      name: "Bánh mì pate",
      image: require("../assets/images/banh-mi-pate.jpg"),
    },
    {
      name: "Bánh mì bò nướng",
      image: require("../assets/images/banh-mi-bo-nuong.jpg"),
    },
  ],
  "Món ăn kèm": [
    { name: "Chả giò", image: require("../assets/images/cha-gio.jpg") },
    { name: "Gỏi cuốn", image: require("../assets/images/goi-cuon.jpg") },
    {
      name: "Khoai tây chiên",
      image: require("../assets/images/khoai-tay-chien.jpg"),
    },
    { name: "Nem rán", image: require("../assets/images/nem-ran.jpg") },
    {
      name: "Đậu hũ chiên",
      image: require("../assets/images/dau-hu-chien.jpg"),
    },
  ],
  Lẩu: [
    { name: "Lẩu thái", image: require("../assets/images/lau-thai.jpg") },
    { name: "Lẩu bò", image: require("../assets/images/lau-bo.jpg") },
    { name: "Lẩu gà lá é", image: require("../assets/images/lau-ga-la-e.jpg") },
    { name: "Lẩu hải sản", image: require("../assets/images/lau-hai-san.jpg") },
    { name: "Lẩu nấm", image: require("../assets/images/lau-nam.jpg") },
  ],
  "Tráng miệng": [
    {
      name: "Chè đậu xanh",
      image: require("../assets/images/che-dau-xanh.jpg"),
    },
    { name: "Bánh flan", image: require("../assets/images/banh-flan.jpg") },
    { name: "Kem dừa", image: require("../assets/images/kem-dua.jpg") },
    {
      name: "Sữa chua mít",
      image: require("../assets/images/sua-chua-mit.jpg"),
    },
    {
      name: "Bánh chuối nướng",
      image: require("../assets/images/banh-chuoi-nuong.jpg"),
    },
  ],
  Salad: [
    { name: "Salad trộn", image: require("../assets/images/salad-tron.jpg") },
    {
      name: "Salad cá ngừ",
      image: require("../assets/images/salad-ca-ngu.jpg"),
    },
    { name: "Salad bò", image: require("../assets/images/salad-bo.jpg") },
    {
      name: "Salad rau củ",
      image: require("../assets/images/salad-rau-cu.jpg"),
    },
    { name: "Salad trứng", image: require("../assets/images/salad-trung.jpg") },
  ],
  "Đồ uống": [
    { name: "Trà đá", image: require("../assets/images/tra-da.jpg") },
    { name: "Nước cam", image: require("../assets/images/nuoc-cam.jpg") },
    { name: "Sinh tố bơ", image: require("../assets/images/sinh-to-bo.jpg") },
    {
      name: "Cà phê sữa đá",
      image: require("../assets/images/ca-phe-sua-da.jpg"),
    },
    { name: "Nước ép dứa", image: require("../assets/images/nuoc-ep-dua.jpg") },
  ],
};

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantities, setQuantities] = useState({});

  const handleOrder = (dish) => {
    const quantity = quantities[dish] || 0;
    alert(`Đặt ${quantity} phần ${dish}`);
  };

  const handleQuantityChange = (dish, value) => {
    setQuantities({ ...quantities, [dish]: value });
  };

  return (
    <div className="menu-container">
      <h2>Danh sách món ăn</h2>
      <div className="category-list">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-button ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="dish-grid">
          {sampleDishes[selectedCategory]?.map((dish, index) => (
            <div className="dish-card">
              <img src={dish.image} alt={dish.name} className="dish-image" />
              <div className="dish-name">{dish.name}</div>
              <input
                type="number"
                min="1"
                placeholder="Số lượng"
                value={quantities[dish.name] || ""}
                onChange={(e) =>
                  handleQuantityChange(dish.name, e.target.value)
                }
              />
              <button onClick={() => handleOrder(dish.name)}>Đặt</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
