# 📘 IE213.Q21 – Xây dựng Frontend với ReactJS

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
| **Bài 1** | Kết nối Backend | Cài đặt `axios`, tạo `MovieDataService`, gọi API movies/reviews |
| **Bài 2** | Movies List | Tìm kiếm movie theo `title` và `rating`, hiển thị bằng `Card` |
| **Bài 3** | Movie Detail | Hiển thị thông tin chi tiết movie và điều hướng xem review |
| **Bài 4** | Reviews | Hiển thị danh sách review, thêm/sửa/xóa review và format thời gian với `moment` |

---

## 🧪 Lab 5 – Movie Reviews Frontend

### 🎯 Mục tiêu bài thực hành

- Kết nối frontend ReactJS với backend đã xây dựng ở `Lab03`
- Tổ chức mã nguồn theo component và service layer
- Sử dụng `axios`, `react-router-dom`, `react-bootstrap`, `moment`
- Tạo form tìm kiếm movie theo `title` và `rating`
- Hiển thị danh sách movie bằng `Card`
- Hiển thị trang chi tiết movie và danh sách review liên quan
- Thực hiện thêm, cập nhật, xóa review từ giao diện frontend

---

### 🛠️ Công cụ / Môi trường sử dụng

| Công cụ | Phiên bản / Thông tin |
|---------|-----------------------|
| **Node.js** | v20+ |
| **React** | v18 |
| **Vite** | v5 |
| **Axios** | Gọi REST API tới backend |
| **React Bootstrap** | Xây dựng giao diện |
| **React Router DOM** | Điều hướng trang |
| **Moment.js** | Định dạng ngày giờ review |
| **Hệ điều hành** | macOS |

---

### ▶️ Cách chạy chương trình

#### Bước 1: Khởi động backend từ Lab03

```bash
cd Lab03/backend
npm install
npm run dev
```

Backend mặc định chạy tại:

```text
http://localhost:3000/api/v1/movies
```

#### Bước 2: Cài đặt dependencies cho frontend

```bash
cd Lab05
npm install
```

#### Bước 3: Cấu hình biến môi trường

Tạo tệp `.env` trong thư mục `Lab05`:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1/movies
```

Có thể sao chép nhanh từ file mẫu:

```bash
cp .env.example .env
```

#### Bước 4: Chạy ứng dụng frontend

```bash
npm run dev
```

Mặc định Vite sẽ chạy tại:

```text
http://localhost:5173
```

---

## 📁 Cấu trúc thư mục

```text
Lab05/
├── .env.example
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── AddReview.jsx
    │   ├── Login.jsx
    │   ├── Movie.jsx
    │   └── MoviesList.jsx
    └── services/
        └── movies.js
```

---

## 📋 Chi tiết từng bài tập

### Bài 1: Kết nối tới Backend

#### ✅ 1.1 – Cài đặt axios cho dự án

```bash
npm install axios
```

#### ✅ 1.2 – Tạo lớp dịch vụ `MovieDataService`

Tệp `src/services/movies.js` được tạo để gom toàn bộ lời gọi API vào một nơi, giúp component không phải xử lý URL trực tiếp.

#### ✅ 1.3 – Các lời gọi dịch vụ đã hiện thực

```javascript
getAll(params)
get(id)
findByTitle(title, params)
findByRating(rated, params)
createReview(data)
updateReview(data)
deleteReview(data)
getRatings()
```

**Ánh xạ endpoint:**

| Method | Endpoint | Chức năng |
|--------|----------|-----------|
| `GET` | `/` | Lấy danh sách movie |
| `GET` | `/id/:id` | Lấy chi tiết một movie |
| `GET` | `/ratings` | Lấy danh sách ratings |
| `POST` | `/review` | Thêm review |
| `PUT` | `/review` | Cập nhật review |
| `DELETE` | `/review` | Xóa review |

---

### Bài 2: Xây dựng `MoviesList` Component

#### ✅ 2.1 – Các biến trạng thái sử dụng `useState()`

```javascript
const [movies, setMovies] = useState([]);
const [searchTitle, setSearchTitle] = useState("");
const [searchRating, setSearchRating] = useState("");
const [ratings, setRatings] = useState([]);
```

Ngoài ra có thêm:

```javascript
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
```

để xử lý trạng thái tải dữ liệu và lỗi gọi API.

#### ✅ 2.2 – `retrieveMovies()` và `retrieveRatings()`

Hai hàm này được gọi trong `useEffect()` sau khi giao diện render lần đầu:

```javascript
useEffect(() => {
  retrieveMovies();
  retrieveRatings();
}, []);
```

#### ✅ 2.3 – Hai search form

- Form nhập `title`
- Form chọn `rating`

#### ✅ 2.4 – Hiển thị movie bằng `Card`

Mỗi movie được render bằng `Card` của `react-bootstrap`, gồm:

- `title`
- `rated`
- `plot`
- nút `View Reviews`

#### ✅ 2.5 – `findByTitle()` và `findByRating()`

Hai hàm tìm kiếm gọi về backend thông qua `MovieDataService`, sau đó cập nhật lại danh sách movie trong state.

---

### Bài 3: Hiển thị trang movie khi nhấn `View Reviews`

#### ✅ 3.1 – State `movie`

Component `Movie.jsx` sử dụng:

```javascript
const [movie, setMovie] = useState(null);
```

để lưu thông tin chi tiết movie gồm:

- `_id`
- `title`
- `rated`
- `plot`
- `reviews`

#### ✅ 3.2 – Phương thức `getMovie()`

Component gọi:

```javascript
MovieDataService.get(id)
```

để lấy chi tiết movie từ endpoint:

```text
GET /api/v1/movies/id/:id
```

#### ✅ 3.3 – Giao diện trang chi tiết

Trang movie detail hiển thị:

- tên phim
- rating
- runtime / year nếu có
- phần `plot`
- nút `Add Review`
- danh sách review ngay bên dưới phần plot

---

### Bài 4: Hiển thị danh sách review tương ứng cho từng phim

#### ✅ 4.1 – JSX hiển thị review

Danh sách review được render bằng `.map()` trên `movie.reviews`.

Mỗi review gồm:

- tên người review
- nội dung review
- thời gian tạo / cập nhật

#### ✅ 4.2 – Thêm review

Có thể thêm review từ:

- Postman / Insomnia theo yêu cầu đề bài
- hoặc trực tiếp từ giao diện sau khi đăng nhập local

Thông tin đăng nhập chỉ dùng ở frontend để giả lập người dùng:

- `name`
- `user_id`

#### ✅ 4.3 – Định dạng thời gian với `moment`

Thời gian review được hiển thị bằng:

```javascript
moment(review.date).format("DD/MM/YYYY HH:mm")
```

Ví dụ:

```text
05/05/2026 22:30
```

---

## 🔄 Luồng sử dụng ứng dụng

1. Mở trang chủ để xem danh sách movie.
2. Tìm movie theo `title` hoặc `rating`.
3. Nhấn `View Reviews` để xem chi tiết movie.
4. Đăng nhập local bằng tên và MSSV ở trang `Login`.
5. Thêm review mới hoặc chỉnh sửa/xóa review của chính mình.

---

## ✅ Kết quả đạt được

- Frontend ReactJS đã kết nối thành công với backend từ các lab trước
- Có service layer riêng để gọi API bằng `axios`
- Có form tìm kiếm theo `title` và `rating`
- Có trang chi tiết movie
- Có danh sách review liên quan đến từng movie
- Có định dạng thời gian review bằng `moment`
- Có thể thêm/sửa/xóa review từ giao diện

---

## ⚠️ Lưu ý

- Backend phải chạy trước thì frontend mới lấy được dữ liệu.
- Nếu backend không chạy ở `localhost:3000`, cần cập nhật lại `VITE_API_BASE_URL` trong `.env`.
- `Switch` trong tài liệu cũ của React Router đã được thay bằng `Routes` trong `react-router-dom` v6. Đây là cách làm hiện đại và tương thích tốt hơn.
