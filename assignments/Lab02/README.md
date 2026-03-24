# 📘 IE213.Q21 – Xây dựng Backend với Node.js, Express và MongoDB

---

## 👤 Thông tin sinh viên

| Thông tin | Chi tiết |
|-----------|----------|
| **Họ và tên** | Dương Phước Thịnh |
| **MSSV** | 23521497 |
| **Lớp** | IE213.Q21 |
| **Trường** | Đại học Công nghệ Thông tin – ĐHQG TP.HCM (UIT) |

---

## 📚 Danh sách các bài tập

| Bài | Tên | Mô tả |
|-----|-----|-------|
| **Bài 1** | Thiết lập môi trường | Cài đặt Node.js, khởi tạo dự án, cài đặt dependencies |
| **Bài 2** | Xây dựng Backend | Tạo server, kết nối MongoDB, DAO, Controller, Route |

---

## 🧪 Lab 2 – Xây dựng Backend Movie Reviews

### 🎯 Mục tiêu bài thực hành

- Thiết lập môi trường phát triển Node.js
- Xây dựng máy chủ web với Express.js
- Kết nối cơ sở dữ liệu MongoDB Atlas
- Áp dụng mô hình DAO – Controller – Route
- Truy xuất dữ liệu từ collection `movies` trên `sample_mflix`

---

### 🛠️ Công cụ / Môi trường sử dụng

| Công cụ | Phiên bản / Thông tin |
|---------|-----------------------|
| **Node.js** | v20.20.1 |
| **Express** | v5.2.1 |
| **MongoDB Driver** | v7.1.0 |
| **Database** | MongoDB Atlas – `sample_mflix` |
| **Hệ điều hành** | macOS |

---

### ▶️ Cách chạy chương trình

#### Bước 1: Cài đặt dependencies

```bash
cd Lab02/backend
npm install
```

#### Bước 2: Cấu hình biến môi trường

Chỉnh sửa tệp `.env` trong thư mục `backend`:

```env
MONGODB_URI=mongodb+srv://nouu188:1@cluster.mongodb.net
PORT=3000
```

#### Bước 3: Chạy máy chủ

```bash
# Chế độ development (tự động restart khi thay đổi code)
npm run dev

# Hoặc chế độ production
npm start
```

#### Bước 4: Truy cập API

Mở trình duyệt hoặc dùng công cụ như Postman:

```
http://localhost:3000/api/v1/movies
```

---

### 📋 Chi tiết từng bài tập

---

### Bài 1: Thiết lập môi trường

#### ✅ 1.1 – Kiểm tra cài đặt Node.js

```bash
node -v
# v20.20.1
```

#### ✅ 1.2 – Công cụ soạn thảo

Sử dụng **Visual Studio Code**.

#### ✅ 1.3 – Khởi tạo cây thư mục

```
Lab02/
└── backend/
```

#### ✅ 1.4 – Khởi tạo dự án

```bash
cd Lab02/backend
npm init -y
```

#### ✅ 1.5 – Cài đặt dependencies

```bash
npm install express cors dotenv mongodb
```

| Package | Mục đích |
|---------|----------|
| **express** | Framework xây dựng web server |
| **cors** | Middleware xử lý Cross-Origin Resource Sharing |
| **dotenv** | Quản lý biến môi trường từ tệp `.env` |
| **mongodb** | Driver kết nối MongoDB |

#### ✅ 1.6 – Cài đặt nodemon

```bash
npm install --save-dev nodemon
```

> **Mục đích:** Tự động restart server khi có thay đổi mã nguồn.

---

### Bài 2: Xây dựng Backend

#### ✅ 2.1 – Tạo `server.js`

```javascript
import express from "express";
import cors from "cors";
import movies from "./api/movies.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/movies", movies);

app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
```

> **Mục đích:** Khởi tạo Express app, thêm middleware `cors` và `express.json()`, định tuyến `/api/v1/movies`, xử lý lỗi 404.

---

#### ✅ 2.2 – Tạo tệp `.env`

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sample_mflix?retryWrites=true&w=majority
PORT=3000
```

> **Mục đích:** Lưu trữ thông tin kết nối MongoDB Atlas và cổng dịch vụ web.

---

#### ✅ 2.3 – Tạo `index.js`

```javascript
import "dotenv/config";
import { MongoClient } from "mongodb";
import app from "./server.js";
import MoviesDAO from "./dao/moviesDAO.js";

const port = process.env.PORT || 3000;

MongoClient.connect(process.env.MONGODB_URI)
  .then(async (client) => {
    await MoviesDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
```

> **Mục đích:** Kết nối MongoDB Atlas → gọi `MoviesDAO.injectDB()` → khởi chạy server.

---

#### ✅ 2.4 – Tạo `api/movies.route.js`

```javascript
import express from "express";
import MoviesController from "./movies.controller.js";

const router = express.Router();

router.route("/").get(MoviesController.apiGetMovies);

export default router;
```

> **Mục đích:** Định tuyến GET `/` (tương ứng `/api/v1/movies/`) tới `MoviesController.apiGetMovies`.

---

#### ✅ 2.5 – Tạo `dao/moviesDAO.js`

```javascript
let movies;

export default class MoviesDAO {
  static async injectDB(conn) {
    if (movies) return;
    try {
      movies = await conn.db("sample_mflix").collection("movies");
    } catch (e) {
      console.error(`Unable to establish collection handle in moviesDAO: ${e}`);
    }
  }

  static async getMovies({ filters = null, page = 0, moviesPerPage = 20 } = {}) {
    let query = {};
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters["title"] } };
      } else if ("rated" in filters) {
        query = { rated: { $eq: filters["rated"] } };
      }
    }

    let cursor;
    try {
      cursor = movies.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { moviesList: [], totalNumMovies: 0 };
    }

    const displayCursor = cursor.limit(moviesPerPage).skip(moviesPerPage * page);

    try {
      const moviesList = await displayCursor.toArray();
      const totalNumMovies = await movies.countDocuments(query);
      return { moviesList, totalNumMovies };
    } catch (e) {
      console.error(`Unable to convert cursor to array, ${e}`);
      return { moviesList: [], totalNumMovies: 0 };
    }
  }
}
```

> **Mục đích:**
> - `injectDB()`: Tham chiếu tới collection `movies` trên database `sample_mflix`
> - `getMovies()`: Trả về danh sách phim với phân trang (mặc định: trang 0, 20 phim/trang)

---

#### ✅ 2.6 – Tạo `api/movies.controller.js`

```javascript
import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {
  static async apiGetMovies(req, res, next) {
    const moviesPerPage = req.query.moviesPerPage
      ? parseInt(req.query.moviesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.rated) {
      filters.rated = req.query.rated;
    } else if (req.query.title) {
      filters.title = req.query.title;
    }

    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      moviesPerPage,
    });

    let response = {
      movies: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    };

    res.json(response);
  }
}
```

> **Mục đích:** Tiếp nhận request từ client, trích xuất query parameters, gọi `MoviesDAO.getMovies()` và trả về JSON response.

---

#### ✅ 2.7 – Tích hợp Controller vào Route

Đã thực hiện trong `movies.route.js`:

```javascript
router.route("/").get(MoviesController.apiGetMovies);
```

> **Kết quả:** Khi client truy cập `GET http://localhost:3000/api/v1/movies/`, server gọi `apiGetMovies()` và trả về JSON chứa danh sách phim.

---

### 📊 Tổng kết kết quả thực hiện

| Bài | Nội dung | Trạng thái |
|-----|----------|-----------|
| 1.1 | Cài đặt Node.js v20.20.1 | ✅ Hoàn thành |
| 1.2 | Sử dụng Visual Studio Code | ✅ Hoàn thành |
| 1.3 | Khởi tạo cây thư mục `Lab02/backend` | ✅ Hoàn thành |
| 1.4 | Khởi tạo dự án với `npm init` | ✅ Hoàn thành |
| 1.5 | Cài đặt express, cors, dotenv, mongodb | ✅ Hoàn thành |
| 1.6 | Cài đặt nodemon | ✅ Hoàn thành |
| 2.1 | Tạo `server.js` với Express, CORS, routing | ✅ Hoàn thành |
| 2.2 | Tạo `.env` với MONGODB_URI và PORT | ✅ Hoàn thành |
| 2.3 | Tạo `index.js` kết nối DB và khởi chạy server | ✅ Hoàn thành |
| 2.4 | Tạo `api/movies.route.js` định tuyến | ✅ Hoàn thành |
| 2.5 | Tạo `dao/moviesDAO.js` với injectDB, getMovies | ✅ Hoàn thành |
| 2.6 | Tạo `api/movies.controller.js` với apiGetMovies | ✅ Hoàn thành |
| 2.7 | Tích hợp Controller vào Route | ✅ Hoàn thành |

---

### 🗂️ Cấu trúc thư mục

```
Lab02/
├── README.md
└── backend/
    ├── package.json
    ├── .env
    ├── index.js
    ├── server.js
    ├── api/
    │   ├── movies.route.js
    │   └── movies.controller.js
    └── dao/
        └── moviesDAO.js
```

---

### 📌 Những nội dung đã hoàn thành

- [x] Thiết lập môi trường Node.js và các dependencies
- [x] Xây dựng Express server với middleware (CORS, JSON parser)
- [x] Kết nối MongoDB Atlas với `sample_mflix` database
- [x] Triển khai mô hình DAO (Data Access Object) cho Movies
- [x] Tạo Controller xử lý logic nghiệp vụ
- [x] Định tuyến API: `GET /api/v1/movies`
- [x] Hỗ trợ phân trang và bộ lọc (title, rated)
