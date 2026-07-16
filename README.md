# 🏫 Hệ Thống Quản Lý Ký Túc Xá Sinh Viên

Ứng dụng web toàn diện để quản lý ký túc xá, sinh viên, phòng, hóa đơn và các vi phạm.

## 🚀 Tính Năng Chính

- **Quản Lý Sinh Viên**: Thêm, sửa, xóa, tìm kiếm thông tin sinh viên
- **Quản Lý Phòng**: Quản lý các phòng ký túc xá, sức chứa, trạng thái
- **Phân Công Phòng**: Gán sinh viên vào phòng
- **Quản Lý Hóa Đơn**: Theo dõi tiền phòng, điện nước
- **Quản Lý Vi Phạm**: Ghi nhận kỷ luật sinh viên
- **Dashboard**: Thống kê tổng hợp
- **Xác Thực**: Đăng nhập/đăng xuất với JWT

## 🛠️ Tech Stack

### Frontend
- React 18+
- Redux Toolkit (State Management)
- Axios (HTTP Client)
- React Router v6
- React Icons

### Backend
- Node.js + Express.js
- MongoDB
- JWT Authentication
- Bcryptjs (Password Hashing)
- Joi (Validation)
- CORS

## 📋 Cấu Trúc Dự Án

```
web-quan-ly-ky-tuc-xa/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🏃 Hướng Dẫn Cài Đặt

### Bước 1: Cài Đặt Backend
```bash
cd backend
npm install
cp .env.example .env
npm start
```

### Bước 2: Cài Đặt Frontend
```bash
cd frontend
npm install
npm start
```

Backend: http://localhost:5000
Frontend: http://localhost:3000

## 🔐 Tài Khoản Demo

- Email: `admin@example.com`
- Password: `123456`

## 📝 License

MIT License