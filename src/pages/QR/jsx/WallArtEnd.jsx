import React from "react";
import { useNavigate } from "react-router-dom"; // 1. useNavigate 추가

import "../css/WallArtEnd.css";
import BackBtn from "../../../components/jsx/BackBtn";

function WallArtEnd() {
  const navigate = useNavigate(); // 2. navigate 객체 선언

  // 3. return 키워드로 JSX를 반환해주어야 화면에 보입니다!
  return (
    <div className="WallArtEnd-page">
      <header className="WallArtEnd-header">
        <BackBtn />
      </header>
      <main className="WallArtEnd-main">
        <div className="WallArtEnd-content">
          <p>
            아트월이 종료되었습니다.
            <br />
            편안한 쇼핑 되시길 바랍니다.
          </p>
        </div>
        <div className="WallArtEnd-btn-group">
          <button
            type="button"
            className="WallArtEnd-close-btn yellow-btn"
            onClick={() => navigate("/home")}
          >
            홈으로 가기
          </button>
        </div>
      </main>
    </div>
  );
}

export default WallArtEnd;
