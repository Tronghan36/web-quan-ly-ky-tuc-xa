import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiHome, FiUsers, FiDoor, FiFileText, FiAlertCircle, FiLogOut } from 'react-icons/fi';
import { logout } from '../redux/slices/authSlice';

function Sidebar() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="sidebar">
      <h2 style={{ marginBottom: '30px', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
        🏫 Dorm System
      </h2>

      <nav style={{ marginBottom: '40px' }}>
        <ul className="nav-menu">
          <li><Link to="/"><FiHome /> Dashboard</Link></li>
          {user?.role === 'admin' && (
            <>
              <li><Link to="/students"><FiUsers /> Sinh Viên</Link></li>
              <li><Link to="/rooms"><FiDoor /> Phòng</Link></li>
              <li><Link to="/invoices"><FiFileText /> Hóa Đơn</Link></li>
              <li><Link to="/violations"><FiAlertCircle /> Vi Phạm</Link></li>
            </>
          )}
        </ul>
      </nav>

      <div style={{ borderTop: '1px solid #555', paddingTop: '20px' }}>
        <p style={{ marginBottom: '10px', fontSize: '0.9rem' }}>👤 {user?.name}</p>
        <p style={{ marginBottom: '20px', fontSize: '0.85rem', color: '#bbb' }}>{user?.role}</p>
        <button onClick={handleLogout} className="btn btn-danger" style={{ width: '100%' }}>
          <FiLogOut /> Đăng Xuất
        </button>
      </div>
    </div>
  );
}

export default Sidebar;