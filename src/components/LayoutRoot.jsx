// import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/LayoutRoot.css";
import { Outlet } from "react-router-dom";

export default function LayoutRoot() {
  return (
    <div className="layout-root">
      <Header />
      <main className="main-content">
        {/* <nav>
          <Link to="/">Trang chủ</Link>
          <Link to="/menu">Menu</Link> 
        </nav> */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
