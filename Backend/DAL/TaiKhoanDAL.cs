using Microsoft.Data.Sqlite;
using Backend.Interfaces;

namespace Backend.DAL
{
    public class TaiKhoanDAL : ITaiKhoanDAL
    {
        public bool KiemTraDangNhap(string tenDangNhap, string matKhau)
        {
            using var ketNoi = new SqliteConnection(DatabaseHelper.ChuoiKetNoi);
            ketNoi.Open();

            var lenh = ketNoi.CreateCommand();
            lenh.CommandText = "SELECT COUNT(*) FROM TaiKhoan WHERE TenDangNhap = $tenDangNhap AND MatKhau = $matKhau;";
            lenh.Parameters.AddWithValue("$tenDangNhap", tenDangNhap);
            lenh.Parameters.AddWithValue("$matKhau", matKhau);

            var count = (long)(lenh.ExecuteScalar() ?? 0);
            return count > 0;
        }
    }
}
