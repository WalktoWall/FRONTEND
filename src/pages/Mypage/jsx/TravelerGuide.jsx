import {
  ChevronLeft,
  Home,
  QrCode,
  ScanLine,
  UserRound,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "../css/TravelerGuide.css";

function TravelerGuide() {
  const navigate = useNavigate();

  return (
    <div className="traveler-guide-page">
      {/* 상단 */}
      <header className="traveler-guide-header">
        <button
          type="button"
          className="traveler-guide-back"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          <ChevronLeft size={28} strokeWidth={1.7} />
        </button>
      </header>

      <main className="traveler-guide-main">
        <section className="traveler-guide-title-section">
          <h1 className="traveler-guide-title">
            여행객이신가요?
          </h1>

          <p className="traveler-guide-subtitle">
            면세, 환율, 배송 관련 안내를 참고해주세요.
          </p>
        </section>

        {/* 면세 */}
        <section className="traveler-guide-card">
          <h2 className="traveler-guide-card-title">
            면세 안내
          </h2>

          <ul className="traveler-guide-list">
            <li>
              사후면세 가맹점에서 3만원 이상 구매 시 환급 대상
            </li>

            <li>
              즉시환급(매장에서 여권 제시, 세금 뺀 금액 결제)
              <br />
              / 사후환급 / 공항환급 중 선택 가능
            </li>

            <li>
              즉시환급 한도 : 1회 100만원 · 체류기간 내 총 500만원
            </li>

            <li>
              수수료 제외 시 실환급률은 구매금액의 약 6% 수준
            </li>

            <li>
              구매 후 90일 이내 출국 시에만 환급 가능,
              출국 세관에서 반출확인 필요
            </li>
          </ul>
        </section>

        {/* 환율 */}
        <section className="traveler-guide-card">
          <h2 className="traveler-guide-card-title">
            환율 안내
          </h2>

          <ul className="traveler-guide-list">
            <li>
              오늘 본 상품 가격을 참고 환율로 본국 통화 환산해 표시
              <br />
              (실시간 환율 아님)
            </li>

            <li>
              해외카드 결제 시 원화(KRW) 결제를 선택하세요
              <br />
              - 현지 통화로 결제하면 환전 수수료가 추가로 붙어요
            </li>
          </ul>
        </section>

        {/* 배송 */}
        <section className="traveler-guide-card">
          <h2 className="traveler-guide-card-title">
            배송 안내
          </h2>

          <ul className="traveler-guide-list">
            <li>
              MCM 매장 자체 해외 배송은 제공하지 않아요.
            </li>

            <li>
              온라인몰 재고 확인 후 재주문 → 숙소 국내 배송 또는
              <br />
              배송대행(포워딩) 서비스 이용을 안내해드려요.
            </li>
          </ul>
        </section>

        <p className="traveler-guide-notice">
          정확한 금액 · 절차는 출국 시점 세관 · 매장 안내가 우선이며,
          <br />
          위 내용은 참고용임을 확인 부탁드립니다.
        </p>
      </main>

      {/* 하단 네비 */}
      <nav className="traveler-guide-bottom-nav">
        <button
          type="button"
          className="traveler-guide-nav-item"
          onClick={() => navigate("/")}
          aria-label="홈"
        >
          <Home size={29} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          className="traveler-guide-nav-item"
          onClick={() => navigate("/qr")}
          aria-label="QR"
        >
          <QrCode size={29} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          className="traveler-guide-nav-item"
          onClick={() => navigate("/scan")}
          aria-label="스캔"
        >
          <ScanLine size={30} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          className="traveler-guide-nav-item"
          onClick={() => navigate("/mypage")}
          aria-label="마이페이지"
        >
          <UserRound size={29} strokeWidth={1.8} />
        </button>
      </nav>
    </div>
  );
}

export default TravelerGuide;