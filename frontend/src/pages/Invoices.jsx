import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await api.get('/invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>📋 Quản Lý Hóa Đơn</h1>

      {loading ? (
        <p>Đang tải...</p>
      ) : invoices.length === 0 ? (
        <p>Chưa có hóa đơn nào.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Số Hóa Đơn</th>
              <th>Sinh Viên</th>
              <th>Phòng</th>
              <th>Tháng</th>
              <th>Tổng Tiền</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice._id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.student?.name || 'N/A'}</td>
                <td>{invoice.room?.roomNumber || 'N/A'}</td>
                <td>{new Date(invoice.month).toLocaleDateString('vi-VN')}</td>
                <td>{invoice.totalAmount?.toLocaleString()} VND</td>
                <td>{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Invoices;