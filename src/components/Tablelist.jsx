import "../styles/Tablelist.css";
import { Link } from "react-router-dom";

export default function Tablelist(){
    const tables = [1,2,3,4,5,6];
    return (
        <div className="tables-list-container">
      <h2 className="page-title">Danh sách bàn</h2>

      <div className="table-grid">
        {tables.map((id) => (
          <div className="table-card" key={id}>
            <div className="table-visual">Bàn</div>
            <h4 className="table-title">Bàn số {id}</h4>
            <Link to={`/booking/${id}`}>
              <button className="btn book-button">Đặt bàn</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
    )
}