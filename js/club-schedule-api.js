(function (global) {
  var LEADER_PASSWORD = "visang!";

  function trimSlash(value) {
    return String(value || "").replace(/\/$/, "");
  }

  function isNetlifyHost() {
    var host = (global.location && global.location.hostname) || "";
    return host === "netlify.app" || /\.netlify\.app$/.test(host);
  }

  function isLocalApiHost() {
    var loc = global.location || {};
    var host = loc.hostname || "";
    var port = String(loc.port || "");
    return (host === "localhost" || host === "127.0.0.1") && port === "3001";
  }

  function isRemoteApiEnabled() {
    if (trimSlash(global.CLUB_SCHEDULE_API_BASE)) return true;
    return isNetlifyHost() || isLocalApiHost();
  }

  function getClubScheduleApiBase() {
    if (global.CLUB_SCHEDULE_API_BASE) {
      return trimSlash(global.CLUB_SCHEDULE_API_BASE);
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

  function assertLeaderPassword(password) {
    if (password !== LEADER_PASSWORD) {
      var error = new Error("비밀번호가 올바르지 않습니다. (리더 전용)");
      error.status = 401;
      throw error;
    }
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
    if (!isRemoteApiEnabled()) {
      return [];
    }
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
    assertLeaderPassword(password);
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
    assertLeaderPassword(password);
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
    assertLeaderPassword(password);
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
    isRemoteApiEnabled: isRemoteApiEnabled,
    getClubScheduleApiBase: getClubScheduleApiBase,
    listEvents: listEvents,
    createEvent: createEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
  };
})(window);
