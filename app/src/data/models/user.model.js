/**
 * @typedef {Object} User
 * @property {string} id
 * @property {number} createdAt
 * @property {number} updatedAt
 * @property {number} streak
 * @property {number} lastSessionDate
 * @property {number} totalTime
 */

export function createUser({ streak, lastSessionDate, totalTime }) {
    return {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        streak,
        lastSessionDate,
        totalTime
    };
}