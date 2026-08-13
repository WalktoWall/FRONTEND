import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import QR from "./pages/QR/jsx/QR.jsx";
import WallArt from "./pages/QR/jsx/WallArt.jsx";
import ScreenSharing from "./pages/QR/jsx/ScreenSharing.jsx";
import WallArtEdit from "./pages/QR/jsx/WallArtEdit.jsx";
import WallArtTextEdit from "./pages/QR/jsx/WallArtTextEdit.jsx";
import WallArtEnd from "./pages/QR/jsx/WallArtEnd.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* /qr 주소로 접속하면 QR 컴포넌트 보이기 */}
        <Route path="/qr" element={<QR />} />

        {/* /wall-art 주소로 접속하면 WallArt 컴포넌트 보이기 */}
        <Route path="/wall-art" element={<WallArt />} />

        {/* /screen-sharing 주소로 접속하면 ScreenSharing 컴포넌트 보이기 */}
        <Route path="/screen-sharing" element={<ScreenSharing />} />

        {/* /wall-art-edit 주소로 접속하면 WallArtEdit 컴포넌트 보이기 */}
        <Route path="/wall-art/edit" element={<WallArtEdit />} />

        {/* /wall-art-text-edit 주소로 접속하면 WallArtTextEdit 컴포넌트 보이기 */}
        <Route path="/wall-art/edit/text" element={<WallArtTextEdit />} />

        <Route path="/wall-art/end" element={<WallArtEnd />} />

        {/* 잘못된 경로로 들어왔을 때의 404 예외 처리 */}
        <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
