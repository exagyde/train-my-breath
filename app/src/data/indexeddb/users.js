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
    async delete(id) {
        const db = getDb();
        if (!db) return;
        await (await db).delete("users", id);
    }
};