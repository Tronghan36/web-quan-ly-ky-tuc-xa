import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
    phone: '',
    gender: 'Male',
    dateOfBirth: '',
    major: '',
    status: 'Active'
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
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
        await api.put(`/students/${editingId}`, formData);
        alert('Cập nhật thành công!');
      } else {
        await api.post('/students', formData);
        alert('Thêm sinh viên thành công!');
      }
      setFormData({
        studentId: '',
        name: '',
        email: '',
        phone: '',
        gender: 'Male',
        dateOfBirth: '',
        major: '',
        status: 'Active'
      });
      setEditingId(null);
      setShowForm(false);
      fetchStudents();
    } catch (error) {
      alert('Lỗi: ' + (error.response?.data?.message || 'Đã xảy ra lỗi'));
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditingId(student._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa?')) {
      try {
        await api.delete(`/students/${id}`);
        alert('Xóa thành công!');
        fetchStudents();
      } catch (error) {
        alert('Lỗi: ' + error.response?.data?.message);
      }
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>👥 Quản Lý Sinh Viên</h1>

      <button
        className="btn btn-primary"
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({
            studentId: '',
            name: '',
            email: '',
            phone: '',
            gender: 'Male',
            dateOfBirth: '',
            major: '',
            status: 'Active'
          });
        }}
      >
        + Thêm Sinh Viên
      </button>

      {showForm && (
        <div className="card" style={{ marginTop: '20px' }}>
          <h2>{editingId ? 'Sửa' : 'Thêm'} Sinh Viên</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <label>Mã Sinh Viên</label>
                <input name="studentId" value={formData.studentId} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Tên</label>
                <input name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Điện Thoại</label>
                <input name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Giới Tính</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Ngày Sinh</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Chuyên Ngành</label>
                <input name="major" value={formData.major} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Trạng Thái</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Graduated</option>
                </select>
              </div>
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
              <th>Mã SV</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Điện Thoại</th>
              <th>Chuyên Ngành</th>
              <th>Trạng Thái</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.major}</td>
                <td>{student.status}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(student)} style={{ marginRight: '5px' }}>
                    Sửa
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(student._id)}>
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

export default Students;