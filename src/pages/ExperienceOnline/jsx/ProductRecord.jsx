import "../css/ProductRecord.css";

import { useNavigate } from "react-router-dom";

import {
  ChevronLeft,
  Home,
  QrCode,
  ScanLine,
  UserRound,
} from "lucide-react";

function ProductRecord() {
  const navigate = useNavigate();

  return (
    <div className="product-record-page">
      {/* 상단 */}
      <header className="product-record-header">
        <button
          type="button"
          className="product-record-back"
          onClick={() => navigate("/")}
          aria-label="홈으로 돌아가기"
        >
          <ChevronLeft
            size={28}
            strokeWidth={1.5}
          />
        </button>
      </header>

      {/* 메인 */}
      <main className="product-record-main">
        <section className="product-record-text">
          <h1>
            제품 기록하기
          </h1>

          <p>
            마음이 드는 제품 태그를 스캔해주세요.
            <br />
            서비스에 기록할 수 있습니다.
          </p>
        </section>

        <button
          type="button"
          className="product-record-scan-button"
          onClick={() => navigate("/scan")}
        >
          태그 스캔하기
        </button>
      </main>

      {/* 하단 네비게이션 */}
      <nav className="product-record-bottom-nav">
        {/* 홈 */}
        <button
          type="button"
          className="product-record-nav-item"
          onClick={() => navigate("/")}
          aria-label="홈"
        >
          <Home
            size={27}
            strokeWidth={1.8}
          />
        </button>

        {/* QR */}
        <button
          type="button"
          className="product-record-nav-item"
          onClick={() => navigate("/qr")}
          aria-label="QR"
        >
          <QrCode
            size={27}
            strokeWidth={1.8}
          />
        </button>

        {/* 제품 기록 */}
        <button
          type="button"
          className="product-record-nav-item"
          onClick={() => navigate("/product-record")}
          aria-label="제품 기록"
        >
          <ScanLine
            size={28}
            strokeWidth={1.8}
          />
        </button>

        {/* 마이페이지 */}
        <button
          type="button"
          className="product-record-nav-item"
          onClick={() => navigate("/mypage")}
          aria-label="마이페이지"
        >
          <UserRound
            size={27}
            strokeWidth={1.8}
          />
        </button>
      </nav>
    </div>
  );
}

export default ProductRecord;