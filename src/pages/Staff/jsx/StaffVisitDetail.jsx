import { Link, useParams } from "react-router-dom";

import airplaneIcon from "../../../assets/images/airplane_black.svg";
import backIcon from "../../../assets/images/backBtn_brown.svg";
import visitStamp from "../../../assets/images/visit_icon_AI.svg";
import "../css/StaffVisitDetail.css";

const VISIT_DETAILS = [
  { label: "방문 매장", value: "MCM 청담 플래그십 스토어" },
  { label: "방문 목적", value: "가방 쇼핑" },
  { label: "오늘의 무드", value: "클래식" },
  { label: "원하는 제품", value: "토트백" },
  { label: "직원 서비스", value: "30분 후에 받음" },
];

function formatVisitDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

function StaffVisitDetail() {
  const { visitCardId } = useParams();
  const visitDate = formatVisitDate(new Date());

  return (
    <main className="staff-visit-detail-page">
      <Link
        className="staff-detail-back"
        to="/staff/visits"
        aria-label="방문 고객 목록으로"
      >
        <img src={backIcon} alt="" />
      </Link>

      <h1 className="staff-detail-title">000님의 Visit Card</h1>

      <article className="staff-visit-card">
        <header className="staff-visit-card-header">
          <div>
            <h2>MCM Visit Card</h2>
            <p>Date. {visitDate}</p>
          </div>

          <img className="staff-visit-stamp" src={visitStamp} alt="AI 분석 완료" />
        </header>

        <dl className="staff-visit-information">
          {VISIT_DETAILS.map(({ label, value }) => (
            <div className="staff-visit-information-row" key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="staff-visit-route-line" aria-label="Life에서 MCM으로 향하는 여정">
          <span>Life</span>
          <i />
          <img src={airplaneIcon} alt="" />
          <i />
          <span>MCM</span>
        </div>
      </article>

      <p className="staff-ai-summary">
        AI가 분석한 오늘의 여행
        <strong>청담 플래그십에서의 클래식 감성</strong>
      </p>

      <Link
        className="staff-route-button"
        to={`/staff/visits/${visitCardId}/route`}
      >
        추천 동선 보러가기
      </Link>
    </main>
  );
}

export default StaffVisitDetail;
