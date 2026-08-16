import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Tag,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

import "../css/Home.css";
import BottomNav from "../../../components/jsx/BottomNav";

import starIcon from "../../../assets/images/star.svg";
import emptyStarIcon from "../../../assets/images/emptystar.svg";
import visitIcon from "../../../assets/images/visit_icon.svg";
import airplaneWhite from "../../../assets/images/airplane_white.svg";

const VISIT_CARD_STORAGE_KEY = "wtw-visit-card";

const getSavedVisitCardData = () => {
  try {
    const savedData = localStorage.getItem(VISIT_CARD_STORAGE_KEY);

    return savedData ? JSON.parse(savedData) : null;
  } catch {
    return null;
  }
};

function Home() {
  const navigate = useNavigate();
  const [visitCardData] = useState(getSavedVisitCardData);
  const [products, setProducts] = useState([
    { id: 1, name: "제품명", liked: true },
    { id: 2, name: "제품명", liked: false },
    { id: 3, name: "제품명", liked: false },
    { id: 4, name: "제품명", liked: true },
  ]);

  const hasVisitCard = Boolean(visitCardData?.store);
  const boardingTime = visitCardData?.visitTimeUndecided
    ? "정해지지 않음"
    : visitCardData?.visitTime;

  const handleVisitCard = () => {
    navigate("/visit-card");
  };

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
    <div className="home-page">
      <main className="home-main">
        {/* 인사 영역 */}
        <section className="home-greeting">
          <p className="home-welcome">
            Welcome to MCM
          </p>

          {hasVisitCard && (
            <h1 className="home-customer-name">
              000 고객님
            </h1>
          )}
        </section>

        <div className="home-divider" />

        {hasVisitCard ? (
          <section className="home-storyboard" aria-label="생성된 Visit Card">
            <div className="home-storyboard-title">MCM Style Storyboard</div>

            <div className="home-storyboard-ticket">
              <div className="home-storyboard-meta">
                <div>
                  <p>000 고객님</p>
                  <p>{visitCardData.visitDate}</p>
                </div>

                <img src={visitIcon} alt="" className="home-storyboard-stamp" />
              </div>

              <div className="home-storyboard-line" />

              <h2>{visitCardData.store}</h2>

              <div className="home-storyboard-time">
                <span>Boarding Time</span>
                <strong>{boardingTime}</strong>
              </div>
            </div>

            <div className="home-storyboard-route">
              <strong>Life</strong>
              <span className="home-storyboard-dot" />
              <span className="home-storyboard-route-line left-line" />
              <img src={airplaneWhite} alt="" />
              <span className="home-storyboard-route-line right-line" />
              <span className="home-storyboard-dot" />
              <strong>MCM</strong>
            </div>
          </section>
        ) : (
          <section className="home-visit-card">
            <h2 className="home-visit-title">
              Visit Card
            </h2>

            <div className="home-visit-line" />

            <p className="home-visit-description">
              오늘 찾는 제품과 목적을 입력하면
              <br />
              AI가 맞춤 Visit Card를 생성해드립니다.
            </p>

            <button
              type="button"
              className="home-visit-button"
              onClick={handleVisitCard}
            >
              <span>
                Visit Card 생성하러 가기
              </span>

              <ArrowRight
                size={18}
                strokeWidth={1.8}
              />
            </button>
          </section>
        )}

        {hasVisitCard && (
          <section className="home-recommended-section">
            <h2 className="home-best-title">맞춤 제품 추천</h2>

            <div className="home-product-card">
              <Tag
                size={24}
                strokeWidth={1.6}
                className="home-product-tag"
              />

              <span className="home-product-name">제품명</span>

              <button
                type="button"
                className="home-recommended-more-button"
                onClick={() => navigate("/zone-detail")}
                aria-label="맞춤 추천 존 상세 보기"
              >
                <ChevronRight size={28} strokeWidth={1.7} />
              </button>
            </div>
          </section>
        )}

        <div className="home-divider home-divider-products" />

        {/* Best Product */}
        <section className="home-best-section">
          <h2 className="home-best-title">
            MCM 베스트 상품
          </h2>

          <div className="home-product-list">
            {products.map((product) => (
              <div
                className="home-product-card"
                key={product.id}
              >
                <Tag
                  size={24}
                  strokeWidth={1.6}
                  className="home-product-tag"
                />

                <span className="home-product-name">
                  {product.name}
                </span>

                <button
                  type="button"
                  className="home-product-star-button"
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
                    className="home-product-star"
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

export default Home;
