/**
 * @typedef {Object} Setting
 * @property {string} id
 * @property {number} createdAt
 * @property {number} updatedAt
 * @property {boolean} notificationsEnabled
 * @property {string} notificationTime
 * @property {string} goal
 * @property {boolean} voiceMuted
 * @property {Array<string>} [preferredExerciseIds]
 */

export const enum_Goal = {
    Relaxation: "relaxation",
    Performance: "performance",
    Endurance: "endurance"
};

export function createSetting({ notificationsEnabled, notificationTime, goal, voiceMuted, preferredExerciseIds }) {
    return {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        notificationsEnabled,
        notificationTime,
        goal,
        voiceMuted,
        ...(Array.isArray(preferredExerciseIds) && preferredExerciseIds.length > 0 && { preferredExerciseIds })
    };
}