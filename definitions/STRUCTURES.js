export const STRUCTURES = {
  'spawn': {
    description: "Generic Spawn",
    name: "Generic Spawn",
    type: "spawn",
    durability: 120,
    capacity: 50,
    buildTime: 0,
    requiredResources: [
      { id: 'WOOD', quantity: 8 },
      { id: 'STONE', quantity: 6 }
    ],
    features: [
      {
        name: 'Spawn Point',
        description: 'Allows new players to join the game',
        icon: '🏕️'
      },
      {
        name: 'Basic Storage',
        description: 'Stores resources and items',
        icon: '📦'
      }
    ],
  },
  'monster_lair': {
    name: "Monster Lair",
    description: "A basic monster dwelling",
    type: "monster_lair",
    requiredResources: [
      { id: 'WOOD', quantity: 8 },
      { id: 'STONE', quantity: 6 }
    ],
    buildTime: 1,
    capacity: 10,
    durability: 120,
    features: [
      {
        name: 'Basic Storage',
        description: 'Stores resources and items',
        icon: '📦'
      },
      {
        name: 'Monster Spawning',
        description: 'Allows new monsters to join',
        icon: '🐾'
      }
    ],
    monster: true
  },
  'monster_fortress': {
    name: "Monster Fortress",
    description: "A fortified monster stronghold",
    type: "monster_fortress",
    requiredResources: [
      { id: 'WOOD', quantity: 15 },
      { id: 'STONE', quantity: 12 },
      { id: 'MONSTER_HIDE', quantity: 5 }
    ],
    buildTime: 2,
    capacity: 25,
    durability: 200, // Increased from 80
    features: [
      {
        name: 'Advanced Storage',
        description: 'Stores more resources and items',
        icon: '📦'
      },
      {
        name: 'Monster Defense',
        description: 'Improved defensive capabilities',
        icon: '🛡️'
      },
      {
        name: 'Monster Spawning',
        description: 'Allows new monsters to join',
        icon: '🐾'
      }
    ],
    monster: true
  },
  'monster_hive': {
    name: "Monster Hive",
    description: "A place where monsters are born",
    type: "monster_hive",
    requiredResources: [
      { id: 'WOOD', quantity: 10 },
      { id: 'STONE', quantity: 8 },
      { id: 'MONSTER_BLOOD', quantity: 3 }
    ],
    buildTime: 1,
    capacity: 15,
    durability: 150, // Increased from 80
    features: [
      {
        name: 'Monster Spawning',
        description: 'Allows new monsters to join',
        icon: '🐾'
      },
      {
        name: 'Rapid Growth',
        description: 'Monsters grow and reproduce quickly',
        icon: '⚡'
      }
    ],
    monster: true
  },
  'monster_den': {
    name: "Monster Den",
    description: "A hidden place for monsters to rest",
    type: "monster_den",
    requiredResources: [
      { id: 'WOOD', quantity: 12 },
      { id: 'STONE', quantity: 8 },
      { id: 'BONE_FRAGMENT', quantity: 4 }
    ],
    buildTime: 1,
    capacity: 20,
    durability: 180, // Increased from 80
    features: [
      {
        name: 'Monster Healing',
        description: 'Monsters heal over time',
        icon: '❤️'
      },
      {
        name: 'Territory Control',
        description: 'Monsters defend their territory',
        icon: '🚧'
      }
    ],
    monster: true
  },
  'basic_shelter': {
    name: 'Basic Shelter',
    description: 'A simple shelter providing minimal protection',
    type: 'shelter',
    durability: 100,
    bonuses: {
      defense: 1
    },
    requiredResources: [
      { id: 'WOOD', quantity: 5 },
      { id: 'STONE', quantity: 3 }
    ],
    buildTime: 2,
    features: [
      {
        name: 'Basic Shelter',
        description: 'Provides basic protection from elements',
        icon: '🏠'
      }
    ]
  },
  
  'watchtower': {
    name: 'Watchtower',
    description: 'Provides vision over surrounding area',
    type: 'watchtower',
    durability: 150,
    sightRange: 2,
    bonuses: {
      detection: 2
    },
    requiredResources: [
      { id: 'WOOD', quantity: 8 },
      { id: 'STONE', quantity: 5 }
    ],
    buildTime: 3,
    features: [
      {
        name: 'Lookout',
        description: 'Allows spotting of approaching forces',
        icon: '👁️'
      }
    ]
  },
  
  'storage': {
    name: 'Storage Depot',
    description: 'Stores additional resources',
    type: 'storage',
    durability: 80,
    capacity: 10,
    requiredResources: [
      { id: 'WOOD', quantity: 6 },
      { id: 'STONE', quantity: 2 },
      { id: 'MEDICINAL_HERBS', quantity: 4 } // Changed from "Fiber" to existing MEDICINAL_HERBS
    ],
    buildTime: 2,
    features: [
      {
        name: 'Storage',
        description: 'Stores additional resources',
        icon: '📦'
      }
    ]
  },
  
  'workshop': {
    name: 'Workshop',
    description: 'Allows crafting of basic items',
    type: 'workshop',
    durability: 120,
    craftingSpeed: 1.5,
    requiredResources: [
      { id: 'WOOD', quantity: 10 },
      { id: 'STONE', quantity: 8 },
      { id: 'METAL_ORE', quantity: 3 } // Changed from "Metal" to specific METAL_ORE
    ],
    buildTime: 5,
    features: [
      {
        name: 'Crafting',
        description: 'Allows crafting of items',
        icon: '🔨'
      }
    ]
  },
  
  'outpost': {
    name: 'Outpost',
    description: 'A forward base providing a foothold in new territories',
    type: 'outpost',
    durability: 200,
    sightRange: 3,
    bonuses: {
      defense: 2,
      detection: 1
    },
    requiredResources: [
      { id: 'WOOD', quantity: 12 },
      { id: 'STONE', quantity: 8 },
      { id: 'METAL_ORE', quantity: 4 }
    ],
    buildTime: 4,
    capacity: 8,
    features: [
      {
        name: 'Forward Base',
        description: 'Allows establishing presence in new territories',
        icon: '🏕️'
      },
      {
        name: 'Extended Vision',
        description: 'Provides sight over surrounding area',
        icon: '👁️'
      },
      {
        name: 'Basic Storage',
        description: 'Stores resources and supplies',
        icon: '📦'
      }
    ]
  },

  // ─── Tiered defensive line ───
  // A `shelter` is promoted up this ladder as it is upgraded (see
  // STRUCTURE_TIER_LADDER): fortress (L2) → stronghold (L3) → citadel (L4+).
  // These types are referenced by unit requirements and upgrade cost tables; the
  // promotion on upgrade is what brings them into being.
  'fortress': {
    name: 'Fortress',
    description: 'A fortified stronghold-in-the-making with stout walls and a garrison.',
    type: 'fortress',
    durability: 350,
    sightRange: 3,
    capacity: 14,
    bonuses: { defense: 5, detection: 1 },
    requiredResources: [
      { id: 'WOOD', quantity: 20 },
      { id: 'STONE', quantity: 18 },
      { id: 'METAL_ORE', quantity: 6 }
    ],
    buildTime: 6,
    features: [
      { name: 'Garrison', description: 'Houses a standing defensive force', icon: '🛡️' },
      { name: 'Curtain Wall', description: 'Stone walls that blunt attackers', icon: '🏰' }
    ]
  },
  'stronghold': {
    name: 'Stronghold',
    description: 'A formidable seat of power, able to train advanced units.',
    type: 'stronghold',
    durability: 550,
    sightRange: 4,
    capacity: 20,
    bonuses: { defense: 8, detection: 2 },
    requiredResources: [
      { id: 'WOOD', quantity: 30 },
      { id: 'STONE', quantity: 30 },
      { id: 'METAL_ORE', quantity: 12 }
    ],
    buildTime: 8,
    features: [
      { name: 'War Council', description: 'Coordinates advanced military units', icon: '⚔️' },
      { name: 'Reinforced Keep', description: 'Heavily fortified inner keep', icon: '🏰' }
    ]
  },
  'citadel': {
    name: 'Citadel',
    description: 'The pinnacle of fortification — a bastion of the realm.',
    type: 'citadel',
    durability: 800,
    sightRange: 5,
    capacity: 30,
    bonuses: { defense: 12, detection: 3 },
    requiredResources: [
      { id: 'WOOD', quantity: 40 },
      { id: 'STONE', quantity: 45 },
      { id: 'METAL_ORE', quantity: 20 },
      { id: 'CRYSTAL', quantity: 5 }
    ],
    buildTime: 10,
    features: [
      { name: 'Grand Bastion', description: 'Commands the surrounding region', icon: '🏯' },
      { name: 'Legendary Forge', description: 'Crafts the finest equipment', icon: '🌟' }
    ]
  }
};

export const STRUCTURE_TYPES = Object.keys(STRUCTURES);

// Ordered promotion ladder for player defensive bases. A structure whose type is
// on this ladder is promoted to the entry matching its new level when upgraded
// (index 0 = level 1). Types not on the ladder (spawn, outpost, watchtower…)
// keep their type and only gain levels.
export const STRUCTURE_TIER_LADDER = ['shelter', 'fortress', 'stronghold', 'citadel'];

/**
 * The type a structure should become at `toLevel`, or null if it should not
 * change (not on the ladder, or already the right tier).
 */
export function promotedStructureType(currentType, toLevel) {
  const idx = STRUCTURE_TIER_LADDER.indexOf(currentType);
  if (idx === -1) return null;
  const targetIdx = Math.min(Math.max(1, Number(toLevel) || 1) - 1, STRUCTURE_TIER_LADDER.length - 1);
  const target = STRUCTURE_TIER_LADDER[targetIdx];
  return target && target !== currentType ? target : null;
}
