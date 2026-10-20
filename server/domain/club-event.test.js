import { test } from "node:test";
import assert from "node:assert/strict";
import {
  migrateClubEvents,
  normalizeClubScheduleNameMatch,
  validateClubEventInput,
} from "./club-event.js";

test("짧은 동호회명을 공식 명칭으로 정규화한다", () => {
  assert.equal(normalizeClubScheduleNameMatch("퐁당"), "퐁당다이브클럽");
  assert.equal(normalizeClubScheduleNameMatch("비상골"), "비상골린이들");
  assert.equal(normalizeClubScheduleNameMatch("원모어"), "원모어");
});

test("필수 값이 없으면 등록을 거부한다", () => {
  const result = validateClubEventInput({ year: 2026, month: 0, day: 1 });
  assert.equal(result.ok, false);
  assert.equal(result.message, "동호회를 선택해 주세요.");
});

test("2026년 밖의 날짜는 거부한다", () => {
  const result = validateClubEventInput({
    nameMatch: "원모어",
    year: 2025,
    month: 5,
    day: 1,
  });
  assert.equal(result.ok, false);
  assert.match(result.message, /2026년/);
});

test("유효한 일정은 정규화된 값으로 통과한다", () => {
  const result = validateClubEventInput({
    nameMatch: "퐁당",
    year: 2026,
    month: 4,
    day: 16,
    time: "19:00",
    author: "유지수 CP",
  });
  assert.equal(result.ok, true);
  assert.equal(result.value.nameMatch, "퐁당다이브클럽");
  assert.equal(result.value.time, "19:00");
});

test("저장된 짧은 동호회명을 마이그레이션한다", () => {
  const migrated = migrateClubEvents([
    { id: "1", nameMatch: "퐁당" },
    { id: "2", nameMatch: "비상골" },
  ]);
  assert.equal(migrated[0].nameMatch, "퐁당다이브클럽");
  assert.equal(migrated[1].nameMatch, "비상골린이들");
});
