import { useLocation, useNavigate } from "react-router-dom";

import BottomNav from "../../../components/jsx/BottomNav";
import visitIconAI from "../../../assets/images/visit_icon_AI.svg";
import backIcon from "../../../assets/images/backBtn_brown.svg";

import "../css/ZoneDetail.css";

const MOCK_RECOMMENDATION = {
  zoneName: "토트백 존",
  zoneDescription:
    "MCM 제품 중 오늘의 고객님과 가장 어울리는 토트백 제품을 추천해드립니다.",
  productName: "Aren 토트백",
  productDescription: "여행 갈 때 가장 인기 있는 MCM 토트백",
  location: "토트백 존 A-3 진열대",
  stock: 3,
  imageUrl: null,
};

function ZoneDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const recommendation = location.state?.recommendation ?? MOCK_RECOMMENDATION;

  return (
    <main className="page-with-bottom-nav zone-detail-page">
      <section className="page-scroll-content zone-detail-content">
        <header className="zone-detail-header">
          <button
            type="button"
            className="zone-detail-back"
            aria-label="이전 화면으로 이동"
            onClick={() => navigate(-1)}
          >
            <img src={backIcon} alt="" />
          </button>

          <h1>{recommendation.zoneName}</h1>
          <p>{recommendation.zoneDescription}</p>
        </header>

        <button
          type="button"
          className="zone-detail-more"
          onClick={() => navigate("/recommended-products")}
        >
          추천 상품 더보기 &gt;
        </button>

        <article className="zone-product-ticket">
          <div className="zone-product-image">
            {recommendation.imageUrl ? (
              <img
                src={recommendation.imageUrl}
                alt={recommendation.productName}
              />
            ) : (
              <span>제품 사진</span>
            )}
          </div>

          <div className="zone-product-information">
            <div className="zone-product-stamp" aria-hidden="true">
              <img src={visitIconAI} alt="" />
            </div>

            <h2>{recommendation.productName}</h2>
            <p>{recommendation.productDescription}</p>

            <div className="zone-product-divider" />

            <dl>
              <div>
                <dt>위치</dt>
                <dd>{recommendation.location}</dd>
              </div>

              <div>
                <dt>재고</dt>
                <dd>{recommendation.stock}개</dd>
              </div>
            </dl>
          </div>
        </article>
      </section>

      <BottomNav />
    </main>
  );
}

export default ZoneDetail;
