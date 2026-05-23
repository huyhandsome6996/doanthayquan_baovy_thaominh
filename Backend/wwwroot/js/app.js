/**
 * app.js - Logic chính: điều hướng tab, quản lý bàn, gọi món, menu, thanh toán
 */

// ===== BIẾN TOÀN CỤC =====
let banDangChon = null;      // Bàn đang được chọn
let hoaDonHienTai = null;    // Hóa đơn đang mở
let danhSachSanPham = [];    // Cache danh sách sản phẩm
let danhSachBan = [];        // Cache danh sách bàn

// ===== ĐIỀU HƯỚNG TAB =====
function chuyenTab(tenTab) {
    document.querySelectorAll('.trang').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`trang-${tenTab}`)?.classList.add('active');
    document.getElementById(`tab-${tenTab}`)?.classList.add('active');

    // Tải dữ liệu khi chuyển tab
    if (tenTab === 'ban') taiDanhSachBan();
    if (tenTab === 'menu') taiDanhSachMenu();
    if (tenTab === 'order') taiTrangOrder();
    if (tenTab === 'lichsu') taiLichSu();
}

// ===== TRANG QUẢN LÝ BÀN =====
async function taiDanhSachBan() {
    const container = document.getElementById('luoi-ban');
    container.innerHTML = '<div class="dang-tai">Đang tải danh sách bàn...</div>';

    const kq = await ApiBan.layTatCa();
    if (!kq.ok) {
        container.innerHTML = `<div class="thong-bao loi" style="display:block">⚠️ ${kq.loi}</div>`;
        return;
    }

    danhSachBan = kq.data;
    hienThiBan(danhSachBan);
}

function hienThiBan(danhSach) {
    const container = document.getElementById('luoi-ban');
    if (!danhSach.length) {
        container.innerHTML = '<div class="dang-tai">Chưa có bàn nào. Hãy thêm bàn mới!</div>';
        return;
    }

    container.innerHTML = danhSach.map(ban => `
        <div class="the-ban ${ban.trangThai === 'Trống' ? 'trong' : 'co-khach'}"
             onclick="chonBanDeQuanLy(${ban.id})">
            <span class="icon-ban">${ban.trangThai === 'Trống' ? '🪑' : '☕'}</span>
            <div class="ten-ban">${ban.tenBan}</div>
            <span class="trang-thai-ban ${ban.trangThai === 'Trống' ? 'trong' : 'co-khach'}">
                ${ban.trangThai}
            </span>
        </div>
    `).join('');
}

function chonBanDeQuanLy(banId) {
    const ban = danhSachBan.find(b => b.id === banId);
    if (!ban) return;

    document.getElementById('sua-ban-id').value = ban.id;
    document.getElementById('sua-ten-ban').value = ban.tenBan;
    document.getElementById('khu-vuc-sua-ban').style.display = 'block';
    document.getElementById('xoa-ban-id').value = ban.id;
    document.getElementById('thong-bao-xoa-ban').textContent = 
        `Bàn "${ban.tenBan}" - Trạng thái: ${ban.trangThai}`;
}

async function themBanMoi() {
    const ten = document.getElementById('ten-ban-moi').value.trim();
    if (!ten) {
        hienThongBao('thong-bao-ban', '⚠️ Vui lòng nhập tên bàn.', false);
        return;
    }

    const kq = await ApiBan.them({ tenBan: ten });
    if (kq.ok) {
        hienThongBao('thong-bao-ban', '✅ Thêm bàn thành công!', true);
        document.getElementById('ten-ban-moi').value = '';
        taiDanhSachBan();
    } else {
        hienThongBao('thong-bao-ban', `❌ ${kq.loi}`, false);
    }
}

async function suaBan() {
    const id = parseInt(document.getElementById('sua-ban-id').value);
    const ten = document.getElementById('sua-ten-ban').value.trim();
    if (!ten) { hienThongBao('thong-bao-ban', '⚠️ Tên bàn không được để trống.', false); return; }

    const kq = await ApiBan.sua(id, { tenBan: ten });
    if (kq.ok) {
        hienThongBao('thong-bao-ban', '✅ Cập nhật tên bàn thành công!', true);
        document.getElementById('khu-vuc-sua-ban').style.display = 'none';
        taiDanhSachBan();
    } else {
        hienThongBao('thong-bao-ban', `❌ ${kq.loi}`, false);
    }
}

async function xoaBan() {
    const id = parseInt(document.getElementById('xoa-ban-id').value);
    if (!id) { hienThongBao('thong-bao-ban', '⚠️ Vui lòng chọn bàn cần xóa.', false); return; }

    if (!confirm('Bạn có chắc muốn xóa bàn này không?')) return;

    const kq = await ApiBan.xoa(id);
    if (kq.ok) {
        hienThongBao('thong-bao-ban', '✅ Xóa bàn thành công!', true);
        document.getElementById('khu-vuc-sua-ban').style.display = 'none';
        taiDanhSachBan();
    } else {
        hienThongBao('thong-bao-ban', `❌ ${kq.loi}`, false);
    }
}

// ===== TRANG QUẢN LÝ MENU =====
async function taiDanhSachMenu() {
    const tbody = document.getElementById('bang-menu-body');
    tbody.innerHTML = '<tr><td colspan="6" class="dang-tai">Đang tải menu...</td></tr>';

    const kq = await ApiSanPham.layTatCa();
    if (!kq.ok) {
        tbody.innerHTML = `<tr><td colspan="6" class="thong-bao loi" style="display:block">❌ ${kq.loi}</td></tr>`;
        return;
    }

    danhSachSanPham = kq.data;
    if (!danhSachSanPham.length) {
        tbody.innerHTML = '<tr><td colspan="6" class="dang-tai">Chưa có sản phẩm nào.</td></tr>';
        return;
    }

    tbody.innerHTML = danhSachSanPham.map(sp => `
        <tr>
            <td>${sp.id}</td>
            <td><strong>${sp.tenSanPham}</strong></td>
            <td>
                <span class="badge ${sp.loai === 'ThucUong' ? 'badge-thuc-uong' : 'badge-do-an'}">
                    ${sp.loai === 'ThucUong' ? '🥤 Thức Uống' : '🍽️ Đồ Ăn'}
                </span>
            </td>
            <td class="gia-tien">${dinhDangTien(sp.giaCoBan)}</td>
            <td>
                <span class="badge ${sp.dangBan ? 'badge-da-tt' : 'badge-chua-tt'}">
                    ${sp.dangBan ? '✅ Đang bán' : '🚫 Tạm ẩn'}
                </span>
            </td>
            <td>
                <button class="btn btn-xam btn-nho" onclick="moModalSua(${sp.id})">✏️ Sửa</button>
                <button class="btn btn-do btn-nho" onclick="xoaSanPham(${sp.id})">🗑️ Ẩn</button>
            </td>
        </tr>
    `).join('');
}

function moModalThem() {
    document.getElementById('modal-them-sp').classList.add('hien');
    document.getElementById('form-them-sp').reset();
    hienThongBao('thong-bao-them-sp', '', true);
}

function dongModal(modalId) {
    document.getElementById(modalId).classList.remove('hien');
}

async function themSanPham() {
    const ten = document.getElementById('them-ten-sp').value.trim();
    const gia = parseFloat(document.getElementById('them-gia-sp').value);
    const loai = document.getElementById('them-loai-sp').value;

    if (!ten) { hienThongBao('thong-bao-them-sp', '⚠️ Tên sản phẩm không được để trống.', false); return; }
    if (isNaN(gia) || gia < 0) { hienThongBao('thong-bao-them-sp', '⚠️ Giá phải >= 0.', false); return; }

    const kq = await ApiSanPham.them({ tenSanPham: ten, giaCoBan: gia, loai, dangBan: true });
    if (kq.ok) {
        hienThongBao('thong-bao-them-sp', '✅ Thêm sản phẩm thành công!', true);
        setTimeout(() => { dongModal('modal-them-sp'); taiDanhSachMenu(); }, 1000);
    } else {
        hienThongBao('thong-bao-them-sp', `❌ ${kq.loi}`, false);
    }
}

async function moModalSua(id) {
    const sp = danhSachSanPham.find(s => s.id === id);
    if (!sp) return;

    document.getElementById('sua-sp-id').value = sp.id;
    document.getElementById('sua-ten-sp').value = sp.tenSanPham;
    document.getElementById('sua-gia-sp').value = sp.giaCoBan;
    document.getElementById('sua-loai-sp').value = sp.loai;
    document.getElementById('sua-dang-ban-sp').value = sp.dangBan ? '1' : '0';
    document.getElementById('modal-sua-sp').classList.add('hien');
    hienThongBao('thong-bao-sua-sp', '', true);
}

async function luuSuaSanPham() {
    const id = parseInt(document.getElementById('sua-sp-id').value);
    const ten = document.getElementById('sua-ten-sp').value.trim();
    const gia = parseFloat(document.getElementById('sua-gia-sp').value);
    const loai = document.getElementById('sua-loai-sp').value;
    const dangBan = document.getElementById('sua-dang-ban-sp').value === '1';

    if (!ten) { hienThongBao('thong-bao-sua-sp', '⚠️ Tên không được để trống.', false); return; }
    if (isNaN(gia) || gia < 0) { hienThongBao('thong-bao-sua-sp', '⚠️ Giá phải >= 0.', false); return; }

    const kq = await ApiSanPham.sua(id, { tenSanPham: ten, giaCoBan: gia, loai, dangBan });
    if (kq.ok) {
        hienThongBao('thong-bao-sua-sp', '✅ Cập nhật thành công!', true);
        setTimeout(() => { dongModal('modal-sua-sp'); taiDanhSachMenu(); }, 1000);
    } else {
        hienThongBao('thong-bao-sua-sp', `❌ ${kq.loi}`, false);
    }
}

async function xoaSanPham(id) {
    const sp = danhSachSanPham.find(s => s.id === id);
    if (!confirm(`Bạn có muốn ẩn "${sp?.tenSanPham}" khỏi menu không?`)) return;

    const kq = await ApiSanPham.xoa(id);
    if (kq.ok) {
        hienThongBao('thong-bao-menu', '✅ Đã ẩn sản phẩm khỏi menu!', true);
        taiDanhSachMenu();
    } else {
        hienThongBao('thong-bao-menu', `❌ ${kq.loi}`, false);
    }
}

// ===== TRANG GỌI MÓN & THANH TOÁN =====
async function taiTrangOrder() {
    // Tải danh sách bàn vào combobox
    const kqBan = await ApiBan.layTatCa();
    if (kqBan.ok) {
        const select = document.getElementById('chon-ban-order');
        select.innerHTML = '<option value="">-- Chọn bàn --</option>' +
            kqBan.data.map(b => `<option value="${b.id}">${b.tenBan} (${b.trangThai})</option>`).join('');
        danhSachBan = kqBan.data;
    }

    // Tải danh sách sản phẩm đang bán
    const kqSP = await ApiSanPham.layDangBan();
    if (kqSP.ok) {
        danhSachSanPham = kqSP.data;
        const select = document.getElementById('chon-san-pham');
        select.innerHTML = '<option value="">-- Chọn món --</option>' +
            kqSP.data.map(sp => `
                <option value="${sp.id}" data-loai="${sp.loai}" data-gia="${sp.giaCoBan}">
                    ${sp.loai === 'ThucUong' ? '🥤' : '🍽️'} ${sp.tenSanPham} - ${dinhDangTien(sp.giaCoBan)}
                </option>
            `).join('');
    }
}

async function chonBanOrder() {
    const banId = parseInt(document.getElementById('chon-ban-order').value);
    if (!banId) {
        banDangChon = null;
        hoaDonHienTai = null;
        document.getElementById('khu-vuc-hoa-don').style.display = 'none';
        document.getElementById('khu-vuc-mo-ban').style.display = 'none';
        return;
    }

    const ban = danhSachBan.find(b => b.id === banId);
    banDangChon = ban;

    if (ban.trangThai === 'Trống') {
        // Bàn trống: hiện nút mở bàn
        document.getElementById('khu-vuc-hoa-don').style.display = 'none';
        document.getElementById('khu-vuc-mo-ban').style.display = 'block';
        document.getElementById('ten-ban-mo').textContent = ban.tenBan;
    } else {
        // Bàn có khách: lấy hóa đơn hiện tại
        document.getElementById('khu-vuc-mo-ban').style.display = 'none';
        await taiHoaDonHienTai(banId);
    }
}

async function moBan() {
    if (!banDangChon) return;

    const kq = await ApiHoaDon.moBan(banDangChon.id);
    if (kq.ok) {
        hienThongBao('thong-bao-order', `✅ Đã mở ${banDangChon.tenBan}!`, true);
        document.getElementById('khu-vuc-mo-ban').style.display = 'none';
        // Cập nhật combobox và tải hóa đơn
        await taiTrangOrder();
        document.getElementById('chon-ban-order').value = banDangChon.id;
        await taiHoaDonHienTai(banDangChon.id);
    } else {
        hienThongBao('thong-bao-order', `❌ ${kq.loi}`, false);
    }
}

async function taiHoaDonHienTai(banId) {
    const kq = await ApiHoaDon.layHoaDonCuaBan(banId);
    if (!kq.ok) {
        document.getElementById('khu-vuc-hoa-don').style.display = 'none';
        return;
    }

    hoaDonHienTai = kq.data;
    document.getElementById('khu-vuc-hoa-don').style.display = 'block';
    document.getElementById('ten-ban-hoa-don').textContent = hoaDonHienTai.tenBan;
    document.getElementById('gio-mo-ban').textContent = dinhDangNgayGio(hoaDonHienTai.thoiGianTao);

    await taiDanhSachMonDaGoi();
}

async function taiDanhSachMonDaGoi() {
    if (!hoaDonHienTai) return;

    const kq = await ApiChiTiet.layTheoHoaDon(hoaDonHienTai.id);
    const container = document.getElementById('danh-sach-mon-goi');

    if (!kq.ok || !kq.data.length) {
        container.innerHTML = '<div class="dang-tai">Chưa có món nào được gọi.</div>';
        document.getElementById('so-tong-tien').textContent = dinhDangTien(0);
        return;
    }

    let tongTien = 0;
    container.innerHTML = kq.data.map(ct => {
        tongTien += ct.thanhTien;
        return `
        <div class="dong-mon">
            <div>
                <strong>${ct.tenSanPham}</strong>
                ${ct.thuocTinhThem ? `<span class="chu-nho"> • ${ct.thuocTinhThem}</span>` : ''}
                <div class="chu-nho">x${ct.soLuong} × ${dinhDangTien(ct.donGiaBan)}</div>
            </div>
            <div class="flex-hang">
                <span class="gia-tien">${dinhDangTien(ct.thanhTien)}</span>
                <button class="btn btn-do btn-nho" onclick="xoaMonTrongHoaDon(${ct.id})">✕</button>
            </div>
        </div>
    `}).join('');

    document.getElementById('so-tong-tien').textContent = dinhDangTien(tongTien);
}

// Khi chọn sản phẩm: kiểm tra nếu là thức uống thì hiện tùy chọn size
function kiemTraLoaiSanPham() {
    const select = document.getElementById('chon-san-pham');
    const option = select.options[select.selectedIndex];
    const loai = option?.dataset?.loai || '';
    const khuVucSize = document.getElementById('khu-vuc-tuy-chon');
    khuVucSize.style.display = loai === 'ThucUong' ? 'block' : 'none';
}

async function themMonVaoHoaDon() {
    if (!hoaDonHienTai) {
        hienThongBao('thong-bao-order', '⚠️ Vui lòng chọn bàn và mở hóa đơn trước.', false);
        return;
    }

    const sanPhamId = parseInt(document.getElementById('chon-san-pham').value);
    const soLuong = parseInt(document.getElementById('so-luong').value);
    const size = document.getElementById('chon-size').value;
    const ghiChu = document.getElementById('ghi-chu').value.trim();

    if (!sanPhamId) { hienThongBao('thong-bao-order', '⚠️ Vui lòng chọn món.', false); return; }
    if (!soLuong || soLuong <= 0) { hienThongBao('thong-bao-order', '⚠️ Số lượng phải >= 1.', false); return; }

    // Kết hợp size và ghi chú vào thuộc tính thêm
    let thuocTinhThem = '';
    if (size) thuocTinhThem += size;
    if (ghiChu) thuocTinhThem += (thuocTinhThem ? ', ' : '') + ghiChu;

    const kq = await ApiChiTiet.themMon({
        hoaDonId: hoaDonHienTai.id,
        sanPhamId,
        soLuong,
        thuocTinhThem: thuocTinhThem || null
    });

    if (kq.ok) {
        hienThongBao('thong-bao-order', `✅ Đã thêm món! Đơn giá: ${dinhDangTien(kq.data.donGiaBan)}`, true);
        // Reset form chọn món
        document.getElementById('chon-san-pham').value = '';
        document.getElementById('so-luong').value = '1';
        document.getElementById('chon-size').value = '';
        document.getElementById('ghi-chu').value = '';
        document.getElementById('khu-vuc-tuy-chon').style.display = 'none';
        await taiDanhSachMonDaGoi();
    } else {
        hienThongBao('thong-bao-order', `❌ ${kq.loi}`, false);
    }
}

async function xoaMonTrongHoaDon(chiTietId) {
    if (!confirm('Bạn có chắc muốn xóa món này?')) return;

    const kq = await ApiChiTiet.xoaMon(chiTietId);
    if (kq.ok) {
        await taiDanhSachMonDaGoi();
        // Cập nhật lại tổng tiền trong hóa đơn
        const kqHD = await ApiHoaDon.layHoaDonCuaBan(banDangChon.id);
        if (kqHD.ok) hoaDonHienTai = kqHD.data;
    } else {
        hienThongBao('thong-bao-order', `❌ ${kq.loi}`, false);
    }
}

async function thanhToan() {
    if (!banDangChon || !hoaDonHienTai) return;

    const tongTienText = document.getElementById('so-tong-tien').textContent;
    if (!confirm(`Xác nhận thanh toán ${tongTienText} cho ${hoaDonHienTai.tenBan}?`)) return;

    const kq = await ApiHoaDon.thanhToan(banDangChon.id);
    if (kq.ok) {
        hienThongBao('thong-bao-order', `✅ Thanh toán thành công! ${hoaDonHienTai.tenBan} đã được giải phóng.`, true);
        // Reset giao diện
        hoaDonHienTai = null;
        banDangChon = null;
        document.getElementById('khu-vuc-hoa-don').style.display = 'none';
        await taiTrangOrder();
        document.getElementById('chon-ban-order').value = '';
    } else {
        hienThongBao('thong-bao-order', `❌ ${kq.loi}`, false);
    }
}

// ===== LỊCH SỬ HÓA ĐƠN =====
async function taiLichSu() {
    const tbody = document.getElementById('bang-lich-su-body');
    tbody.innerHTML = '<tr><td colspan="6" class="dang-tai">Đang tải lịch sử...</td></tr>';

    const kq = await ApiHoaDon.layTatCa();
    if (!kq.ok) {
        tbody.innerHTML = `<tr><td colspan="6" class="thong-bao loi" style="display:block">❌ ${kq.loi}</td></tr>`;
        return;
    }

    if (!kq.data.length) {
        tbody.innerHTML = '<tr><td colspan="6" class="dang-tai">Chưa có hóa đơn nào.</td></tr>';
        return;
    }

    tbody.innerHTML = kq.data.map(hd => `
        <tr>
            <td>#${hd.id}</td>
            <td>${hd.tenBan}</td>
            <td>${dinhDangNgayGio(hd.thoiGianTao)}</td>
            <td>${dinhDangNgayGio(hd.thoiGianThanhToan)}</td>
            <td class="gia-tien">${dinhDangTien(hd.tongTien)}</td>
            <td>
                <span class="badge ${hd.trangThai === 'Đã thanh toán' ? 'badge-da-tt' : 'badge-chua-tt'}">
                    ${hd.trangThai}
                </span>
            </td>
        </tr>
    `).join('');
}

// ===== KHỞI ĐỘNG =====
document.addEventListener('DOMContentLoaded', () => {
    chuyenTab('ban'); // Mở tab Quản lý Bàn đầu tiên
});
