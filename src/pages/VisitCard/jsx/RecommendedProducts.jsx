import { useNavigate } from "react-router-dom";

import BottomNav from "../../../components/jsx/BottomNav";
import backIcon from "../../../assets/images/backBtn_brown.svg";

import "../css/RecommendedProducts.css";

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Aren 토트백",
    category: "신상품",
    description: "여행과 일상에 잘 어울리는 실용적인 토트백",
    imageUrl: null,
  },
  {
    id: 2,
    name: "Liz 쇼퍼백",
    category: "토트백",
    description: "넉넉한 수납공간을 갖춘 데일리 쇼퍼백",
    imageUrl: null,
  },
  {
    id: 3,
    name: "Stark 백팩",
    category: "클래식",
    description: "MCM의 클래식한 무드를 담은 시그니처 백팩",
    imageUrl: null,
  },
  {
    id: 4,
    name: "Lauretos 지갑",
    category: "액세서리",
    description: "가볍게 들고 다니기 좋은 콤팩트 지갑",
    imageUrl: null,
  },
  {
    id: 5,
    name: "Ella 보스턴백",
    category: "미니백",
    description: "여행 무드와 잘 어울리는 미니 보스턴백",
    imageUrl: null,
  },
];

function RecommendedProducts() {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    console.log("선택한 추천 상품:", product);

    // 나중에 상품 상세 페이지로 이동할 수 있습니다.
    // navigate(`/products/${product.id}`);
  };

  return (
    <main className="page-with-bottom-nav recommended-products-page">
      <section className="page-scroll-content recommended-products-content">
        <header className="recommended-products-header">
          <button
            type="button"
            className="recommended-products-back"
            aria-label="이전 화면으로 이동"
            onClick={() => navigate(-1)}
          >
            <img src={backIcon} alt="" />
          </button>

          <h1>MCM 추천 상품</h1>
        </header>

        <div className="recommended-products-list">
          {MOCK_PRODUCTS.map((product) => (
            <button
              type="button"
              key={product.id}
              className="recommended-product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="recommended-product-image">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} />
                ) : (
                  <span>제품 사진</span>
                )}
              </div>

              <div className="recommended-product-information">
                <strong>{product.name}</strong>

                <span className="recommended-product-category">
                  {product.category}
                </span>

                <p>{product.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}

export default RecommendedProducts;
