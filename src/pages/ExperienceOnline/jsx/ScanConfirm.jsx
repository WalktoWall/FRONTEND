import "../css/ScanConfirm.css";

import { useNavigate } from "react-router-dom";

import {
  ChevronLeft,
  Home,
  QrCode,
  ScanLine,
  UserRound,
} from "lucide-react";

import visitIcon from "../../../assets/images/visit_icon.svg";

function ScanConfirm() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    console.log("제품 확인 완료");

    navigate("/scan/result");
  };

  return (
    <div className="scan-confirm-page">
      {/* 상단 */}
      <header className="scan-confirm-header">
        <button
          type="button"
          className="scan-confirm-back"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          <ChevronLeft size={24} strokeWidth={1.6} />
        </button>
      </header>

      {/* 메인 */}
      <main className="scan-confirm-main">
        <h1 className="scan-confirm-title">
          스캔하신 제품이 맞는지 한번 더
          <br />
          확인 부탁드립니다.
        </h1>

        {/* 제품 카드 */}
        <section className="scan-confirm-card">
          <div className="scan-confirm-image-area">
            <span className="scan-confirm-image-text">
              제품 사진
            </span>
          </div>

          <div className="scan-confirm-product-name">
            제품 이름
          </div>

          <img
            src={visitIcon}
            alt=""
            className="scan-confirm-visit-icon"
          />
        </section>

        <button
          type="button"
          className="scan-confirm-button"
          onClick={handleConfirm}
        >
          확인
        </button>
      </main>

      {/* 하단 네비 */}
      <nav className="scan-confirm-bottom-nav">
        <button
          type="button"
          className="scan-confirm-nav-item"
          onClick={() => navigate("/")}
          aria-label="홈"
        >
          <Home size={25} strokeWidth={1.7} />
        </button>

        <button
          type="button"
          className="scan-confirm-nav-item"
          onClick={() => navigate("/qr")}
          aria-label="QR"
        >
          <QrCode size={25} strokeWidth={1.7} />
        </button>

        <button
          type="button"
          className="scan-confirm-nav-item"
          onClick={() => navigate("/product-record")}
          aria-label="스캔"
        >
          <ScanLine size={26} strokeWidth={1.7} />
        </button>

        <button
          type="button"
          className="scan-confirm-nav-item"
          onClick={() => navigate("/mypage")}
          aria-label="마이페이지"
        >
          <UserRound size={25} strokeWidth={1.7} />
        </button>
      </nav>
    </div>
  );
}

export default ScanConfirm;