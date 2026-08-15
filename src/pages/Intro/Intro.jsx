import { useNavigate } from "react-router-dom";

import introVideo from "../../assets/videos/intro-logo.mp4";
import "./Intro.css";

function Intro() {
  const navigate = useNavigate();

  return (
    <main className="intro-page">
      <video
        className="intro-video"
        src={introVideo}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => navigate("/visit-card")}
      >
        브라우저가 영상을 지원하지 않습니다.
      </video>
    </main>
  );
}

export default Intro;
