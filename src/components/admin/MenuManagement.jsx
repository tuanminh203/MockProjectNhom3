import "../../styles/MenuManagement.css";

export default function MenuManagement() {
  const menus = [
    { id: 1, category_id: 101, name: "Phở Bò", description: "Phở truyền thống Việt Nam", price: 50000, image_url: "/uploads/pho-bo.jpg" },
    { id: 2, category_id: 102, name: "Bún Chả", description: "Bún chả Hà Nội", price: 60000, image_url: "/uploads/bun-cha.jpg" },
  ];

  const handleEdit = (id) => {
    alert(`Sửa món ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Xóa món ID: ${id}`);
  };

  const handleAdd = () => {
    alert("Thêm món mới");
  };

  return (
    <div className="menu-management">
      <h2>Quản lý menu</h2>
      <button className="add-btn" onClick={handleAdd}>➕ Thêm món</button>
      <table className="menu-table">
        <thead>
          <tr>
            <th>ID</th><th>Category ID</th><th>Tên món</th><th>Mô tả</th>
            <th>Giá (VNĐ)</th><th>Hình ảnh</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td><td>{m.category_id}</td><td>{m.name}</td>
              <td>{m.description}</td><td>{m.price.toLocaleString()}</td>
              <td><img src={m.image_url} alt={m.name} className="menu-img" /></td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(m.id)}>✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(m.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
