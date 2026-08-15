import { useNavigate } from "react-router-dom";

import homeIcon from "../../assets/images/home.svg";
import qrIcon from "../../assets/images/qr.svg";
import scanIcon from "../../assets/images/scan.svg";
import humanIcon from "../../assets/images/human.svg";

import "../css/BottomNav.css";

function BottomNav() {
  const navigate = useNavigate();

  return (
    <nav className="product-record-bottom-nav" aria-label="하단 네비게이션">
      <button
        type="button"
        className="product-record-nav-item"
        aria-label="홈으로 이동"
        onClick={() => navigate("/home")}
      >
        <img src={homeIcon} alt="" />
      </button>

      <button
        type="button"
        className="product-record-nav-item"
        aria-label="QR 화면으로 이동"
        onClick={() => navigate("/qr")}
      >
        <img src={qrIcon} alt="" />
      </button>

      <button
        type="button"
        className="product-record-nav-item"
        aria-label="태그 스캔 화면으로 이동"
        onClick={() => navigate("/scan")}
      >
        <img src={scanIcon} alt="" />
      </button>

      <button
        type="button"
        className="product-record-nav-item"
        aria-label="마이페이지로 이동"
        onClick={() => navigate("/mypage")}
      >
        <img src={humanIcon} alt="" />
      </button>
    </nav>
  );
}

export default BottomNav;
