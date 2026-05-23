# ☕ Quản Lý Quán Cafe

Ứng dụng desktop quản lý quán cafe được xây dựng bằng **C# ASP.NET Core** (backend) + **HTML/CSS/JavaScript** (giao diện) + **SQLite** (cơ sở dữ liệu).

---

## 🚀 Cách Chạy Ứng Dụng

### Yêu Cầu
- .NET 10 SDK (hoặc mới hơn)
- Windows (chạy như ứng dụng desktop)

### Bước 1: Chạy Server Backend
Nhấp đúp vào file **`ChayUngDung.bat`** hoặc chạy lệnh:
```bash
cd Backend
dotnet run
```

### Bước 2: Mở Giao Diện
Sau khi server khởi động, mở trình duyệt và truy cập:
```
http://localhost:5000
```

> 💡 **Lưu ý**: Đây là ứng dụng desktop dạng web-based. Server chạy cục bộ, không cần Internet để sử dụng.

---

## 🏗️ Kiến Trúc Dự Án (3 Tầng)

```
QuanLyCafe/
├── Backend/                     ← C# ASP.NET Core WebAPI
│   ├── Models/                  ← TẦNG 1: Entity Classes (OOP)
│   │   ├── SanPham.cs          ← Abstract class (Trừu tượng + Đóng gói)
│   │   ├── ThucUong.cs         ← Kế thừa SanPham (tính thêm phí size)
│   │   ├── DoAn.cs             ← Kế thừa SanPham (không tính thêm)
│   │   ├── Ban.cs
│   │   ├── HoaDon.cs
│   │   └── ChiTietHoaDon.cs
│   ├── Interfaces/              ← TẦNG 1.5: Hợp đồng DAL (Trừu tượng)
│   │   ├── ISanPhamDAL.cs
│   │   ├── IBanDAL.cs
│   │   ├── IHoaDonDAL.cs
│   │   └── IChiTietHoaDonDAL.cs
│   ├── DAL/                     ← TẦNG 2: Data Access Layer
│   │   ├── DatabaseHelper.cs   ← Kết nối SQLite + Tạo bảng + Seed Data
│   │   ├── SanPhamDAL.cs
│   │   ├── BanDAL.cs
│   │   ├── HoaDonDAL.cs
│   │   └── ChiTietHoaDonDAL.cs
│   ├── Controllers/             ← TẦNG 3: API Endpoints (REST)
│   │   ├── SanPhamController.cs
│   │   ├── BanController.cs
│   │   ├── HoaDonController.cs
│   │   └── ChiTietHoaDonController.cs
│   ├── wwwroot/                 ← TẦNG TRÌNH BÀY: HTML/JS/CSS
│   │   ├── index.html
│   │   ├── css/style.css
│   │   └── js/
│   │       ├── api.js          ← Gọi API từ JS
│   │       └── app.js          ← Logic giao diện
│   └── Program.cs              ← Khởi động + Cấu hình DI + CORS
└── ChayUngDung.bat              ← Script chạy ứng dụng
```

---

## 🎓 4 Tính Chất OOP - Cách Áp Dụng

### 1. 🔒 Đóng Gói (Encapsulation)
**Nơi áp dụng:** `Models/SanPham.cs`, `Models/Ban.cs`

**Cách làm:** Dùng `private` field kết hợp `public` property có getter/setter để kiểm tra dữ liệu trước khi lưu.

```csharp
private decimal _giaCoBan;
public decimal GiaCoBan {
    get => _giaCoBan;
    set {
        if (value < 0)
            throw new ArgumentException("Giá không được âm.");
        _giaCoBan = value;
    }
}
```
**Ý nghĩa:** Bảo vệ dữ liệu, không cho phép đặt giá âm hay tên rỗng từ bên ngoài.

---

### 2. 🧬 Kế Thừa (Inheritance)
**Nơi áp dụng:** `Models/ThucUong.cs` và `Models/DoAn.cs` kế thừa `Models/SanPham.cs`

```csharp
public abstract class SanPham { ... }    // Lớp cha
public class ThucUong : SanPham { ... }  // Lớp con 1
public class DoAn     : SanPham { ... }  // Lớp con 2
```
**Ý nghĩa:** Tái sử dụng thuộc tính chung (Id, TenSanPham, GiaCoBan...), mỗi lớp con chỉ cần định nghĩa phần riêng.

---

### 3. 🎭 Đa Hình (Polymorphism)
**Nơi áp dụng:** Phương thức `TinhTien()` trong `ThucUong` và `DoAn`, được gọi ở `ChiTietHoaDonController.cs`

```csharp
// ThucUong: tính thêm 5.000đ nếu chọn Size L
public override decimal TinhTien(string? thuocTinhThem) {
    decimal gia = GiaCoBan;
    if (thuocTinhThem?.Contains("Size L") == true) gia += 5000;
    return gia;
}

// DoAn: không có phụ phí, giá cố định
public override decimal TinhTien(string? thuocTinhThem) {
    return GiaCoBan;
}
```

**Cách kích hoạt trong Controller:**
```csharp
// Backend dựa vào cột "Loai" để tạo đúng loại object
SanPham sp = loai == "ThucUong" ? new ThucUong() : new DoAn();

// Gọi TinhTien() - tự động chọn đúng phương thức của ThucUong hoặc DoAn
decimal donGiaBan = sp.TinhTien(request.ThuocTinhThem);
```
**Ý nghĩa:** Cùng một lời gọi `TinhTien()` nhưng hành vi khác nhau tùy loại đối tượng.

---

### 4. 🫧 Trừu Tượng (Abstraction)
**Nơi áp dụng:** `Interfaces/ISanPhamDAL.cs`, `IBanDAL.cs`, `IHoaDonDAL.cs`, `IChiTietHoaDonDAL.cs`

```csharp
public interface ISanPhamDAL {
    List<SanPham> LayTatCa();
    void Them(SanPham sanPham);
    void Sua(SanPham sanPham);
    void Xoa(int id);
}
```
**Đăng ký trong `Program.cs`:**
```csharp
builder.Services.AddScoped<ISanPhamDAL, SanPhamDAL>();
```
**Ý nghĩa:** Controller chỉ biết về Interface, không phụ thuộc vào class cụ thể. Muốn đổi từ SQLite sang MySQL chỉ cần đổi 1 dòng trong `Program.cs`.

---

## 📡 Danh Sách API

| Phương Thức | Endpoint | Mô Tả |
|-------------|----------|-------|
| GET | `/api/sanpham` | Lấy menu đang bán |
| GET | `/api/sanpham/tat-ca` | Lấy tất cả sản phẩm |
| POST | `/api/sanpham` | Thêm sản phẩm |
| PUT | `/api/sanpham/{id}` | Sửa sản phẩm |
| DELETE | `/api/sanpham/{id}` | Ẩn sản phẩm |
| GET | `/api/ban` | Lấy danh sách bàn |
| POST | `/api/ban` | Thêm bàn |
| PUT | `/api/ban/{id}` | Sửa bàn |
| DELETE | `/api/ban/{id}` | Xóa bàn |
| GET | `/api/hoadon` | Lịch sử hóa đơn |
| GET | `/api/hoadon/ban/{banId}` | Hóa đơn hiện tại của bàn |
| POST | `/api/hoadon/mo-ban` | Mở bàn (tạo hóa đơn) |
| POST | `/api/hoadon/thanh-toan/{banId}` | Thanh toán |
| GET | `/api/chitiethoadon/hoadon/{id}` | Danh sách món trong hóa đơn |
| POST | `/api/chitiethoadon` | Thêm món vào hóa đơn |
| DELETE | `/api/chitiethoadon/{id}` | Xóa món khỏi hóa đơn |

---

## 🔄 Quy Trình Gitflow

```
main
  ├── feature/khoi-tao-du-an       ✅ Khởi tạo solution và cấu trúc
  ├── feature/models-va-database   ✅ Entity classes + SQLite
  ├── feature/dal-va-interfaces    ✅ Interfaces + DAL
  ├── feature/api-controllers      ✅ REST API Controllers
  └── feature/giao-dien-html       ✅ Frontend HTML/JS/CSS
```

---

## 📋 Tính Năng

- ✅ **Quản lý bàn**: Xem sơ đồ bàn, thêm/sửa/xóa bàn, phân biệt trạng thái (màu sắc)
- ✅ **Quản lý menu**: Thêm/sửa/xóa (ẩn) đồ ăn và thức uống
- ✅ **Gọi món**: Chọn bàn, chọn món, nhập số lượng, tùy chọn size (Size L +5.000đ)
- ✅ **Thanh toán**: Tự động tính tổng, xuất hóa đơn, giải phóng bàn
- ✅ **Lịch sử**: Xem toàn bộ hóa đơn đã thanh toán

---

## 👨‍💻 Công Nghệ Sử Dụng

| Thành Phần | Công Nghệ |
|-----------|-----------|
| Backend | C# ASP.NET Core 10 |
| Cơ sở dữ liệu | SQLite (Microsoft.Data.Sqlite) |
| Giao diện | HTML5 + CSS3 + JavaScript (Vanilla) |
| Font chữ | Be Vietnam Pro (Google Fonts) |
| Kiến trúc | REST API + 3 Tầng |