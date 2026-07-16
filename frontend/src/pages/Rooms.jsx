import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: '',
    floor: '',
    capacity: '',
    type: 'Double',
    price: '',
    status: 'Available',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await api.get('/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/rooms/${editingId}`, formData);
        alert('Cập nhật thành công!');
      } else {
        await api.post('/rooms', formData);
        alert('Thêm phòng thành công!');
      }
      setFormData({
        roomNumber: '',
        floor: '',
        capacity: '',
        type: 'Double',
        price: '',
        status: 'Available',
        description: ''
      });
      setEditingId(null);
      setShowForm(false);
      fetchRooms();
    } catch (error) {
      alert('Lỗi: ' + (error.response?.data?.message || 'Đã xảy ra lỗi'));
    }
  };

  const handleEdit = (room) => {
    setFormData(room);
    setEditingId(room._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa?')) {
      try {
        await api.delete(`/rooms/${id}`);
        alert('Xóa thành công!');
        fetchRooms();
      } catch (error) {
        alert('Lỗi: ' + error.response?.data?.message);
      }
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>🚪 Quản Lý Phòng</h1>

      <button
        className="btn btn-primary"
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({
            roomNumber: '',
            floor: '',
            capacity: '',
            type: 'Double',
            price: '',
            status: 'Available',
            description: ''
          });
        }}
      >
        + Thêm Phòng
      </button>

      {showForm && (
        <div className="card" style={{ marginTop: '20px' }}>
          <h2>{editingId ? 'Sửa' : 'Thêm'} Phòng</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <label>Số Phòng</label>
                <input name="roomNumber" value={formData.roomNumber} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Tầng</label>
                <input type="number" name="floor" value={formData.floor} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Sức Chứa</label>
                <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Loại Phòng</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                  <option>Single</option>
                  <option>Double</option>
                  <option>Triple</option>
                  <option>Quad</option>
                </select>
              </div>
              <div className="form-group">
                <label>Giá</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Trạng Thái</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option>Available</option>
                  <option>Full</option>
                  <option>Maintenance</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Mô Tả</label>
              <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-success">Lưu</button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)} style={{ marginLeft: '10px' }}>
              Hủy
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Số Phòng</th>
              <th>Tầng</th>
              <th>Loại</th>
              <th>Sức Chứa</th>
              <th>Giá</th>
              <th>Trạng Thái</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room._id}>
                <td>{room.roomNumber}</td>
                <td>{room.floor}</td>
                <td>{room.type}</td>
                <td>{room.capacity}</td>
                <td>{room.price.toLocaleString()} VND</td>
                <td>{room.status}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(room)} style={{ marginRight: '5px' }}>
                    Sửa
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(room._id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Rooms;