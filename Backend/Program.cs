using Backend.DAL;
using Backend.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Đăng ký Controllers
builder.Services.AddControllers();

// ============================================================
// TÍNH TRỪU TƯỢNG: Đăng ký các Interface với class cụ thể.
// Controller chỉ biết về Interface, không biết class thật.
// ============================================================
builder.Services.AddScoped<ISanPhamDAL, SanPhamDAL>();
builder.Services.AddScoped<IBanDAL, BanDAL>();
builder.Services.AddScoped<IHoaDonDAL, HoaDonDAL>();
builder.Services.AddScoped<IChiTietHoaDonDAL, ChiTietHoaDonDAL>();

// Cho phép Frontend HTML/JS gọi API (CORS - tắt giới hạn origin)
builder.Services.AddCors(options =>
{
    options.AddPolicy("ChoPhepTatCa", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Khởi tạo CSDL SQLite và nạp dữ liệu mẫu khi khởi động
DatabaseHelper.KhoiTaoCSDL();

app.UseCors("ChoPhepTatCa");

// Phục vụ file tĩnh: Frontend HTML/JS/CSS từ thư mục "wwwroot"
app.UseStaticFiles();

app.UseRouting();
app.MapControllers();

// Khi truy cập "/" thì trả về index.html
app.MapFallbackToFile("index.html");

Console.WriteLine("=== Quán Cafe đang chạy tại http://localhost:5000 ===");
Console.WriteLine("=== Nhấn Ctrl+C để tắt server ===");

app.Run("http://localhost:5000");
