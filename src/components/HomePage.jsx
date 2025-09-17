import "../styles/HomePage.css";
// import { useNavigate } from "react-router-dom";

export default function HomePage() {
  // const navigate = useNavigate();

  return (
    <section className="hero">
      <h1>Chào mừng đến với Trang Chủ</h1>
      <p>Kết nối bạn bè, khám phá và trải nghiệm</p>
      {/* <button onClick={() => navigate("/menu")}>Xem Menu</button> */}
    </section>
  );
}
