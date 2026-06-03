using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ITaiKhoanDAL _taiKhoanDAL;

        public AuthController(ITaiKhoanDAL taiKhoanDAL)
        {
            _taiKhoanDAL = taiKhoanDAL;
        }

        [HttpPost("dang-nhap")]
        public IActionResult DangNhap([FromBody] TaiKhoan tk)
        {
            if (string.IsNullOrEmpty(tk.TenDangNhap) || string.IsNullOrEmpty(tk.MatKhau))
            {
                return BadRequest("Tên đăng nhập và mật khẩu không được để trống.");
            }

            bool hopLe = _taiKhoanDAL.KiemTraDangNhap(tk.TenDangNhap, tk.MatKhau);
            if (hopLe)
            {
                return Ok(new { success = true, message = "Đăng nhập thành công" });
            }
            else
            {
                return BadRequest("Sai tên đăng nhập hoặc mật khẩu.");
            }
        }
    }
}
