import { getDb } from "./db";

export const sessions = {
    async getAll() {
        const db = getDb();
        if (!db) return [];
        return (await db).getAll("sessions");
    },
    async getById(id) {
        const db = getDb();
        if (!db) return;
        return (await db).get("sessions", id);
    },
    async create(session) {
        const db = getDb();
        if (!db) return;
        await (await db).put("sessions", session);
        return session;
    },
    async update(id, data) {
        const db = getDb();
        if (!db) return;
        const existing = await (await db).get("sessions", id);
        if (!existing) return null;

        const updated = {
            ...existing,
            ...data,
            updatedAt: Date.now()
        };

        await (await db).put("sessions", updated);
        return updated;
    },
    async delete(id) {
        const db = getDb();
        if (!db) return;
        await (await db).delete("sessions", id);
    }
};