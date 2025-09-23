import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuItemById } from "../api";
import { CartContext } from "../Context/CartContext";
import "../styles/MenuItemDetail.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MenuItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [aiDescription, setAiDescription] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await getMenuItemById(id);
        setMenuItem(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy món ăn:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItem();
  }, [id]);

  const generateAiDescription = async () => {
    if (menuItem) {
      setIsGenerating(true);
      try {
        const prompt = `Viết một đoạn mô tả hấp dẫn cho món ăn sau: Tên món: ${menuItem.name}. Mô tả cũ: ${menuItem.description}.`;
        const payload = {
          contents: [{ parts: [{ text: prompt }] }],
          tools: [{ google_search: {} }],
          systemInstruction: {
            parts: [
              {
                text: "Hãy đóng vai một đầu bếp và nhà phê bình ẩm thực chuyên nghiệp. Cung cấp một đoạn văn duy nhất, hấp dẫn, dài 3-5 câu để mô tả món ăn.",
              },
            ],
          },
        }; // Sử dụng biến môi trường để lấy khóa API
        const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error("API Key is missing. Please check your .env file.");
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          setAiDescription(text);
        } else {
          setAiDescription("Không thể tạo mô tả. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Lỗi khi tạo mô tả AI:", error);
        setAiDescription("Không thể tạo mô tả. Vui lòng thử lại.");
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const generatePairingSuggestion = async () => {
    if (menuItem) {
      setIsGenerating(true);
      try {
        const prompt = `Gợi ý 2-3 món ăn kèm hoặc đồ uống phù hợp với món chính sau: ${menuItem.name}. Gợi ý phải ngắn gọn, chỉ bao gồm tên món.`;
        const payload = {
          contents: [{ parts: [{ text: prompt }] }],
          tools: [{ google_search: {} }],
          systemInstruction: {
            parts: [
              {
                text: "Đóng vai một chuyên gia ẩm thực và đưa ra các gợi ý kết hợp món ăn sáng tạo, hấp dẫn. Cung cấp câu trả lời dưới dạng một danh sách có gạch đầu dòng, ngắn gọn, chỉ có tên món ăn.",
              },
            ],
          },
        };

        // Sử dụng biến môi trường để lấy khóa API
        const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error("API Key is missing. Please check your .env file.");
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          setAiSuggestion(text);
        } else {
          setAiSuggestion("Không thể đưa ra gợi ý. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Lỗi khi tạo gợi ý AI:", error);
        setAiSuggestion("Không thể đưa ra gợi ý. Vui lòng thử lại.");
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleAddToCart = async () => {
    if (menuItem) {
      try {
        addToCart(menuItem, quantity);
        toast.success(
          `${quantity} món ${menuItem.name} đã được thêm vào giỏ hàng!`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } catch (error) {
        toast.error(
          "Có lỗi xảy ra khi thêm món ăn vào giỏ hàng. Vui lòng thử lại.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        console.error("Lỗi khi thêm món ăn vào giỏ hàng:", error);
      }
    }
  };

  const handleBuyNow = () => {
    if (menuItem) {
      addToCart(menuItem, quantity);
      navigate("/cart");
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!menuItem) {
    return <div className="not-found">Không tìm thấy món ăn này.</div>;
  }

  return (
    <div className="menu-item-detail-container">
      <div className="detail-card">
        {/* Cột bên trái: Ảnh, tên, giá, nút chức năng */}
        <div className="left-column">
          <div className="detail-image-wrapper">
            <img
              src={`http://localhost:8080${menuItem.imageUrl}`}
              alt={menuItem.name}
              className="detail-image"
            />
          </div>
          <h1 className="detail-name">{menuItem.name}</h1>
          <p className="detail-price">
            Giá: {menuItem.price?.toLocaleString()} đ
          </p>
          <div className="quantity-control">
            <label>Số lượng:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className="action-buttons">
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Thêm vào giỏ
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              Thanh toán ngay
            </button>
          </div>
        </div>

        {/* Cột bên phải: Mô tả, đánh giá, AI */}
        <div className="right-column">
          <div className="detail-info">
            <p className="detail-description">{menuItem.description}</p>

            <div className="rating-section">
              <h3>Đánh giá</h3>
              <p>⭐️⭐️⭐️⭐️⭐️</p>
              <p>Rất ngon, phục vụ nhanh chóng!</p>
            </div>
          </div>

          <div className="ai-sections">
            {aiDescription && (
              <div className="ai-description">
                <p>
                  <strong>Mô tả AI:</strong>
                </p>
                <p>{aiDescription}</p>
              </div>
            )}
            <button
              className="ai-btn"
              onClick={generateAiDescription}
              disabled={isGenerating}
            >
              {isGenerating ? "Đang tạo..." : "✨ Tạo mô tả"}
            </button>

            <div className="pairing-suggestion-section">
              <h3>Gợi ý kết hợp ✨</h3>
              {aiSuggestion ? (
                <p>{aiSuggestion}</p>
              ) : (
                <p>Nhấn nút để nhận gợi ý món ăn kèm.</p>
              )}
              <button
                className="ai-btn"
                onClick={generatePairingSuggestion}
                disabled={isGenerating}
              >
                {isGenerating ? "Đang tạo..." : "✨ Gợi ý món ăn kèm"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetail;
