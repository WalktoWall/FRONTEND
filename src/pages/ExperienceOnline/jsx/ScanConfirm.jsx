import "../css/ScanConfirm.css";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import BottomNav from "../../../components/jsx/BottomNav";

import visitIcon from "../../../assets/images/visit_icon.svg";
import backIcon from "../../../assets/images/backBtn_brown.svg";


function ScanConfirm() {
  const navigate =
    useNavigate();

  const location =
    useLocation();


  /* =========================
     TagScan에서 전달받은
     백엔드 상품 정보
  ========================= */

  const {
    productId,
    productName,
    productImg,
  } =
    location.state || {};


  console.log(
    "ScanConfirm 상품 정보:",
    {
      productId,
      productName,
      productImg,
    }
  );


  /* =========================
     확인 버튼

     ScanResult로
     상품 정보 그대로 전달
  ========================= */

  const handleConfirm = () => {

    console.log(
      "제품 확인 완료:",
      {
        productId,
        productName,
        productImg,
      }
    );


    navigate(
      "/scan/result",
      {
        state: {
          productId,
          productName,
          productImg,
        },
      }
    );
  };


  /* =========================
     다시 스캔
  ========================= */

  const handleRetry = () => {
    navigate(
      "/scan"
    );
  };


  /* =========================
     상품 정보가 없을 때
  ========================= */

  if (!productName) {

    return (

      <div className="scan-confirm-page">

        {/* 상단 */}

        <header className="scan-confirm-header">

          <button
            type="button"
            className="scan-confirm-back"
            onClick={() =>
              navigate(-1)
            }
            aria-label="뒤로가기"
          >

            <img
              src={backIcon}
              alt=""
            />

          </button>

        </header>


        <main className="scan-confirm-main">

          <h1 className="scan-confirm-title">

            상품 정보를
            <br />
            불러오지 못했습니다.

          </h1>


          <button
            type="button"
            className="scan-confirm-button"
            onClick={
              handleRetry
            }
          >

            다시 스캔하기

          </button>

        </main>


        <BottomNav />

      </div>

    );
  }


  return (

    <div className="scan-confirm-page">


      {/* =========================
          상단
      ========================= */}

      <header className="scan-confirm-header">

        <button
          type="button"
          className="scan-confirm-back"
          onClick={() =>
            navigate(-1)
          }
          aria-label="뒤로가기"
        >

          <img
            src={backIcon}
            alt=""
          />

        </button>

      </header>


      {/* =========================
          메인
      ========================= */}

      <main className="scan-confirm-main">


        <h1 className="scan-confirm-title">

          스캔하신 제품이 맞는지 한번 더
          <br />
          확인 부탁드립니다.

        </h1>


        {/* =========================
            제품 카드
        ========================= */}

        <section className="scan-confirm-card">


          {/* =========================
              제품 이미지
          ========================= */}

          <div className="scan-confirm-image-area">

            {productImg ? (

              <img
                src={productImg}
                alt={productName}
                className="scan-confirm-product-image"
              />

            ) : (

              <span className="scan-confirm-image-text">

                제품 사진을
                <br />
                불러오는 중입니다.

              </span>

            )}

          </div>


          {/* =========================
              제품명
          ========================= */}

          <div className="scan-confirm-product-name">

            {productName}

          </div>


          {/* =========================
              Visit 아이콘
          ========================= */}

          <img
            src={visitIcon}
            alt=""
            className="scan-confirm-visit-icon"
          />


        </section>


        {/* =========================
            확인 버튼
        ========================= */}

        <button
          type="button"
          className="scan-confirm-button"
          onClick={
            handleConfirm
          }
        >

          확인

        </button>


      </main>


      <BottomNav />


    </div>
  );
}


export default ScanConfirm;
