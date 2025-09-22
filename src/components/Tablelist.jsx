import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Tablelist.css";

// This is the API client for fetching tables. 
const getAvailableTables = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/reservations/tables/available");
        return response.data;
    } catch (error) {
        console.error("Error fetching available tables:", error);
        return [];
    }
};

export default function Tablelist() {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
            const availableTables = await getAvailableTables();
            setTables(availableTables);
        };

        fetchTables();
    }, []);

    return (
        <div className="tables-list-container">
            <h2 className="page-title">Danh sách bàn trống</h2>
            <div className="table-grid">
                {tables.length > 0 ? (
                    tables.map((table) => (
                        <div className="table-card" key={table.id}>
                            <div className="table-visual">Bàn</div>
                            <h4 className="table-title">Bàn số {table.tableNumber}</h4>
                            <p>Sức chứa: {table.capacity} người</p>
                            <Link to={`/booking/${table.id}`}>
                                <button className="btn book-button">Đặt bàn</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Không có bàn trống nào vào lúc này.</p>
                )}
            </div>
        </div>
    );
}