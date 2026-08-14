import { useState } from "react";

const MOCK_RECOMMENDED_STORES = [
  {
    id: 1,
    name: "MCM 신세계본점",
    type: "백화점",
    distance: "현재 위치에서 약 500m",
  },
  {
    id: 2,
    name: "MCM HAUS",
    type: "단독매장",
    distance: "현재 위치에서 약 6.8km",
  },
];

function VisitCardStep1({ visitCardData, updateVisitCardData, onNext }) {
  const [showConsent, setShowConsent] = useState(true);

  const handleAllowLocation = () => {
    // 와이어프레임 단계에서는 실제 위치 권한을 요청하지 않습니다.
    setShowConsent(false);
  };

  const handleDenyLocation = () => {
    // 이후 수동 매장 선택 화면으로 연결합니다.
    setShowConsent(false);
  };

  const handleStoreSelect = (store) => {
    updateVisitCardData({
      region: "서울특별시",
      store: store.name,
      storeType: store.type,
    });
  };

  return (
    <div className="visit-step location-step">
      <button
        type="button"
        className="visit-back-button"
        aria-label="이전 화면으로 이동"
      >
        ‹
      </button>

      <div className="location-map-placeholder">
        <span className="location-user-marker">내 위치</span>

        <span className="location-store-marker marker-one">MCM</span>

        <span className="location-store-marker marker-two">MCM</span>

        <p className="location-map-message">지도 API 영역</p>
      </div>

      <section className="location-recommendation">
        <div className="location-section-heading">
          <h1>AI 맞춤 매장</h1>

          <button type="button" className="location-more-button">
            더보기 ›
          </button>
        </div>

        <div className="location-store-cards">
          {MOCK_RECOMMENDED_STORES.map((store) => {
            const isSelected = visitCardData.store === store.name;

            return (
              <button
                type="button"
                key={store.id}
                className={`location-store-card ${
                  isSelected ? "is-selected" : ""
                }`}
                onClick={() => handleStoreSelect(store)}
              >
                <strong>{store.name}</strong>
                <span>{store.type}</span>
                <small>{store.distance}</small>
              </button>
            );
          })}
        </div>

        <button type="button" className="location-manual-button">
          다른 매장 선택하기
        </button>

        <button
          type="button"
          className="visit-next-button"
          disabled={!visitCardData.store}
          onClick={onNext}
        >
          다음으로 이동
        </button>
      </section>

      {showConsent && (
        <div className="location-consent-overlay">
          <div
            className="location-consent-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="location-consent-title"
          >
            <p id="location-consent-title">
              사용자의 현재 위치 정보
              <br />
              수집에 동의하십니까?
            </p>

            <div className="location-consent-actions">
              <button type="button" onClick={handleDenyLocation}>
                아니오
              </button>

              <button
                type="button"
                className="is-allow"
                onClick={handleAllowLocation}
              >
                예
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VisitCardStep1;
