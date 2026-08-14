import {
  ChevronLeft,
  ChevronRight,
  Home,
  QrCode,
  ScanLine,
  UserRound,
  Tag,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "../css/MyPage.css";

import starIcon from "../../../assets/images/star.svg";
import visitIcon from "../../../assets/images/visit_icon.svg";
import airplaneWhite from "../../../assets/images/airplane_white.svg";
import profileIcon from "../../../assets/images/profile.svg";
import shareIcon from "../../../assets/images/share.svg";

function MyPage() {
  const navigate = useNavigate();

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

          <div className="mypage-passport-user">
            <img
              src={profileIcon}
              alt=""
              className="mypage-passport-user-icon"
            />

            <span className="mypage-username">
              000님
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
                  000님
                </p>

                <p className="mypage-ticket-date">
                  2026.08.25
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
              MCM Cheongdam
            </h3>

            <div className="mypage-ticket-info">
              <div>
                <span>
                  Boarding Time
                </span>

                <strong>
                  15:00
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

      {/* =========================
          하단 네비
      ========================= */}
      <nav className="mypage-bottom-nav">
        {/* 홈 */}
        <button
          type="button"
          className="mypage-nav-item"
          onClick={() => navigate("/")}
          aria-label="홈"
        >
          <Home
            size={27}
            strokeWidth={1.8}
          />
        </button>

        {/* QR */}
        <button
          type="button"
          className="mypage-nav-item"
          onClick={() => navigate("/qr")}
          aria-label="QR"
        >
          <QrCode
            size={27}
            strokeWidth={1.8}
          />
        </button>

        {/* 스캔 */}
        <button
          type="button"
          className="mypage-nav-item"
          onClick={() => navigate("/product-record")}
          aria-label="스캔"
        >
          <ScanLine
            size={28}
            strokeWidth={1.8}
          />
        </button>

        {/* 마이페이지 */}
        <button
          type="button"
          className="mypage-nav-item"
          onClick={() => navigate("/mypage")}
          aria-label="마이페이지"
        >
          <UserRound
            size={27}
            strokeWidth={1.8}
          />
        </button>
      </nav>
    </div>
  );
}

export default MyPage;