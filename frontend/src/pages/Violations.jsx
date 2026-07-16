import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Violations() {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchViolations();
  }, []);

  const fetchViolations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/violations');
      setViolations(response.data);
    } catch (error) {
      console.error('Error fetching violations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>⚠️ Quản Lý Vi Phạm</h1>

      {loading ? (
        <p>Đang tải...</p>
      ) : violations.length === 0 ? (
        <p>Chưa có vi phạm nào.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sinh Viên</th>
              <th>Loại Vi Phạm</th>
              <th>Mô Tả</th>
              <th>Mức Độ</th>
              <th>Phạt</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {violations.map(violation => (
              <tr key={violation._id}>
                <td>{violation.student?.name || 'N/A'}</td>
                <td>{violation.violationType}</td>
                <td>{violation.description}</td>
                <td>{violation.severity}</td>
                <td>{violation.penalty?.toLocaleString()} VND</td>
                <td>{violation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Violations;