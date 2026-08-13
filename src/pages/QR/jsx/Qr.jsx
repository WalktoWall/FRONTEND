import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/QR.css";

import BackBtn from "../../../components/jsx/BackBtn";
import BottomNav from "../../../components/jsx/BottomNav";

function QR() {
  const navigate = useNavigate();

  // 팝업바 체크용(백엔드 연동 전까지 임시로 사용)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="QR-page">
      <header className="QR-header">
        <BackBtn />
      </header>
      <main className="QR-main">
        <div className="QR-content">
          <span>QR code</span>
        </div>
        <div className="QR-code-container">
          <div>QR code</div>
          {/* 임시로 스캔 했다고 할 때.. 사용 */}
          <button type="button" className="QR-scan-button" onClick={openPopup}>
            스캔 완료
          </button>
        </div>
      </main>
      <footer className="QR-footer">
        <BottomNav />
      </footer>
      {/* 하단 팝업 바 UI (isPopupOpen이 true일 때만 출력) */}
      {isPopupOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          {/* stopPropagation: 팝업 내부를 클릭할 때는 배경 클릭(닫기) 이벤트 방지 */}
          <div className="popup-bar" onClick={(e) => e.stopPropagation()}>
            <div className="popup-handle"></div>

            <div className="popup-content">
              <p>
                AI가 오늘의 Visit Card를 불러와 아트월 및 직원 태블릿에
                반영하며, 매장모드를 실행합니다
              </p>

              <div className="popup-btn-group">
                <button
                  type="button"
                  className="popup-confirm-btn"
                  onClick={() => navigate("/screen-sharing")} // 팝업 내 확인 버튼 눌렀을 때 페이지 이동
                >
                  동의합니다
                </button>
                <button
                  type="button"
                  className="popup-close-btn"
                  onClick={closePopup}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QR;
