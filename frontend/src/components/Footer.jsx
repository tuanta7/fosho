const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-100 text-base-content border-t border-base-200">
      <aside>
        <a className="text-xl min-w-24">
          <img src="/text-logo.png" alt="logo" className="w-24" />
        </a>
        <p>
          Fosho&reg;
          <br />
          Từ 2024
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Chăm sóc khách hàng</h6>
        <a className="link link-hover">Hướng dẫn đặt hàng</a>
        <a className="link link-hover">Hướng dẫn bán hàng</a>
        <a className="link link-hover">Thanh toán</a>
        <a className="link link-hover">Vận chuyển</a>
      </nav>
      <nav>
        <h6 className="footer-title">Điều khoản</h6>
        <a className="link link-hover">Điều khoản sử dụng</a>
        <a className="link link-hover">Chính sách bảo mật</a>
        <a className="link link-hover">Chính sách Cookies</a>
      </nav>
      <nav>
        <h6 className="footer-title">Về Fosho</h6>
        <a className="link link-hover">Giới thiệu</a>
        <a className="link link-hover">Liên hệ</a>
        <a className="link link-hover">Tuyển dụng</a>
      </nav>
    </footer>
  );
};

export default Footer;
