// Equipment slot definitions for unit gear

export const EQUIPMENT_SLOTS = {
  helmet:   { name: 'Helmet',  row: 0, col: 1 },
  back:     { name: 'Cape',  row: 1, col: 0 },
  torso:    { name: 'Torso',  row: 1, col: 1 },
  amulet:   { name: 'Amulet',  row: 1, col: 2 },
  weapon:   { name: 'Weapon',  row: 2, col: 0 },
  legs:     { name: 'Legs',  row: 2, col: 1 },
  shield:   { name: 'Shield',  row: 2, col: 2 },
  bracelet: { name: 'Bracelet',  row: 3, col: 0 },
  ring1:    { name: 'Ring',  row: 3, col: 1 },
  ring2:    { name: 'Ring',  row: 3, col: 2 },
  boots:    { name: 'Boots',  row: 4, col: 1 }
};

export const SLOT_ORDER = Object.keys(EQUIPMENT_SLOTS);

export function getEmptyEquipment() {
  return Object.fromEntries(SLOT_ORDER.map(s => [s, null]));
}
