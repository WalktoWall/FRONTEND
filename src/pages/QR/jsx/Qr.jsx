import { useNavigate } from "react-router-dom";
import {
  Home,
  QrCode,
  ScanLine,
  UserRound,
} from "lucide-react";

import "../css/qr.css";

function Qr() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>QR 페이지</h1>

      <nav>
        <button
          type="button"
          onClick={() => navigate("/")}
        >
          <Home size={28} />
        </button>

        <button
          type="button"
          onClick={() => navigate("/qr")}
        >
          <QrCode size={28} />
        </button>

        <button
          type="button"
          onClick={() => navigate("/scan")}
        >
          <ScanLine size={28} />
        </button>

        <button
          type="button"
          onClick={() => navigate("/mypage")}
        >
          <UserRound size={28} />
        </button>
      </nav>
    </div>
  );
}

export default Qr;