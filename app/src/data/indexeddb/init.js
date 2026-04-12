import { dataProvider } from "../index";
import { createExercise } from "../models/exercise.model";
import { createUser } from "../models/user.model";
import { createSetting } from "../models/setting.model";
import { getDb } from "./db";

import defaultExercises from "./exercises.json" assert { type: "json" };

export async function initDatabase() {
    const db = getDb();
    if (!db) return;
    const database = await db;

    const existingExercises = await database.getAll("exercises");
    if (existingExercises.length === 0) {
        for (const exercise of defaultExercises) {
            const _exercise = createExercise(exercise);
            dataProvider.exercises.create(_exercise);
        }
    }

    const existingUsers = await database.getAll("users");
    if (existingUsers.length === 0) {
        const _user = createUser({ streak: 0, lastSessionDate: null, totalTime: 0 });
        dataProvider.users.create(_user);
    }

    const existingSettings = await database.getAll("settings");
    if (existingSettings.length === 0) {
        const _setting = createSetting({ notificationsEnabled: false, notificationTime: "09:00", goal: "relaxation", voiceMuted: false, preferredExerciseIds: [] });
        dataProvider.settings.create(_setting);
    }
}