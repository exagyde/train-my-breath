import { getDb } from "./db";

export const exercises = {
    async getAll() {
        const db = getDb();
        if (!db) return [];
        return (await db).getAll("exercises");
    },
    async getById(id) {
        const db = getDb();
        if (!db) return;
        return (await db).get("exercises", id);
    },
    async create(exercise) {
        const db = getDb();
        if (!db) return;
        await (await db).put("exercises", exercise);
        return exercise;
    }
};