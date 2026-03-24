# 📘 IE213.Q21 – Nhập môn Cơ sở dữ liệu NoSQL

---

## 👤 Thông tin sinh viên

| Thông tin | Chi tiết |
|-----------|----------|
| **Họ và tên** | Dương Phước Thịnh |
| **MSSV** | 23521497 |
| **Lớp** | IE213.Q21 |
| **Trường** | Đại học Công nghệ Thông tin – ĐHQG TP.HCM (UIT) |

---

## 📚 Danh sách các Lab

| Lab | Tên | Mô tả |
|-----|-----|-------|
| **Lab 1** | Thao tác cơ bản với MongoDB | Tạo database, collection, CRUD operations, index, aggregation |

---

## 🧪 Lab 1 – Thao tác cơ bản với MongoDB

### 🎯 Mục tiêu bài thực hành

- Làm quen với MongoDB và MongoDB Shell (`mongosh`)
- Thực hành các thao tác cơ bản: tạo database, collection, thêm/sửa/xóa/tìm kiếm document
- Sử dụng các toán tử truy vấn: `$and`, `$gt`, `$lt`, `$exists`, `$in`, `$unset`, `$set`
- Tạo unique index để ràng buộc dữ liệu
- Sử dụng `aggregate()` để thống kê dữ liệu theo nhóm

---

### 🛠️ Công cụ / Môi trường sử dụng

| Công cụ | Phiên bản / Thông tin |
|---------|-----------------------|
| **MongoDB** | MongoDB Atlas (Cloud) |
| **MongoDB Shell** | `mongosh` |
| **Database** | `23521497-IE213` |
| **Collection** | `lab1` |
| **Hệ điều hành** | macOS |

---

### ▶️ Cách chạy chương trình

#### Bước 1: Kết nối MongoDB

```bash
# Kết nối MongoDB Atlas
mongosh "mongodb+srv://nouu188:1@cluster.mongodb.net"
```

#### Bước 2: Chạy lần lượt các lệnh trong `mongosh`

```javascript
// Chọn database
use("23521497-IE213")
```

---

### 📋 Chi tiết từng bài tập

---

#### ✅ 2.1 – Tạo Database

```javascript
use("23521497-IE213")
```

> **Mục đích:** Tạo và chọn database với tên theo chuẩn `MSSV-IE213`.

---

#### ✅ 2.2 – Thêm Documents vào Collection

```javascript
db.lab1.insertMany([
  {"id":1,"name":{"first":"John","last":"Doe"},"age":48},
  {"id":2,"name":{"first":"Jane","last":"Doe"},"age":16},
  {"id":3,"name":{"first":"Alice","last":"A"},"age":32},
  {"id":4,"name":{"first":"Bob","last":"B"},"age":64}
])
```

> **Mục đích:** Thêm 4 documents vào collection `lab1` bằng `insertMany()`.  
> **Kết quả:** `{ acknowledged: true, insertedCount: 4 }`

---

#### ✅ 2.3 – Tạo Unique Index cho trường `id`

```javascript
db.lab1.createIndex({ id: 1 }, { unique: true })
```

> **Mục đích:** Đảm bảo trường `id` là duy nhất – không thể thêm document với `id` đã tồn tại.  
> **Kết quả:** `id_1`

---

#### ✅ 2.4 – Tìm document theo `firstname` và `lastname`

```javascript
db.lab1.find({
  "name.first": "John",
  "name.last": "Doe"
})
```

> **Mục đích:** Truy vấn nested field trong MongoDB.  
> **Kết quả mong đợi:**
```json
{ "id": 1, "name": { "first": "John", "last": "Doe" }, "age": 48 }
```

---

#### ✅ 2.5 – Tìm người có tuổi từ 30 đến 60 (không bao gồm đầu cuối)

```javascript
db.lab1.find({
  $and: [
    { age: { $gt: 30 } },
    { age: { $lt: 60 } }
  ]
})
```

> **Mục đích:** Dùng toán tử `$and`, `$gt`, `$lt` để lọc theo khoảng giá trị.  
> **Kết quả mong đợi:** John (48), Alice (32)

---

#### ✅ 2.6 – Thêm documents có `middle name` và tìm kiếm

```javascript
// Thêm 2 documents mới
db.lab1.insertMany([
  {"id":5,"name":{"first":"Rooney","middle":"K","last":"A"},"age":30},
  {"id":6,"name":{"first":"Ronaldo","middle":"T","last":"B"},"age":60}
])

// Tìm tất cả document có middle name
db.lab1.find({ "name.middle": { $exists: true } })
```

> **Mục đích:** Sử dụng toán tử `$exists: true` để tìm document có chứa một field cụ thể.  
> **Kết quả mong đợi:** Rooney (id:5), Ronaldo (id:6)

---

#### ✅ 2.7 – Xoá trường `middle name`

```javascript
db.lab1.updateMany(
  { "name.middle": { $exists: true } },
  { $unset: { "name.middle": null } }
)
```

> **Mục đích:** Dùng `$unset` để xóa field khỏi document.  
> **Kết quả:** `{ matchedCount: 2, modifiedCount: 2 }`

---

#### ✅ 2.8 – Thêm trường `organization: "UIT"` cho tất cả documents

```javascript
db.lab1.updateMany(
  {},
  { $set: { organization: "UIT" } }
)
```

> **Mục đích:** Dùng `updateMany()` với filter `{}` (tất cả) và `$set` để thêm field mới.  
> **Kết quả:** `{ matchedCount: 6, modifiedCount: 6 }`

---

#### ✅ 2.9 – Cập nhật `organization` của nhân viên id 5 và 6

```javascript
db.lab1.updateMany(
  { id: { $in: [5, 6] } },
  { $set: { organization: "USSH" } }
)
```

> **Mục đích:** Dùng toán tử `$in` để lọc nhiều giá trị, `$set` để cập nhật.  
> **Kết quả:** `{ matchedCount: 2, modifiedCount: 2 }`

---

#### ✅ 2.10 – Tính tổng tuổi và tuổi trung bình theo `organization`

```javascript
db.lab1.aggregate([
  {
    $group: {
      _id: "$organization",
      totalAge: { $sum: "$age" },
      averageAge: { $avg: "$age" }
    }
  }
])
```

> **Mục đích:** Dùng `aggregate()` với `$group` để thống kê dữ liệu theo nhóm tổ chức.

**Kết quả mong đợi:**

| Organization | Tổng tuổi | Tuổi trung bình |
|-------------|-----------|-----------------|
| UIT | 48 + 16 + 32 + 64 = **160** | **40** |
| USSH | 30 + 60 = **90** | **45** |

---

### 📊 Tổng kết kết quả thực hiện

| Bài | Nội dung | Trạng thái |
|-----|----------|-----------|
| 2.1 | Tạo database `23521497-IE213` | ✅ Hoàn thành |
| 2.2 | Thêm 4 documents vào collection `lab1` | ✅ Hoàn thành |
| 2.3 | Tạo unique index cho trường `id` | ✅ Hoàn thành |
| 2.4 | Tìm document theo `name.first` và `name.last` | ✅ Hoàn thành |
| 2.5 | Tìm người có tuổi trong khoảng (30, 60) | ✅ Hoàn thành |
| 2.6 | Thêm documents có middle name và tìm kiếm | ✅ Hoàn thành |
| 2.7 | Xóa trường `middle name` bằng `$unset` | ✅ Hoàn thành |
| 2.8 | Thêm trường `organization: "UIT"` cho tất cả | ✅ Hoàn thành |
| 2.9 | Cập nhật `organization` của id 5, 6 thành "USSH" | ✅ Hoàn thành |
| 2.10 | Tính tổng và trung bình tuổi theo tổ chức | ✅ Hoàn thành |

---

### 📌 Những nội dung đã hoàn thành

- [x] Tạo database và collection theo đúng yêu cầu
- [x] Sử dụng thành thạo `insertOne()` / `insertMany()`
- [x] Tạo unique index với `createIndex()`
- [x] Truy vấn với `find()` sử dụng các toán tử: `$and`, `$gt`, `$lt`, `$exists`, `$in`
- [x] Cập nhật document với `updateMany()`, `$set`, `$unset`
- [x] Thống kê dữ liệu với `aggregate()` và `$group`

### ⏳ Những nội dung chưa hoàn thành / mở rộng

- [ ] Viết script tự động hóa toàn bộ lab
- [ ] Thêm index phức hợp (compound index)
- [ ] Thực hành với `$lookup` (JOIN trong MongoDB)
- [ ] Tối ưu hóa query với `explain()`

---

### 🗂️ Cấu trúc thư mục

```
23521497-IE213/
│
├── lab1/
│   └── README.md         # Toàn bộ lệnh mongosh cho Lab 1
```