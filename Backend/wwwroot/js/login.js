// login.js - Xử lý đăng nhập thực tế

document.addEventListener('DOMContentLoaded', () => {
    // Nếu đã đăng nhập rồi thì chuyển thẳng vào index.html
    if (localStorage.getItem('daDangNhap') === 'true') {
        window.location.href = '/index.html';
    }
});

async function xuLyDangNhap() {
    const tenDangNhap = document.getElementById('tenDangNhap').value.trim();
    const matKhau = document.getElementById('matKhau').value;
    
    if (!tenDangNhap || !matKhau) {
        hienThongBao('thong-bao-login', '⚠️ Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.', false);
        return;
    }

    try {
        const response = await fetch('/api/auth/dang-nhap', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tenDangNhap, matKhau })
        });
        
        if (response.ok) {
            hienThongBao('thong-bao-login', '✅ Đăng nhập thành công!', true);
            localStorage.setItem('daDangNhap', 'true');
            localStorage.setItem('tenDangNhap', tenDangNhap);
            
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 1000);
        } else {
            const errorText = await response.text();
            hienThongBao('thong-bao-login', `❌ ${errorText}`, false);
        }
    } catch (error) {
        hienThongBao('thong-bao-login', '❌ Không thể kết nối tới máy chủ.', false);
    }
}
