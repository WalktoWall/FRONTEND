import { Link } from "react-router-dom";

import backIcon from "../../../assets/images/backBtn_brown.svg";
import profileIcon from "../../../assets/images/profile.svg";
import "../css/StaffVisitList.css";

const SAMPLE_VISITS = Array.from({ length: 5 }, (_, index) => ({
  visitCardId: `visit-${index + 1}`,
  customerName: "000님",
  status: "방금 매장 도착",
}));

const COMPLETED_VISITS_KEY = "wtw-staff-completed-visits";

function getCompletedVisitIds() {
  try {
    return JSON.parse(
      window.sessionStorage.getItem(COMPLETED_VISITS_KEY) ?? "[]",
    );
  } catch {
    return [];
  }
}

function formatVisitDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekday = new Intl.DateTimeFormat("ko-KR", {
    weekday: "short",
  }).format(date);

  return `${year}.${month}.${day} (${weekday})`;
}

function StaffVisitList() {
  const today = formatVisitDate(new Date());
  const completedVisitIds = getCompletedVisitIds();

  return (
    <main className="staff-page staff-visit-list-page">
      <Link className="staff-visit-list-back" to="/staff" aria-label="직원 홈으로">
        <img src={backIcon} alt="" />
      </Link>

      <header className="staff-visit-list-header">
        <h1>오늘의 방문 고객</h1>
        <time>{today}</time>
      </header>

      <div className="staff-visit-list-divider" />

      <section className="staff-customer-list" aria-label="오늘의 방문 고객 명단">
        {SAMPLE_VISITS.map(({ visitCardId, customerName, status }) => {
          const displayedStatus = completedVisitIds.includes(visitCardId)
            ? "응대 완료"
            : status;

          return (
            <Link
              className="staff-customer-card"
              to={`/staff/visits/${visitCardId}`}
              key={visitCardId}
            >
              <img className="staff-customer-profile" src={profileIcon} alt="" />

              <span className="staff-customer-info">
                <strong>{customerName}</strong>
                <small>{displayedStatus}</small>
              </span>

              <span className="staff-customer-chevron" aria-hidden="true" />
            </Link>
          );
        })}
      </section>
    </main>
  );
}

export default StaffVisitList;
