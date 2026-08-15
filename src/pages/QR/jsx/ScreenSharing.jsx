import React from "react";
import { useNavigate } from "react-router-dom";

import "../css/ScreenSharing.css";
import BackBtn from "../../../components/jsx/BackBtn";

function ScreenSharing() {
  const navigate = useNavigate();

  return (
    <div className="ScreenSharing-page">
      <header className="ScreenSharing-header">
        <BackBtn />
      </header>
      <main className="ScreenSharing-main">
        <div className="ScreenSharing-content">
          <p>
            제작하신 이미지는 MCM 매장 아트월에 약 2분 동안 공유됩니다. 이에
            동의하십니까?
          </p>
          <p className="ScreenSharing-subtext">
            *아트월 이미지는 고객님이 입력하신 정보를 바탕으로 생성됩니다.
          </p>
        </div>
        <div className="ScreenSharing-btn-group">
          <button
            type="button"
            className="ScreenSharing-close-btn"
            onClick={() => navigate("/qr")}
          >
            아니오
          </button>
          <button
            type="button"
            className="ScreenSharing-confirm-btn"
            onClick={() => navigate("/wall-art")}
          >
            예
          </button>
        </div>
      </main>
    </div>
  );
}

export default ScreenSharing;
