const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://13.125.103.210:8080/api";

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`직원용 API 요청에 실패했습니다. (${response.status})`);
  }

  return response.json();
}

export function getTodayStaffVisits() {
  return request("/staff/visits/today");
}

export function getStaffVisitDetail(visitCardId) {
  return request(`/staff/visits/${encodeURIComponent(visitCardId)}`);
}
