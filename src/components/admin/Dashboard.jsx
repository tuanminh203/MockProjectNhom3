import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../../styles/Dashboard.css';

// Đăng ký các thành phần Chart.js cần thiết
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export default function Dashboard() {
  const [stats, setStats] = useState({
    totalReservations: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [topSellingDishes, setTopSellingDishes] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [reservationsRes, ordersRes, dishesRes] = await Promise.all([
          axios.get("http://localhost:8080/api/v1/dashboard/confirmed-completed-count"),
          axios.get("http://localhost:8080/api/v1/dashboard/orders-count"),
          axios.get("http://localhost:8080/api/v1/dashboard/top-selling-dishes")
        ]);

        // Cập nhật state với dữ liệu đã lấy từ API
        // Đảm bảo truy cập đúng thuộc tính của đối tượng JSON
        setStats({
          totalReservations: reservationsRes.data.count, 
          totalOrders: ordersRes.data.value,
          // totalRevenue: null,
        });
            
        // Đặt dữ liệu món ăn bán chạy nhất
        setTopSellingDishes(dishesRes.data);
      } catch (error) {
        // Ghi lại lỗi để dễ dàng gỡ lỗi
        console.error("Lỗi khi tải dữ liệu trang tổng quan:", error);
      }
    };

    fetchDashboardData();
  }, []); // Dependency rỗng để đảm bảo chỉ chạy một lần khi component mount

  // Dữ liệu cho biểu đồ món bán chạy nhất
  const chartData = {
    // Sử dụng Optional Chaining để tránh lỗi khi dữ liệu chưa có
    labels: topSellingDishes?.map(dishesRes => dishesRes.name),
    datasets: [
      {
        label: 'Số lượng bán ra',
        // Sử dụng Optional Chaining để tránh lỗi
        data: topSellingDishes?.map(dishesRes => dishesRes.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Món Ăn Bán Chạy Nhất',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số lượng',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Tên món ăn',
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Tổng quan Kinh doanh</h1>

      {/* Phần thống kê chung */}
      <div className="stats-grid">
        <div className="stat-card">
          <i className="fas fa-calendar-check icon-reservations"></i>
          <h3>Đặt Bàn</h3>
          <p className="stat-value">{stats.totalReservations}</p>
        </div>
        <div className="stat-card">
          <i className="fas fa-utensils icon-orders"></i>
          <h3>Order Món</h3>
          <p className="stat-value">{stats.totalOrders}</p>
        </div>
        {/* <div className="stat-card">
          <i className="fas fa-dollar-sign icon-revenue"></i>
          <h3>Doanh Thu</h3>
          <p className="stat-value">{stats.totalRevenue.toLocaleString('vi-VN')} VNĐ</p>
        </div> */}
      </div>

      <div className="dashboard-sections">
        {/* Biểu đồ món bán chạy nhất */}
        <div className="chart-section">
          <div className="card">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}