import "../css/TagScan.css";

import { useNavigate } from "react-router-dom";

import BottomNav from "../../../components/jsx/BottomNav";
import backIcon from "../../../assets/images/backBtn_brown.svg";

function TagScan() {
  const navigate = useNavigate();

  const handleScanComplete = () => {
    console.log("스캔 완료");

    // 나중에 실제 QR/태그 스캔 API 성공 후 이동
    navigate("/scan/confirm");
  };

  return (
    <div className="tag-scan-page">
      {/* 상단 */}
      <header className="tag-scan-header">
        <button
          type="button"
          className="tag-scan-back-button"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          <img src={backIcon} alt="" />
        </button>
      </header>

      {/* 메인 */}
      <main className="tag-scan-main">
        <section className="tag-scan-text-section">
          <h1 className="tag-scan-title">
            제품 태그를 프레임에 맞춰
            <br />
            스캔해주세요.
          </h1>

          <p className="tag-scan-description">
            *그림자가 지지 않게 밝은 곳에서 스캔해주시기 바랍니다.
            <br />
            *스캔이 완료될 때까지 태그를 프레임에 고정해주시기를
            <br />
            바랍니다.
          </p>
        </section>

        {/* QR / 태그 스캔 영역 */}
        <section className="tag-scan-camera-wrapper">
          <div className="tag-scan-camera">
            {/* 나중에 실제 카메라 스캐너 컴포넌트 */}

            <span className="scan-corner top-left" />
            <span className="scan-corner top-right" />
            <span className="scan-corner bottom-left" />
            <span className="scan-corner bottom-right" />
          </div>
        </section>

        <button
          type="button"
          className="tag-scan-complete-button"
          onClick={handleScanComplete}
        >
          스캔 완료
        </button>
      </main>

      <BottomNav />
    </div>
  );
}

export default TagScan;
