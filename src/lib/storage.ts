import { openDB } from "idb";
import type { MissionLogEntry } from "./types";

const DB_NAME = "mission-control";
const STORE_NAME = "logs";

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    }
  }
});

export const persistLog = async (entry: MissionLogEntry) => {
  const db = await dbPromise;
  await db.put(STORE_NAME, entry);
};

export const loadLogs = async (): Promise<MissionLogEntry[]> => {
  const db = await dbPromise;
  return (await db.getAll(STORE_NAME)).sort((a, b) => a.timestamp - b.timestamp);
};

export const clearLogs = async () => {
  const db = await dbPromise;
  await db.clear(STORE_NAME);
};
