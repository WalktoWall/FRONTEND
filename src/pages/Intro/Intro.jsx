import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import wtwLogo from "../../assets/images/wtw-logo.svg";
import "./Intro.css";

function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate("/home", { replace: true });
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="intro-page">
      <img className="intro-logo" src={wtwLogo} alt="WTW" />
    </main>
  );
}

export default Intro;
