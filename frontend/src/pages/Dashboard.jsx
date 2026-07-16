import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({ students: 0, rooms: 0, invoices: 0, violations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [studentsRes, roomsRes, invoicesRes, violationsRes] = await Promise.all([
        api.get('/students'),
        api.get('/rooms'),
        api.get('/invoices'),
        api.get('/violations')
      ]);

      setStats({
        students: studentsRes.data.length,
        rooms: roomsRes.data.length,
        invoices: invoicesRes.data.length,
        violations: violationsRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>📊 Dashboard</h1>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-value">{stats.students}</div>
            <div className="stat-label">Sinh Viên</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.rooms}</div>
            <div className="stat-label">Phòng</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.invoices}</div>
            <div className="stat-label">Hóa Đơn</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.violations}</div>
            <div className="stat-label">Vi Phạm</div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">📌 Thông Tin Hệ Thống</div>
        <p>Chào mừng đến với hệ thống quản lý ký túc xá!</p>
        <p>Sử dụng menu bên trái để quản lý các dữ liệu khác nhau.</p>
      </div>
    </div>
  );
}

export default Dashboard;