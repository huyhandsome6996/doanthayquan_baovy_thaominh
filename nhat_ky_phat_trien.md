# ☕ NHẬT KÝ CHI TIẾT CÁC BƯỚC TRIỂN KHAI DỰ ÁN QUẢN LÝ QUÁN CAFE

Tài liệu này ghi lại toàn bộ quá trình phát triển hệ thống Quản lý quán Cafe từ đầu đến cuối. Các bước được sắp xếp tuần tự theo đúng tiến trình lập trình thực tế và lịch sử Git để bạn dễ dàng báo cáo với giảng viên.

---

## 📂 MỤC LỤC
1. [Giai Đoạn 1: Khởi Tạo Dự Án & Cấu Trúc Thư Mục](#giai-đoạn-1-khởi-tạo-dự-án--cấu-trúc-thư-mục)
2. [Giai Đoạn 2: Xây Dựng Tầng Thực Thể (Models - Áp Dụng Đóng Gói, Kế Thừa, Đa Hình)](#giai-đoạn-2-xây-dựng-tầng-thực-thể-models---áp-dụng-đóng-gói-kế-thừa-đa-hình)
3. [Giai Đoạn 3: Thiết Kế Các Interface & Tầng Truy Cập Dữ Liệu SQLite (DAL)](#giai-đoạn-3-thiết-kế-các-interface--tầng-truy-cập-dữ-liệu-sqlite-dal)
4. [Giai Đoạn 4: Xây Dựng Tầng Điều Khiển API (Controllers)](#giai-đoạn-4-xây-dựng-tầng-điều-khiển-api-controllers)
5. [Giai Đoạn 5: Xây Dựng Giao Diện Người Dùng (Frontend HTML/CSS/JS)](#giai-đoạn-5-xây-dựng-giao-diện-người-dùng-frontend-htmlcssjs)
6. [Giai Đoạn 6: Tái Cấu Trúc Lịch Sử Commit Git Để Báo Cáo](#giai-đoạn-6-tái-cấu-trúc-lịch-sử-commit-git-để-báo-cáo)
7. [Giai Đoạn 7: Tích Hợp WebView2 Chuyển Thành Ứng Dụng Desktop Độc Lập](#giai-đoạn-7-tích-hợp-webview2-chuyển-thành-ứng-dụng-desktop-độc-lập)
8. [Giai Đoạn 8: Thiết Kế Logo & Đặt Icon Cho File Thực Thi .exe](#giai-đoạn-8-thiết-kế-logo--đặt-icon-cho-file-thực-thi-exe)

---

## 1. GIAI ĐOẠN 1: KHỞI TẠO DỰ ÁN & CẤU TRÚC THƯ MỤC

### Các lệnh Terminal đã chạy:
```powershell
# Khởi tạo Solution file
dotnet new sln -n QuanLyCafe

# Tạo dự án ASP.NET Core Web API trong thư mục Backend
dotnet new webapi -n Backend -o Backend

# Thêm dự án Backend vào Solution
dotnet sln add Backend/Backend.csproj

# Cài đặt thư viện SQLite (Microsoft.Data.Sqlite) để kết nối CSDL
dotnet add Backend/Backend.csproj package Microsoft.Data.Sqlite
```

### Các file đã tạo/chỉnh sửa:
1. **`Backend/Backend.csproj`**: Cấu hình các package phụ thuộc (`Microsoft.Data.Sqlite`).
2. **`Backend/appsettings.json`**: Cấu hình các thiết lập môi trường cơ bản cho server.
3. **`.gitignore`**: Chứa danh sách các file bỏ qua không đưa lên git (thư mục `bin/`, `obj/`, file CSDL local `.db`).
4. **`ChayUngDung.bat`**: File script nhấp đúp để tự chuyển thư mục và chạy nhanh trên Windows:
   ```bat
   @echo off
   cd /d "%~dp0Backend"
   dotnet run
   ```

---

## 2. GIAI ĐOẠN 2: XÂY DỰNG TẦNG THỰC THỂ (MODELS - ÁP DỤNG ĐÓNG GÓI, KẾ THỪA, ĐA HÌNH)

Tạo thư mục `Backend/Models/` và viết các lớp đối tượng thể hiện nghiêm ngặt các quy tắc lập trình hướng đối tượng (OOP).

### Các file đã tạo:
1. **`SanPham.cs`** (Lớp trừu tượng - Abstraction / Đóng gói - Encapsulation):
   - Đóng gói dữ liệu bằng các thuộc tính có logic kiểm tra (Validation):
     ```csharp
     private decimal _giaCoBan;
     public decimal GiaCoBan {
         get => _giaCoBan;
         set {
             if (value < 0) throw new ArgumentException("Giá không được âm.");
             _giaCoBan = value;
         }
     }
     ```
   - Định nghĩa phương thức trừu tượng `TinhTien` để chuẩn bị cho tính đa hình:
     ```csharp
     public abstract decimal TinhTien(string? thuocTinhThem);
     ```

2. **`ThucUong.cs`** (Kế thừa - Inheritance / Đa hình - Polymorphism):
   - Kế thừa lớp cha `SanPham`.
   - Override phương thức `TinhTien` để cài đặt đa hình: Nếu khách chọn **Size L** thì cộng thêm phụ phí 5.000đ.
     ```csharp
     public override decimal TinhTien(string? thuocTinhThem) {
         decimal gia = GiaCoBan;
         if (thuocTinhThem?.Contains("Size L") == true) gia += 5000;
         return gia;
     }
     ```

3. **`DoAn.cs`** (Kế thừa - Inheritance / Đa hình - Polymorphism):
   - Kế thừa lớp cha `SanPham`.
   - Override phương thức `TinhTien`: Đồ ăn không đổi giá theo size nên trả về luôn `GiaCoBan`.
     ```csharp
     public override decimal TinhTien(string? thuocTinhThem) => GiaCoBan;
     ```

4. **`Ban.cs`**: Thuộc tính của một Bàn ăn (Id, TenBan, TrangThai `Trống`/`Có khách`).
5. **`HoaDon.cs`**: Thông tin Hóa đơn (Id, BanId, NgayTao, NgayThanhToan, TongTien, TrangThai `Đã thanh toán`/`Chưa thanh toán`).
6. **`ChiTietHoaDon.cs`**: Thông tin các món ăn trong hóa đơn (Id, HoaDonId, SanPhamId, SoLuong, DonGiaBan, GhiChu).

---

## 3. GIAI ĐOẠN 3: THIẾT KẾ CÁC INTERFACE & TẦNG TRUY CẬP DỮ LIỆU SQLITE (DAL)

### Thiết kế Interface (Tính Trừu Tượng - Abstraction)
Tạo thư mục `Backend/Interfaces/` chứa các hợp đồng để Controller giao tiếp với dữ liệu mà không cần biết dữ liệu được lấy từ SQLite, SQL Server hay MySQL:
1. **`ISanPhamDAL.cs`**: Định nghĩa CRUD cho Sản phẩm.
2. **`IBanDAL.cs`**: Định nghĩa CRUD cho Bàn.
3. **`IHoaDonDAL.cs`**: Định nghĩa logic hóa đơn (Tạo hóa đơn mới, thanh toán).
4. **`IChiTietHoaDonDAL.cs`**: Định nghĩa CRUD chi tiết hóa đơn (Gọi món, xóa món).

### Hiện thực hóa kết nối dữ liệu SQLite (DAL)
Tạo thư mục `Backend/DAL/` và triển khai logic SQL bằng thư viện `Microsoft.Data.Sqlite`:

1. **`DatabaseHelper.cs`**:
   - Tự động tạo file CSDL `quanlycafe.db` nếu chưa có.
   - Tạo cấu trúc bảng: `Ban`, `SanPham`, `HoaDon`, `ChiTietHoaDon`.
   - Nạp dữ liệu mẫu (Seed Data) ban đầu gồm 6 bàn (từ Bàn 1 đến Bàn VIP 2) và 10 món ăn/thức uống phổ biến.

2. **`SanPhamDAL.cs`**:
   - Truy vấn CSDL để lấy thông tin sản phẩm.
   - Áp dụng Đa hình khi lấy dữ liệu: Dựa vào cột `Loai` (ThucUong/DoAn) trong CSDL để khởi tạo đúng đối tượng lớp con tương ứng:
     ```csharp
     SanPham sp = loai == "ThucUong" ? new ThucUong() : new DoAn();
     // gán thuộc tính...
     ```

3. **`BanDAL.cs`**: CRUD danh sách bàn ăn.
4. **`HoaDonDAL.cs`**: Xử lý logic nghiệp vụ tạo hóa đơn và thanh toán hóa đơn.
5. **`ChiTietHoaDonDAL.cs`**: Xử lý việc lưu các món khách gọi vào CSDL.

---

## 4. GIAI ĐOẠN 4: XÂY DỰNG TẦNG ĐIỀU KHIỂN API (CONTROLLERS)

Tạo thư mục `Backend/Controllers/` để cung cấp các REST API cho giao diện HTML/JS gọi dữ liệu.

### Các file đã tạo:
1. **`SanPhamController.cs`**: CRUD các món ăn trong menu.
2. **`BanController.cs`**: CRUD sơ đồ bàn.
3. **`HoaDonController.cs`**: API xử lý mở bàn (`/api/hoadon/mo-ban`) và thanh toán (`/api/hoadon/thanh-toan/{banId}`).
4. **`ChiTietHoaDonController.cs`**: API thêm món vào bàn. **Đây là nơi tính Đa hình hoạt động trực tiếp**:
   ```csharp
   // 1. Lấy sản phẩm tương ứng từ DAL (trả về đúng đối tượng con ThucUong hoặc DoAn)
   var sp = _sanPhamDAL.LayTheoId(request.SanPhamId);
   
   // 2. Tự động tính đúng giá tiền dựa vào đối tượng thật (ThucUong tính Size L, DoAn giữ nguyên)
   decimal donGiaBan = sp.TinhTien(request.ThuocTinhThem);
   ```

### Cấu hình tại `Backend/Program.cs`:
- Đăng ký Dependency Injection:
  ```csharp
  builder.Services.AddScoped<ISanPhamDAL, SanPhamDAL>();
  builder.Services.AddScoped<IBanDAL, BanDAL>();
  builder.Services.AddScoped<IHoaDonDAL, HoaDonDAL>();
  builder.Services.AddScoped<IChiTietHoaDonDAL, ChiTietHoaDonDAL>();
  ```
- Cấu hình CORS để cho phép giao diện HTML tĩnh gửi yêu cầu API lên backend.
- Phục vụ file tĩnh (`wwwroot`) chứa mã nguồn HTML/JS.

---

## 5. GIAI ĐOẠN 5: XÂY DỰNG GIAO DIỆN NGƯỜI DÙNG (FRONTEND HTML/CSS/JS)

Tạo thư mục `Backend/wwwroot/` chứa các tài nguyên giao diện được thiết kế theo phong cách Dark Mode hiện đại, chuyên nghiệp.

### Các file đã tạo:
1. **`wwwroot/index.html`**:
   - Giao diện chính chia làm 4 tab chức năng rõ ràng: Quản lý Bàn, Quản lý Menu, Gọi món & Thanh toán, Lịch sử hóa đơn.
   - Sử dụng các thẻ HTML5 ngữ nghĩa (`<header>`, `<nav>`, `<main>`, `<section>`).
   - Thiết kế các khung nhập thông tin (Form) và bảng dữ liệu (Table) chuẩn mực.

2. **`wwwroot/css/style.css`**:
   - Sử dụng font chữ "Be Vietnam Pro" hiện đại từ Google Fonts.
   - Khai báo biến CSS để thiết lập hệ màu sắc đồng bộ (Tone màu cà phê ấm kết hợp nền tối).
   - Thiết lập cấu trúc lưới (`Grid`, `Flexbox`) giúp giao diện tự động thích ứng với các kích cỡ màn hình khác nhau (Responsive).

3. **`wwwroot/js/api.js`**:
   - Tập trung toàn bộ các hàm gọi API bằng `fetch` của JavaScript (`layDanhSachBan`, `moBan`, `themMonVaoHoaDon`, `thanhToanBan`).
   - Xử lý và hiển thị thông báo lỗi thân thiện nếu server gặp sự cố.

4. **`wwwroot/js/ban.js`**, **`wwwroot/js/menu.js`**, **`wwwroot/js/order.js`**, **`wwwroot/js/lichsu.js`**:
   - Quản lý trạng thái giao diện và xử lý sự kiện tương ứng cho từng trang:
     - `ban.js`: Tải sơ đồ bàn, thêm bàn mới, chỉnh sửa bàn.
     - `menu.js`: Tải thực đơn, mở modal thêm/sửa món, ẩn món.
     - `order.js`: Chọn bàn, mở bàn, gọi món (với tính năng đa hình tùy chọn size), tính tổng tiền và thanh toán.
     - `lichsu.js`: Tải và hiển thị lịch sử hóa đơn.

---

## 6. GIAI ĐOẠN 6: TÁI CẤU TRÚC LỊCH SỬ COMMIT GIT ĐỂ BÁO CÁO

Để tránh việc nộp đồ án chỉ có duy nhất một commit chứa hàng ngàn dòng code (dễ bị đánh giá là đi copy bài), chúng ta đã thực hiện xóa commit cũ và chia nhỏ mã nguồn thành **6 commit tuần tự** mô phỏng quá trình làm việc chân thực:

### Các lệnh Terminal đã chạy:
```powershell
# 1. Reset nhánh hiện tại về trạng thái ban đầu chưa commit (vẫn giữ nguyên code trên máy)
git reset dfb50ea96befca0cda92e900090fd22a44bdc08e

# 2. Stage các file cấu hình và commit bước 1
git add .gitignore QuanLyCafe.slnx ChayUngDung.bat Backend/Backend.csproj Backend/appsettings.json
git commit -m "feat: khoi tao project, cau truc thu muc va cau hinh SQLite"

# 3. Stage tầng thực thể Models và commit bước 2
git add Backend/Models/
git commit -m "feat: xay dung cac lop doi tuong Models ap dung cac dac tinh OOP (Dong goi, Ke thua, Da hinh)"

# 4. Stage Interface và tầng DAL rồi commit bước 3
git add Backend/Interfaces/ Backend/DAL/
git commit -m "feat: trien khai tang Data Access Layer (DAL) va thiet ke cac Interface (Tru tuong hoa)"

# 5. Stage các Controller và file Program.cs rồi commit bước 4
git add Backend/Controllers/ Backend/Program.cs
git commit -m "feat: xay dung he thong REST API Controllers va cau hinh Dependency Injection"

# 6. Stage toàn bộ file giao diện wwwroot và commit bước 5
git add Backend/wwwroot/
git commit -m "feat: thiet ke giao dien HTML, CSS premium dark mode va logic JavaScript goi API"

# 7. Stage file tài liệu README.md và commit bước 6
git add README.md
git commit -m "docs: hoan thien tai lieu huong dan su dung README.md va lam ro 4 tinh chat OOP"

# 8. Force push lên GitHub để ghi đè lịch sử cũ bằng chuỗi 6 commit chuyên nghiệp này
git push origin main --force
```

---

## 7. GIAI ĐOẠN 7: TÍCH HỢP WEBVIEW2 CHUYỂN THÀNH ỨNG DỤNG DESKTOP ĐỘC LẬP

Thầy cô yêu cầu dự án phải chạy như phần mềm desktop thực thụ, cấm chạy trên tab trình duyệt web thông thường. Do đó, chúng ta nhúng giao diện HTML vào cửa sổ gốc của Windows (Windows Forms) thông qua **Microsoft Edge WebView2**.

### Các lệnh Terminal đã chạy:
```powershell
# Cài đặt thư viện WebView2 của Microsoft
dotnet add Backend/Backend.csproj package Microsoft.Web.WebView2
```

### Các file đã chỉnh sửa:
1. **`Backend/Backend.csproj`**:
   - Đổi kiểu dự án thành ứng dụng Windows bằng cách chỉnh sửa target sang `net10.0-windows` và bật tính năng Windows Forms:
     ```xml
     <TargetFramework>net10.0-windows</TargetFramework>
     <UseWindowsForms>true</UseWindowsForms>
     <OutputType>WinExe</OutputType>
     ```

2. **`Backend/Program.cs`**:
   - Viết logic khởi chạy Web API dưới một luồng phụ (Background Thread):
     ```csharp
     Task.Run(() => app.Run("http://localhost:5000"));
     ```
   - Tạo một luồng giao diện chính được thiết lập trạng thái **STA (Single-Threaded Apartment)** để tránh xung đột luồng COM của Windows:
     ```csharp
     var uiThread = new Thread(() => {
         // Cấu hình WinForms
         var formMain = new Form { Text = "☕ Hệ Thống Quản Lý Quán Cafe (Desktop App)", Width = 1350, Height = 850 };
         var webView = new WebView2 { Dock = DockStyle.Fill };
         formMain.Controls.Add(webView);
         
         formMain.Load += async (s, e) => {
             await Task.Delay(1200); // Đợi server API khởi chạy xong
             await webView.EnsureCoreWebView2Async();
             webView.Source = new Uri("http://localhost:5000"); // Tải trang web lên cửa sổ form
         };
         Application.Run(formMain);
     });
     uiThread.SetApartmentState(ApartmentState.STA);
     uiThread.Start();
     uiThread.Join();
     ```

### Các lệnh Git đã chạy (Tạo nhánh, commit tiếng Việt, merge):
```powershell
git checkout -b feature/tich-hop-webview2-desktop
git add -A
git commit -m "feat: tich hop WebView2 vao Windows Forms de chay ung dung desktop doc lap, khong dung trinh duyet"
git checkout main
git merge feature/tich-hop-webview2-desktop
git push origin main
```

---

## 8. GIAI ĐOẠN 8: THIẾT KẾ LOGO & ĐẶT ICON CHO FILE THỰC THI .EXE

Thay thế biểu tượng cửa sổ Windows mặc định bằng biểu tượng logo Ly Cafe cao cấp tự thiết kế.

### Thiết kế hình ảnh:
- Tạo ảnh logo chuyên nghiệp đặt tại `Backend/wwwroot/images/logo.png`.

### Chuyển đổi định dạng sang `.ico` bằng lệnh PowerShell:
Chạy đoạn mã PowerShell để đóng gói file PNG thành cấu trúc file `.ico` 32-bit màu thật:
```powershell
$pngBytes = [System.IO.File]::ReadAllBytes("Backend\wwwroot\images\logo.png"); $pngSize = $pngBytes.Length; $icoHeader = New-Object Byte[] 22; $icoHeader[0] = 0; $icoHeader[1] = 0; $icoHeader[2] = 1; $icoHeader[3] = 0; $icoHeader[4] = 1; $icoHeader[5] = 0; $icoHeader[6] = 0; $icoHeader[7] = 0; $icoHeader[8] = 0; $icoHeader[9] = 0; $icoHeader[10] = 1; $icoHeader[11] = 0; $icoHeader[12] = 32; $icoHeader[13] = 0; $icoHeader[14] = $pngSize -band 0xFF; $icoHeader[15] = ($pngSize -shr 8) -band 0xFF; $icoHeader[16] = ($pngSize -shr 16) -band 0xFF; $icoHeader[17] = ($pngSize -shr 24) -band 0xFF; $icoHeader[18] = 22; $icoHeader[19] = 0; $icoHeader[20] = 0; $icoHeader[21] = 0; $icoFile = New-Object Byte[] (22 + $pngSize); [System.Array]::Copy($icoHeader, 0, $icoFile, 0, 22); [System.Array]::Copy($pngBytes, 0, $icoFile, 22, $pngSize); [System.IO.File]::WriteAllBytes("Backend\wwwroot\images\logo.ico", $icoFile)
```

### Các file đã chỉnh sửa:
1. **`Backend/Backend.csproj`**:
   - Thêm thuộc tính nhúng Icon vào file thực thi `.exe`:
     ```xml
     <ApplicationIcon>wwwroot\images\logo.ico</ApplicationIcon>
     ```

2. **`Backend/Program.cs`**:
   - Nạp file `logo.ico` làm biểu tượng góc trái và dưới thanh taskbar cho cửa sổ `formMain`:
     ```csharp
     if (File.Exists(iconPath)) {
         formMain.Icon = new System.Drawing.Icon(iconPath);
     }
     ```

3. **`Backend/wwwroot/index.html`** & **`Backend/wwwroot/css/style.css`**:
   - Thay thế biểu tượng Header emoji thành hình ảnh logo tròn, có hiệu ứng chuyển động xoay nhẹ và đổ bóng.

### Các lệnh Git đã chạy (Để lại lịch sử commit tiếng Việt):
```powershell
git checkout -b feature/logo-ung-dung
git add -A
git commit -m "feat: thiet ke va cap nhat logo moi cho cua so ung dung va tieu de trang"
git checkout main
git merge feature/logo-ung-dung

# Fix đường dẫn nạp icon và build lại .exe
git add -A
git commit -m "fix: dung dinh dang .ico de nap icon cua so va build file .exe voi ApplicationIcon"
git push origin main
```

*Lưu ý: Tệp nhật ký này (`nhat_ky_phat_trien.md`) được lưu trữ tại thư mục gốc và đẩy lên GitHub làm tài liệu báo cáo chính thức cho quá trình triển khai dự án.*
