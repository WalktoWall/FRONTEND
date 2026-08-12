import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/jsx/Home.jsx";
import Qr from "./pages/QR/jsx/Qr.jsx";

import MyPage from "./pages/Mypage/jsx/MyPage.jsx";
import Wishlist from "./pages/Mypage/jsx/Wishlist.jsx";
import TravelerGuide from "./pages/Mypage/jsx/TravelerGuide.jsx";

import TagScan from "./pages/ExperienceOnline/jsx/TagScan.jsx";
import ScanConfirm from "./pages/ExperienceOnline/jsx/ScanConfirm.jsx";
import ScanResult from "./pages/ExperienceOnline/jsx/ScanResult.jsx";

import VisitCardResult from "./pages/VisitCard/jsx/VisitCardResult.jsx";

function App() {
  return (
    <Routes>
      {/* 기본 화면 */}
      <Route path="/" element={<Home />} />
      <Route path="/qr" element={<Qr />} />
      <Route path="/scan" element={<TagScan />} />
      <Route path="/mypage" element={<MyPage />} />

      {/* 스캔 화면 */}
      <Route
        path="/scan/confirm"
        element={<ScanConfirm />}
      />

      <Route
        path="/scan/result"
        element={<ScanResult />}
      />

      {/* 마이페이지 하위 화면 */}
      <Route
        path="/mypage/wishlist"
        element={<Wishlist />}
      />

      <Route
        path="/mypage/traveler-guide"
        element={<TravelerGuide />}
      />

      {/* Visit Card 결과 */}
      <Route
        path="/visit-card-result"
        element={<VisitCardResult />}
      />
    </Routes>
  );
}

export default App;