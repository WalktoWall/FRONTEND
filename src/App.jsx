import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/jsx/Home.jsx";

import QR from "./pages/QR/jsx/QR.jsx";
import MyPage from "./pages/Mypage/jsx/MyPage.jsx";
import Wishlist from "./pages/Mypage/jsx/Wishlist.jsx";
import TravelerGuide from "./pages/Mypage/jsx/TravelerGuide.jsx";

import ProductRecord from "./pages/ExperienceOnline/jsx/ProductRecord.jsx";
import TagScan from "./pages/ExperienceOnline/jsx/TagScan.jsx";
import ScanConfirm from "./pages/ExperienceOnline/jsx/ScanConfirm.jsx";
import ScanResult from "./pages/ExperienceOnline/jsx/ScanResult.jsx";

import VisitCardResult from "./pages/VisitCard/jsx/VisitCardResult.jsx";

import WallArt from "./pages/QR/jsx/WallArt.jsx";
import ScreenSharing from "./pages/QR/jsx/ScreenSharing.jsx";
import WallArtEdit from "./pages/QR/jsx/WallArtEdit.jsx";
import WallArtTextEdit from "./pages/QR/jsx/WallArtTextEdit.jsx";
import WallArtEnd from "./pages/QR/jsx/WallArtEnd.jsx";

function App() {
  return (
    <Routes>
      {/* =========================
          기본 화면
      ========================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/qr"
        element={<QR />}
      />

      <Route
        path="/mypage"
        element={<MyPage />}
      />

      {/* =========================
          제품 기록 / 스캔
      ========================= */}

      {/* 하단 Scan 버튼을 눌렀을 때 처음 들어갈 화면 */}
      <Route
        path="/product-record"
        element={<ProductRecord />}
      />

      {/* 실제 태그 스캔 화면 */}
      <Route
        path="/scan"
        element={<TagScan />}
      />

      <Route
        path="/scan/confirm"
        element={<ScanConfirm />}
      />

      <Route
        path="/scan/result"
        element={<ScanResult />}
      />

      {/* =========================
          마이페이지 하위 화면
      ========================= */}

      <Route
        path="/mypage/wishlist"
        element={<Wishlist />}
      />

      <Route
        path="/mypage/traveler-guide"
        element={<TravelerGuide />}
      />

      {/* =========================
          Visit Card 결과
      ========================= */}

      <Route
        path="/visit-card-result"
        element={<VisitCardResult />}
      />

      {/* =========================
          QR / WALL ART
      ========================= */}

      <Route
        path="/wall-art"
        element={<WallArt />}
      />

      <Route
        path="/screen-sharing"
        element={<ScreenSharing />}
      />

      <Route
        path="/wall-art/edit"
        element={<WallArtEdit />}
      />

      <Route
        path="/wall-art/edit/text"
        element={<WallArtTextEdit />}
      />

      <Route
        path="/wall-art/end"
        element={<WallArtEnd />}
      />

      {/* =========================
          404
      ========================= */}

      <Route
        path="*"
        element={
          <div>
            페이지를 찾을 수 없습니다.
          </div>
        }
      />
    </Routes>
  );
}

export default App;
