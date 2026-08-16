import { Link } from "react-router-dom";

import "../css/StaffHome.css";

const STAFF_SUMMARY = [
  { label: "오늘 방문 예정", value: 5 },
  { label: "매장 도착", value: 2 },
  { label: "응대 완료", value: 1 },
];

function formatToday(date) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

function formatDateTimeValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function StaffHome() {
  const connectedAt = new Date();
  const today = formatToday(connectedAt);

  return (
    <main className="staff-home-page">
      <section className="staff-home-content">
        <header className="staff-home-header">
          <h1>MCM 청담 플래그십 스토어</h1>
          <time dateTime={formatDateTimeValue(connectedAt)}>{today}</time>
        </header>

        <div className="staff-home-divider" />

        <section className="staff-summary" aria-label="오늘의 방문 현황">
          {STAFF_SUMMARY.map(({ label, value }) => (
            <article className="staff-summary-card" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </section>

        <Link className="staff-visit-list-button" to="/staff/visits">
          대기 고객 리스트 보기
        </Link>

        <p className="staff-home-message">
          오늘도 고객을 정성껏 응대하는 하루를
          <br />
          만들어보세요.
        </p>
      </section>
    </main>
  );
}

export default StaffHome;
