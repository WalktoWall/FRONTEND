import {
  ChevronLeft,
  ChevronRight,
  Tag,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import "../css/MyPage.css";
import BottomNav from "../../../components/jsx/BottomNav";

import starIcon from "../../../assets/images/star.svg";
import visitIcon from "../../../assets/images/visit_icon.svg";
import airplaneWhite from "../../../assets/images/airplane_white.svg";
import profileIcon from "../../../assets/images/profile.svg";
import shareIcon from "../../../assets/images/share.svg";

const VISIT_CARD_STORAGE_KEY = "wtw-visit-card";

const getSavedVisitCardData = () => {
  try {
    const savedData = localStorage.getItem(VISIT_CARD_STORAGE_KEY);

    return savedData ? JSON.parse(savedData) : null;
  } catch {
    return null;
  }
};

function MyPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const visitCardData =
    location.state?.visitCardData ?? getSavedVisitCardData() ?? {};
  const visitDate = visitCardData.visitDate || "2026.08.25";
  const selectedStore = visitCardData.store || "MCM Cheongdam";
  const boardingTime = visitCardData.visitTimeUndecided
    ? "정해지지 않음"
    : visitCardData.visitTime || "15:00";

  const wishlistItems = [
    { id: 1, name: "제품명" },
    { id: 2, name: "제품명" },
  ];

  return (
    <div className="mypage-page">
      {/* =========================
          상단
      ========================= */}
      <header className="mypage-header">
        <button
          type="button"
          className="mypage-back"
          onClick={() => navigate("/")}
          aria-label="홈으로 이동"
        >
          <ChevronLeft
            size={26}
            strokeWidth={1.7}
          />
        </button>
      </header>

      <main className="mypage-main">
        {/* =========================
            PASSPORT
        ========================= */}
        <section className="mypage-passport-card">
          <p className="mypage-passport-label">
            My passport
          </p>

          <button
            type="button"
            className="mypage-more-button mypage-passport-edit"
            onClick={() => navigate("/visit-card/reset")}
            aria-label="프로필 편집 페이지로 이동"
          >
            Edit
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>

          <div className="mypage-passport-user">
            <img
              src={profileIcon}
              alt=""
              className="mypage-passport-user-icon"
            />

            <span className="mypage-username">
              000 고객님
            </span>
          </div>
        </section>

        <div className="mypage-divider" />

        {/* =========================
            STORYBOARD
        ========================= */}
        <section className="mypage-storyboard">
          <div className="mypage-storyboard-title">
            MCM Style Storyboard
          </div>

          <div className="mypage-ticket">
            <div className="mypage-ticket-top">
              <div>
                <p className="mypage-ticket-name">
                  000 고객님
                </p>

                <p className="mypage-ticket-date">
                  {visitDate}
                </p>
              </div>

              <img
                src={visitIcon}
                alt=""
                className="mypage-ticket-visit-icon"
              />
            </div>

            <div className="mypage-ticket-line" />

            <h3 className="mypage-ticket-store">
              {selectedStore}
            </h3>

            <div className="mypage-ticket-info">
              <div>
                <span>
                  Boarding Time
                </span>

                <strong>
                  {boardingTime}
                </strong>
              </div>
            </div>
          </div>

          {/* Life → MCM */}
          <div className="mypage-life-card">
            <span className="mypage-life-label">
              Life
            </span>

            <div className="mypage-life-route">
              <span className="mypage-life-dot" />

              <span className="mypage-life-route-line left-line" />

              <img
                src={airplaneWhite}
                alt=""
                className="mypage-life-plane"
              />

              <span className="mypage-life-route-line right-line" />

              <span className="mypage-life-dot" />
            </div>

            <span className="mypage-life-label">
              MCM
            </span>
          </div>
        </section>

        {/* =========================
            SNS 공유
        ========================= */}
        <button
          type="button"
          className="mypage-share-button"
          onClick={() => console.log("SNS 공유")}
        >
          <span>
            SNS 공유하기
          </span>

          <img
            src={shareIcon}
            alt=""
            className="mypage-share-icon"
          />
        </button>

        <div className="mypage-divider mypage-divider-small" />

        {/* =========================
            WISHLIST
        ========================= */}
        <section className="mypage-wishlist-section">
          <div className="mypage-section-header">
            <h2>
              위시리스트
            </h2>

            <button
              type="button"
              className="mypage-more-button"
              onClick={() =>
                navigate("/mypage/wishlist")
              }
            >
              더보기

              <ChevronRight
                size={13}
                strokeWidth={1.6}
              />
            </button>
          </div>

          <div className="mypage-wishlist-list">
            {wishlistItems.map((item) => (
              <div
                className="mypage-wishlist-card"
                key={item.id}
              >
                <Tag
                  size={24}
                  strokeWidth={1.6}
                  className="mypage-wishlist-tag"
                />

                <span className="mypage-wishlist-name">
                  {item.name}
                </span>

                <img
                  src={starIcon}
                  alt=""
                  className="mypage-wishlist-star"
                />
              </div>
            ))}
          </div>
        </section>

        {/* =========================
            MCM 홈페이지
        ========================= */}
        <button
          type="button"
          className="mypage-homepage-link"
          onClick={() =>
            console.log("MCM 홈페이지 이동")
          }
        >
          MCM 홈페이지 가기
        </button>

        <div className="mypage-divider mypage-divider-small" />

        {/* =========================
            여행객 안내
        ========================= */}
        <button
          type="button"
          className="mypage-traveler-button"
          onClick={() =>
            navigate("/mypage/traveler-guide")
          }
        >
          <span>
            여행객이신가요?
          </span>

          <ChevronRight
            size={22}
            strokeWidth={1.5}
          />
        </button>
      </main>

      <BottomNav />
    </div>
  );
}

export default MyPage;
