import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Rnd } from "react-rnd";

import "../css/WallArtEdit.css";
import BackBtn from "../../../components/jsx/BackBtn";
import backgroundExample from "../../../assets/images/background_example.png";

const defaultLayout = {
  x: 34,
  y: 110,
  width: 320,
  height: 120,
};

const defaultStyle = {
  fontFamily: '"Libre Caslon Text", serif',
  fontWeight: 400,
  fontSize: 32,
};

// 환경변수 표준 이름 반영
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "";

const getWallArtImageUrl = (imagePath) => {
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  if (imagePath.startsWith("/var/app/")) {
    return `${API_BASE_URL.replace(/\/api\/?$/, "")}${imagePath}`;
  }

  return `${API_BASE_URL}/${imagePath.replace(/^\/+/, "")}`;
};

function WallArtEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state || {};

  const [artText, setArtText] = useState(
    state.artText || "A Story Worth Carrying.",
  );
  const [artLayout, setArtLayout] = useState(state.artLayout || defaultLayout);
  const [artStyle, setArtStyle] = useState(state.artStyle || defaultStyle);
  const [backgroundImage, setBackgroundImage] = useState(
    state.backgroundImage ||
      state.backgroundImageUrl ||
      state.imageUrl ||
      backgroundExample,
  );
  const [selected, setSelected] = useState(true);

  // 배경 가로 드래그를 위한 상태 및 Ref
  const [bgPositionX, setBgPositionX] = useState(state.bgPositionX || 50);
  const isDraggingBg = useRef(false);
  const startX = useRef(0);
  const startBgX = useRef(50);

  // 1. 백엔드에서 최신 월아트 정보 불러오기
  useEffect(() => {
    const fetchWallArt = async () => {
      const accessToken = localStorage.getItem("accessToken");

      // 토큰이 없거나, 이미 라우터 state로 배경 이미지를 전달받은 상태라면 API 호출 스킵
      if (
        !accessToken ||
        state.backgroundImage ||
        state.backgroundImageUrl ||
        state.imageUrl
      ) {
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/wall-art`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("월아트 조회 실패:", response.status, errorText);
          return;
        }

        const data = await response.json();

        // 백엔드 데이터 반영
        if (data.wallartText && !state.artText) {
          setArtText(data.wallartText);
        }

        if (data.wallartImg) {
          setBackgroundImage(getWallArtImageUrl(data.wallartImg));
        }
      } catch (error) {
        console.error("월아트 조회 중 오류 발생:", error);
      }
    };

    fetchWallArt();
  }, []);

  // 2. 전달받은 location.state 값이 있을 경우 동기화
  useEffect(() => {
    if (state.artText) setArtText(state.artText);
    if (state.artLayout) setArtLayout(state.artLayout);
    if (state.artStyle) setArtStyle(state.artStyle);

    const nextBg =
      state.backgroundImage || state.backgroundImageUrl || state.imageUrl;

    if (nextBg) setBackgroundImage(nextBg);
    if (state.bgPositionX !== undefined) setBgPositionX(state.bgPositionX);
  }, [
    state.artText,
    state.artLayout,
    state.artStyle,
    state.backgroundImage,
    state.backgroundImageUrl,
    state.imageUrl,
    state.bgPositionX,
  ]);

  // 배경 가로 드래그 마우스/터치 이벤트 핸들러
  const handleMouseDown = (e) => {
    setSelected(false);
    isDraggingBg.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startBgX.current = bgPositionX;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingBg.current) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - startX.current;

    let newBgX = startBgX.current - deltaX * 0.1;
    newBgX = Math.max(0, Math.min(100, newBgX));

    setBgPositionX(newBgX);
  };

  const handleMouseUp = () => {
    isDraggingBg.current = false;
  };

  const handleTextEdit = () => {
    navigate("/wall-art/edit/text", {
      state: {
        returnTo: "/wall-art/edit",
        artText,
        artLayout,
        artStyle,
        backgroundImage,
        bgPositionX,
      },
    });
  };

  const handleSave = () => {
    navigate("/wall-art", {
      state: {
        updatedText: artText,
        artLayout,
        artStyle,
        backgroundImage,
        bgPositionX,
      },
    });
  };

  return (
    <div
      className="WallArtEdit-page"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: `${bgPositionX}% center`,
              backgroundRepeat: "no-repeat",
              cursor: "grab",
            }
          : undefined
      }
    >
      <header className="WallArtEdit-header">
        <BackBtn />
      </header>

      <main className="WallArtEdit-main">
        <Rnd
          size={{ width: artLayout.width, height: artLayout.height }}
          position={{ x: artLayout.x, y: artLayout.y }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setSelected(true);
          }}
          onDragStart={(e) => {
            e.stopPropagation();
            setSelected(true);
          }}
          onResizeStart={(e) => {
            e.stopPropagation();
            setSelected(true);
          }}
          onDragStop={(event, data) => {
            setArtLayout((prev) => ({
              ...prev,
              x: data.x,
              y: data.y,
            }));
          }}
          onResizeStop={(event, direction, ref, delta, position) => {
            setArtLayout({
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              x: position.x,
              y: position.y,
            });
          }}
          minWidth={120}
          minHeight={60}
          enableResizing={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          }}
          resizeHandleClasses={
            selected
              ? {
                  topLeft: "rnd-handle rnd-handle-tl",
                  topRight: "rnd-handle rnd-handle-tr",
                  bottomLeft: "rnd-handle rnd-handle-bl",
                  bottomRight: "rnd-handle rnd-handle-br",
                  top: "rnd-edge rnd-edge-t",
                  right: "rnd-edge rnd-edge-r",
                  bottom: "rnd-edge rnd-edge-b",
                  left: "rnd-edge rnd-edge-l",
                }
              : {}
          }
        >
          <div
            className={`WallArtEdit-text-box ${selected ? "is-selected" : ""}`}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              cursor: "move",
              userSelect: "none",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#ffffff",
                fontFamily: artStyle.fontFamily,
                fontWeight: artStyle.fontWeight,
                fontSize: `${artStyle.fontSize}px`,
                lineHeight: 1.2,
                wordBreak: "keep-all",
                userSelect: "none",
              }}
            >
              “{artText}”
            </p>
          </div>
        </Rnd>

        {/* 하단 버튼 영역 */}
        <div
          className="WallArtEdit-btn-group"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="WallArtEdit-save-btn white-btn"
            onClick={handleTextEdit}
          >
            문구 변경
          </button>

          <button
            type="button"
            className="WallArtEdit-save-btn primary-btn"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </main>
    </div>
  );
}

export default WallArtEdit;
