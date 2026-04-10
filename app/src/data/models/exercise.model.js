/**
 * @typedef {Object} Exercise
 * @property {string} id
 * @property {string} name
 * @property {string} goal
 * @property {string} type
 * @property {string} description
 * @property {Array<Pattern>} pattern
 * @property {number} totalDuration
 * @property {number} repetitions
 * @property {boolean} isActive
 */

/**
 * @typedef {Object} Pattern
 * @property {string} phase
 * @property {number} duration
 */

export const enum_Type = {
    Daily: "daily",
    Focus: "focus",
    Training: "training"
};

export const enum_Phase = {
    Hold: "hold",
    Inhale: "inhale",
    Exhale: "exhale"
};

export function createExercise({ id, name, goal, type, description, pattern, totalDuration, repetitions, isActive }) {
    return {
        id,
        name,
        goal,
        type,
        description,
        ...(Array.isArray(pattern) && pattern.length > 0 && { pattern }),
        totalDuration,
        repetitions,
        isActive
    };
}
