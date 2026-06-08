/**
 * Genetics — turns the flavour ethnicity/trait on a life (see api ETHNICITIES &
 * trait pool) into numeric modifiers other systems can apply.
 *
 * Modifier keys:
 *   carry  — group/unit carry capacity
 *   sight  — vision radius (tiles)
 *   yield  — gathering yield
 *   atk    — attack contribution
 *   def    — defence contribution
 *   craft  — crafting speed/level edge
 */
export const ETHNICITY_MODS = {
  Westmark: { carry: 1 },
  Norvel:   { sight: 1 },
  Sylvan:   { yield: 1 },
  Drava:    { atk: 1 },
  Asari:    { craft: 1 },
  Brennec:  { def: 1 },
};

export const TRAIT_MODS = {
  steadfast: { def: 1 },
  quick:     { sight: 1 },
  cautious:  { def: 1 },
  cunning:   { atk: 1 },
  kind:      {},
  wrathful:  { atk: 1 },
};

/** Combined { key: total } modifiers for a life/entity carrying ethnicity+trait. */
export function geneticMods(source) {
  const e = ETHNICITY_MODS[source?.ethnicity] || {};
  const t = TRAIT_MODS[source?.trait] || {};
  const out = {};
  for (const k of new Set([...Object.keys(e), ...Object.keys(t)])) {
    out[k] = (e[k] || 0) + (t[k] || 0);
  }
  return out;
}

/** A single genetic modifier value (0 if none). */
export function geneticMod(source, key) {
  return geneticMods(source)[key] || 0;
}

export default geneticMods;
