/**
 * @typedef {Object} Session
 * @property {string} id
 * @property {number} createdAt
 * @property {number} updatedAt
 * @property {string} exerciseId
 * @property {boolean} completed
 * @property {number} duration
 */

export function createSession({ exerciseId, completed, duration }) {
    return {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        exerciseId,
        completed,
        duration
    };
}