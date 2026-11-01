import { getStore } from "@netlify/blobs";
import { createClubEventService } from "../../server/application/club-event-service.js";
import { createKeyValueClubEventRepository } from "../../server/infrastructure/key-value-club-event-repository.js";
import {
  NotFoundError,
  PasswordMismatchError,
  ValidationError,
} from "../../server/domain/club-event.js";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, X-Club-Leader-Password",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

function json(statusCode, payload) {
  return {
    statusCode,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  };
}

function readPassword(event) {
  const headers = event.headers || {};
  return (
    headers["x-club-leader-password"] ||
    headers["X-Club-Leader-Password"] ||
    ""
  );
}

function parseBody(event) {
  if (!event.body) return {};
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function getEventId(event) {
  const parts = String(event.path || "")
    .split("/")
    .filter(Boolean);
  const last = parts[parts.length - 1] || "";
  if (!last || last === "club-events") return "";
  return decodeURIComponent(last);
}

function errorResponse(err) {
  if (
    err instanceof PasswordMismatchError ||
    err instanceof NotFoundError ||
    err instanceof ValidationError
  ) {
    return json(err.statusCode, { ok: false, message: err.message });
  }
  console.error(err);
  return json(500, { ok: false, message: "일정을 저장하지 못했습니다." });
}

function createService() {
  const store = getStore("vivame-club-events");
  const repository = createKeyValueClubEventRepository({
    async getJson() {
      const data = await store.get("events", { type: "json" });
      return Array.isArray(data) ? data : [];
    },
    async setJson(value) {
      await store.setJSON("events", value);
    },
  });
  return createClubEventService({
    repository,
    leaderPassword: process.env.CLUB_LEADER_PASSWORD || "visang!",
  });
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  try {
    const service = createService();
    const method = event.httpMethod;
    const id = getEventId(event);
    const body = parseBody(event);
    const password = readPassword(event) || body.password || "";

    if (method === "GET") {
      const events = await service.listEvents();
      return json(200, { ok: true, events });
    }
    if (method === "POST") {
      const created = await service.createEvent(password, body);
      return json(201, { ok: true, event: created });
    }
    if (method === "PUT" && id) {
      const updated = await service.updateEvent(password, id, body);
      return json(200, { ok: true, event: updated });
    }
    if (method === "DELETE" && id) {
      await service.deleteEvent(password, id);
      return json(200, { ok: true });
    }
    return json(405, { ok: false, message: "허용되지 않은 요청입니다." });
  } catch (err) {
    return errorResponse(err);
  }
}
