import { Route, Routes } from "react-router";

import Intro from "./pages/Intro/Intro";
import VisitCard from "./pages/VisitCard/jsx/VisitCard";
import RecommendedProducts from "./pages/VisitCard/jsx/RecommendedProducts";
import ZoneDetail from "./pages/VisitCard/jsx/ZoneDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/visit-card" element={<VisitCard />} />

      <Route path="/zone-detail" element={<ZoneDetail />} />
      <Route path="/recommended-products" element={<RecommendedProducts />} />
    </Routes>
  );
}

export default App;
