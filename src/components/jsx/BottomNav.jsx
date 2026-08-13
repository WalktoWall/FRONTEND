import React from "react";
import { useNavigate } from "react-router-dom";

import "../css/bottomNav.css";

import human from "/src/assets/images/human.svg";
import qr from "/src/assets/images/qr.svg";
import scan from "/src/assets/images/scan.svg";
import home from "/src/assets/images/home.svg";

function BottomNav() {
  const navigate = useNavigate();

  return (
    <nav className="product-record-bottom-nav">
      <button
        type="button"
        className="product-record-nav-item"
        onClick={() => navigate("/")}
        aria-label="홈"
      >
        <img src={home} alt="홈" className="tag-scan-nav-icon" />
      </button>

      <button
        type="button"
        className="product-record-nav-item"
        onClick={() => navigate("/qr")}
        aria-label="QR"
      >
        <img src={qr} alt="QR" className="tag-scan-nav-icon" />
      </button>

      <button
        type="button"
        className="product-record-nav-item"
        onClick={() => navigate("/scan")}
        aria-label="스캔"
      >
        <img src={scan} alt="스캔" className="tag-scan-nav-icon" />
      </button>

      <button
        type="button"
        className="product-record-nav-item"
        onClick={() => navigate("/mypage")}
        aria-label="마이페이지"
      >
        <img src={human} alt="마이페이지" className="tag-scan-nav-icon" />
      </button>
    </nav>
  );
}

export default BottomNav;
