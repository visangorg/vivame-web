export const CLUB_SCHEDULE_NAME_MATCH_ALIASES = {
  퐁당: "퐁당다이브클럽",
  비상골: "비상골린이들",
};

export const CLUB_EVENT_YEAR_MIN = 2026;
export const CLUB_EVENT_YEAR_MAX = 2026;

export class PasswordMismatchError extends Error {
  constructor() {
    super("비밀번호가 올바르지 않습니다. (리더 전용)");
    this.name = "PasswordMismatchError";
    this.statusCode = 401;
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message || "일정을 찾을 수 없습니다.");
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

export function normalizeClubScheduleNameMatch(nameMatch) {
  if (nameMatch == null) return nameMatch;
  const trimmed = String(nameMatch).trim();
  return CLUB_SCHEDULE_NAME_MATCH_ALIASES[trimmed] || trimmed;
}

export function createClubEventId() {
  return "cle-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}

/**
 * @param {unknown} input
 * @returns {{ ok: true, value: object } | { ok: false, message: string }}
 */
export function validateClubEventInput(input) {
  const raw = input && typeof input === "object" ? input : {};
  const nameMatch = normalizeClubScheduleNameMatch(raw.nameMatch);
  if (!nameMatch) {
    return { ok: false, message: "동호회를 선택해 주세요." };
  }

  const year = Number(raw.year);
  const month = Number(raw.month);
  const day = Number(raw.day);
  if (!Number.isInteger(year) || year < CLUB_EVENT_YEAR_MIN || year > CLUB_EVENT_YEAR_MAX) {
    return { ok: false, message: "2026년 1월~12월 범위의 날짜만 등록할 수 있습니다." };
  }
  if (!Number.isInteger(month) || month < 0 || month > 11) {
    return { ok: false, message: "날짜를 올바르게 선택해 주세요." };
  }
  if (!Number.isInteger(day) || day < 1 || day > 31) {
    return { ok: false, message: "날짜를 올바르게 선택해 주세요." };
  }

  const lastDay = new Date(year, month + 1, 0).getDate();
  if (day > lastDay) {
    return { ok: false, message: "날짜를 올바르게 선택해 주세요." };
  }

  const time = raw.time == null ? "" : String(raw.time).trim();
  const author = raw.author == null ? "" : String(raw.author).trim().slice(0, 40);

  return {
    ok: true,
    value: {
      nameMatch,
      year,
      month,
      day,
      time,
      author,
    },
  };
}

export function migrateClubEvents(events) {
  if (!Array.isArray(events)) return [];
  return events.map((ev) => {
    if (!ev || typeof ev !== "object") return ev;
    const normalized = normalizeClubScheduleNameMatch(ev.nameMatch);
    if (normalized === ev.nameMatch) return ev;
    return { ...ev, nameMatch: normalized };
  });
}
