import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ChevronLeft,
  Home,
  QrCode,
  ScanLine,
  UserRound,
  Tag,
} from "lucide-react";

import "../css/ScanResult.css";

import starIcon from "../../../assets/images/star.svg";
import emptyStarIcon from "../../../assets/images/emptystar.svg";

function ScanResult() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    { id: 1, name: "제품명", liked: true },
    { id: 2, name: "제품명", liked: false },
    { id: 3, name: "제품명", liked: false },
    { id: 4, name: "제품명", liked: true },
    { id: 5, name: "제품명", liked: false },
    { id: 6, name: "제품명", liked: true },
  ]);

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

  const handleScanAgain = () => {
    navigate("/scan");
  };



  return (
    <div className="scan-result-page">
      {/* 상단 */}
      <header className="scan-result-header">
        <button
          type="button"
          className="scan-result-back"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          <ChevronLeft size={24} strokeWidth={1.6} />
        </button>
      </header>

      {/* 메인 */}
      <main className="scan-result-main">
        <section className="scan-result-title-section">
          <h1 className="scan-result-title">
            제품 기록하기
          </h1>

          <p className="scan-result-description">
            마음에 드는 제품 태그를 스캔해주세요.
            <br />
            스캔된 제품은 서비스에 기록으로 추가됩니다.
          </p>
        </section>

        {/* 제품 목록 */}
        <section className="scan-result-product-scroll">
          <div className="scan-result-list">
            {products.map((product) => (
              <div
                className="scan-result-product-card"
                key={product.id}
              >
                <Tag
                  className="scan-result-tag-icon"
                  size={29}
                  strokeWidth={1.6}
                />

                <span className="scan-result-product-name">
                  {product.name}
                </span>

                <button
                  type="button"
                  className="scan-result-star-button"
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
                    className="scan-result-star-icon"
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 태그 다시 스캔 */}
        <button
          type="button"
          className="scan-result-scan-button"
          onClick={handleScanAgain}
        >
          태그 스캔하기
        </button>

        <div className="scan-result-divider" />

        
      </main>

      {/* 하단 네비 */}
      <nav className="scan-result-bottom-nav">
        <button
          type="button"
          className="scan-result-nav-item"
          onClick={() => navigate("/")}
          aria-label="홈"
        >
          <Home size={25} strokeWidth={1.7} />
        </button>

        <button
          type="button"
          className="scan-result-nav-item"
          onClick={() => navigate("/qr")}
          aria-label="QR"
        >
          <QrCode size={25} strokeWidth={1.7} />
        </button>

        <button
          type="button"
          className="scan-result-nav-item"
          onClick={() => navigate("/product-record")}
          aria-label="스캔"
        >
          <ScanLine size={26} strokeWidth={1.7} />
        </button>

        <button
          type="button"
          className="scan-result-nav-item"
          onClick={() => navigate("/mypage")}
          aria-label="마이페이지"
        >
          <UserRound size={25} strokeWidth={1.7} />
        </button>
      </nav>
    </div>
  );
}

export default ScanResult;