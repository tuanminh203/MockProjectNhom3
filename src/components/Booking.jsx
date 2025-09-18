// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "../styles/Tablebooking.css";

// export default function TableBooking() {
//   const { id } = useParams(); // lấy số bàn từ URL
//   const navigate = useNavigate();

//   const [soNguoi, setSoNguoi] = useState(1);
//   const [thoiGian, setThoiGian] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Đặt bàn ${id} cho ${soNguoi} người, lúc ${thoiGian}`);
//     navigate("/tables"); // quay lại danh sách sau khi đặt
//   };

//   return (
//     <div className="booking-container">
//       <h2 className="page-title">Bàn số {id}</h2>

//       <div className="card">
//         <form onSubmit={handleSubmit} className="booking-form">
//           <div className="form-row">
//             <label className="form-label">Số lượng người</label>
//             <select
//               className="input select"
//               value={soNguoi}
//               onChange={(e) => setSoNguoi(e.target.value)}
//             >
//               {[...Array(10)].map((_, i) => (
//                 <option key={i + 1} value={i + 1}>
//                   {i + 1}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="form-row">
//             <label className="form-label">Thời gian</label>
//             <input
//               className="input datetime-input"
//               type="datetime-local"
//               value={thoiGian}
//               onChange={(e) => setThoiGian(e.target.value)}
//             />
//           </div>

//           <div className="actions">
//             <button type="submit" className="btn btn-primary">Đặt bàn</button>
//             <button type="button" className="btn btn-secondary" onClick={() => navigate("/tables")}>
//               Thoát
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/Tablebooking.css";

// This is the API client for making a reservation.
const makeReservationApi = async (tableId, numPeople, reservationDateTime, token) => {
    try {
        const response = await axios.post(
            `http://localhost:8080/api/v1/reservations/make/${tableId}`,
            {
                numPeople: numPeople,
                reservationDateTime: reservationDateTime,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Reservation failed:", error);
        throw error;
    }
};

export default function TableBooking() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [soNguoi, setSoNguoi] = useState(1);
    const [thoiGian, setThoiGian] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn cần đăng nhập để đặt bàn!");
            navigate("/sign-in");
            return;
        }

        try {
            // Call the API with the table ID, number of people, time, and token
            const newReservation = await makeReservationApi(id, soNguoi, thoiGian, token);
            alert(`Đặt bàn thành công! Mã đặt bàn: ${newReservation.id}`);
            navigate("/tables"); // Redirect back to the table list
        } catch (err) {
            alert("Đặt bàn thất bại. Vui lòng thử lại hoặc kiểm tra thông tin.");
        }
    };

    return (
        <div className="booking-container">
            <h2 className="page-title">Bàn số {id}</h2>

            <div className="card">
                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-row">
                        <label className="form-label">Số lượng người</label>
                        <select
                            className="input select"
                            value={soNguoi}
                            onChange={(e) => setSoNguoi(e.target.value)}
                        >
                            {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-row">
                        <label className="form-label">Thời gian</label>
                        <input
                            className="input datetime-input"
                            type="datetime-local"
                            value={thoiGian}
                            onChange={(e) => setThoiGian(e.target.value)}
                        />
                    </div>

                    <div className="actions">
                        <button type="submit" className="btn btn-primary">Đặt bàn</button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/tables")}
                        >
                            Thoát
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}