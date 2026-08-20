import { useEffect, useMemo, useState } from "react";

import ManualStoreSelector from "./ManualStoreSelector";
import { getStores } from "../../../services/visitCardApi";

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

const REGION_CATEGORY = {
  1: {
    region: "서울",
    fullRegion: "서울특별시",
  },
  2: {
    region: "경기",
    fullRegion: "경기도·인천광역시",
  },
  3: {
    region: "부산",
    fullRegion: "부산광역시",
  },
  4: {
    region: "대구",
    fullRegion: "대구광역시·광주광역시",
  },
};

const EARTH_RADIUS_KM = 6371;

const toRadians = (degree) => (degree * Math.PI) / 180;

const calculateDistanceKm = (origin, destination) => {
  const latitudeDifference = toRadians(
    destination.latitude - origin.latitude
  );
  const longitudeDifference = toRadians(
    destination.longitude - origin.longitude
  );
  const originLatitude = toRadians(origin.latitude);
  const destinationLatitude = toRadians(destination.latitude);

  const haversineValue =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(originLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(longitudeDifference / 2) ** 2;

  return (
    2 *
    EARTH_RADIUS_KM *
    Math.atan2(Math.sqrt(haversineValue), Math.sqrt(1 - haversineValue))
  );
};

const formatDistance = (distanceKm) => {
  if (distanceKm < 1) {
    return `현재 위치에서 약 ${Math.round(distanceKm * 1000)}m`;
  }

  return `현재 위치에서 약 ${distanceKm.toFixed(1)}km`;
};

const getStoreType = (storeName = "") => {
  if (storeName.includes("면세점")) return "면세점";
  if (storeName.includes("아울렛")) return "아울렛";
  if (storeName.includes("백화점")) return "백화점";
  if (storeName.includes("HAUS") || storeName.includes("플래그십")) {
    return "단독매장";
  }

  return "매장";
};

const getCoordinate = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const coordinate = Number(value);
  return Number.isFinite(coordinate) ? coordinate : null;
};

function VisitCardStep4({
  visitCardData,
  updateVisitCardData,
  onPrevious,
  onComplete,
  isSubmitting,
  submitError,
}) {
  const [showConsent, setShowConsent] = useState(true);
  const [screenMode, setScreenMode] = useState("recommendation");
  const [storeSource, setStoreSource] = useState(MOCK_RECOMMENDED_STORES);
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchStores = async () => {
      try {
        const responseData = await getStores();
        const storeList = Array.isArray(responseData)
          ? responseData
          : responseData?.storeList ?? responseData?.data ?? [];

        if (!isMounted || !Array.isArray(storeList) || storeList.length === 0) {
          return;
        }

        setStoreSource(storeList);
      } catch (error) {
        console.warn("매장 목록 조회 실패, 임시 목록을 사용합니다.", error);
      }
    };

    fetchStores();

    return () => {
      isMounted = false;
    };
  }, []);

  const stores = useMemo(() => {
    const normalizedStores = storeSource.map((store) => {
      const regionInfo = REGION_CATEGORY[store.regionCategory];
      const latitude = getCoordinate(store.latitude);
      const longitude = getCoordinate(store.longitude);
      const canCalculateDistance =
        userLocation && latitude !== null && longitude !== null;
      const distanceKm = canCalculateDistance
        ? calculateDistanceKm(userLocation, { latitude, longitude })
        : null;
      const name = store.storeName ?? store.name;

      return {
        ...store,
        id: store.storeId ?? store.id,
        name,
        type: store.storeType ?? store.type ?? getStoreType(name),
        region: regionInfo?.region ?? store.region ?? "",
        fullRegion:
          regionInfo?.fullRegion ?? store.fullRegion ?? store.region ?? "",
        latitude,
        longitude,
        distanceKm,
        distance:
          distanceKm !== null
            ? formatDistance(distanceKm)
            : store.distance ?? "위치 허용 후 거리를 확인할 수 있어요",
      };
    });

    if (!userLocation) {
      return normalizedStores;
    }

    return [...normalizedStores].sort((firstStore, secondStore) => {
      if (firstStore.distanceKm === null) return 1;
      if (secondStore.distanceKm === null) return -1;
      return firstStore.distanceKm - secondStore.distanceKm;
    });
  }, [storeSource, userLocation]);

  const handleAllowLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      setLocationError("이 브라우저에서는 위치 정보를 사용할 수 없습니다.");
      setShowConsent(false);
      return;
    }

    setLocationStatus("requesting");
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setLocationStatus("granted");
        setShowConsent(false);
      },
      (error) => {
        setLocationStatus(error.code === 1 ? "denied" : "error");
        setLocationError(
          error.code === 1
            ? "위치 권한이 거부되었습니다. 다른 매장을 직접 선택해주세요."
            : "현재 위치를 확인하지 못했습니다. 다른 매장을 직접 선택해주세요."
        );
        setShowConsent(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  const handleDenyLocation = () => {
    setLocationStatus("denied");
    setShowConsent(false);
    setScreenMode("manual");
  };

  const openManualStoreSelector = () => {
    updateVisitCardData({
      region: "",
      storeId: null,
      store: "",
      storeType: "",
    });
    setScreenMode("manual");
  };

  const handleStoreSelect = (store) => {
    updateVisitCardData({
      region: store.fullRegion || store.region || "서울특별시",
      storeId: store.storeId ?? store.id,
      store: store.name,
      storeType: store.type,
    });
  };

  if (screenMode === "manual") {
    return (
      <ManualStoreSelector
        visitCardData={visitCardData}
        updateVisitCardData={updateVisitCardData}
        onBack={() => setScreenMode("recommendation")}
        onNext={onComplete}
        stores={stores}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    );
  }

  return (
    <div className="visit-step location-step">
      <button
        type="button"
        className="visit-back-button"
        aria-label="이전 단계로 이동"
        onClick={onPrevious}
      >
        ‹
      </button>

      <div className="visit-progress">
        <span className="visit-progress-bar visit-progress-step-four" />
      </div>

      <p className="visit-step-label">STEP 4</p>

      <h1 className="visit-step-title">방문할 매장을 선택해주세요.</h1>
      <p className="visit-step-description">
        위치를 허용하면 가까운 맞춤 매장을 추천해드립니다.
      </p>

      <div className="visit-divider" />

      <div className="location-map-placeholder">
        <span className="location-user-marker">내 위치</span>
        <span className="location-store-marker marker-one">MCM</span>
        <span className="location-store-marker marker-two">MCM</span>
        <p className="location-map-message">
          {locationStatus === "requesting" && "현재 위치를 확인하고 있어요"}
          {locationStatus === "granted" && "현재 위치 기준 추천 완료"}
          {(locationStatus === "idle" || locationStatus === "denied") &&
            "위치 기반 매장 추천"}
          {locationStatus === "error" && "위치를 확인할 수 없어요"}
        </p>
      </div>

      {locationError && (
        <p className="location-status-message" role="status">
          {locationError}
        </p>
      )}

      <section className="location-recommendation">
        <div className="location-section-heading">
          <h2>AI 맞춤 매장</h2>

          <button
            type="button"
            className="location-more-button"
            onClick={openManualStoreSelector}
          >
            더보기 ›
          </button>
        </div>

        <div className="location-store-cards">
          {stores.slice(0, 2).map((store) => {
            const isSelected = visitCardData.store === store.name;

            return (
              <button
                type="button"
                key={store.id}
                className={`location-store-card ${
                  isSelected ? "is-selected" : ""
                }`}
                aria-pressed={isSelected}
                onClick={() => handleStoreSelect(store)}
              >
                <strong>{store.name}</strong>
                <span>{store.type}</span>
                <small>{store.distance}</small>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="location-manual-button"
          onClick={openManualStoreSelector}
        >
          다른 매장 선택하기
        </button>

        <button
          type="button"
          className="visit-next-button"
          disabled={!visitCardData.store || isSubmitting}
          onClick={onComplete}
        >
          {isSubmitting ? "Visit Card 생성 중..." : "매장 선택하기"}
        </button>

        {submitError && (
          <p className="visit-submit-error" role="alert">
            {submitError}
          </p>
        )}
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
                disabled={locationStatus === "requesting"}
              >
                {locationStatus === "requesting" ? "확인 중" : "예"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VisitCardStep4;
