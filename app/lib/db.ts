import { openDB } from "idb";

export interface DiaryEntry {
  id: number;
  type: "text" | "audio" | "video";
  note?: string;
  blob?: Blob;
  createdAt: number;
}

const DB_NAME = "diary-db";
const STORE_NAME = "entries";

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    }
  },
});

export const addEntry = async (entry: Omit<DiaryEntry, "id">) => {
  const db = await dbPromise;
  const id = Date.now();
  await db.add(STORE_NAME, { id, ...entry });
};

export const getEntries = async (): Promise<DiaryEntry[]> => {
  const db = await dbPromise;
  return await db.getAll(STORE_NAME);
};

export const deleteEntry = async (id: number) => {
  const db = await dbPromise;
  await db.delete(STORE_NAME, id);
};

export const clearAll = async () => {
  const db = await dbPromise;
  await db.clear(STORE_NAME);
};
