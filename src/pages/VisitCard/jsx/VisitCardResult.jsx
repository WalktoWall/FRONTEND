import { useNavigate } from "react-router-dom";

import {
  Home,
  QrCode,
  ScanLine,
  UserRound,
  ChevronRight,
  ShoppingBag,
  Star,
} from "lucide-react";

import "../css/VisitCardResult.css";

import visitIconAI from "../../../assets/images/visit_icon_AI.svg";
import airplaneBlack from "../../../assets/images/airplane_black.svg";

function VisitCardResult() {
  const navigate = useNavigate();

  const routeItems = ["백팩 존", "토트백 존", "액세서리 존"];

  const products = [
    { id: 1, name: "제품명" },
    { id: 2, name: "제품명" },
  ];

  return (
    <div className="visit-result-page">
      <main className="visit-result-main">
        {/* 인사 영역 */}
        <section className="visit-result-greeting">
          <p className="visit-result-welcome">
            Welcome to MCM
          </p>

          <h1 className="visit-result-name">
            000고객님
          </h1>
        </section>

        <div className="visit-result-divider" />

        {/* Visit Card */}
        <section className="visit-result-card">
          {/* 상단 카드 */}
          <div className="visit-result-card-top">
            <div>
              <h2 className="visit-result-card-title">
                MCM Visit Card
              </h2>

              <p className="visit-result-card-date">
                Date. 2026.08.25
              </p>
            </div>

            {/* 우측 상단 AI 아이콘 */}
            <img
              src={visitIconAI}
              alt=""
              className="visit-result-stamp-image"
            />
          </div>

          {/* 방문 정보 */}
          <div className="visit-result-info-area">
            <div className="visit-result-info-row">
              <span className="visit-result-info-label">
                방문 매장
              </span>
            </div>

            <div className="visit-result-info-row">
              <span className="visit-result-info-label">
                방문 목적
              </span>
            </div>

            <div className="visit-result-info-row">
              <span className="visit-result-info-label">
                오늘의 무드
              </span>
            </div>

            <div className="visit-result-info-row">
              <span className="visit-result-info-label">
                원하는 제품
              </span>
            </div>

            <div className="visit-result-info-row">
              <span className="visit-result-info-label">
                직원 서비스
              </span>
            </div>
          </div>

          {/* Life → MCM */}
          <div className="visit-result-life">
            <span className="visit-result-life-label">
              Life
            </span>

            <div className="visit-result-life-route">
              <span className="visit-result-life-dot" />

              <span className="visit-result-life-line left-line" />

              <img
                src={airplaneBlack}
                alt=""
                className="visit-result-life-plane"
              />

              <span className="visit-result-life-line right-line" />

              <span className="visit-result-life-dot" />
            </div>

            <span className="visit-result-life-label">
              MCM
            </span>
          </div>
        </section>

        {/* 추천 동선 */}
        <section className="visit-result-route-section">
          <h2 className="visit-result-section-title">
            MCM 추천 동선
          </h2>

          <div className="visit-result-route-list">
            {routeItems.map((item, index) => (
              <div
                className="visit-result-route-item"
                key={item}
              >
                <span>{item}</span>

                {index !== routeItems.length - 1 && (
                  <ChevronRight
                    size={17}
                    strokeWidth={1.5}
                    className="visit-result-route-arrow"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="visit-result-divider visit-result-divider-small" />

        {/* 추천 상품 */}
        <section className="visit-result-products-section">
          <div className="visit-result-products-header">
            <div>
              <h2 className="visit-result-section-title">
                MCM 추천 상품
              </h2>

              <p className="visit-result-products-description">
                입력해주신 정보와 어울리는 MCM 상품을 추천해드립니다.
              </p>
            </div>

            <button
              type="button"
              className="visit-result-more-button"
            >
              더보기

              <ChevronRight
                size={13}
                strokeWidth={1.5}
              />
            </button>
          </div>

          <div className="visit-result-product-list">
            {products.map((product) => (
              <div
                className="visit-result-product-card"
                key={product.id}
              >
                <ShoppingBag
                  size={27}
                  strokeWidth={1.7}
                  className="visit-result-product-icon"
                />

                <span className="visit-result-product-name">
                  {product.name}
                </span>

                <button
                  type="button"
                  className="visit-result-star-button"
                  aria-label="위시리스트"
                >
                  <Star
                    size={24}
                    strokeWidth={1.4}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 하단 네비게이션 */}
      <nav className="visit-result-bottom-nav">
        <button
          type="button"
          className="visit-result-nav-item"
          onClick={() => navigate("/")}
          aria-label="홈"
        >
          <Home
            size={27}
            strokeWidth={1.8}
          />
        </button>

        <button
          type="button"
          className="visit-result-nav-item"
          onClick={() => navigate("/qr")}
          aria-label="QR"
        >
          <QrCode
            size={27}
            strokeWidth={1.8}
          />
        </button>

        <button
          type="button"
          className="visit-result-nav-item"
          onClick={() => navigate("/scan")}
          aria-label="스캔"
        >
          <ScanLine
            size={28}
            strokeWidth={1.8}
          />
        </button>

        <button
          type="button"
          className="visit-result-nav-item"
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

export default VisitCardResult;