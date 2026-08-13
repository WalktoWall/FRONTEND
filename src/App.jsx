import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home/jsx/Home.jsx";

import QR from "./pages/QR/jsx/QR.jsx";
import MyPage from "./pages/Mypage/jsx/MyPage.jsx";
import Wishlist from "./pages/Mypage/jsx/Wishlist.jsx";
import TravelerGuide from "./pages/Mypage/jsx/TravelerGuide.jsx";

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
      {/* 기본 화면 */}
      <Route path="/" element={<Home />} />
      <Route path="/qr" element={<QR />} />
      <Route path="/scan" element={<TagScan />} />
      <Route path="/mypage" element={<MyPage />} />

      {/* 스캔 화면 */}
      <Route path="/scan/confirm" element={<ScanConfirm />} />

      <Route path="/scan/result" element={<ScanResult />} />

      {/* 마이페이지 하위 화면 */}
      <Route path="/mypage/wishlist" element={<Wishlist />} />

      <Route path="/mypage/traveler-guide" element={<TravelerGuide />} />

      {/* Visit Card 결과 */}
      <Route path="/visit-card-result" element={<VisitCardResult />} />

      {/* QR 화면 */}
      <Route path="/wall-art" element={<WallArt />} />
      <Route path="/screen-sharing" element={<ScreenSharing />} />
      <Route path="/wall-art/edit" element={<WallArtEdit />} />
      <Route path="/wall-art/edit/text" element={<WallArtTextEdit />} />
      <Route path="/wall-art/end" element={<WallArtEnd />} />

      {/* 잘못된 경로로 들어왔을 때의 404 예외 처리 */}
      <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
    </Routes>
  );
}

export default App;
