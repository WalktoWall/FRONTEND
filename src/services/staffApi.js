const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

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
  return request("/api/staff/visits/today");
}

export function getStaffVisitDetail(visitCardId) {
  return request(`/api/staff/visits/${encodeURIComponent(visitCardId)}`);
}
