# 🚀 Hướng Dẫn Đẩy Code Lên GitHub Theo Mô Hình Agile (Trello Board)

Tài liệu này dành cho bạn của bạn. Để có một lịch sử commit chuyên nghiệp (tránh bị thầy giáo đánh giá là copy code một cục), bạn cần tạo một thư mục mới tinh, sau đó **copy từng file từ dự án hoàn chỉnh sang thư mục mới đó**, rồi chạy lệnh Git theo từng bước dưới đây.

Lịch sử này được giả lập dựa trên mô hình **Agile (Trello Board)**:
*   **Epic (Tính năng cốt lõi)** -> **User Story (Câu chuyện người dùng)** -> **Task (Nhiệm vụ nhỏ)**.
*   **Format Commit:** `epic.../us.../task...: [Nội dung tiếng Việt]`

---

## 🛠️ CHUẨN BỊ BAN ĐẦU
1. Tạo một thư mục trống mới (ví dụ: `QuanLyCafe_BanNop`).
2. Mở thư mục đó bằng VS Code, mở Terminal (Ctrl + \`) và gõ:
   ```bash
   git init
   ```
3. Mở sẵn thư mục code gốc kế bên để tiện **copy/paste** file sang thư mục mới theo từng bước dưới đây. Cứ làm xong 1 Task thì gõ lệnh Git.

---

## 🟢 EPIC 1: KHỞI TẠO VÀ THIẾT LẬP DỰ ÁN

### 📖 User Story 1.1: Là lập trình viên, tôi muốn khởi tạo cấu trúc dự án cơ bản

**✅ Task 1.1.1: Khởi tạo các file cấu hình và Gitignore**
*   **Hành động:** Copy các file sau từ thư mục gốc dự án hoàn chỉnh sang thư mục mới:
    *   `.gitignore`
    *   `README.md`
    *   `ChayUngDung.bat`
    *   `QuanLyCafe.slnx`
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic1/us1.1/task1.1.1: khoi tao cac tep cau hinh co ban cua du an va gitignore"
    ```

**✅ Task 1.1.2: Khởi tạo project Backend .NET**
*   **Hành động:** Tạo thư mục `Backend/` trong thư mục mới. Sau đó copy các file sau vào:
    *   `Backend/Backend.csproj`
    *   `Backend/appsettings.json` và `Backend/appsettings.Development.json`
    *   Copy nguyên thư mục `Backend/Properties/`
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic1/us1.1/task1.1.2: khoi tao project Backend kem cac file config json"
    ```

---

## 🟡 EPIC 2: XÂY DỰNG TẦNG DỮ LIỆU & MÔ HÌNH ĐỐI TƯỢNG (OOP)

### 📖 User Story 2.1: Xây dựng các Entity Models (Đóng gói dữ liệu)

**✅ Task 2.1.1: Tạo các Model nghiệp vụ cơ bản**
*   **Hành động:** Tạo thư mục `Backend/Models/`, sau đó copy các file:
    *   `Ban.cs`
    *   `HoaDon.cs`
    *   `ChiTietHoaDon.cs`
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic2/us2.1/task2.1.1: xay dung cac model thuc the ban, hoa don va chi tiet"
    ```

**✅ Task 2.1.2: Thiết lập tính đa hình và kế thừa cho Sản phẩm**
*   **Hành động:** Tiếp tục copy vào `Backend/Models/` các file:
    *   `SanPham.cs` (Lớp trừu tượng cha)
    *   `ThucUong.cs` và `DoAn.cs` (Lớp kế thừa)
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic2/us2.1/task2.1.2: ap dung tinh ke thua va da hinh cho lop SanPham"
    ```

### 📖 User Story 2.2: Thiết lập Tầng Data Access Layer (DAL)

**✅ Task 2.2.1: Khởi tạo kết nối CSDL SQLite**
*   **Hành động:** Tạo thư mục `Backend/DAL/`, copy file `DatabaseHelper.cs` vào.
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic2/us2.2/task2.2.1: cau hinh ket noi sqlite va ham tao bang mac dinh"
    ```

**✅ Task 2.2.2: Xây dựng tính trừu tượng với Interfaces**
*   **Hành động:** Tạo thư mục `Backend/Interfaces/`, copy toàn bộ các file interface vào (`IBanDAL.cs`, `ISanPhamDAL.cs`, `IHoaDonDAL.cs`, `IChiTietHoaDonDAL.cs`).
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic2/us2.2/task2.2.2: thiet lap cac interface de trien khai tinh truu tuong"
    ```

**✅ Task 2.2.3: Triển khai các lớp thao tác CSDL (DAL)**
*   **Hành động:** Copy các file còn lại vào `Backend/DAL/` (`BanDAL.cs`, `SanPhamDAL.cs`, `HoaDonDAL.cs`, `ChiTietHoaDonDAL.cs`).
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic2/us2.2/task2.2.3: trien khai cac lop dal thuc thi interface va viet cau lenh sql"
    ```

---

## 🟠 EPIC 3: XÂY DỰNG TẦNG MÁY CHỦ WEB API (CONTROLLERS)

### 📖 User Story 3.1: API cho Bàn và Sản Phẩm

**✅ Task 3.1.1: Hoàn thiện controller Bàn và Menu**
*   **Hành động:** Tạo thư mục `Backend/Controllers/`. Copy `BanController.cs` và `SanPhamController.cs` vào.
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic3/us3.1/task3.1.1: xay dung web api xu ly request cho Ban va San Pham"
    ```

### 📖 User Story 3.2: API cho Gọi Món và Thanh Toán

**✅ Task 3.2.1: Hoàn thiện controller Hóa Đơn**
*   **Hành động:** Copy `HoaDonController.cs` và `ChiTietHoaDonController.cs` vào `Backend/Controllers/`.
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic3/us3.2/task3.2.1: xay dung web api quan ly tao hoa don va goi mon"
    ```

---

## 🟣 EPIC 4: THIẾT KẾ GIAO DIỆN TĨNH MOCKUP (NỘP GIỮA KỲ)

### 📖 User Story 4.1: Làm giao diện Demo (Không nối CSDL)

**✅ Task 4.1.1: Tạo thư mục tài nguyên Mockup**
*   **Hành động:** Ra thư mục gốc dự án, tạo thư mục `form_giao_dien/`. Tạo tiếp `form_giao_dien/css/` và `form_giao_dien/images/`. Copy file `style.css` và `logo.png` từ thư mục gốc tương ứng vào đây.
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic4/us4.1/task4.1.1: them css va anh logo cho giao dien mockup giua ky"
    ```

**✅ Task 4.1.2: Code các form HTML tĩnh giả lập**
*   **Hành động:** Copy 4 file HTML (`index.html`, `menu.html`, `order.html`, `lichsu.html`) vào thư mục `form_giao_dien/`.
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic4/us4.1/task4.1.2: xay dung 4 form html mockup tinh chuyen tab muot ma"
    ```

---

## 🔵 EPIC 5: TÍCH HỢP GIAO DIỆN THỰC TẾ & WINDOWS FORMS

### 📖 User Story 5.1: Hoàn thiện thư mục Giao Diện Thực Tế (wwwroot)

**✅ Task 5.1.1: Bổ sung tài nguyên Frontend thực**
*   **Hành động:** Tạo thư mục `Backend/wwwroot/`. Chép `css/style.css`, `images/logo.png`, `images/logo.ico` vào đúng vị trí bên trong `wwwroot`.
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic5/us5.1/task5.1.1: tao thu muc wwwroot chua tai nguyen tinh css va icon"
    ```

**✅ Task 5.1.2: Tích hợp HTML chức năng**
*   **Hành động:** Copy 4 file HTML thực (`index.html`, `menu.html`, `order.html`, `lichsu.html`) vào `Backend/wwwroot/`.
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic5/us5.1/task5.1.2: them cac view html chinh thuc cho tung tinh nang"
    ```

**✅ Task 5.1.3: Code Logic Javascript gọi API**
*   **Hành động:** Tạo thư mục `Backend/wwwroot/js/`. Copy toàn bộ các file JS vào đây (`api.js`, `ban.js`, `menu.js`, `order.js`, `lichsu.js`).
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic5/us5.1/task5.1.3: tich hop cac script js xu ly dong bo du lieu voi backend qua fetch"
    ```

### 📖 User Story 5.2: Nhúng Frontend vào WinForms (WebView2)

**✅ Task 5.2.1: Hoàn thiện File Program.cs (Giai đoạn cuối Code)**
*   **Hành động:** Copy file `Backend/Program.cs` cuối cùng vào đè lên file cũ. (Lúc này file Program.cs đã có đầy đủ logic chạy WebView2 trên luồng STA).
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic5/us5.2/task5.2.1: cau hinh program.cs chay winforms ket hop webview2 kem backend api"
    ```

---

## 🟤 EPIC 6: HOÀN THIỆN BÁO CÁO VÀ TÀI LIỆU (CUỐI KỲ)

### 📖 User Story 6.1: Viết tài liệu bảo vệ đồ án

**✅ Task 6.1.1: Tài liệu kiến trúc và đối chiếu yêu cầu**
*   **Hành động:** Copy file `cau_truc_du_an.md` và `chung_minh_yeu_cau.md` ra thư mục gốc.
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic6/us6.1/task6.1.1: bo sung tai lieu thuyet minh cau truc va doi chieu yeu cau oop"
    ```

**✅ Task 6.1.2: Nhật ký phát triển và Hướng dẫn chạy**
*   **Hành động:** Copy nốt các file `nhat_ky_phat_trien.md` và `huong_dan_chay.md`. Đảm bảo copy hết toàn bộ các file còn lại chưa copy.
*   **Lệnh chạy Terminal:**
    ```bash
    git add .
    git commit -m "epic6/us6.1/task6.1.2: cap nhat nhat ky phat trien trello va huong dan git clone"
    ```

---

## 🚀 BƯỚC CUỐI CÙNG: ĐẨY LÊN GITHUB
Sau khi gõ xong tất cả các lệnh commit ở trên, bây giờ kho Git nội bộ của bạn đã có một lịch sử dài hoàn hảo (Tầm 17 commits).

Việc cuối cùng là liên kết kho này với kho GitHub trống của bạn và Push lên:
1. Lên trang GitHub của bạn, tạo 1 Repository mới (KHÔNG tạo file README, gitignore gì trên web nhé, để trống hoàn toàn).
2. Lấy link Github (ví dụ: `https://github.com/ten-ban/TenDuAn.git`).
3. Gõ các lệnh sau vào Terminal của máy bạn:
   ```bash
   git remote add origin https://github.com/ten-ban/TenDuAn.git
   git branch -M main
   git push -u origin main
   ```

🎉 XONG! Giờ bạn lên web GitHub F5 lại sẽ thấy mã nguồn đầy đủ kèm lịch sử commit "chuẩn bài" theo mô hình Trello Agile khiến giảng viên không thể bắt bẻ!
