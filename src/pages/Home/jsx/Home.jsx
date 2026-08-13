import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {

  Home as HomeIcon,
  QrCode,
  ScanLine,
  UserRound,
  Tag,
  ArrowRight,
} from "lucide-react";

import "../css/Home.css";

import starIcon from "../../../assets/images/star.svg";
import emptyStarIcon from "../../../assets/images/emptystar.svg";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    { id: 1, name: "제품명", liked: true },
    { id: 2, name: "제품명", liked: false },
    { id: 3, name: "제품명", liked: false },
    { id: 4, name: "제품명", liked: true },
  ]);

  const handleVisitCard = () => {
    console.log("Visit Card 생성");
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

          <h1 className="home-customer-name">
            000고객님
          </h1>
        </section>

        <div className="home-divider" />

        {/* Visit Card */}
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
                  size={31}
                  strokeWidth={1.7}
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

      {/* Bottom Nav */}
      <nav className="home-bottom-nav">
        <button
          type="button"
          className="home-nav-item"
          onClick={() => navigate("/")}
        >
          <HomeIcon size={28} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          className="home-nav-item"
          onClick={() => navigate("/qr")}
        >
          <QrCode size={28} strokeWidth={1.8} />
        </button>

        <button
          type="button"
         className="home-nav-item"
          onClick={() => navigate("/scan")}
        >
          <ScanLine size={29} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          className="home-nav-item"
          onClick={() => navigate("/mypage")}
        >
          <UserRound size={28} strokeWidth={1.8} />
        </button>
      </nav>
    </div>
  );
}

export default Home;