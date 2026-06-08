/**
 * Research definitions.
 *
 * Research is conducted at a structure that hosts an Academy building of
 * sufficient level. Completing a research writes `structure.research[id] = true`,
 * which is what unit recruitment gates (UNITS `requirements.research`) check.
 *
 * Fields:
 *   name, description       — display.
 *   requiredAcademyLevel    — minimum academy building level to begin.
 *   requiredResearch        — another research id that must be done first (optional).
 *   cost                    — item code → quantity, paid from the structure bank/store.
 *   ticksRequired           — world ticks to complete.
 */
export const RESEARCH = {
  basic_research: {
    name: 'Basic Research',
    description: 'Foundational study that unlocks specialist units and further research.',
    requiredAcademyLevel: 2,
    cost: { WOOD: 10, STONE: 8 },
    ticksRequired: 20,
  },
  advanced_research: {
    name: 'Advanced Research',
    description: 'Advanced theory enabling elite doctrines.',
    requiredAcademyLevel: 3,
    requiredResearch: 'basic_research',
    cost: { WOOD: 20, STONE: 15, CRYSTAL: 2 },
    ticksRequired: 40,
  },
  siegecraft: {
    name: 'Siegecraft',
    description: 'The art of building engines of war — unlocks siege units.',
    requiredAcademyLevel: 3,
    requiredResearch: 'basic_research',
    cost: { WOOD: 25, STONE: 20, METAL: 5 },
    ticksRequired: 40,
  },
};

export function getResearch(id) {
  return RESEARCH[id] || null;
}

/**
 * Research ids a structure could pursue right now: not already completed/in
 * progress, academy level sufficient, and prerequisite (if any) completed.
 */
export function getAvailableResearch(structure) {
  const academyLevel = highestAcademyLevel(structure);
  const done = structure?.research || {};
  return Object.entries(RESEARCH)
    .filter(([id, def]) =>
      !done[id] &&
      academyLevel >= def.requiredAcademyLevel &&
      (!def.requiredResearch || done[def.requiredResearch]))
    .map(([id, def]) => ({ id, ...def }));
}

/** Highest level among a structure's academy buildings (0 if none). */
export function highestAcademyLevel(structure) {
  const buildings = structure?.buildings || {};
  let max = 0;
  for (const b of Object.values(buildings)) {
    if (b?.type === 'academy') max = Math.max(max, b.level || 1);
  }
  return max;
}

export default RESEARCH;
