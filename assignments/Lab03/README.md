# 📘 IE213.Q21 – Hoàn thiện Backend: Reviews API và Movie Lookup

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
| **Bài 1** | Định tuyến Review | Thêm route `/review` (POST, PUT, DELETE) vào `movies.route.js` |
| **Bài 2** | Controller Review | Tạo `ReviewsController` với `apiPostReview`, `apiUpdateReview`, `apiDeleteReview` |
| **Bài 3** | DAO Review | Tạo `ReviewsDAO` với `addReview`, `updateReview`, `deleteReview` |
| **Bài 4** | Hoàn thiện Backend | Thêm route, controller, DAO cho `getMovieById` và `getRatings` |

---

## 🧪 Lab 3 – Reviews API & Movie Detail Lookup

### 🎯 Mục tiêu bài thực hành

- Mở rộng backend từ Lab 2 với tính năng CRUD cho `reviews`
- Áp dụng mô hình DAO – Controller – Route cho một collection mới (`reviews`)
- Sử dụng `aggregate()` với `$match` và `$lookup` để truy vấn dữ liệu liên collection
- Hoàn thiện API backend cho ứng dụng Movie Reviews

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
cd Lab03/backend
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

```
GET    http://localhost:3000/api/v1/movies
GET    http://localhost:3000/api/v1/movies/ratings
GET    http://localhost:3000/api/v1/movies/id/:id
POST   http://localhost:3000/api/v1/movies/review
PUT    http://localhost:3000/api/v1/movies/review
DELETE http://localhost:3000/api/v1/movies/review
```

---

### 📋 Chi tiết từng bài tập

---

### Bài 1: Thiết lập định tuyến cho Review

#### ✅ 1.1 – Đường dẫn `/review`

Định tuyến được gắn vào `/api/v1/movies/review` thông qua `movies.route.js`.

#### ✅ 1.2 – POST `/review` – Thêm review

```javascript
router.route("/review").post(ReviewsController.apiPostReview)
```

#### ✅ 1.3 – PUT `/review` – Sửa review

```javascript
.put(ReviewsController.apiUpdateReview)
```

#### ✅ 1.4 – DELETE `/review` – Xoá review

```javascript
.delete(ReviewsController.apiDeleteReview);
```

**Nội dung đầy đủ `api/movies.route.js`:**

```javascript
import express from "express";
import MoviesController from "./movies.controller.js";
import ReviewsController from "./reviews.controller.js";

const router = express.Router();

router.route("/").get(MoviesController.apiGetMovies);
router.route("/ratings").get(MoviesController.apiGetRatings);
router.route("/id/:id").get(MoviesController.apiGetMovieById);
router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

export default router;
```

---

### Bài 2: Thiết lập Controller cho Review

#### ✅ 2.1 & 2.2 – Tạo `api/reviews.controller.js`

```javascript
import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController { ... }
```

#### ✅ 2.3 – `apiPostReview()`

Nhận `movie_id`, `review`, `name`, `user_id` từ `req.body`. Tạo `date` hiện tại, gọi `ReviewsDAO.addReview()`.

```javascript
static async apiPostReview(req, res, next) {
  try {
    const movieId = req.body.movie_id;
    const review = req.body.review;
    const userInfo = {
      name: req.body.name,
      id: req.body.user_id,
    };
    const date = new Date();

    await ReviewsDAO.addReview(movieId, userInfo, review, date);
    res.json({ status: "success" });
  } catch (e) {
    console.error(`apiPostReview error: ${e}`);
    res.status(500).json({ error: e.message });
  }
}
```

**Ví dụ request body (Insomnia/Postman):**

```json
{
  "movie_id": "573a1390f29313caabcd4135",
  "review": "Phim rất hay!",
  "name": "Dương Phước Thịnh",
  "user_id": "23521497"
}
```

#### ✅ 2.4 – `apiUpdateReview()`

Nhận `review_id`, `review`, `user_id` từ `req.body`. Kiểm tra `modifiedCount` để xác nhận cập nhật thành công.

```javascript
static async apiUpdateReview(req, res, next) {
  try {
    const reviewId = req.body.review_id;
    const review = req.body.review;
    const userId = req.body.user_id;
    const date = new Date();

    const ReviewResponse = await ReviewsDAO.updateReview(reviewId, userId, review, date);

    const { modifiedCount } = ReviewResponse;
    if (modifiedCount === 0) {
      throw new Error("unable to update review - user may not be original poster");
    }

    res.json({ status: "success" });
  } catch (e) {
    console.error(`apiUpdateReview error: ${e}`);
    res.status(500).json({ error: e.message });
  }
}
```

**Ví dụ request body:**

```json
{
  "review_id": "<_id của review>",
  "review": "Phim rất hay, đáng xem!",
  "user_id": "23521497"
}
```

#### ✅ 2.5 – `apiDeleteReview()`

Nhận `review_id`, `user_id` từ `req.body`. Gọi `ReviewsDAO.deleteReview()`.

```javascript
static async apiDeleteReview(req, res, next) {
  try {
    const reviewId = req.body.review_id;
    const userId = req.body.user_id;

    await ReviewsDAO.deleteReview(reviewId, userId);
    res.json({ status: "success" });
  } catch (e) {
    console.error(`apiDeleteReview error: ${e}`);
    res.status(500).json({ error: e.message });
  }
}
```

**Ví dụ request body:**

```json
{
  "review_id": "<_id của review>",
  "user_id": "23521497"
}
```

---

### Bài 3: Thiết lập DAO cho Reviews

#### ✅ 3.1 – Tạo `dao/reviewsDAO.js`

Import `mongodb` và khai báo `ObjectId`:

```javascript
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;
```

#### ✅ 3.2 – `injectDB()`

Kết nối tới collection `reviews` trong `sample_mflix`. Được gọi trong `index.js` sau khi kết nối MongoDB và trước khi khởi động server.

```javascript
static async injectDB(conn) {
  if (reviews) return;
  try {
    reviews = await conn.db("sample_mflix").collection("reviews");
  } catch (e) {
    console.error(`Unable to establish collection handle in reviewsDAO: ${e}`);
  }
}
```

**Cập nhật `index.js` để gọi `ReviewsDAO.injectDB()`:**

```javascript
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

MongoClient.connect(process.env.MONGODB_URI)
  .then(async (client) => {
    await MoviesDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);   // phải sau kết nối, trước khi start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
```

#### ✅ 3.3 – `addReview()`

Chuyển `movieId` thành `ObjectId` trước khi lưu:

```javascript
static async addReview(movieId, user, review, date) {
  try {
    const reviewDoc = {
      name: user.name,
      user_id: user.id,
      date,
      review,
      movie_id: new ObjectId(movieId),
    };
    return await reviews.insertOne(reviewDoc);
  } catch (e) {
    console.error(`Unable to post review: ${e}`);
    throw e;
  }
}
```

#### ✅ 3.4 – `updateReview()`

Filter theo `_id` (ObjectId) và `user_id` để đảm bảo chỉ người tạo mới được sửa:

```javascript
static async updateReview(reviewId, userId, review, date) {
  try {
    const updateResponse = await reviews.updateOne(
      { user_id: userId, _id: new ObjectId(reviewId) },
      { $set: { review, date } }
    );
    return updateResponse;
  } catch (e) {
    console.error(`Unable to update review: ${e}`);
    throw e;
  }
}
```

#### ✅ 3.5 – `deleteReview()`

Filter theo `_id` (ObjectId) và `user_id` để đảm bảo chỉ người tạo mới được xoá:

```javascript
static async deleteReview(reviewId, userId) {
  try {
    const deleteResponse = await reviews.deleteOne({
      _id: new ObjectId(reviewId),
      user_id: userId,
    });
    return deleteResponse;
  } catch (e) {
    console.error(`Unable to delete review: ${e}`);
    throw e;
  }
}
```

#### ✅ 3.6 – Thử nghiệm API

Dùng Insomnia để kiểm tra các API (lưu ý `user_id` phải là MSSV: `23521497`):

| Method | URL | Body (JSON) |
|--------|-----|-------------|
| POST | `http://localhost:3000/api/v1/movies/review` | `{ "movie_id": "...", "review": "...", "name": "Dương Phước Thịnh", "user_id": "23521497" }` |
| PUT | `http://localhost:3000/api/v1/movies/review` | `{ "review_id": "...", "review": "...", "user_id": "23521497" }` |
| DELETE | `http://localhost:3000/api/v1/movies/review` | `{ "review_id": "...", "user_id": "23521497" }` |

---

### Bài 4: Hoàn thành Back-end

#### ✅ 4.1 – Thêm 2 định tuyến mới

```javascript
router.route("/ratings").get(MoviesController.apiGetRatings);
router.route("/id/:id").get(MoviesController.apiGetMovieById);
```

#### ✅ 4.2 – Thêm 2 phương thức Controller

**`apiGetMovieById()`** – Lấy thông tin phim và toàn bộ review theo `id`:

```javascript
static async apiGetMovieById(req, res, next) {
  try {
    const id = req.params.id || {};
    const movie = await MoviesDAO.getMovieById(id);
    if (!movie) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(movie);
  } catch (e) {
    console.error(`apiGetMovieById error: ${e}`);
    res.status(500).json({ error: e.message });
  }
}
```

**`apiGetRatings()`** – Lấy tất cả các loại rating:

```javascript
static async apiGetRatings(req, res, next) {
  try {
    const ratings = await MoviesDAO.getRatings();
    res.json(ratings);
  } catch (e) {
    console.error(`apiGetRatings error: ${e}`);
    res.status(500).json({ error: e.message });
  }
}
```

#### ✅ 4.3 – Thêm 2 phương thức DAO

**`getMovieById()`** – Dùng `aggregate()` với `$match` và `$lookup` để JOIN collection `reviews`:

```javascript
static async getMovieById(id) {
  try {
    const pipeline = [
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "movie_id",
          as: "reviews",
        },
      },
    ];
    return await movies.aggregate(pipeline).next();
  } catch (e) {
    console.error(`Something went wrong in getMovieById: ${e}`);
    throw e;
  }
}
```

> **Mục đích:** `$match` lọc phim theo `_id`, `$lookup` giống khóa ngoại trong SQL – nối dữ liệu từ collection `reviews` vào kết quả.

**`getRatings()`** – Lấy danh sách các giá trị `rated` phân biệt:

```javascript
static async getRatings() {
  try {
    const ratings = await movies.distinct("rated");
    return ratings;
  } catch (e) {
    console.error(`Unable to get ratings, ${e}`);
    throw e;
  }
}
```

#### ✅ 4.4 – Thử nghiệm API

| Method | URL | Mô tả |
|--------|-----|-------|
| GET | `http://localhost:3000/api/v1/movies/ratings` | Lấy tất cả loại rating |
| GET | `http://localhost:3000/api/v1/movies/id/573a1390f29313caabcd4135` | Lấy phim + reviews theo ID |

---

### 📊 Tổng kết kết quả thực hiện

| Bài | Nội dung | Trạng thái |
|-----|----------|-----------|
| 1.1 | Định tuyến `/review` | ✅ Hoàn thành |
| 1.2 | POST `/review` → `apiPostReview` | ✅ Hoàn thành |
| 1.3 | PUT `/review` → `apiUpdateReview` | ✅ Hoàn thành |
| 1.4 | DELETE `/review` → `apiDeleteReview` | ✅ Hoàn thành |
| 2.1 | Tạo `reviews.controller.js` với `ReviewsController` | ✅ Hoàn thành |
| 2.2 | Import `ReviewsDAO` trong controller | ✅ Hoàn thành |
| 2.3 | `apiPostReview()` – thêm review | ✅ Hoàn thành |
| 2.4 | `apiUpdateReview()` – sửa review với `modifiedCount` | ✅ Hoàn thành |
| 2.5 | `apiDeleteReview()` – xoá review | ✅ Hoàn thành |
| 3.1 | Tạo `reviewsDAO.js`, import `mongodb`, khai báo `ObjectId` | ✅ Hoàn thành |
| 3.2 | `injectDB()` kết nối collection `reviews` | ✅ Hoàn thành |
| 3.3 | `addReview()` với `insertOne()` và chuyển đổi `ObjectId` | ✅ Hoàn thành |
| 3.4 | `updateReview()` với `updateOne()`, kiểm tra `user_id` | ✅ Hoàn thành |
| 3.5 | `deleteReview()` với `deleteOne()`, kiểm tra `user_id` | ✅ Hoàn thành |
| 3.6 | Thử nghiệm API với Insomnia | ✅ Hoàn thành |
| 4.1 | Thêm 2 route: `/ratings` và `/id/:id` | ✅ Hoàn thành |
| 4.2 | `apiGetMovieById()` và `apiGetRatings()` trong controller | ✅ Hoàn thành |
| 4.3 | `getMovieById()` (aggregate + lookup) và `getRatings()` trong DAO | ✅ Hoàn thành |
| 4.4 | Thử nghiệm API với Insomnia | ✅ Hoàn thành |

---

### 🗂️ Cấu trúc thư mục

```
Lab03/
├── README.md
└── backend/
    ├── package.json
    ├── .env
    ├── index.js
    ├── server.js
    ├── api/
    │   ├── movies.route.js
    │   ├── movies.controller.js
    │   └── reviews.controller.js
    └── dao/
        ├── moviesDAO.js
        └── reviewsDAO.js
```

---

### 📌 Những nội dung đã hoàn thành

- [x] Mở rộng `movies.route.js` với route `/review` (POST, PUT, DELETE) và `/ratings`, `/id/:id`
- [x] Tạo `ReviewsController` xử lý logic thêm / sửa / xoá review
- [x] Tạo `ReviewsDAO` tương tác với collection `reviews` trên MongoDB
- [x] Sử dụng `ObjectId` để chuyển đổi kiểu dữ liệu `_id` và `movie_id`
- [x] Bảo vệ cập nhật/xoá bằng cách kiểm tra `user_id` khớp với người tạo review
- [x] Dùng `aggregate()` + `$match` + `$lookup` để truy vấn phim kèm reviews
- [x] Dùng `distinct()` để lấy danh sách các loại rating
- [x] Gọi `ReviewsDAO.injectDB()` trong `index.js` sau kết nối DB, trước khi start server
