import { getDb } from "./db";

export const users = {
    async getAll() {
        const db = getDb();
        if (!db) return [];
        return (await db).getAll("users");
    },
    async getById(id) {
        const db = getDb();
        if (!db) return;
        return (await db).get("users", id);
    },
    async create(user) {
        const db = getDb();
        if (!db) return;
        await (await db).put("users", user);
        return user;
    },
    async update(id, data) {
        const db = getDb();
        if (!db) return;
        const existing = await (await db).get("users", id);
        if (!existing) return null;

        const updated = {
            ...existing,
            ...data,
            updatedAt: Date.now()
        };

        await (await db).put("users", updated);
        return updated;
    },
    async delete(id) {
        const db = getDb();
        if (!db) return;
        await (await db).delete("users", id);
    }
};