import fs from "fs";
import path from "path";
import { migrateClubEvents } from "../domain/club-event.js";

export function createFileClubEventRepository(filePath) {
  let writeChain = Promise.resolve();

  function ensureDir() {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  function readSync() {
    ensureDir();
    if (!fs.existsSync(filePath)) return [];
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(raw);
      return migrateClubEvents(Array.isArray(parsed) ? parsed : []);
    } catch {
      return [];
    }
  }

  function writeSync(events) {
    ensureDir();
    fs.writeFileSync(filePath, JSON.stringify(events, null, 2), "utf8");
  }

  return {
    async list() {
      return readSync();
    },
    async saveAll(next) {
      writeChain = writeChain.then(() => {
        writeSync(Array.isArray(next) ? next : []);
      });
      await writeChain;
    },
  };
}
