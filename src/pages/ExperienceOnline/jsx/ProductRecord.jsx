import "../css/ProductRecord.css";

import { useNavigate } from "react-router-dom";

import { ChevronLeft } from "lucide-react";
import BottomNav from "../../../components/jsx/BottomNav";

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

      <BottomNav />
    </div>
  );
}

export default ProductRecord;
