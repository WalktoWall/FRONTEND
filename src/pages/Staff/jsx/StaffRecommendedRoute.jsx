import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import backIcon from "../../../assets/images/backBtn_brown.svg";

import "../css/StaffRecommendedRoute.css";

/* =========================
   API BASE URL
========================= */

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

/* =========================
   응대 완료 저장 KEY
========================= */

const COMPLETED_VISITS_KEY = "wtw-staff-completed-visits";

/* =========================
   응대 완료 Visit Card 저장
========================= */

function saveCompletedVisit(visitCardId) {
  try {
    const savedIds = JSON.parse(
      window.sessionStorage.getItem(COMPLETED_VISITS_KEY) ?? "[]",
    );

    const normalizedIds = Array.isArray(savedIds)
      ? savedIds.map(Number)
      : [];

    const nextIds = Array.from(
      new Set([
        ...normalizedIds,
        Number(visitCardId),
      ]),
    );

    window.sessionStorage.setItem(
      COMPLETED_VISITS_KEY,
      JSON.stringify(nextIds),
    );
  } catch (error) {
    console.error(
      "응대 완료 저장 오류:",
      error,
    );

    window.sessionStorage.setItem(
      COMPLETED_VISITS_KEY,
      JSON.stringify([
        Number(visitCardId),
      ]),
    );
  }
}

/* =========================
   각 Zone에서
   대표 상품 1개만 선택
========================= */

function getRepresentativeProduct(route) {
  if (
    !route ||
    !Array.isArray(route.productList) ||
    route.productList.length === 0
  ) {
    return null;
  }

  return route.productList[0];
}

/* =========================
   AI 응대 문구를 문장별로 분리
========================= */

function parseStaffGuidance(guidance) {
  if (!guidance?.trim()) {
    return [];
  }

  const normalizedGuidance = guidance.trim();

  const markedSentences = normalizedGuidance
    .split(/\r?\n+|\s+(?=[-*]\s+)/)
    .map((sentence) => sentence.replace(/^\s*[-*]\s*/, "").trim())
    .filter(Boolean);

  if (markedSentences.length > 1) {
    return markedSentences;
  }

  return normalizedGuidance
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function StaffRecommendedRoute() {
  const navigate = useNavigate();

  const { visitCardId } = useParams();

  /* =========================
     STATE
  ========================= */

  const [
    recommendedRoutes,
    setRecommendedRoutes,
  ] = useState([]);

  const [
    staffGuidance,
    setStaffGuidance,
  ] = useState("");

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const staffGuidanceItems = parseStaffGuidance(staffGuidance);

  /* =========================
     추천 동선 + 직원 상세 조회

     GET
     /api/recommend/routes/{visitCardId}

     GET
     /api/staff/visits/{visitCardId}
  ========================= */

  useEffect(() => {
    const fetchStaffRouteData =
      async () => {
        try {
          setIsLoading(true);

          setErrorMessage("");

          const accessToken =
            localStorage.getItem(
              "accessToken",
            );

          console.log(
            "추천 동선 조회 visitCardId:",
            visitCardId,
          );

          const headers = {
            "Content-Type":
              "application/json",

            ...(accessToken && {
              Authorization:
                `Bearer ${accessToken}`,
            }),
          };

          /* =========================
             두 API 동시에 호출
          ========================= */

          const [
            routesResponse,
            staffResponse,
          ] =
            await Promise.all([
              fetch(
                `${API_BASE_URL}/api/recommend/routes/${visitCardId}`,
                {
                  method: "GET",
                  headers,
                },
              ),

              fetch(
                `${API_BASE_URL}/api/staff/visits/${visitCardId}`,
                {
                  method: "GET",
                  headers,
                },
              ),
            ]);

          /* =========================
             추천 동선 API 확인
          ========================= */

          if (!routesResponse.ok) {
            const errorText =
              await routesResponse.text();

            console.error(
              "추천 동선 API 실패:",
              routesResponse.status,
              errorText,
            );

            throw new Error(
              `추천 동선 조회 실패 (${routesResponse.status})`,
            );
          }

          /* =========================
             직원 상세 API 확인
          ========================= */

          if (!staffResponse.ok) {
            const errorText =
              await staffResponse.text();

            console.error(
              "직원 상세 API 실패:",
              staffResponse.status,
              errorText,
            );

            throw new Error(
              `직원 상세 조회 실패 (${staffResponse.status})`,
            );
          }

          /* =========================
             JSON 변환
          ========================= */

          const routesData =
            await routesResponse.json();

          const staffData =
            await staffResponse.json();

          console.log(
            "추천 동선 API 응답:",
            routesData,
          );

          console.log(
            "직원 상세 API 응답:",
            staffData,
          );

          /* =========================
             추천 동선 저장
          ========================= */

          const routes =
            Array.isArray(
              routesData.recommendedRoutes,
            )
              ? routesData.recommendedRoutes
              : [];

          setRecommendedRoutes(
            routes,
          );

          /* =========================
             고객 응대 제안 저장

             /api/staff/visits/{id}
             → staffGuidance
          ========================= */

          setStaffGuidance(
            staffData.staffGuidance || "",
          );

        } catch (error) {
          console.error(
            "StaffRecommendedRoute 조회 오류:",
            error,
          );

          setRecommendedRoutes([]);

          setStaffGuidance("");

          setErrorMessage(
            "추천 동선 정보를 불러오지 못했습니다.",
          );

        } finally {
          setIsLoading(false);
        }
      };

    if (visitCardId) {
      fetchStaffRouteData();
    }
  }, [visitCardId]);

  /* =========================
     응대 종료
  ========================= */

  const handleComplete = () => {
    saveCompletedVisit(
      visitCardId,
    );

    navigate(
      "/staff/visits",
      {
        replace: true,
      },
    );
  };

  return (
    <main className="staff-recommended-route-page">

      {/* =========================
          BACK
      ========================= */}

      <Link
        className="staff-route-back"
        to={`/staff/visits/${visitCardId}`}
        aria-label="고객 Visit Card로"
      >
        <img
          src={backIcon}
          alt=""
        />
      </Link>

      {/* =========================
          TITLE
      ========================= */}

      <h1>
        MCM 추천 동선
      </h1>

      {/* =========================
          LOADING
      ========================= */}

      {isLoading && (
        <p className="staff-route-message">
          추천 동선을 불러오는 중입니다.
        </p>
      )}

      {/* =========================
          ERROR
      ========================= */}

      {!isLoading &&
        errorMessage && (
          <p className="staff-route-message staff-route-error">
            {errorMessage}
          </p>
        )}

      {/* =========================
          추천 동선 없음
      ========================= */}

      {!isLoading &&
        !errorMessage &&
        recommendedRoutes.length === 0 && (
          <p className="staff-route-message">
            추천 동선 정보가 없습니다.
          </p>
        )}

      {/* =========================
          추천 동선
      ========================= */}

      {!isLoading &&
        !errorMessage &&
        recommendedRoutes.length > 0 && (
          <ol
            className="staff-zone-route"
            aria-label="AI 추천 매장 동선"
          >
            {recommendedRoutes.map(
              (route, index) => (
                <li
                  key={`${route.zone}-${index}`}
                >
                  <span>
                    {route.zone}
                  </span>

                  {index <
                    recommendedRoutes.length -
                      1 && (
                    <b aria-hidden="true">
                      →
                    </b>
                  )}
                </li>
              ),
            )}
          </ol>
        )}

      <div className="staff-route-divider" />

      {/* =========================
          시작 추천 상품

          Zone 하나당
          대표 상품 1개
      ========================= */}

      {!isLoading &&
        !errorMessage &&
        recommendedRoutes.length > 0 && (
          <section className="staff-recommended-products">

            <h2>
              시작 추천 상품
            </h2>

            <p>
              고객 추천 동선을 이 추천 상품으로 시작해보세요.
            </p>

            <div className="staff-recommended-product-list">

              {recommendedRoutes.map(
                (route) => {
                  const product =
                    getRepresentativeProduct(
                      route,
                    );

                  if (!product) {
                    return null;
                  }

                  return (
                    <article
                      className="staff-recommended-product"
                      key={`${route.zone}-${product.productId}`}
                    >

                      {/* 제품 이미지 */}

                      {product.productImg ? (
                        <img
                          src={
                            product.productImg
                          }
                          alt={
                            product.productName
                          }
                          className="staff-product-image"
                        />
                      ) : (
                        <div className="staff-product-image-placeholder">
                          제품 사진
                        </div>
                      )}

                      {/* 제품 정보 */}

                      <div className="staff-product-caption">

                        <strong>
                          {
                            product.productName
                          }
                        </strong>

                        <span>
                          {route.zone}
                        </span>

                      </div>

                    </article>
                  );
                },
              )}

            </div>

          </section>
        )}

      <div
        className="
          staff-route-divider
          staff-route-divider-bottom
        "
      />

      {/* =========================
          고객 응대 제안

          GET
          /api/staff/visits/{visitCardId}
          → staffGuidance
      ========================= */}

      {!isLoading &&
        !errorMessage &&
        staffGuidanceItems.length > 0 && (
          <section className="staff-response-guide">

            <h2>
              고객 응대 제안
            </h2>

            <ul>
              {staffGuidanceItems.map((guidance, index) => (
                <li key={`${guidance}-${index}`}>
                  {guidance}
                </li>
              ))}
            </ul>

          </section>
        )}

      {/* staffGuidance 없는 경우 */}

      {!isLoading &&
        !errorMessage &&
        staffGuidanceItems.length === 0 && (
          <section className="staff-response-guide">

            <h2>
              고객 응대 제안
            </h2>

            <p>
              고객 응대 제안 정보가 없습니다.
            </p>

          </section>
        )}

      {/* =========================
          응대 종료
      ========================= */}

      <button
        className="staff-complete-button"
        type="button"
        onClick={
          handleComplete
        }
        disabled={
          isLoading ||
          Boolean(errorMessage)
        }
      >
        응대 종료하기
      </button>

    </main>
  );
}

export default StaffRecommendedRoute;
