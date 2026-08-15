import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ChevronLeft,
  Tag,
} from "lucide-react";

import "../css/Wishlist.css";
import BottomNav from "../../../components/jsx/BottomNav";

import starIcon from "../../../assets/images/star.svg";
import emptyStarIcon from "../../../assets/images/emptystar.svg";

function Wishlist() {
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "제품명", liked: true },
    { id: 2, name: "제품명", liked: true },
    { id: 3, name: "제품명", liked: true },
    { id: 4, name: "제품명", liked: true },
    { id: 5, name: "제품명", liked: true },
    { id: 6, name: "제품명", liked: true },
    { id: 7, name: "제품명", liked: true },
  ]);

  const handleStarClick = (itemId) => {
    setWishlistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              liked: !item.liked,
            }
          : item
      )
    );
  };

  return (
    <div className="wishlist-page">
      {/* 상단 */}
      <header className="wishlist-header">
        <button
          type="button"
          className="wishlist-back"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          <ChevronLeft
            size={28}
            strokeWidth={1.7}
          />
        </button>
      </header>

      {/* 메인 */}
      <main className="wishlist-main">
        <h1 className="wishlist-title">
          위시리스트
        </h1>

        <section className="wishlist-list">
          {wishlistItems.map((item) => (
            <div
              className="wishlist-card"
              key={item.id}
            >
              <div className="wishlist-card-left">
                <Tag
                  className="wishlist-tag-icon"
                  size={32}
                  strokeWidth={1.7}
                />

                <span className="wishlist-product-name">
                  {item.name}
                </span>
              </div>

              {/* 별 버튼 */}
              <button
                type="button"
                className="wishlist-star-button"
                onClick={() =>
                  handleStarClick(item.id)
                }
                aria-label={
                  item.liked
                    ? "위시리스트에서 제거"
                    : "위시리스트에 추가"
                }
              >
                <img
                  src={
                    item.liked
                      ? starIcon
                      : emptyStarIcon
                  }
                  alt=""
                  className="wishlist-star-icon"
                />
              </button>
            </div>
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

export default Wishlist;
