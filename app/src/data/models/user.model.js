/**
 * @typedef {Object} User
 * @property {string} id
 * @property {number} createdAt
 * @property {number} streak
 * @property {number} lastSessionDate
 * @property {number} totalTime
 */

export function createUser({ streak, lastSessionDate, totalTime }) {
    return {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        streak,
        lastSessionDate,
        totalTime
    };
}