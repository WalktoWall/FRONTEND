import React from "react";

import { useNavigate } from "react-router-dom";
import "../css/BackBtn.css";
import backIcon from "/src/assets/images/backBtn_brown.svg";

function BackBtn() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="back-button"
      onClick={() => navigate(-1)}
      aria-label="뒤로가기"
    >
      <img src={backIcon} alt="뒤로가기" className="back-btn-img" />
    </button>
  );
}

export default BackBtn;
