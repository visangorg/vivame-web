import {
  createClubEventId,
  migrateClubEvents,
  NotFoundError,
  PasswordMismatchError,
  ValidationError,
  validateClubEventInput,
} from "../domain/club-event.js";

export function createClubEventService({ repository, leaderPassword }) {
  if (!repository) {
    throw new Error("repository is required");
  }

  function assertPassword(password) {
    if (password !== leaderPassword) {
      throw new PasswordMismatchError();
    }
  }

  async function listEvents() {
    const events = migrateClubEvents(await repository.list());
    return events;
  }

  async function createEvent(password, input) {
    assertPassword(password);
    const validated = validateClubEventInput(input);
    if (!validated.ok) {
      throw new ValidationError(validated.message);
    }
    const events = await listEvents();
    const now = new Date().toISOString();
    const event = {
      id: createClubEventId(),
      ...validated.value,
      createdAt: now,
    };
    events.push(event);
    await repository.saveAll(events);
    return event;
  }

  async function updateEvent(password, id, input) {
    assertPassword(password);
    if (!id) {
      throw new ValidationError("수정할 일정을 찾을 수 없습니다.");
    }
    const validated = validateClubEventInput(input);
    if (!validated.ok) {
      throw new ValidationError(validated.message);
    }
    const events = await listEvents();
    const idx = events.findIndex((ev) => ev.id === id);
    if (idx === -1) {
      throw new NotFoundError("수정할 일정을 찾을 수 없습니다.");
    }
    events[idx] = {
      id: events[idx].id,
      ...validated.value,
      createdAt: events[idx].createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await repository.saveAll(events);
    return events[idx];
  }

  async function deleteEvent(password, id) {
    assertPassword(password);
    if (!id) {
      throw new ValidationError("삭제할 일정을 찾을 수 없습니다.");
    }
    const events = await listEvents();
    const existing = events.find((ev) => ev.id === id);
    if (!existing) {
      throw new NotFoundError("삭제할 일정을 찾을 수 없습니다.");
    }
    await repository.saveAll(events.filter((ev) => ev.id !== id));
    return existing;
  }

  return {
    listEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}
