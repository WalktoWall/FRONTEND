import React, { useEffect, useState } from "react";
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

function WallArtEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const [artText, setArtText] = useState(
    location.state?.artText || "A Story Worth Carrying.",
  );
  const [artLayout, setArtLayout] = useState(
    location.state?.artLayout || defaultLayout,
  );
  const [artStyle, setArtStyle] = useState(
    location.state?.artStyle || defaultStyle,
  );
  const [backgroundImage, setBackgroundImage] = useState(
    location.state?.backgroundImage ||
      location.state?.backgroundImageUrl ||
      location.state?.imageUrl ||
      backgroundExample,
  );
  const [selected, setSelected] = useState(true);

  useEffect(() => {
    if (location.state?.artText) {
      setArtText(location.state.artText);
    }

    if (location.state?.artLayout) {
      setArtLayout(location.state.artLayout);
    }

    if (location.state?.artStyle) {
      setArtStyle(location.state.artStyle);
    }

    const nextBackgroundImage =
      location.state?.backgroundImage ||
      location.state?.backgroundImageUrl ||
      location.state?.imageUrl ||
      backgroundExample;

    if (nextBackgroundImage) {
      setBackgroundImage(nextBackgroundImage);
    }
  }, [location.state]);

  const handleTextEdit = () => {
    navigate("/wall-art/edit/text", {
      state: {
        returnTo: "/wall-art/edit",
        artText,
        artLayout,
        artStyle,
        backgroundImage,
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
      },
    });
  };

  return (
    <div
      className="WallArtEdit-page"
      onClick={() => setSelected(false)} // 빈 배경 클릭 시 핸들/테두리 선택 해제
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      <header className="WallArtEdit-header">
        <BackBtn />
      </header>

      <main className="WallArtEdit-main">
        <Rnd
          bounds="parent"
          size={{ width: artLayout.width, height: artLayout.height }}
          position={{ x: artLayout.x, y: artLayout.y }}
          onMouseDown={(e) => {
            e.stopPropagation(); // 배경 클릭 이벤트로 전파 방지
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
          /* 💡 선택되었을 때만 모서리 조작점(핸들) CSS 클래스를 붙여줍니다 */
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
          onClick={(e) => e.stopPropagation()} // 버튼 클릭 시 선택 해제 방지
        >
          <div className="WallArtEdit-action-row">
            <button
              type="button"
              className="WallArtEdit-save-btn white-btn"
              onClick={handleTextEdit}
            >
              문구 변경
            </button>
            <button
              type="button"
              className="WallArtEdit-cancel-btn brown-btn"
              onClick={() => navigate("/wall-art/add-product")}
            >
              제품 추가
            </button>
          </div>

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
