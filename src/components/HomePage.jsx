import { useState, useEffect } from "react";
import hp1 from "../assets/icons/hp1.jpg";
import hp2 from "../assets/icons/hp2.jpg";
import hp3 from "../assets/icons/hp3.jpg";
import hp4 from "../assets/icons/hp4.jpg";
import "../styles/HomePage.css";

const images = [hp1, hp2, hp3, hp4];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="hero">
      {images.map((img, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}

      <div className="overlay"></div>
      <div className="content">
        <h1>Khám Phá Ẩm Thực Việt</h1>
        <p>Đặt bàn ngay hôm nay để tận hưởng những món ăn tuyệt vời</p>
      </div>

      {/* Nút điều khiển */}
      <button className="prev" onClick={prevSlide}>❮</button>
      <button className="next" onClick={nextSlide}>❯</button>

      {/* Dot tròn */}
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}
