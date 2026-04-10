import { exercises } from "./indexeddb/exercises";
import { sessions } from "./indexeddb/sessions";
import { settings } from "./indexeddb/settings";
import { users } from "./indexeddb/users";
import { initDatabase } from "./indexeddb/init";

export const dataProvider = {
    exercises,
    sessions,
    settings,
    users,
    init: initDatabase
};