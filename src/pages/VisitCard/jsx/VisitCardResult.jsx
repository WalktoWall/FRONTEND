import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ChevronRight,
} from "lucide-react";

import "../css/VisitCardResult.css";
import BottomNav from "../../../components/jsx/BottomNav";

import visitIconAI from "../../../assets/images/visit_icon_AI.svg";
import airplaneBlack from "../../../assets/images/airplane_black.svg";
import bagIcon from "../../../assets/images/bag.svg";
import starIcon from "../../../assets/images/star.svg";
import emptyStarIcon from "../../../assets/images/emptystar.svg";

function VisitCardResult() {
  const navigate = useNavigate();

  // =========================
  // 추천 동선
  // =========================
  const routeItems = [
    "여성존",
    "신상품존",
    "라이프스타일존",
  ];

  // =========================
  // 추천 상품
  // =========================
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "제품명",
      liked: true,
    },
    {
      id: 2,
      name: "제품명",
      liked: true,
    },
  ]);

  // =========================
  // Visit Card 정보
  // =========================
  const visitInfo = [
    {
      label: "방문 매장",
      value: "MCM 청담 플래그십 스토어",
    },
    {
      label: "방문 목적",
      value: "가방 쇼핑",
    },
    {
      label: "오늘의 무드",
      value: "클래식",
    },
    {
      label: "원하는 제품",
      value: "토트백",
    },
    {
      label: "직원 서비스",
      value: "안받음",
    },
  ];

  // =========================
  // 위시리스트 별 클릭
  // =========================
  const handleStarClick = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              liked: !product.liked,
            }
          : product
      )
    );
  };

  return (
    <div className="visit-result-page">
      <main className="visit-result-main">

        {/* =========================
            인사 영역
        ========================= */}
        <section className="visit-result-greeting">
          <p className="visit-result-welcome">
            Welcome to MCM
          </p>

          <h1 className="visit-result-name">
            000고객님
          </h1>
        </section>

        <div className="visit-result-divider" />

        {/* =========================
            VISIT CARD
        ========================= */}
        <section className="visit-result-card">

          {/* 카드 상단 */}
          <div className="visit-result-card-top">
            <div>
              <h2 className="visit-result-card-title">
                MCM Visit Card
              </h2>

              <p className="visit-result-card-date">
                Date. 2026.08.25
              </p>
            </div>

            <img
              src={visitIconAI}
              alt=""
              className="visit-result-stamp-image"
            />
          </div>

          {/* =========================
              방문 정보
          ========================= */}
          <div className="visit-result-info-area">
            {visitInfo.map((info) => (
              <div
                className="visit-result-info-row"
                key={info.label}
              >
                <span className="visit-result-info-label">
                  {info.label}
                </span>

                <span className="visit-result-info-value">
                  {info.value}
                </span>
              </div>
            ))}
          </div>

          {/* =========================
              LIFE → MCM
          ========================= */}
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

        {/* =========================
            AI 분석
        ========================= */}
        <section className="visit-result-ai-section">
          <p className="visit-result-ai-label">
            AI가 분석한 오늘의 여행
          </p>

          <p className="visit-result-ai-text">
            청담 플래그십에서의 클래식 감성
          </p>
        </section>

        <div className="visit-result-divider visit-result-divider-small" />

        {/* =========================
            추천 동선
        ========================= */}
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
                <span className="visit-result-route-box">
                  {item}
                </span>

                {index !== routeItems.length - 1 && (
                  <span className="visit-result-route-arrow">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="visit-result-divider visit-result-divider-small" />

        {/* =========================
            추천 상품
        ========================= */}
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
                {/* 가방 이미지 */}
                <img
                  src={bagIcon}
                  alt=""
                  className="visit-result-product-icon"
                />

                <span className="visit-result-product-name">
                  {product.name}
                </span>

                {/* 별 버튼 */}
                <button
                  type="button"
                  className="visit-result-star-button"
                  onClick={() =>
                    handleStarClick(product.id)
                  }
                  aria-label={
                    product.liked
                      ? "위시리스트에서 제거"
                      : "위시리스트에 추가"
                  }
                >
                  <img
                    src={
                      product.liked
                        ? starIcon
                        : emptyStarIcon
                    }
                    alt=""
                    className="visit-result-star-icon"
                  />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

export default VisitCardResult;
