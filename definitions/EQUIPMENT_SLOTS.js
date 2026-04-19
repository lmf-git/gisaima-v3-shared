// Equipment slot definitions for unit gear

export const EQUIPMENT_SLOTS = {
  helmet:   { name: 'Helmet',   icon: '⛑️',  row: 0, col: 1 },
  back:     { name: 'Cape',     icon: '🎗️',  row: 1, col: 0 },
  torso:    { name: 'Torso',    icon: '🧥',  row: 1, col: 1 },
  amulet:   { name: 'Amulet',   icon: '📿',  row: 1, col: 2 },
  weapon:   { name: 'Weapon',   icon: '⚔️',  row: 2, col: 0 },
  legs:     { name: 'Legs',     icon: '👖',  row: 2, col: 1 },
  shield:   { name: 'Shield',   icon: '🛡️',  row: 2, col: 2 },
  bracelet: { name: 'Bracelet', icon: '⌚',  row: 3, col: 0 },
  ring1:    { name: 'Ring',     icon: '💍',  row: 3, col: 1 },
  ring2:    { name: 'Ring',     icon: '💍',  row: 3, col: 2 },
  boots:    { name: 'Boots',    icon: '👢',  row: 4, col: 1 },
};

export const SLOT_ORDER = Object.keys(EQUIPMENT_SLOTS);

export function getEmptyEquipment() {
  return Object.fromEntries(SLOT_ORDER.map(s => [s, null]));
}
