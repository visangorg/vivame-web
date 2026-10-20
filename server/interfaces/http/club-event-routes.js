import { Router } from "express";
import {
  NotFoundError,
  PasswordMismatchError,
  ValidationError,
} from "../../domain/club-event.js";

function readLeaderPassword(req) {
  const header = req.get("x-club-leader-password");
  if (header != null && header !== "") return header;
  if (req.body && typeof req.body.password === "string") return req.body.password;
  return "";
}

function sendError(res, err) {
  if (
    err instanceof PasswordMismatchError ||
    err instanceof NotFoundError ||
    err instanceof ValidationError
  ) {
    return res.status(err.statusCode).json({ ok: false, message: err.message });
  }
  console.error(err);
  return res.status(500).json({ ok: false, message: "일정을 저장하지 못했습니다." });
}

export function createClubEventRouter(clubEventService) {
  const router = Router();

  router.get("/", async (_req, res) => {
    try {
      const events = await clubEventService.listEvents();
      res.json({ ok: true, events });
    } catch (err) {
      sendError(res, err);
    }
  });

  router.post("/", async (req, res) => {
    try {
      const event = await clubEventService.createEvent(readLeaderPassword(req), req.body || {});
      res.status(201).json({ ok: true, event });
    } catch (err) {
      sendError(res, err);
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const event = await clubEventService.updateEvent(
        readLeaderPassword(req),
        req.params.id,
        req.body || {}
      );
      res.json({ ok: true, event });
    } catch (err) {
      sendError(res, err);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      await clubEventService.deleteEvent(readLeaderPassword(req), req.params.id);
      res.json({ ok: true });
    } catch (err) {
      sendError(res, err);
    }
  });

  return router;
}
