(function (global) {
  function trimSlash(value) {
    return String(value || "").replace(/\/$/, "");
  }

  function getClubScheduleApiBase() {
    if (global.CLUB_SCHEDULE_API_BASE) {
      return trimSlash(global.CLUB_SCHEDULE_API_BASE);
    }
    var loc = global.location || {};
    if (loc.protocol === "file:") {
      return "http://localhost:3001";
    }
    var host = loc.hostname;
    var port = loc.port;
    if (host === "localhost" || host === "127.0.0.1") {
      if (port && port !== "3001") {
        return "http://localhost:3001";
      }
    }
    return "";
  }

  function apiUrl(path) {
    return getClubScheduleApiBase() + path;
  }

  function authHeaders(password) {
    var headers = { "Content-Type": "application/json" };
    if (password != null) {
      headers["X-Club-Leader-Password"] = password;
    }
    return headers;
  }

  async function parseJsonResponse(res) {
    var data = {};
    try {
      data = await res.json();
    } catch (err) {
      data = {};
    }
    if (!res.ok || data.ok === false) {
      var message =
        data.message ||
        (res.status === 0
          ? "공용 달력 서버에 연결하지 못했습니다."
          : "일정을 처리하지 못했습니다.");
      var error = new Error(message);
      error.status = res.status;
      throw error;
    }
    return data;
  }

  async function listEvents() {
    var res;
    try {
      res = await fetch(apiUrl("/api/club-events"), { method: "GET" });
    } catch (err) {
      var error = new Error(
        "공용 달력 서버에 연결하지 못했습니다. 서버를 실행한 뒤 새로고침해 주세요."
      );
      error.status = 0;
      throw error;
    }
    var data = await parseJsonResponse(res);
    return Array.isArray(data.events) ? data.events : [];
  }

  async function createEvent(password, payload) {
    var res;
    try {
      res = await fetch(apiUrl("/api/club-events"), {
        method: "POST",
        headers: authHeaders(password),
        body: JSON.stringify(payload),
      });
    } catch (err) {
      var error = new Error("공용 달력 서버에 연결하지 못했습니다.");
      error.status = 0;
      throw error;
    }
    var data = await parseJsonResponse(res);
    return data.event;
  }

  async function updateEvent(password, id, payload) {
    var res;
    try {
      res = await fetch(apiUrl("/api/club-events/" + encodeURIComponent(id)), {
        method: "PUT",
        headers: authHeaders(password),
        body: JSON.stringify(payload),
      });
    } catch (err) {
      var error = new Error("공용 달력 서버에 연결하지 못했습니다.");
      error.status = 0;
      throw error;
    }
    var data = await parseJsonResponse(res);
    return data.event;
  }

  async function deleteEvent(password, id) {
    var res;
    try {
      res = await fetch(apiUrl("/api/club-events/" + encodeURIComponent(id)), {
        method: "DELETE",
        headers: authHeaders(password),
      });
    } catch (err) {
      var error = new Error("공용 달력 서버에 연결하지 못했습니다.");
      error.status = 0;
      throw error;
    }
    await parseJsonResponse(res);
  }

  global.ClubScheduleApi = {
    getClubScheduleApiBase: getClubScheduleApiBase,
    listEvents: listEvents,
    createEvent: createEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
  };
})(window);
