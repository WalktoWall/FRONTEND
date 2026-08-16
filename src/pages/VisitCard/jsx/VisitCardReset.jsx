import { useNavigate } from "react-router-dom";

import BottomNav from "../../../components/jsx/BottomNav";
import backIcon from "../../../assets/images/backBtn_brown.svg";
import "../css/VisitCardReset.css";

const VISIT_CARD_STORAGE_KEY = "wtw-visit-card";

function VisitCardReset() {
  const navigate = useNavigate();

  const handleReset = () => {
    localStorage.removeItem(VISIT_CARD_STORAGE_KEY);
    navigate("/home", { replace: true });
  };

  return (
    <main className="page-with-bottom-nav visit-reset-page">
      <section className="page-scroll-content visit-reset-content">
        <button
          type="button"
          className="visit-reset-back"
          onClick={() => navigate(-1)}
          aria-label="이전 화면으로 이동"
        >
          <img src={backIcon} alt="" />
        </button>

        <p className="visit-reset-label">VISIT CARD</p>
        <h1>Visit Card를 초기화할까요?</h1>
        <p className="visit-reset-description">
          초기화하면 작성한 고객 정보와 방문 정보가 삭제됩니다.
        </p>

        <div className="visit-reset-divider" />

        <section className="visit-reset-notice">
          <strong>초기화되는 내용</strong>
          <ul>
            <li>성별</li>
            <li>원하는 제품, 무드, 쇼핑 목적</li>
            <li>방문 예정 시간과 선택 매장</li>
            <li>홈 화면의 맞춤 Visit Card</li>
          </ul>
        </section>

        <p className="visit-reset-guide">
          초기화 후에는 홈 화면에서 Visit Card를 다시 만들 수 있습니다.
        </p>

        <div className="visit-reset-actions">
          <button
            type="button"
            className="visit-reset-cancel"
            onClick={() => navigate(-1)}
          >
            취소
          </button>

          <button
            type="button"
            className="visit-reset-confirm"
            onClick={handleReset}
          >
            Visit Card 초기화하기
          </button>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}

export default VisitCardReset;
