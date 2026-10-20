import { test } from "node:test";
import assert from "node:assert/strict";
import { createClubEventService } from "./club-event-service.js";
import { createInMemoryClubEventRepository } from "../infrastructure/in-memory-club-event-repository.js";
import { PasswordMismatchError, NotFoundError } from "../domain/club-event.js";

const PASSWORD = "visang!";

function createService(seed) {
  return createClubEventService({
    repository: createInMemoryClubEventRepository(seed),
    leaderPassword: PASSWORD,
  });
}

test("비밀번호가 틀리면 등록하지 않는다", async () => {
  const service = createService();
  await assert.rejects(
    () =>
      service.createEvent("wrong", {
        nameMatch: "원모어",
        year: 2026,
        month: 0,
        day: 10,
      }),
    PasswordMismatchError
  );
  assert.equal((await service.listEvents()).length, 0);
});

test("빈 비밀번호면 삭제하지 않는다", async () => {
  const service = createService([
    {
      id: "cle-1",
      nameMatch: "원모어",
      year: 2026,
      month: 0,
      day: 10,
      time: "",
      author: "",
    },
  ]);
  await assert.rejects(() => service.deleteEvent("", "cle-1"), PasswordMismatchError);
  assert.equal((await service.listEvents()).length, 1);
});

test("올바른 비밀번호면 등록·수정·삭제가 공유 저장소에 반영된다", async () => {
  const service = createService();
  const created = await service.createEvent(PASSWORD, {
    nameMatch: "퐁당",
    year: 2026,
    month: 4,
    day: 16,
    time: "19:00",
    author: "리더",
  });
  assert.equal(created.nameMatch, "퐁당다이브클럽");

  const updated = await service.updateEvent(PASSWORD, created.id, {
    nameMatch: "비상골",
    year: 2026,
    month: 6,
    day: 14,
    time: "18:00",
    author: "리더",
  });
  assert.equal(updated.nameMatch, "비상골린이들");
  assert.equal(updated.day, 14);

  await service.deleteEvent(PASSWORD, created.id);
  assert.equal((await service.listEvents()).length, 0);
});

test("없는 일정 수정은 NotFoundError다", async () => {
  const service = createService();
  await assert.rejects(
    () =>
      service.updateEvent(PASSWORD, "missing", {
        nameMatch: "원모어",
        year: 2026,
        month: 0,
        day: 1,
      }),
    NotFoundError
  );
});
