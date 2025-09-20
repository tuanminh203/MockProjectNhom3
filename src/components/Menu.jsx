import React, { useState } from "react";
import "../styles/Menu.css";
import MenuItem from "./MenuItem";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

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
    {
      name: "Phở bò",
      image: require("../assets/images/pho-bo.jpg"),
      price: 45000,
      description:
        "Phở bò truyền thống với nước dùng đậm đà, thịt bò mềm thơm.",
    },
    {
      name: "Bún chả",
      image: require("../assets/images/bun-cha.jpg"),
      price: 40000,
      description: "Thịt nướng thơm lừng ăn kèm bún và nước mắm chua ngọt.",
    },
    {
      name: "Bún riêu",
      image: require("../assets/images/bun-rieu.jpg"),
      price: 42000,
      description: "Nước dùng chua nhẹ, riêu cua béo ngậy, ăn kèm rau sống.",
    },
    {
      name: "Bún măng vịt",
      image: require("../assets/images/bun-mang-vit.jpg"),
      price: 48000,
      description: "Thịt vịt mềm, nước dùng thanh ngọt, măng giòn hấp dẫn.",
    },
    {
      name: "Phở gà",
      image: require("../assets/images/pho-ga.jpg"),
      price: 43000,
      description: "Phở gà thơm nhẹ, thịt gà ta dai ngon, nước dùng trong veo.",
    },
    {
      name: "Bún mọc",
      image: require("../assets/images/bun-moc.jpg"),
      price: 41000,
      description: "Viên mọc thơm ngon, nước dùng thanh mát, dễ ăn.",
    },
  ],

  Cơm: [
    {
      name: "Cơm tấm",
      image: require("../assets/images/com-tam.jpg"),
      price: 40000,
      description: "Cơm tấm mềm thơm, ăn kèm sườn nướng và nước mắm đặc trưng.",
    },
    {
      name: "Cơm chiên",
      image: require("../assets/images/com-chien.jpg"),
      price: 38000,
      description: "Cơm chiên vàng giòn, kết hợp rau củ và trứng hấp dẫn.",
    },
    {
      name: "Cơm gà",
      image: require("../assets/images/com-ga.jpg"),
      price: 42000,
      description: "Thịt gà chiên giòn, cơm nóng hổi, thêm nước sốt đậm đà.",
    },
    {
      name: "Cơm sườn",
      image: require("../assets/images/com-suon.jpg"),
      price: 45000,
      description: "Sườn nướng thơm lừng, cơm trắng dẻo, ăn kèm đồ chua.",
    },
    {
      name: "Cơm rang dưa bò",
      image: require("../assets/images/com-rang-dua-bo.jpg"),
      price: 43000,
      description: "Cơm rang đậm vị, thịt bò mềm, dưa cải chua giòn.",
    },
  ],

  "Bánh mì": [
    {
      name: "Bánh mì thịt",
      image: require("../assets/images/banh-mi-thit.jpg"),
      price: 25000,
      description: "Bánh mì giòn rụm, nhân thịt đầy đặn, rau thơm tươi ngon.",
    },
    {
      name: "Bánh mì chả cá",
      image: require("../assets/images/banh-mi-cha-ca.jpg"),
      price: 22000,
      description:
        "Chả cá chiên giòn, bánh mì nóng hổi, thêm chút tương ớt cay.",
    },
    {
      name: "Bánh mì xíu mại",
      image: require("../assets/images/banh-mi-xiu-mai.jpg"),
      price: 23000,
      description: "Xíu mại mềm thơm, nước sốt đậm đà, bánh mì giòn tan.",
    },
    {
      name: "Bánh mì pate",
      image: require("../assets/images/banh-mi-pate.jpg"),
      price: 20000,
      description: "Pate béo ngậy, bánh mì giòn, thêm chút dưa leo mát lạnh.",
    },
    {
      name: "Bánh mì bò nướng",
      image: require("../assets/images/banh-mi-bo-nuong.jpg"),
      price: 27000,
      description: "Thịt bò nướng thơm lừng, bánh mì giòn, rau sống tươi mát.",
    },
  ],

  "Món ăn kèm": [
    {
      name: "Chả giò",
      image: require("../assets/images/cha-gio.jpg"),
      price: 30000,
      description: "Chả giò giòn rụm, nhân thịt và rau củ đậm đà.",
    },
    {
      name: "Gỏi cuốn",
      image: require("../assets/images/goi-cuon.jpg"),
      price: 28000,
      description: "Cuốn tươi mát, tôm thịt đầy đủ, chấm nước mắm chua ngọt.",
    },
    {
      name: "Khoai tây chiên",
      image: require("../assets/images/khoai-tay-chien.jpg"),
      price: 25000,
      description: "Khoai tây chiên giòn, vàng ruộm, ăn kèm tương cà.",
    },
    {
      name: "Nem rán",
      image: require("../assets/images/nem-ran.jpg"),
      price: 30000,
      description: "Nem rán giòn tan, nhân thịt thơm ngon, ăn kèm rau sống.",
    },
    {
      name: "Đậu hũ chiên",
      image: require("../assets/images/dau-hu-chien.jpg"),
      price: 22000,
      description: "Đậu hũ chiên vàng, mềm bên trong, chấm nước tương cay.",
    },
  ],

  Lẩu: [
    {
      name: "Lẩu thái",
      image: require("../assets/images/lau-thai.jpg"),
      price: 150000,
      description: "Nước lẩu chua cay đậm đà, hải sản tươi ngon, rau đầy đủ.",
    },
    {
      name: "Lẩu bò",
      image: require("../assets/images/lau-bo.jpg"),
      price: 160000,
      description: "Thịt bò mềm, nước lẩu ngọt thanh, ăn kèm mì và rau.",
    },
    {
      name: "Lẩu gà lá é",
      image: require("../assets/images/lau-ga-la-e.jpg"),
      price: 140000,
      description: "Gà ta thơm ngon, lá é đặc trưng, nước lẩu thanh mát.",
    },
    {
      name: "Lẩu hải sản",
      image: require("../assets/images/lau-hai-san.jpg"),
      price: 170000,
      description: "Tôm, mực, nghêu tươi sống, nước lẩu cay nhẹ hấp dẫn.",
    },
    {
      name: "Lẩu nấm",
      image: require("../assets/images/lau-nam.jpg"),
      price: 130000,
      description: "Các loại nấm tươi, nước lẩu thanh đạm, phù hợp ăn chay.",
    },
  ],

  "Tráng miệng": [
    {
      name: "Chè đậu xanh",
      image: require("../assets/images/che-dau-xanh.jpg"),
      price: 15000,
      description: "Chè ngọt thanh, đậu xanh mềm mịn, ăn mát ngày hè.",
    },
    {
      name: "Bánh flan",
      image: require("../assets/images/banh-flan.jpg"),
      price: 12000,
      description: "Bánh flan béo ngậy, thơm mùi trứng sữa, phủ caramel.",
    },
    {
      name: "Kem dừa",
      image: require("../assets/images/kem-dua.jpg"),
      price: 18000,
      description: "Kem mát lạnh, vị dừa thơm béo, topping trái cây.",
    },
    {
      name: "Sữa chua mít",
      image: require("../assets/images/sua-chua-mit.jpg"),
      price: 20000,
      description: "Sữa chua dẻo, mít giòn ngọt, thêm trân châu dai dai.",
    },
    {
      name: "Bánh chuối nướng",
      image: require("../assets/images/banh-chuoi-nuong.jpg"),
      price: 16000,
      description: "Chuối chín thơm, bánh mềm, nướng vàng giòn mặt.",
    },
  ],

  Salad: [
    {
      name: "Salad trộn",
      image: require("../assets/images/salad-tron.jpg"),
      price: 30000,
      description: "Rau củ tươi trộn với sốt chua ngọt, thanh mát dễ ăn.",
    },
    {
      name: "Salad cá ngừ",
      image: require("../assets/images/salad-ca-ngu.jpg"),
      price: 35000,
      description: "Cá ngừ mềm thơm, rau xanh giòn, sốt mè rang đậm vị.",
    },
    {
      name: "Salad bò",
      image: require("../assets/images/salad-bo.jpg"),
      price: 38000,
      description: "Thịt bò áp chảo, rau củ tươi, sốt dầu giấm hấp dẫn.",
    },
    {
      name: "Salad rau củ",
      image: require("../assets/images/salad-rau-cu.jpg"),
      price: 28000,
      description: "Rau củ luộc vừa chín, sốt mayonnaise nhẹ nhàng.",
    },
    {
      name: "Salad trứng",
      image: require("../assets/images/salad-trung.jpg"),
      price: 30000,
      description: "Trứng luộc, rau xanh, sốt kem béo nhẹ, dễ ăn.",
    },
  ],
  "Đồ uống": [
    {
      name: "Trà đá",
      image: require("../assets/images/tra-da.jpg"),
      price: 5000,
      description: "Trà mát lạnh, giải khát nhanh chóng.",
    },
    {
      name: "Nước cam",
      image: require("../assets/images/nuoc-cam.jpg"),
      price: 20000,
      description: "Cam tươi ép nguyên chất, giàu vitamin C.",
    },
    {
      name: "Sinh tố bơ",
      image: require("../assets/images/sinh-to-bo.jpg"),
      price: 25000,
      description: "Bơ sánh mịn, ngọt béo, bổ dưỡng cho cơ thể.",
    },
    {
      name: "Cà phê sữa đá",
      image: require("../assets/images/ca-phe-sua-da.jpg"),
      price: 18000,
      description: "Cà phê đậm đà, sữa ngọt dịu, đá mát lạnh.",
    },
    {
      name: "Nước ép dứa",
      image: require("../assets/images/nuoc-ep-dua.jpg"),
      price: 22000,
      description: "Dứa ép tươi, vị chua ngọt hài hòa, giải nhiệt tốt.",
    },
  ],
};

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantities, setQuantities] = useState({});
  const [selectedDish, setSelectedDish] = useState(null);
  const { addToCart } = useContext(CartContext);

  const handleQuantityChange = (dishName, value) => {
    setQuantities({ ...quantities, [dishName]: value });
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
            <div className="dish-card" key={index}>
              <img
                src={dish.image}
                alt={dish.name}
                className="dish-image"
                onClick={() => setSelectedDish(dish)}
              />
              <div className="dish-name">{dish.name}</div>
              <div className="dish-price">{dish.price?.toLocaleString()} đ</div>

              <input
                type="number"
                min="0"
                placeholder="Số lượng"
                value={quantities[dish.name] || ""}
                onChange={(e) =>
                  handleQuantityChange(dish.name, e.target.value)
                }
              />
              <button
                onClick={() =>
                  addToCart(dish, Number(quantities[dish.name]) || 1)
                }
              >
                Thêm vào giỏ
              </button>
              <button onClick={() => handleQuantityChange(dish.name, 0)}>
                Reset
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedDish && (
        <MenuItem
          dish={selectedDish}
          quantity={quantities[selectedDish.name]}
          onQuantityChange={handleQuantityChange}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </div>
  );
};

export default Menu;
