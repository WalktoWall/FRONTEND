import { Route, Routes, useLocation } from "react-router-dom";

import Intro from "./pages/Intro/Intro";
import Home from "./pages/Home/jsx/Home.jsx";

import QR from "./pages/QR/jsx/Qr.jsx";
import MyPage from "./pages/Mypage/jsx/MyPage.jsx";
import Wishlist from "./pages/Mypage/jsx/Wishlist.jsx";
import TravelerGuide from "./pages/Mypage/jsx/TravelerGuide.jsx";

import ProductRecord from "./pages/ExperienceOnline/jsx/ProductRecord.jsx";
import TagScan from "./pages/ExperienceOnline/jsx/TagScan.jsx";
import ScanConfirm from "./pages/ExperienceOnline/jsx/ScanConfirm.jsx";
import ScanResult from "./pages/ExperienceOnline/jsx/ScanResult.jsx";

import VisitCard from "./pages/VisitCard/jsx/VisitCard";
import VisitCardReset from "./pages/VisitCard/jsx/VisitCardReset.jsx";
import VisitCardResult from "./pages/VisitCard/jsx/VisitCardResult.jsx";
import RecommendedProducts from "./pages/VisitCard/jsx/RecommendedProducts";
import ZoneDetail from "./pages/VisitCard/jsx/ZoneDetail";

import WallArt from "./pages/QR/jsx/WallArt.jsx";
import ScreenSharing from "./pages/QR/jsx/ScreenSharing.jsx";
import WallArtEdit from "./pages/QR/jsx/WallArtEdit.jsx";
import WallArtTextEdit from "./pages/QR/jsx/WallArtTextEdit.jsx";
import WallArtEnd from "./pages/QR/jsx/WallArtEnd.jsx";

import StaffVisitList from "./pages/Staff/jsx/StaffVisitList.jsx";
import StaffVisitDetail from "./pages/Staff/jsx/StaffVisitDetail.jsx";
import StaffHome from "./pages/Staff/jsx/StaffHome.jsx";
import StaffRecommendedRoute from "./pages/Staff/jsx/StaffRecommendedRoute.jsx";

import "./App.css";

function App() {
  const { pathname } = useLocation();
  const isStaffPage = pathname.startsWith("/staff");

  return (
    <div className={`app-frame ${isStaffPage ? "app-frame--staff" : ""}`}>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/intro" element={<Intro />} />

        <Route path="/visit-card" element={<VisitCard />} />
        <Route path="/visit-card/reset" element={<VisitCardReset />} />
        <Route path="/visit-card-result" element={<VisitCardResult />} />
        <Route path="/zone-detail" element={<ZoneDetail />} />
        <Route path="/recommended-products" element={<RecommendedProducts />} />

        <Route path="/qr" element={<QR />} />
        <Route path="/screen-sharing" element={<ScreenSharing />} />
        <Route path="/wall-art" element={<WallArt />} />
        <Route path="/wall-art/edit" element={<WallArtEdit />} />
        <Route path="/wall-art/edit/text" element={<WallArtTextEdit />} />
        <Route path="/wall-art/end" element={<WallArtEnd />} />

        <Route path="/product-record" element={<ProductRecord />} />
        <Route path="/scan" element={<TagScan />} />
        <Route path="/scan/confirm" element={<ScanConfirm />} />
        <Route path="/scan/result" element={<ScanResult />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/wishlist" element={<Wishlist />} />
        <Route path="/mypage/traveler-guide" element={<TravelerGuide />} />

        <Route path="/staff" element={<StaffHome />} />
        <Route path="/staff/visits" element={<StaffVisitList />} />
        <Route
          path="/staff/visits/:visitCardId"
          element={<StaffVisitDetail />}
        />
        <Route
          path="/staff/visits/:visitCardId/route"
          element={<StaffRecommendedRoute />}
        />

        <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
      </Routes>
    </div>
  );
}

export default App;
