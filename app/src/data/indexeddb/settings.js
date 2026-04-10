import { getDb } from "./db";

export const settings = {
    async getAll() {
        const db = getDb();
        if (!db) return [];
        return (await db).getAll("settings");
    },
    async getById(id) {
        const db = getDb();
        if (!db) return;
        return (await db).get("settings", id);
    },
    async create(setting) {
        const db = getDb();
        if (!db) return;
        await (await db).put("settings", setting);
        return setting;
    },
    async delete(id) {
        const db = getDb();
        if (!db) return;
        await (await db).delete("settings", id);
    }
};