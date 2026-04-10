import { openDB } from "idb";

let dbPromise = null;

export function getDb() {
    if (typeof window === "undefined") return null;

    if (!dbPromise) {
        dbPromise = openDB("train-my-breath-hq", 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains("exercises")) {
                    db.createObjectStore("exercises", { keyPath: "id" });
                }

                if (!db.objectStoreNames.contains("sessions")) {
                    db.createObjectStore("sessions", { keyPath: "id" });
                }

                if (!db.objectStoreNames.contains("settings")) {
                    db.createObjectStore("settings", { keyPath: "id" });
                }

                if (!db.objectStoreNames.contains("users")) {
                    db.createObjectStore("users", { keyPath: "id" });
                }
            }
        });
    }

    return dbPromise;
}
