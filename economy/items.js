import UNITS from '../definitions/UNITS.js';
import { geneticMod } from '../lives/genetics.js';

/**
 * Merges two collections of items, combining quantities of identical items based on their item codes
 * This ensures items of the same type are stacked together rather than appearing as separate entries
 *
 * @param {Object|Array} existingItems Collection of existing items (object format {item_code: quantity} or array of objects)
 * @param {Object|Array} newItems Collection of new items to merge (object format {item_code: quantity} or array of objects)
 * @returns {Object} Merged items in the format {item_code: quantity}
 */
export function merge(existingItems = [], newItems = []) {
  // Initialize result object to store merged items
  const result = {};
  
  // Handle conversion from legacy array format to new object format
  function processItems(items, targetObj) {
    if (!items) return;
    
    if (Array.isArray(items)) {
      // Convert legacy array format to new object format
      items.forEach(item => {
        if (!item) return;
        
        // Handle items in array format (legacy format)
        const itemCode = item.id || item.name;
        if (!itemCode) return;
        
        const normalizedCode = itemCode.toUpperCase();
        const quantity = item.quantity || 1;
        
        targetObj[normalizedCode] = (targetObj[normalizedCode] || 0) + quantity;
      });
    } else if (typeof items === 'object') {
      // Items already in object format {item_code: quantity}
      Object.entries(items).forEach(([code, quantity]) => {
        if (!code || typeof quantity !== 'number') return;
        
        const normalizedCode = code.toUpperCase();
        targetObj[normalizedCode] = (targetObj[normalizedCode] || 0) + quantity;
      });
    }
  }
  
  // Process existing items first
  processItems(existingItems, result);

  // Then merge in new items
  processItems(newItems, result);

  return result;
}

// Total number of units carried in an item store (object {CODE: qty} or legacy
// array of {quantity}), ignoring `_metadata` keys.
export function itemCount(items) {
  if (!items) return 0;
  if (Array.isArray(items)) return items.reduce((s, i) => s + (Number(i?.quantity) || 1), 0);
  return Object.entries(items).reduce(
    (s, [k, v]) => (k.startsWith('_') ? s : s + (typeof v === 'number' ? v : (Number(v?.quantity) || 1))),
    0
  );
}

// A group's carrying capacity = the sum of its units' carryCapacity, plus any
// genetic carry bonus a player unit's ethnicity/trait grants. This is the single
// source of truth for both the UI display and the server gather loop, so "gather
// until full" always stops exactly at the shown capacity.
export function groupCarryCapacity(group) {
  if (!group?.units) return 0;
  const units = Array.isArray(group.units) ? group.units : Object.values(group.units);
  return units.reduce((sum, u) =>
    sum + (UNITS[u?.type]?.carryCapacity || 0) + (u?.type === 'player' ? geneticMod(u, 'carry') : 0), 0);
}

// Split an item store against a carry capacity. The first `capacity` units are
// kept; anything beyond overflows. Both returned collections are {CODE: qty}.
// `_metadata` keys are preserved in `kept` and never count toward capacity.
export function splitToCapacity(items, capacity) {
  const norm = merge({}, items);
  const kept = {};
  const overflow = {};
  let room = Number.isFinite(capacity) ? Math.max(0, capacity) : Infinity;
  for (const [code, qty] of Object.entries(norm)) {
    if (code.startsWith('_')) { kept[code] = qty; continue; }
    const q = Number(qty) || 0;
    const take = Math.max(0, Math.min(q, room));
    if (take > 0) kept[code] = take;
    if (q - take > 0) overflow[code] = q - take;
    room -= take;
  }
  return { kept, overflow };
}
