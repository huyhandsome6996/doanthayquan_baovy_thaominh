# 📖 Hướng Dẫn Cài Đặt, Khởi Chạy Và Sử Dụng Dự Án

Tài liệu này hướng dẫn chi tiết từng bước cho người mới `git clone` dự án **Quản Lý Quán Cafe** về máy tính cá nhân để cấu hình, khởi chạy và sử dụng phần mềm.

---

## 🛠️ 1. Yêu Cầu Chuẩn Bị Trước Khi Chạy

Để chạy được dự án này, máy tính của bạn cần đáp ứng các yêu cầu sau:

1. **Hệ điều hành:** **Windows 10** hoặc **Windows 11** (vì phần mềm tích hợp giao diện Desktop bằng Windows Forms).
2. **Bộ cài đặt .NET 10.0 SDK:** 
   - Kiểm tra xem máy đã cài .NET SDK chưa bằng cách mở Terminal/CMD và gõ:
     ```bash
     dotnet --version
     ```
   - Nếu chưa cài đặt, vui lòng tải và cài đặt bản **.NET 10 SDK** từ trang chủ của Microsoft.
3. **Microsoft Edge WebView2 Runtime:**
   - Đây là công cụ giúp hiển thị giao diện HTML/CSS/JS bên trong cửa sổ Windows Forms.
   - Hầu hết Windows 10/11 hiện nay đã tích hợp sẵn. Nếu chạy phần mềm báo lỗi thiếu WebView2, bạn tải bản cài đặt **Evergreen Bootstrapper** từ trang chủ Microsoft WebView2.

---

## 🚀 2. Các Bước Khởi Chạy Dự Án (Sau Khi Git Clone)

Sau khi bạn đã clone mã nguồn về máy tính, thực hiện một trong hai cách dưới đây để chạy dự án:

### Cách 1: Chạy nhanh bằng file `.bat` (Khuyên dùng)
1. Truy cập vào thư mục gốc của dự án vừa clone về.
2. Tìm và nhấp đúp chuột vào file **`ChayUngDung.bat`**.
3. Hệ thống sẽ tự động mở cửa sổ Command Prompt, điều hướng vào thư mục Backend, tải các gói thư viện cần thiết (trong lần đầu tiên chạy) và khởi chạy ứng dụng.

### Cách 2: Khởi chạy thủ công bằng dòng lệnh (Terminal)
Nếu bạn đang mở dự án bằng **VS Code** hoặc **Visual Studio**, bạn có thể chạy bằng dòng lệnh:
1. Mở Terminal mới trong VS Code (`Ctrl + \``).
2. Di chuyển vào thư mục **`Backend`**:
   ```bash
   cd Backend
   ```
3. Chạy lệnh khởi động dự án:
   ```bash
   dotnet run
   ```

> 💡 **Lưu ý trong lần đầu khởi chạy:** 
> - Hệ thống sẽ tự động tạo file cơ sở dữ liệu SQLite (`QuanLyCafe.db` hoặc tương tự trong thư mục `Backend`) và nạp sẵn dữ liệu mẫu (món ăn, nước uống, sơ đồ bàn ban đầu) nên bạn không cần cấu hình database thủ công.
> - Cửa sổ giao diện phần mềm Desktop sẽ xuất hiện sau vài giây với kích thước tối ưu `1350x850`.

---

## 🖥️ 3. Hướng Dẫn Sử Dụng Các Tính Năng Chi Tiết

Sau khi cửa sổ ứng dụng **"Hệ Thống Quản Lý Quán Cafe (Desktop App)"** hiện lên, bạn có thể trải nghiệm các chức năng theo quy trình dưới đây:

### 3.1. Quản Lý Sơ Đồ Bàn
- **Nhận biết trạng thái bàn qua màu sắc:**
  - **Màu Xanh Lá:** Bàn đang trống (chưa có khách ngồi).
  - **Màu Đỏ:** Bàn đang có khách (đã mở bàn hoặc đang gọi món).
- **Thao tác với bàn:**
  - **Click chọn bàn:** Click vào bất kỳ bàn nào trên sơ đồ để xem thông tin chi tiết hóa đơn của bàn đó ở cột bên phải.
  - **Thêm bàn mới:** Nhấp vào nút **"Thêm bàn"** trên thanh công cụ, nhập tên bàn (ví dụ: *Bàn 11*, *Bàn 12*) để mở rộng quy mô quán.
  - **Sửa tên bàn / Xóa bàn:** Chọn bàn cần thay đổi, nhấp vào nút **Sửa** hoặc **Xóa** tương ứng.

### 3.2. Quản Lý Thực Đơn (Menu Món Ăn & Đồ Uống)
Thực đơn của quán được chia thành 2 loại với cơ chế tính giá khác nhau (áp dụng lập trình hướng đối tượng OOP):
- **Thức uống (đồ uống):** Có hỗ trợ thuộc tính kích thước (Size). Nếu khách chọn **Size L**, hệ thống sẽ tự động cộng thêm **5.000đ** phụ thu vào đơn giá món.
- **Món ăn:** Giá bán cố định, không đổi theo thuộc tính.

**Các chức năng quản lý:**
- **Thêm món mới:** Click nút **"Thêm món"**, chọn Loại món (Thức uống hoặc Món ăn), điền Tên món và Giá bán cơ bản.
- **Sửa thông tin món:** Chọn món trên danh sách thực đơn, đổi tên hoặc sửa giá, sau đó lưu lại.
- **Ẩn/Xóa món:** Click nút xóa để ẩn món khỏi thực đơn bán hàng (tránh ảnh hưởng đến các hóa đơn cũ trong lịch sử).

### 3.3. Quy Trình Gọi Món (Order)
Khi có khách vào bàn:
1. Click chọn bàn trống (màu Xanh) trên sơ đồ.
2. Nhấp vào nút **"Mở bàn"** ở khung thông tin bên phải. Trạng thái bàn sẽ chuyển sang màu Đỏ.
3. Ở khung Menu món, tìm món khách muốn gọi:
   - Chọn **Số lượng** (dùng nút tăng/giảm hoặc nhập số).
   - Nếu là Thức uống, chọn thuộc tính kích thước (ví dụ: **Size M** hoặc **Size L**).
4. Nhấp nút **"Thêm món"**. Món ăn/đồ uống sẽ được thêm vào danh sách hóa đơn tạm tính của bàn đó.
5. Bạn có thể xóa bớt món hoặc thay đổi số lượng món đã gọi trực tiếp tại danh sách hóa đơn tạm tính.

### 3.4. Thanh Toán Hóa Đơn & Xuất Phiếu
Khi khách yêu cầu thanh toán:
1. Chọn bàn cần thanh toán (bàn màu Đỏ).
2. Kiểm tra lại danh sách các món khách đã dùng cùng tổng tiền tạm tính.
3. Nhấp nút **"Thanh Toán"**.
4. Hệ thống sẽ:
   - Tính tổng tiền hóa đơn (đã bao gồm các phụ phí size L của thức uống).
   - Lưu hóa đơn vào cơ sở dữ liệu lịch sử bán hàng.
   - Giải phóng trạng thái bàn về lại Trống (màu Xanh) để sẵn sàng đón khách tiếp theo.

### 3.5. Xem Lịch Sử Hóa Đơn
- Click vào tab hoặc khu vực **"Lịch sử"** (hoặc **"Hóa đơn"**) trên giao diện.
- Hệ thống sẽ hiển thị toàn bộ danh sách các hóa đơn đã được thanh toán từ trước tới nay kèm theo mã hóa đơn, thời gian thanh toán cụ thể, tên bàn và tổng số tiền của hóa đơn đó.

---

## ⚠️ 4. Xử Lý Các Sự Cố Thường Gặp

| Tình huống / Lỗi | Nguyên nhân | Cách xử lý |
|------------------|------------|------------|
| **Lỗi lệnh `dotnet` không tồn tại** | Chưa cài đặt .NET SDK hoặc chưa cấu hình biến môi trường PATH. | Cài đặt lại .NET 10 SDK và khởi động lại Terminal hoặc máy tính. |
| **Giao diện hiển thị trắng xóa** | Thư viện WebView2 Runtime chưa được tải hoặc dịch vụ API ngầm bị lỗi khởi động. | 1. Tải và cài đặt **WebView2 Runtime** từ Microsoft.<br>2. Đảm bảo cổng mạng `5000` không bị ứng dụng khác chiếm dụng. |
| **Lỗi cơ sở dữ liệu SQLite** | File SQLite bị hỏng hoặc cấu trúc bảng không đồng bộ. | Tắt ứng dụng, xóa file `.db` trong thư mục `Backend` rồi chạy lại lệnh `dotnet run`. Hệ thống sẽ tự khởi tạo lại cơ sở dữ liệu sạch từ đầu. |
