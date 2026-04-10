/**
 * @typedef {Object} Setting
 * @property {string} id
 * @property {boolean} notificationsEnabled
 * @property {string} notificationTime
 * @property {string} goal
 * @property {Array<string>} [preferredExerciseIds]
 */

export const enum_Goal = {
    Relaxation: "relaxation",
    Performance: "performance",
    Endurance: "endurance"
};

export function createSetting({ notificationsEnabled, notificationTime, goal, preferredExerciseIds }) {
    return {
        id: crypto.randomUUID(),
        notificationsEnabled,
        notificationTime,
        goal,
        ...(Array.isArray(preferredExerciseIds) && preferredExerciseIds.length > 0 && { preferredExerciseIds })
    };
}