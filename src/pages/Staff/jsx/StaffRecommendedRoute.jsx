import { Link, useNavigate, useParams } from "react-router-dom";

import backIcon from "../../../assets/images/backBtn_brown.svg";
import "../css/StaffRecommendedRoute.css";

const RECOMMENDED_ZONES = ["여성존", "신상품존", "라이프스타일존"];

const RECOMMENDED_PRODUCTS = [
  { productId: "product-1", productName: "상품명", category: "신제품" },
  { productId: "product-2", productName: "상품명", category: "토트백" },
  { productId: "product-3", productName: "상품명", category: "액세서리" },
];

const COMPLETED_VISITS_KEY = "wtw-staff-completed-visits";

function saveCompletedVisit(visitCardId) {
  try {
    const savedIds = JSON.parse(
      window.sessionStorage.getItem(COMPLETED_VISITS_KEY) ?? "[]",
    );
    const nextIds = Array.from(new Set([...savedIds, visitCardId]));

    window.sessionStorage.setItem(COMPLETED_VISITS_KEY, JSON.stringify(nextIds));
  } catch {
    window.sessionStorage.setItem(
      COMPLETED_VISITS_KEY,
      JSON.stringify([visitCardId]),
    );
  }
}

function StaffRecommendedRoute() {
  const navigate = useNavigate();
  const { visitCardId } = useParams();

  const handleComplete = () => {
    saveCompletedVisit(visitCardId);
    navigate("/staff/visits", { replace: true });
  };

  return (
    <main className="staff-recommended-route-page">
      <Link
        className="staff-route-back"
        to={`/staff/visits/${visitCardId}`}
        aria-label="고객 Visit Card로"
      >
        <img src={backIcon} alt="" />
      </Link>

      <h1>MCM 추천 동선</h1>

      <ol className="staff-zone-route" aria-label="AI 추천 매장 동선">
        {RECOMMENDED_ZONES.map((zone, index) => (
          <li key={zone}>
            <span>{zone}</span>
            {index < RECOMMENDED_ZONES.length - 1 && (
              <b aria-hidden="true">→</b>
            )}
          </li>
        ))}
      </ol>

      <div className="staff-route-divider" />

      <section className="staff-recommended-products">
        <h2>시작 추천 상품</h2>
        <p>고객 추천 동선을 이 추천 상품으로 시작해보세요.</p>

        <div className="staff-recommended-product-list">
          {RECOMMENDED_PRODUCTS.map(({ productId, productName, category }) => (
            <article className="staff-recommended-product" key={productId}>
              <div className="staff-product-image-placeholder">제품 사진</div>
              <div className="staff-product-caption">
                <strong>{productName}</strong>
                <span>{category}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="staff-route-divider staff-route-divider-bottom" />

      <section className="staff-response-guide">
        <h2>고객 응대 제안</h2>
        <ul>
          <li>
            30분 후 응대를 요청하셨기에 매장 쇼핑에 대해 먼저 여쭙는 것을
            추천합니다.
          </li>
          <li>
            매장을 둘러보며 관심 있게 보았던 점을 여쭤보면서 응대하시면 고객의
            만족도를 더 향상시킬 것으로 보입니다.
          </li>
          <li>Visit Card 정보와 달라진 것이 있는지 확인해보세요.</li>
        </ul>
      </section>

      <button className="staff-complete-button" type="button" onClick={handleComplete}>
        오늘 응대 종료하기
      </button>
    </main>
  );
}

export default StaffRecommendedRoute;
