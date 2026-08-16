import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ChevronLeft } from "lucide-react";
import Tesseract from "tesseract.js";

import "../css/TagScan.css";

import BottomNav from "../../../components/jsx/BottomNav";

function TagScan() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [isSending, setIsSending] = useState(false);

  /* =========================
     카메라 열기
  ========================= */
  const handleOpenCamera = () => {
    fileInputRef.current?.click();
  };

  /* =========================
     사진 촬영 / 선택
  ========================= */
  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setSelectedImage(imageUrl);

    await runOCR(file);
  };

  /* =========================
     OCR 실행
  ========================= */
  const runOCR = async (imageFile) => {
    try {
      setIsScanning(true);
      setOcrText("");

      const result = await Tesseract.recognize(
        imageFile,
        "eng",
        {
          logger: (message) => {
            console.log("OCR 진행 상황:", message);
          },
        }
      );

      const text = result.data.text.trim();

      console.log("OCR 전체 결과:", text);

      /*
        현재는 OCR 전체 텍스트를 저장.
        나중에 제품명 추출 규칙이 정해지면
        여기에서 제품명만 추출하면 됨.
      */
      setOcrText(text);
    } catch (error) {
      console.error("OCR 오류:", error);

      alert("제품 태그 인식에 실패했습니다.");
    } finally {
      setIsScanning(false);
    }
  };

  /* =========================
     스캔 완료
  ========================= */
  const handleScanComplete = async () => {
    if (!ocrText) {
      alert("먼저 제품 태그를 촬영해주세요.");
      return;
    }

    try {
      setIsSending(true);

      /*
        백엔드에서 실제 endpoint를 주면
        /api/products/ocr 부분을 수정하면 됨.
      */

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/ocr`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            productName: ocrText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `제품 조회 실패: ${response.status}`
        );
      }

      const product = await response.json();

      console.log("백엔드 제품 응답:", product);

      /*
        예시 백엔드 응답

        {
          productId: 1,
          productName: "Stark Backpack",
          productImage: "https://..."
        }
      */

      navigate("/scan/confirm", {
        state: {
          productId:
            product.productId ??
            product.product_id ??
            product.id,

          productName:
            product.productName ??
            product.product_name ??
            product.name,

          productImage:
            product.productImage ??
            product.product_image ??
            product.imageUrl ??
            product.image,
        },
      });
    } catch (error) {
      console.error("제품 조회 API 오류:", error);

      alert(
        "제품 정보를 불러오지 못했습니다."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="tag-scan-page">
      {/* =========================
          상단
      ========================= */}
      <header className="tag-scan-header">
        <button
          type="button"
          className="tag-scan-back-button"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          <ChevronLeft
            size={28}
            strokeWidth={1.6}
          />
        </button>
      </header>

      {/* =========================
          메인
      ========================= */}
      <main className="tag-scan-main">
        <section className="tag-scan-text-section">
          <h1 className="tag-scan-title">
            제품 태그를 프레임에 맞춰
            <br />
            스캔해주세요.
          </h1>

          <p className="tag-scan-description">
            *그림자가 지지 않게 밝은 곳에서 스캔해주시기 바랍니다.
            <br />
            *스캔이 완료될 때까지 태그를 프레임에 고정해주시기를
            <br />
            바랍니다.
          </p>
        </section>

        {/* =========================
            카메라 영역
        ========================= */}
        <section className="tag-scan-camera-wrapper">
          <div
            className="tag-scan-camera"
            onClick={handleOpenCamera}
          >
            {/* 촬영 이미지 미리보기 */}
            {selectedImage && (
              <img
                src={selectedImage}
                alt="촬영된 제품 태그"
                className="tag-scan-preview"
              />
            )}

            {/* 스캔 프레임 */}
            <span className="scan-corner top-left" />
            <span className="scan-corner top-right" />
            <span className="scan-corner bottom-left" />
            <span className="scan-corner bottom-right" />

            {!selectedImage && (
              <span className="tag-scan-camera-guide">
                제품 태그를 촬영해주세요
              </span>
            )}
          </div>
        </section>

        {/* =========================
            숨겨진 카메라 input
        ========================= */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageChange}
          style={{
            display: "none",
          }}
        />

        {/* =========================
            OCR 상태
        ========================= */}
        {isScanning && (
          <p className="tag-scan-status">
            제품명을 인식하고 있습니다...
          </p>
        )}

        {/* 개발 확인용 OCR 결과 */}
        {ocrText && !isScanning && (
          <div className="tag-scan-ocr-result">
            <p>
              인식된 텍스트
            </p>

            <strong>
              {ocrText}
            </strong>
          </div>
        )}

        {/* =========================
            스캔 완료 버튼
        ========================= */}
        <button
          type="button"
          className="tag-scan-complete-button"
          onClick={handleScanComplete}
          disabled={
            isScanning ||
            isSending
          }
        >
          {isScanning
            ? "인식 중..."
            : isSending
            ? "제품 확인 중..."
            : "스캔 완료"}
        </button>
      </main>

      <BottomNav />
    </div>
  );
}

export default TagScan;