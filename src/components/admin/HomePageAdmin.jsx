import { useState } from "react";
import Dashboard from "./Dashboard";
import UserManagement from "./UserManagement";
import ReservationManagement from "./ReservationManagement";
import MenuManagement from "./MenuManagement";
import "../../styles/HomePageAdmin.css";


export default function HomePageAdmin() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "users":
        return <UserManagement />;
      case "reservations":
        return <ReservationManagement />;
      case "menu":
        return <MenuManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
            <li onClick={() => setActivePage("users")}>Quản lý người dùng</li>
            <li onClick={() => setActivePage("reservations")}>Quản lý đặt bàn</li>
            <li onClick={() => setActivePage("menu")}>Quản lý menu</li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="content">{renderContent()}</main>
    </div>
  );
}
