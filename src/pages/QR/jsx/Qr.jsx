import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/qr.css";

import BackBtn from "../../../components/jsx/BackBtn";
import BottomNav from "../../../components/jsx/BottomNav";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const getStoreIdFromSavedVisitCard = (visitCardId) => {
  try {
    const savedVisitCard = JSON.parse(
      localStorage.getItem("wtw-visit-card") || "null",
    );
    const savedVisitCardId = Number(savedVisitCard?.visitCardId);

    if (
      Number.isInteger(savedVisitCardId) &&
      savedVisitCardId > 0 &&
      savedVisitCardId !== visitCardId
    ) {
      return null;
    }

    const storeId = Number(savedVisitCard?.storeId);

    return Number.isInteger(storeId) && storeId > 0 ? storeId : null;
  } catch (error) {
    console.warn("저장된 방문카드 매장 정보를 읽지 못했습니다.", error);
    return null;
  }
};

function QR() {
  const navigate = useNavigate();
  const qrImageInputRef = useRef(null);

  // 팝업바 체크용(백엔드 연동 전까지 임시로 사용)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [qrImageUrl, setQrImageUrl] = useState("");
  const closePopup = () => setIsPopupOpen(false);

  useEffect(() => {
    return () => {
      if (qrImageUrl) {
        URL.revokeObjectURL(qrImageUrl);
      }
    };
  }, [qrImageUrl]);

  const handleQrImageSelect = () => {
    qrImageInputRef.current?.click();
  };

  const handleQrImageChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      alert("이미지 파일을 선택해주세요.");
      event.target.value = "";
      return;
    }

    const nextImageUrl = URL.createObjectURL(selectedFile);

    setQrImageUrl(nextImageUrl);
    setIsPopupOpen(true);

    event.target.value = "";
  };

  const handleStoreModeActivate = async () => {
    const visitCardId = Number(localStorage.getItem("visitCardId"));
    const accessToken = localStorage.getItem("accessToken");

    if (!visitCardId) {
      alert("Visit Card ID가 없습니다. 먼저 Visit Card를 생성해주세요.");
      return;
    }

    const storeId = getStoreIdFromSavedVisitCard(visitCardId);

    if (!storeId) {
      alert("방문 카드의 매장 ID가 없습니다. 방문 카드를 다시 생성해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/store-mode/${visitCardId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(accessToken && {
              Authorization: `Bearer ${accessToken}`,
            }),
          },
          body: JSON.stringify({ storeId }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        let serverMessage = "";

        try {
          const errorBody = JSON.parse(errorText);
          serverMessage = errorBody?.message || errorBody?.error || "";
        } catch {
          serverMessage = "";
        }

        console.error("매장 모드 활성화 실패:", {
          status: response.status,
          payload: { storeId },
          response: errorText,
        });
        throw new Error(
          serverMessage || `매장 모드 활성화 실패: ${response.status}`,
        );
      }

      const result = await response.json();
      console.log("매장 모드 활성화 완료:", result);
      navigate("/screen-sharing");
    } catch (error) {
      console.error("매장 모드 활성화 중 오류:", error);
      alert(error.message || "매장 모드 활성화에 실패했습니다.");
    }
  };

  return (
    <div className="QR-page">
      <header className="QR-header">
        <BackBtn />
      </header>
      <main className="QR-main">
        <div className="QR-content">
          <h1>QR code</h1>
          <p>QR코드를 스캔하여 매장모드로 들어가보세요.</p>
        </div>
        <div className="QR-code-container">
          {qrImageUrl ? (
            <img
              src={qrImageUrl}
              alt="사용자가 불러온 QR 코드"
              className="QR-preview-image"
            />
          ) : (
            <div className="QR-code-placeholder">QR code</div>
          )}

          <button
            type="button"
            className="QR-scan-button"
            aria-label={
              qrImageUrl
                ? "다른 QR 코드 사진 불러오기"
                : "QR 코드 사진 불러오기"
            }
            onClick={handleQrImageSelect}
          >
            사진 불러오기
          </button>

          <input
            ref={qrImageInputRef}
            type="file"
            className="QR-image-input"
            accept="image/*"
            onChange={handleQrImageChange}
          />
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
                  onClick={handleStoreModeActivate}
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
