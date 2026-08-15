import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../css/WallArtTextEdit.css";
import BackBtn from "../../../components/jsx/BackBtn";

function WallArtTextEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const recommendations = [
    "AI 문구 추천 1",
    "AI 문구 추천 2",
    "AI 문구 추천 3",
    "AI 문구 추천 4",
    "AI 문구 추천 5",
  ];

  const [selectedIndex, setSelectedIndex] = useState();

  // 2. handleSelect 함수 추가
  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const handleComplete = () => {
    const selectedText = recommendations[selectedIndex];

    if (!selectedText) return;

    const returnTo = location.state?.returnTo || "/wall-art";

    navigate(returnTo, {
      state: {
        ...(location.state || {}),
        updatedText: selectedText,
        artText: selectedText,
        artLayout: location.state?.artLayout,
        artStyle: location.state?.artStyle,
        backgroundImage: location.state?.backgroundImage,
      },
    });
  };

  return (
    <div className="WallArtTextEdit-page">
      <header className="WallArtTextEdit-header">
        <BackBtn />
      </header>

      <main className="WallArtTextEdit-main">
        <div className="WallArtTextEdit-title">
          <p>
            지금 무드에 맞는 문구를 다시
            <br /> 선택해보세요.
          </p>
        </div>

        <div className="WallArtTextEdit-list">
          {recommendations.map((text, index) => (
            <button
              key={index}
              type="button"
              className={`WallArtTextEdit-option ${
                selectedIndex === index ? "selected" : ""
              }`}
              onClick={() => handleSelect(index)}
            >
              {text}
            </button>
          ))}
        </div>

        {/* 하단 변경 완료 버튼 */}
        <div className="WallArtTextEdit-btn-group">
          <button
            type="button"
            className="WallArtTextEdit-submit-btn"
            onClick={handleComplete}
          >
            변경 완료
          </button>
        </div>
      </main>
    </div>
  );
}

export default WallArtTextEdit;
