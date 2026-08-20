import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BottomNav from "../../../components/jsx/BottomNav";
import backIcon from "../../../assets/images/backBtn_brown.svg";

import "../css/RecommendedProducts.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const getStoredVisitCardId = () => {
  try {
    return localStorage.getItem("visitCardId");
  } catch {
    return null;
  }
};

const getRequestHeaders = () => {
  const accessToken = localStorage.getItem("accessToken");

  return {
    Accept: "application/json",
    ...(accessToken && {
      Authorization: `Bearer ${accessToken}`,
    }),
  };
};

const normalizeProducts = (responseData) => {
  const productList = Array.isArray(responseData)
    ? responseData
    : responseData?.productList;

  if (!Array.isArray(productList)) {
    return [];
  }

  return productList.map((product) => ({
    id: product.productId,
    name: product.productName || "상품명 미정",
    category: product.zone || "추천 상품",
    description: product.productDetail || "상품 설명이 없습니다.",
    imageUrl: product.productImg || null,
  }));
};

function RecommendedProducts() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const visitCardId = useMemo(() => {
    const searchVisitCardId = new URLSearchParams(location.search).get(
      "visitCardId"
    );

    return (
      location.state?.visitCardId ||
      searchVisitCardId ||
      getStoredVisitCardId()
    );
  }, [location.search, location.state]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRecommendedProducts = async () => {
      if (!visitCardId) {
        setErrorMessage(
          "Visit Card 정보가 없습니다. Visit Card를 먼저 생성해주세요."
        );
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(
          `${API_BASE_URL}/api/recommend/products/${encodeURIComponent(
            visitCardId
          )}`,
          {
            headers: getRequestHeaders(),
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`추천 상품 조회에 실패했습니다. (${response.status})`);
        }

        const responseData = await response.json();
        setProducts(normalizeProducts(responseData));
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("추천 상품 조회 오류:", error);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "추천 상품을 불러오지 못했습니다."
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchRecommendedProducts();

    return () => controller.abort();
  }, [visitCardId]);

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

        {isLoading && (
          <p className="recommended-products-status">
            추천 상품을 불러오는 중입니다.
          </p>
        )}

        {!isLoading && errorMessage && (
          <p className="recommended-products-status recommended-products-error">
            {errorMessage}
          </p>
        )}

        {!isLoading && !errorMessage && products.length === 0 && (
          <p className="recommended-products-status">
            추천 상품이 없습니다.
          </p>
        )}

        {!isLoading && !errorMessage && products.length > 0 && (
          <div className="recommended-products-list">
            {products.map((product) => (
            <article
              key={product.id}
              className="recommended-product-card"
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
            </article>
            ))}
          </div>
        )}
      </section>

      <BottomNav />
    </main>
  );
}

export default RecommendedProducts;
