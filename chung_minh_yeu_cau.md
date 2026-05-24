# 🧾 BÁO CÁO ĐÁP ỨNG YÊU CẦU BÀI THI MÔN OOP & LẬP TRÌNH WINDOWS

Tài liệu này đối chiếu chi tiết từng yêu cầu trong đề thi của giảng viên (theo ảnh chụp bảng yêu cầu) với cấu trúc code thực tế trong dự án **Quản Lý Quán Cafe**. Hãy dùng tài liệu này để ôn tập trước khi bảo vệ đồ án!

---

## 📂 MỤC LỤC ĐỐI CHIẾU
1. [Yêu Cầu 1: Kiến Trúc 3 Tầng (3-tier) Rõ Ràng](#1-kiến-trúc-3-tầng-3-tier-rõ-ràng)
2. [Yêu Cầu 2: Các Lớp DAL Bắt Buộc Thực Thi Interface Tương Ứng](#2-các-lớp-dal-thực-thi-interface-tương-ứng)
3. [Yêu Cầu 3: Tối Thiểu 3-4 Form Phụ & Form Quản Lý Quan Hệ 2 Đối Tượng](#3-tối-thiểu-3-4-form-phụ--form-quản-lý-quan-hệ-2-đối-tượng)
4. [Yêu Cầu 4: Có CSDL Kết Nối (SQLite)](#4-có-kết-nối-csdl-sqlite)
5. [Yêu Cầu 5: Form Có Kiểm Tra Lỗi (Validation) & Trùng Khóa Chính](#5-form-có-kiểm-tra-lỗi-validation--trùng-khóa-chính)
6. [Yêu Cầu 6: Thao Tác Xong Trên Form Phụ Mới Quay Về Form Chính (Modal ShowDialog)](#6-thao-tác-xong-trên-form-phụ-mới-được-quay-về-form-chính)
7. [Yêu Cầu 7: Đặt Tên Các Control Theo Quy Tắc Học Trên Lớp](#7-đặt-tên-các-control-theo-quy-tắc)

---

## 1. KIẾN TRÚC 3 TẦNG (3-TIER) RÕ RÀNG

> 📌 **Yêu cầu đề thi:** *"Cấu trúc phần mềm 3 tầng: Entity (các lớp cơ bản, get set), DAL (các lớp thao tác với CSDL), Presentation/GUI (các lớp giao diện - các form)"*

Dự án được phân chia thành 3 tầng độc lập, thể hiện rõ trong cấu trúc thư mục:

### A. Tầng Entity / Lớp mô hình đối tượng (Thư mục `Backend/Models/`)
*   **Vị trí file:** [Models/](file:///c:/Users/PC/doanthayquan_baovy_thaominh/Backend/Models/)
*   **Chi tiết:** Định nghĩa các lớp thực thể cơ bản chứa các thuộc tính `get; set;` để đóng gói dữ liệu:
    *   `Ban.cs`: Quản lý thực thể bàn ăn.
    *   `HoaDon.cs`: Quản lý thực thể hóa đơn.
    *   `ChiTietHoaDon.cs`: Quản lý thông tin từng món được gọi.
    *   `SanPham.cs` (Abstract Class - Lớp trừu tượng cha), `ThucUong.cs`, `DoAn.cs` (Lớp con kế thừa): Áp dụng 4 tính chất OOP.

### B. Tầng DAL / Truy cập cơ sở dữ liệu (Thư mục `Backend/DAL/`)
*   **Vị trí file:** [DAL/](file:///c:/Users/PC/doanthayquan_baovy_thaominh/Backend/DAL/)
*   **Chi tiết:** Viết các câu lệnh SQL thuần (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) để tương tác trực tiếp với cơ sở dữ liệu SQLite:
    *   `DatabaseHelper.cs`: Khởi tạo database, tạo các bảng và nạp dữ liệu mẫu ban đầu.
    *   `BanDAL.cs`, `SanPhamDAL.cs`, `HoaDonDAL.cs`, `ChiTietHoaDonDAL.cs`: Xử lý lưu/đọc dữ liệu.

### C. Tầng Presentation / Giao diện người dùng (Thư mục `Backend/wwwroot/` & `Program.cs`)
*   **Vị trí file:** [wwwroot/](file:///c:/Users/PC/doanthayquan_baovy_thaominh/Backend/wwwroot/) và [Program.cs](file:///c:/Users/PC/doanthayquan_baovy_thaominh/Backend/Program.cs)
*   **Chi tiết:**
    *   `Program.cs`: Sử dụng WinForms để tạo cửa sổ chính của chương trình.
    *   `index.html`, `style.css`, `app.js`: Nhúng trực tiếp vào cửa sổ chính thông qua **WebView2** làm giao diện hiển thị cho người dùng.

---

## 2. CÁC LỚP DAL THỰC THI INTERFACE TƯƠNG ỨNG

> 📌 **Yêu cầu đề thi:** *"Tất cả các lớp DAL đều phải thực thi interface tương ứng (vd: NhanVienDAL phải thực thi giao diện INhanVienDAL)"*

Hệ thống tuân thủ thiết kế trừu tượng hóa (Abstraction). Mỗi lớp DAL đều thực thi đầy đủ Interface tương ứng:

1.  **Lớp `SanPhamDAL`** thực thi Interface **`ISanPhamDAL`**:
    *   *Khai báo:* `public class SanPhamDAL : ISanPhamDAL`
    *   *Vị trí:* [SanPhamDAL.cs](file:///c:/Users/PC/doanthayquan_baovy_thaominh/Backend/DAL/SanPhamDAL.cs) và [ISanPhamDAL.cs](file:///c:/Users/PC/doanthayquan_baovy_thaominh/Backend/Interfaces/ISanPhamDAL.cs).
2.  **Lớp `BanDAL`** thực thi Interface **`IBanDAL`**:
    *   *Khai báo:* `public class BanDAL : IBanDAL`
    *   *Vị trí:* [BanDAL.cs](file:///c:/Users/PC/doanthayquan_baovy_thaominh/Backend/DAL/BanDAL.cs) và [IBanDAL.cs](file:///c:/Users/PC/doanthayquan_baovy_thaominh/Backend/Interfaces/IBanDAL.cs).
3.  **Lớp `HoaDonDAL`** thực thi Interface **`IReadOnly/IWrite - IHoaDonDAL`**:
    *   *Khai báo:* `public class HoaDonDAL : IHoaDonDAL`
    *   *Vị trí:* [HoaDonDAL.cs](file:///c:/Users/PC/doanthayquan_baovy_thaominh/Backend/DAL/HoaDonDAL.cs) và [IHoaDonDAL.cs](file:///c:/Users/PC/doanthayquan_baovy_thaominh/Backend/Interfaces/IHoaDonDAL.cs).
4.  **Lớp `ChiTietHoaDonDAL`** thực thi Interface **`IChiTietHoaDonDAL`**:
    *   *Khai báo:* `public class ChiTietHoaDonDAL : IChiTietHoaDonDAL`
    *   *Vị trí:* [ChiTietHoaDonDAL.cs](file:///c:/Users/PC/doanthayquan_baovy_thaominh/Backend/DAL/ChiTietHoaDonDAL.cs) và [IChiTietHoaDonDAL.cs](file:///c:/Users/PC/doanthayquan_baovy_thaominh/Backend/Interfaces/IChiTietHoaDonDAL.cs).

---

## 3. TỐI THIỂU 3-4 FORM PHỤ & FORM QUẢN LÝ QUAN HỆ 2 ĐỐI TƯỢNG

> 📌 **Yêu cầu đề thi:** *"Tối thiểu 3-4 form ngoài form chính... Có ít nhất một form quản lý quan hệ giữa 2 đối tượng"*

### A. Danh sách các Form (màn hình chức năng) trong ứng dụng:
Vì giao diện được chạy trên WebView2 nhúng, các Form chức năng được tách ra thành các Trang (Tabs) độc lập và các Hộp thoại (Modals) bật lên:
1.  **Form Chính:** Cửa sổ WinForms chứa WebView2 tải ứng dụng.
2.  **Form Phụ 1 - Sơ đồ bàn:** Quản lý thực thể Bàn (Thêm bàn, sửa tên, xóa bàn).
3.  **Form Phụ 2 - Quản lý Thực đơn:** Quản lý thực thể Món ăn/Thức uống (Thêm món mới, sửa món, đổi giá, ẩn món).
4.  **Form Phụ 3 - Lịch sử hóa đơn:** Báo cáo, thống kê doanh thu và tra cứu hóa đơn cũ.
5.  **Form Phụ 4 - Gọi món & Thanh toán:** Đây là form quản lý quan hệ phức tạp.
6.  **Các Form Popup (Modal):** Form "Thêm Sản Phẩm Mới" và Form "Chỉnh Sửa Sản Phẩm".

### B. Form quản lý quan hệ giữa 2 đối tượng:
*   **Hai đối tượng:** **Bàn (Ban)** và **Sản Phẩm (SanPham)**.
*   **Mối quan hệ:** Quan hệ Nhiều - Nhiều (Many-to-Many). Một bàn có thể gọi nhiều sản phẩm khác nhau; một sản phẩm có thể được dùng ở nhiều bàn khác nhau.
*   **Cách quản lý:** Tại Tab **"Gọi Món & Thanh Toán"**, hệ thống quản lý mối quan hệ này thông qua thực thể trung gian là **ChiTietHoaDon** (lưu số lượng món của từng bàn). Người dùng có thể chọn bàn, thêm sản phẩm vào bàn đó, điều chỉnh số lượng hoặc xóa món khỏi bàn.

---

## 4. CÓ KẾT NỐI CSDL (SQLITE)

> 📌 **Yêu cầu đề thi:** *"Có kết nối CSDL (tối thiểu dạng file hoặc SQLite)"*

*   **CSDL sử dụng:** Hệ thống sử dụng cơ sở dữ liệu **SQLite** dạng file cục bộ nằm trực tiếp trong thư mục ứng dụng có tên: `quanlycafe.db`.
*   **Ưu điểm:** Tiện lợi, không cần cài đặt SQL Server phức tạp trên máy chấm bài của giảng viên, chỉ cần chạy ứng dụng là file CSDL tự động được tạo và kết nối.
*   **Kết nối:** Cấu hình chuỗi kết nối tại `DatabaseHelper.cs`:
    ```csharp
    private static readonly string _dbPath = "quanlycafe.db";
    public static string ChuoiKetNoi => $"Data Source={_dbPath}";
    ```

---

## 5. FORM CÓ KIỂM TRA LỖI (VALIDATION) & TRÙNG KHÓA CHÍNH

> 📌 **Yêu cầu đề thi:** *"Form có validation, có check các lỗi cơ bản trong CSDL (không trùng khóa chính, v.v.) và có hiển thị lỗi tương ứng cho người dùng biết"*

Hệ thống có 3 cấp độ kiểm tra lỗi cực kỳ an toàn:

### A. Kiểm tra dữ liệu ở Giao diện (Tầng GUI - JavaScript)
*   **Vị trí code:** [app.js](file:///c:/Users/PC/doanthayquan_baovy_thaominh/Backend/wwwroot/js/app.js)
*   **Chi tiết:**
    *   Khi thêm bàn: Kiểm tra nếu tên bàn bỏ trống (`!tenBan`) -> Hiện thông báo cảnh báo màu đỏ `"Tên bàn không được để trống!"`.
    *   Khi thêm sản phẩm: Kiểm tra nếu tên món trống hoặc giá tiền âm -> Cảnh báo lỗi.
    *   Khi gọi món: Kiểm tra số lượng gọi phải lớn hơn hoặc bằng 1 -> Cảnh báo lỗi.

### B. Kiểm tra trùng lặp khóa chính / Logic nghiệp vụ trong CSDL (Tầng DAL - C#)
*   **Vị trí code:** [BanDAL.cs](file:///c:/Users/PC/doanthayquan_baovy_thaominh/Backend/DAL/BanDAL.cs) (Hàm `KiemTraTrungTenBan`).
*   **Chi tiết:**
    *   Trước khi chèn một bàn mới vào CSDL, hệ thống thực hiện câu lệnh SELECT đếm số bàn trùng tên.
    *   Nếu đã tồn tại bàn có tên đó, hệ thống ném ra lỗi `ArgumentException` với thông báo tiếng Việt: `$"Tên bàn '{tenBan}' đã tồn tại trong hệ thống!"`.
    *   Lỗi này được Controller bắt và trả về giao diện dưới dạng mã lỗi HTTP 400 kèm thông báo để người dùng biết.

### C. Bảo vệ tính toàn vẹn dữ liệu của Đối Tượng (Tầng Model - C#)
*   **Vị trí code:** [SanPham.cs](file:///c:/Users/PC/doanthayquan_baovy_thaominh/Backend/Models/SanPham.cs)
*   **Chi tiết:**
    *   Đặt logic bảo vệ cho biến `GiaCoBan`. Nếu lập trình viên vô tình gán giá trị âm, thuộc tính sẽ ném lỗi lập tức:
        ```csharp
        if (value < 0) throw new ArgumentException("Giá không được âm.");
        ```

---

## 6. THAO TÁC XONG TRÊN FORM PHỤ MỚI ĐƯỢC QUAY VỀ FORM CHÍNH

> 📌 **Yêu cầu đề thi:** *"Lúc form chính mở ra các form phụ, phải thao tác xong trên form phụ mới quay về thao tác trên form chính được (Tương đương ShowDialog trong C#)"*

*   **Cách thức thực hiện trên WebView2:**
    *   Vì ứng dụng của chúng ta kết hợp HTML5, cơ chế này được giả lập hoàn hảo bằng **Modal Dialog Overlays** dạng chặn luồng tương tác (`ShowDialog()`).
*   **Cơ chế chặn tương tác:**
    *   Khi mở các Form phụ như **"Thêm món mới"** hoặc **"Sửa món"** (file `index.html`), hệ thống bật thẻ `div` có class là `modal-nen` bao phủ toàn bộ màn hình.
    *   **CSS bảo vệ (style.css):**
        ```css
        .modal-nen {
            position: fixed; /* Ghim chặt cố định */
            inset: 0; /* Trải rộng 100% chiều rộng và chiều cao màn hình */
            background: rgba(0,0,0,0.7); /* Phủ một lớp màu đen mờ lên Form chính */
            z-index: 1000; /* Đưa Form phụ lên trên cùng */
            backdrop-filter: blur(4px); /* Làm mờ toàn bộ Form chính phía sau */
        }
        ```
    *   Lớp phủ này ngăn chặn hoàn toàn mọi hành vi click chuột hay gõ phím vào giao diện chính bên dưới. Người dùng bắt buộc phải thực hiện xong hành động trên Form phụ (bấm nút "Lưu" hoặc "Hủy") thì màn hình phụ mới ẩn đi, cho phép quay lại thao tác ở màn hình chính.

---

## 7. ĐẶT TÊN CÁC CONTROL THEO QUY TẮC

> 📌 **Yêu cầu đề thi:** *"Các control (textbox, combobox, v.v.) tuân theo quy tắc đặt tên đã học ở lớp (vd: txtMa, txtTen, v.v.)"*

Trong giao diện HTML, tất cả các điều khiển nhập liệu (Control) đều được đặt ID rõ ràng theo quy tắc dễ hiểu để JavaScript gọi chính xác:

| Loại Control | Tên theo chuẩn lớp học | ID thực tế trong HTML | Vai trò trong giao diện |
| :--- | :--- | :--- | :--- |
| **Textbox** (Nhập chữ) | `txtTenBanMoi` | `ten-ban-moi` | Nhập tên khi thêm bàn |
| **Textbox** (Nhập chữ) | `txtSuaTenBan` | `sua-ten-ban` | Nhập tên mới khi chỉnh sửa bàn |
| **Textbox** (Nhập chữ) | `txtThemTenSP` | `them-ten-sp` | Nhập tên khi thêm sản phẩm mới |
| **Numeric Box** (Nhập số)| `numThemGiaSP` | `them-gia-sp` | Nhập đơn giá sản phẩm mới |
| **Numeric Box** (Nhập số)| `numSoLuong` | `so-luong` | Chọn số lượng món khi gọi món |
| **Combobox** (Chọn) | `cboThemLoaiSP` | `them-loai-sp` | Chọn loại sản phẩm (Đồ ăn/Thức uống) |
| **Combobox** (Chọn) | `cboChonBanOrder`| `chon-ban-order` | Chọn bàn để gọi món & thanh toán |
| **Combobox** (Chọn) | `cboChonSanPham` | `chon-san-pham` | Chọn sản phẩm để gọi món |
| **Combobox** (Chọn) | `cboChonSize` | `chon-size` | Chọn kích cỡ thức uống (Size thường/Size L) |
| **Hidden Input** (Mã ẩn)| `txtSuaBanId` | `sua-ban-id` | Lưu ID bàn phục vụ sửa đổi ngầm |
