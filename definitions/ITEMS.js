// Define item categories with display labels
export const ITEM_CATEGORIES = {
  weapon: 'Weapons',
  tool: 'Tools',
  consumable: 'Consumables',
  document: 'Documents',
  artifact: 'Artifacts',
  material: 'Materials',
  scroll: 'Scrolls',
  trade_good: 'Trade Goods'
};

// Add a helper function to get categories formatted for display
export function getItemCategories() {
  return Object.entries(ITEM_CATEGORIES).map(([id, label]) => ({ id, label }));
}

export const ITEMS = {
  // Common resources (gathered items)
  WOOD: {
    name: 'Wood',
    type: 'resource',
    rarity: 'common',
    description: 'Basic building material found in most areas',
    biomes: ['plains', 'forest', 'mountains', 'desert', 'rivers', 'oasis', 'ruins', 'wastes']
  },
  STONE: {
    name: 'Stone',
    type: 'resource',
    rarity: 'common',
    description: 'Small rocks useful for crafting tools',
    biomes: ['plains', 'forest', 'mountains', 'desert', 'ruins', 'wastes']
  },

  LEATHER: {
    name: 'Leather',
    type: 'resource',
    rarity: 'common',
    description: 'Tough hide used in crafting armor and goods',
    // Cured from hides of game found in open and wooded country.
    biomes: ['plains', 'forest']
  },
  BONE: {
    name: 'Bone',
    type: 'resource',
    rarity: 'common',
    description: 'Sturdy bone used for crude weapons and tools',
    biomes: ['desert', 'wastes', 'ruins']
  },
  COAL: {
    name: 'Coal',
    type: 'resource',
    rarity: 'common',
    description: 'Black rock that burns hot — fuel for forges',
    biomes: ['mountains', 'wastes']
  },
  ROPE: {
    name: 'Rope',
    type: 'resource',
    rarity: 'common',
    description: 'Braided cordage for rigging, lashings and sails',
    recipe: {
      materials: { LEATHER: 2 },
      ticksRequired: 4,
      category: 'material',
      requiredLevel: 1,
      quantity: 2
    }
  },

  // Craftable items
  WOODEN_SWORD: {
    name: 'Wooden Sword',
    type: 'weapon',
    rarity: 'common',
    description: 'A basic wooden sword. Not very durable but better than nothing.',
    power: 2,
    equipSlot: 'weapon',
    stats: { attack: 2 },
    recipe: {
      materials: {
        WOOD: 5
      },
      ticksRequired: 6,
      category: 'weapon',
      requiredLevel: 1
    }
  },
  
  STONE_SWORD: {
    name: 'Stone Sword',
    type: 'weapon',
    rarity: 'common',
    description: 'A stone-bladed sword. More durable than wood.',
    power: 5,
    equipSlot: 'weapon',
    stats: { attack: 5 },
    recipe: {
      materials: {
        WOOD: 2,
        STONE: 5
      },
      ticksRequired: 12,
      category: 'weapon',
      requiredLevel: 2
    }
  },
  HERBS: {
    name: 'Herbs',
    type: 'resource',
    rarity: 'common',
    description: 'Plants used for potions and healing',
    biomes: ['plains', 'forest']
  },
  CRYSTAL: {
    name: 'Crystal',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Magical shard used for enchantments',
    biomes: ['mountains', 'oasis']
  },
  METAL: {
    name: 'Metal',
    type: 'resource',
    rarity: 'common',
    description: 'Strong metal used for weapons and tools',
    // Smelted from raw ore at a furnace. Surfaced as a craftable via getAllRecipes.
    recipe: {
      materials: { METAL_ORE: 2 },
      ticksRequired: 8,
      category: 'material',
      requiredLevel: 1,
      requiredBuilding: { type: 'furnace', level: 1 },
      quantity: 1
    }
  },
  IRON_SWORD: {
    name: 'Iron Sword',
    type: 'weapon',
    rarity: 'uncommon',
    description: 'A well-crafted iron sword. Standard issue for many fighters.',
    power: 10,
    equipSlot: 'weapon',
    stats: { attack: 10 },
    recipe: {
      // Forged from refined METAL (smelted from ore at a furnace), not raw ore.
      materials: {
        WOOD: 2,
        METAL: 2
      },
      ticksRequired: 18,
      category: 'weapon',
      requiredLevel: 3,
      requiredBuilding: {
        type: 'smithy',
        level: 2
      }
    }
  },
  
  // ─── Steel tier (the payoff of an upgraded Furnace + Smithy) ───
  STEEL: {
    name: 'Steel',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Refined alloy, stronger than plain metal. Forged at an advanced furnace.',
    recipe: {
      materials: { METAL: 2 },
      ticksRequired: 10,
      category: 'material',
      requiredLevel: 1,
      requiredBuilding: { type: 'furnace', level: 3 },
      quantity: 1
    }
  },
  IRON_PICKAXE: {
    name: 'Iron Pickaxe',
    type: 'tool',
    rarity: 'common',
    description: 'A sturdy pickaxe that improves mining.',
    stats: { miningYield: 0.1 },
    recipe: {
      materials: { METAL: 2, WOOD: 2 },
      ticksRequired: 10,
      category: 'tool',
      requiredLevel: 2,
      requiredBuilding: { type: 'smithy', level: 3 }
    }
  },
  STEEL_SWORD: {
    name: 'Steel Sword',
    type: 'weapon',
    rarity: 'rare',
    description: 'A keen steel blade, far superior to iron.',
    power: 16,
    equipSlot: 'weapon',
    stats: { attack: 16 },
    recipe: {
      materials: { STEEL: 2, WOOD: 2 },
      ticksRequired: 24,
      category: 'weapon',
      requiredLevel: 4,
      requiredBuilding: { type: 'smithy', level: 4 }
    }
  },
  STEEL_ARMOR: {
    name: 'Steel Armor',
    type: 'armor',
    rarity: 'rare',
    description: 'A full suit of steel plate.',
    power: 12,
    equipSlot: 'torso',
    stats: { defense: 12 },
    recipe: {
      materials: { STEEL: 4 },
      ticksRequired: 28,
      category: 'armor',
      requiredLevel: 4,
      requiredBuilding: { type: 'smithy', level: 4 }
    }
  },
  LEGENDARY_WEAPON: {
    name: 'Legendary Blade',
    type: 'weapon',
    rarity: 'legendary',
    description: 'A masterwork weapon of mithril and crystal, forged at the height of a smithy.',
    power: 28,
    equipSlot: 'weapon',
    stats: { attack: 28 },
    recipe: {
      materials: { MITHRIL_ORE: 3, STEEL: 3, CRYSTAL: 2 },
      ticksRequired: 40,
      category: 'weapon',
      requiredLevel: 5,
      requiredBuilding: { type: 'smithy', level: 5 }
    }
  },

  HERBAL_TEA: {
    name: 'Herbal Tea',
    type: 'consumable',
    rarity: 'common',
    description: 'A soothing tea that provides minor healing and stamina recovery.',
    recipe: {
      materials: {
        MEDICINAL_HERBS: 2,
        FRESH_WATER: 1
      },
      ticksRequired: 4,
      category: 'consumable',
      requiredLevel: 1,
      requiredBuilding: {
        type: 'farm',
        level: 1
      },
      quantity: 2  // Produces 2 per craft
    }
  },
  
  // Special items
  MYSTERIOUS_ARTIFACT: {
    name: 'Mysterious Artifact',
    type: 'artifact',
    rarity: 'rare',
    description: 'A strange object of unknown origin',
    power: 8, // Battle power contribution
    biomes: ['ruins', 'wastes'] // Special item found in specific areas
  },
  
  // Plains items
  WHEAT: {
    name: 'Wheat',
    type: 'resource',
    rarity: 'common',
    description: 'Grain that grows in open grasslands',
    biomes: ['plains'],
    food: true,
    nourishment: 2
  },
  WILD_BERRIES: {
    name: 'Wild Berries',
    type: 'resource',
    rarity: 'common',
    description: 'Edible berries found in meadows',
    biomes: ['plains', 'forest'],
    food: true,
    nourishment: 1
  },
  
  // Forest items
  OAK_WOOD: {
    name: 'Oak Wood',
    type: 'resource',
    rarity: 'common',
    description: 'Strong wood from forest trees',
    biomes: ['forest']
  },
  MEDICINAL_HERBS: {
    name: 'Medicinal Herbs',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Plants with healing properties',
    biomes: ['forest']
  },
  
  // Mountain items
  METAL_ORE: {
    name: 'Metal Ore',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Metal-bearing rock, richest in mountains but also scraped from wastes and ruins',
    biomes: ['mountains', 'wastes', 'ruins']
  },
  // Rare ores — the payoff of levelling a Mine (see BUILDINGS.benefits.mine).
  // Found in mountain biomes; richer veins (mithril/adamantite) are scarce.
  GOLD_ORE: {
    name: 'Gold Ore',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Gold-veined rock. Smelts into currency-grade metal.',
    biomes: ['mountains']
  },
  SILVER_ORE: {
    name: 'Silver Ore',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Silver-bearing rock prized by smiths and traders.',
    biomes: ['mountains']
  },
  MITHRIL_ORE: {
    name: 'Mithril Ore',
    type: 'resource',
    rarity: 'rare',
    description: 'A legendary light-yet-strong ore from the deepest veins.',
    biomes: ['mountains']
  },
  ADAMANTITE: {
    name: 'Adamantite',
    type: 'resource',
    rarity: 'epic',
    description: 'The hardest known ore, workable only at a master forge.',
    biomes: ['mountains']
  },
  MOUNTAIN_CRYSTAL: {
    name: 'Mountain Crystal',
    type: 'gem',
    rarity: 'rare',
    description: 'Beautiful crystal formed deep within mountains',
    biomes: ['mountains']
  },
  
  // Desert items
  SAND_CRYSTAL: {
    name: 'Sand Crystal',
    type: 'gem',
    rarity: 'uncommon',
    description: 'Formed from heated desert sands',
    biomes: ['desert']
  },
  CACTUS_FRUIT: {
    name: 'Cactus Fruit',
    type: 'resource',
    rarity: 'common',
    description: 'Juicy fruit that grows on desert cacti',
    biomes: ['desert'],
    food: true,
    nourishment: 2
  },
  
  // River items
  FRESH_WATER: {
    name: 'Fresh Water',
    type: 'resource',
    rarity: 'common',
    description: 'Clean water from flowing rivers',
    biomes: ['rivers']
  },
  FISH: {
    name: 'Fish',
    type: 'resource',
    rarity: 'common',
    description: 'Freshwater fish from rivers and lakes',
    biomes: ['rivers'],
    food: true,
    nourishment: 4
  },
  
  // Oasis items
  PURE_WATER: {
    name: 'Pure Water',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Exceptionally clean water from oasis springs',
    biomes: ['oasis']
  },
  EXOTIC_FRUIT: {
    name: 'Exotic Fruit',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Rare fruits growing around water sources in dry areas',
    biomes: ['oasis'],
    food: true,
    nourishment: 3
  },
  
  // Ruins items
  ANCIENT_FRAGMENT: {
    name: 'Ancient Fragment',
    type: 'artifact',
    rarity: 'rare',
    description: 'Piece of a forgotten civilization',
    biomes: ['ruins']
  },
  BROKEN_TOOL: {
    name: 'Broken Tool',
    type: 'junk',
    rarity: 'common',
    description: 'Damaged tool from a bygone era',
    biomes: ['ruins']
  },
  
  // Wasteland items
  SCRAP_METAL: {
    name: 'Scrap Metal',
    type: 'resource',
    rarity: 'common',
    description: 'Salvageable metal pieces',
    biomes: ['wastes']
  },
  STRANGE_DEVICE: {
    name: 'Strange Device',
    type: 'artifact',
    rarity: 'uncommon',
    description: 'Peculiar machinery with unknown purpose',
    biomes: ['wastes']
  },

  // New monster drop items
  BONE_FRAGMENT: {
    name: 'Bone Fragment',
    type: 'resource',
    rarity: 'common',
    description: 'A fragment of bone from a defeated monster',
    monsterDrop: true
  },
  CRUDE_WEAPON: {
    name: 'Crude Weapon',
    type: 'weapon',
    rarity: 'common',
    description: 'A simple weapon dropped by a monster',
    power: 3,
    equipSlot: 'weapon',
    stats: { attack: 3 },
    monsterDrop: true
  },
  MONSTER_HIDE: {
    name: 'Monster Hide',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Tough hide from a monster',
    monsterDrop: true
  },
  ANCIENT_COIN: {
    name: 'Ancient Coin',
    type: 'treasure',
    rarity: 'uncommon',
    description: 'Old coin from a forgotten civilization',
    monsterDrop: true
  },
  MONSTER_TOOTH: {
    name: 'Monster Tooth',
    type: 'trophy',
    rarity: 'uncommon',
    description: 'Sharp tooth taken from a slain creature',
    power: 2, // Battle power contribution
    monsterDrop: true
  },
  MONSTER_BLOOD: {
    name: 'Monster Blood',
    type: 'alchemy',
    rarity: 'rare',
    description: 'Unusual blood with magical properties',
    monsterDrop: true
  },
  RARE_METALS: {
    name: 'Rare Metals',
    type: 'resource',
    rarity: 'rare',
    description: 'Uncommon metal fragments with special properties',
    monsterDrop: true
  },
  PRIMAL_ESSENCE: {
    name: 'Primal Essence',
    type: 'gem',
    rarity: 'epic',
    description: 'Crystallized magical energy from a powerful creature',
    power: 15, // Battle power contribution
    monsterDrop: true
  },

  // Add new volcanic items
  VOLCANIC_GLASS: {
    name: 'Volcanic Glass',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Sharp, dark glass formed from rapidly cooled lava',
    biomes: ['volcanic_peak', 'lava_flow', 'magma_flow', 'volcanic_rock', 'volcanic_soil', 'volcanic_caldera']
  },
  OBSIDIAN_SHARD: {
    name: 'Obsidian Shard',
    type: 'resource',
    rarity: 'rare',
    description: 'A piece of natural volcanic glass, extremely sharp and durable',
    biomes: ['volcanic_peak', 'lava_flow', 'magma_flow', 'volcanic_rock']
  },
  MAGMA_ESSENCE: {
    name: 'Magma Essence',
    type: 'resource',
    rarity: 'epic',
    description: 'The captured energy of the molten earth, glows with inner heat',
    biomes: ['magma_flow', 'lava_flow']
  },

  // Add mountain-specific items
  ALPINE_HERB: {
    name: 'Alpine Herb',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Rare herb that only grows at high elevations',
    biomes: ['alpine_snow', 'alpine_meadow', 'snow_patched_hills']
  },
  FROST_CRYSTAL: {
    name: 'Frost Crystal',
    type: 'gem',
    rarity: 'rare',
    description: 'A crystal formed in extreme cold at high elevations',
    biomes: ['snow_cap', 'glacial_peak', 'alpine_snow', 'glacier', 'snow_field']
  },

  // Add forest-specific items
  ANCIENT_WOOD: {
    name: 'Ancient Wood',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Wood from a very old tree with unusual properties',
    biomes: ['ancient_forest', 'deep_forest', 'fey_forest']
  },
  GLOWING_MUSHROOM: {
    name: 'Glowing Mushroom',
    type: 'resource',
    rarity: 'rare',
    description: 'A fungus that emits a soft, blue-green glow',
    biomes: ['deep_forest', 'dense_forest', 'fey_forest', 'swamp', 'enchanted_grove']
  },

  // Add desert-specific items
  DESERT_BLOOM: {
    name: 'Desert Bloom',
    type: 'resource',
    rarity: 'rare',
    description: 'A beautiful flower that somehow thrives in the harsh desert',
    biomes: ['desert', 'barren_desert', 'desert_scrub']
  },
  SUN_CRYSTAL: {
    name: 'Sun Crystal',
    type: 'gem',
    rarity: 'epic',
    description: 'A crystal that seems to capture the desert sun within it',
    biomes: ['desert', 'barren_desert', 'chalky_plains']
  },

  // Add swamp/marsh items
  BOG_IRON: {
    name: 'Bog Iron',
    type: 'resource',
    rarity: 'uncommon',
    description: 'Iron deposits formed in bog or swamp environments',
    biomes: ['swamp', 'marsh', 'bog', 'wetland', 'marshy_shore']
  },
  WILL_O_WISP_ESSENCE: {
    name: 'Will-o\'-Wisp Essence',
    type: 'gem',
    rarity: 'rare',
    description: 'The captured light of mysterious swamp phenomena',
    biomes: ['swamp', 'bog', 'marsh']
  },

  // Add ocean/water items
  PEARL: {
    name: 'Pearl',
    type: 'gem',
    rarity: 'uncommon',
    description: 'A beautiful spherical gem formed within certain mollusks',
    biomes: ['shallows', 'sea', 'ocean']
  },
  CORAL_FRAGMENT: {
    name: 'Coral Fragment',
    type: 'resource',
    rarity: 'uncommon',
    description: 'A piece of colorful coral reef structure',
    biomes: ['shallows', 'sea']
  },
  ABYSSAL_CRYSTAL: {
    name: 'Abyssal Crystal',
    type: 'gem',
    rarity: 'epic',
    description: 'A mysterious crystal from the deepest parts of the ocean',
    biomes: ['deep_ocean']
  },

  // Add anomaly-related special items
  ANOMALOUS_FRAGMENT: {
    name: 'Anomalous Fragment',
    type: 'artifact',
    rarity: 'legendary',
    description: 'A strange object that seems to defy the natural laws',
    biomes: []
  },

  // Equipment — armor & accessories
  LEATHER_CAP: {
    name: 'Leather Cap',
    type: 'armor',
    rarity: 'common',
    description: 'A simple leather cap offering minimal head protection.',
    power: 1,
    equipSlot: 'helmet',
    stats: { defense: 1 },
    recipe: { materials: { LEATHER: 3 }, ticksRequired: 6, category: 'armor', requiredLevel: 1 }
  },
  LEATHER_BODY: {
    name: 'Leather Body',
    type: 'armor',
    rarity: 'common',
    description: 'Stitched leather torso armour.',
    power: 2,
    equipSlot: 'torso',
    stats: { defense: 2 },
    recipe: { materials: { LEATHER: 6 }, ticksRequired: 8, category: 'armor', requiredLevel: 1 }
  },
  LEATHER_LEGS: {
    name: 'Leather Legs',
    type: 'armor',
    rarity: 'common',
    description: 'Leather leggings providing basic protection.',
    power: 1,
    equipSlot: 'legs',
    stats: { defense: 1 },
    recipe: { materials: { LEATHER: 4 }, ticksRequired: 6, category: 'armor', requiredLevel: 1 }
  },
  LEATHER_BOOTS: {
    name: 'Leather Boots',
    type: 'armor',
    rarity: 'common',
    description: 'Sturdy leather boots.',
    power: 1,
    equipSlot: 'boots',
    stats: { defense: 1, speed: 1 },
    recipe: { materials: { LEATHER: 3 }, ticksRequired: 5, category: 'armor', requiredLevel: 1 }
  },
  LEATHER_GLOVES: {
    name: 'Leather Gloves',
    type: 'armor',
    rarity: 'common',
    description: 'Leather gloves that protect the hands.',
    power: 1,
    equipSlot: 'bracelet',
    stats: { defense: 1 },
    recipe: { materials: { LEATHER: 2 }, ticksRequired: 4, category: 'armor', requiredLevel: 1 }
  },
  WOODEN_SHIELD: {
    name: 'Wooden Shield',
    type: 'armor',
    rarity: 'common',
    description: 'A round wooden shield — crude but better than nothing.',
    power: 3,
    equipSlot: 'shield',
    stats: { defense: 3 },
    recipe: { materials: { WOOD: 8 }, ticksRequired: 8, category: 'armor', requiredLevel: 1 }
  },
  IRON_HELMET: {
    name: 'Iron Helmet',
    type: 'armor',
    rarity: 'uncommon',
    description: 'A solid iron helmet forged at the smithy from refined metal.',
    power: 4,
    equipSlot: 'helmet',
    stats: { defense: 4 },
    recipe: {
      materials: { METAL: 2, WOOD: 1 }, ticksRequired: 14, category: 'armor',
      requiredLevel: 2, requiredBuilding: { type: 'smithy', level: 1 }
    }
  },
  IRON_BODY: {
    name: 'Iron Body',
    type: 'armor',
    rarity: 'uncommon',
    description: 'Full iron chest plate hammered from refined metal.',
    power: 6,
    equipSlot: 'torso',
    stats: { defense: 6 },
    recipe: {
      materials: { METAL: 4 }, ticksRequired: 20, category: 'armor',
      requiredLevel: 3, requiredBuilding: { type: 'smithy', level: 2 }
    }
  },
  IRON_SHIELD: {
    name: 'Iron Shield',
    type: 'armor',
    rarity: 'uncommon',
    description: 'A heavy iron kite shield forged from refined metal.',
    power: 7,
    equipSlot: 'shield',
    stats: { defense: 7 },
    recipe: {
      materials: { METAL: 3 }, ticksRequired: 14, category: 'armor',
      requiredLevel: 2, requiredBuilding: { type: 'smithy', level: 1 }
    }
  },
  BONE_AMULET: {
    name: 'Bone Amulet',
    type: 'accessory',
    rarity: 'uncommon',
    description: 'An amulet carved from monster bone, granting minor power.',
    power: 3,
    equipSlot: 'amulet',
    stats: { attack: 1, defense: 1 },
    recipe: { materials: { BONE_FRAGMENT: 5 }, ticksRequired: 8, category: 'accessory', requiredLevel: 2 }
  },
  MONSTER_HIDE_CAPE: {
    name: 'Monster Hide Cape',
    type: 'armor',
    rarity: 'uncommon',
    description: 'A rough cape stitched from monster hide.',
    power: 2,
    equipSlot: 'back',
    stats: { defense: 2 },
    recipe: { materials: { MONSTER_HIDE: 3 }, ticksRequired: 8, category: 'armor', requiredLevel: 2 }
  }
};

// Monster drop items organized by rarity tiers
export const MONSTER_DROPS = {
  common: [
    { id: "WOOD", quantityRange: [1, 5] },
    { id: "STONE", quantityRange: [1, 4] },
    { id: "BONE_FRAGMENT", quantityRange: [1, 3] },
    { id: "CRUDE_WEAPON", quantityRange: [1, 1] }
  ],
  uncommon: [
    { id: "MONSTER_HIDE", quantityRange: [1, 2] },
    { id: "ANCIENT_COIN", quantityRange: [1, 3] },
    { id: "MONSTER_TOOTH", quantityRange: [1, 2] },
    { id: "MEDICINAL_HERBS", quantityRange: [1, 2] }  // Reuse existing item
  ],
  rare: [
    { id: "MOUNTAIN_CRYSTAL", quantityRange: [1, 1] }, // Reuse existing gem
    { id: "MONSTER_BLOOD", quantityRange: [1, 2] },
    { id: "RARE_METALS", quantityRange: [1, 2] }
  ],
  epic: [
    { id: "PRIMAL_ESSENCE", quantityRange: [1, 1] },
    { id: "ANCIENT_FRAGMENT", quantityRange: [1, 1] }  // Reuse existing artifact
  ]
};

// Helper function to get all craftable recipes
export function getAllRecipes() {
  return Object.entries(ITEMS)
    .filter(([_, item]) => item.recipe)
    .map(([itemId, item]) => ({
      id: itemId.toLowerCase(),  // lowercase ID for recipe reference
      name: item.name,
      category: item.recipe.category,
      materials: item.recipe.materials,
      result: {
        id: itemId,
        ...item,
        quantity: item.recipe.quantity || 1
      },
      ticksRequired: item.recipe.ticksRequired,
      requiredLevel: item.recipe.requiredLevel,
      requiredBuilding: item.recipe.requiredBuilding
    }));
}

// Helper to get recipes by category
export function getRecipesByCategory(category) {
  return getAllRecipes().filter(recipe => recipe.category === category);
}

// Helper to find a recipe by ID
export function getRecipeById(recipeId) {
  return getAllRecipes().find(recipe => recipe.id === recipeId);
}

// Helper to check if player can craft a recipe
export function canCraftRecipe(recipeId, inventory, buildingLevels = {}) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return false;
  
  // Check materials
  const hasMaterials = Object.entries(recipe.materials).every(([itemId, requiredQty]) => {
    const item = inventory.find(invItem => invItem.id === itemId);
    return item && item.quantity >= requiredQty;
  });
  
  // Check building requirements
  const meetsBuilding = !recipe.requiredBuilding || 
    (buildingLevels[recipe.requiredBuilding.type] >= recipe.requiredBuilding.level);
  
  return hasMaterials && meetsBuilding;
}

// The eight broad gather categories that the simple base resources are tagged
// with. The world generates hundreds of specific biome names (temperate_forest,
// grassland, volcanic_peak, …); this resolves any of them down to one category
// so a tile always yields sensible loot instead of silently falling back to
// plains. Order matters — wetter/more specific tests come first.
export function getBiomeCategory(biomeName) {
  const b = (biomeName || '').toLowerCase();
  if (!b) return 'plains';
  if (/swamp|marsh|bog|wetland|moor|mudflat|delta|fen/.test(b))                 return 'rivers';
  if (/river|lake|stream|rivulet|shore|beach|shallow|estuary|water|sea|ocean|coast|littoral/.test(b)) return 'rivers';
  if (/oasis/.test(b))                                                          return 'oasis';
  if (/forest|wood|grove|jungle|rainforest|taiga|thicket/.test(b))              return 'forest';
  if (/volcan|lava|magma|obsidian|scorch|caldera/.test(b))                      return 'mountains';
  if (/mountain|peak|cliff|slope|alpine|highland|crag|snow|glacial|glacier|frost|ridge/.test(b)) return 'mountains';
  if (/desert|dune|sand|arid|badlands|chalky|salt|dry_basin|mesa|dry_/.test(b)) return 'desert';
  if (/ruin/.test(b))                                                           return 'ruins';
  if (/waste|barren|scrub|steppe/.test(b))                                      return 'wastes';
  if (/plain|grass|meadow|prairie|savanna|field|lowland|flats|heath/.test(b))   return 'plains';
  return 'plains';
}

// An item is gatherable on a tile when its biome list names either the tile's
// exact biome (specialised resources) or the tile's broad category (base
// resources). Returns null when the item carries no biome tags.
function itemMatchesBiome(item, biomeName, category) {
  if (!Array.isArray(item.biomes) || item.biomes.length === 0) return false;
  return item.biomes.includes(biomeName) || item.biomes.includes(category);
}

// Retain the biome item function
export function getBiomeItems(biomeName) {
  const category = getBiomeCategory(biomeName);
  return Object.entries(ITEMS)
    .filter(([, item]) => itemMatchesBiome(item, biomeName, category))
    .map(([id, item]) => ({
      id,
      ...item,
      quantity: Math.floor(Math.random() * (item.rarity === 'common' ? 3 : 2)) + 1
    }));
}

// Resources that can be gathered on a tile of the given biome — the deterministic
// list (no random quantities), used to preview what an empty tile offers.
export function getGatherableItems(biomeName) {
  if (!biomeName) return [];
  const category = getBiomeCategory(biomeName);
  return Object.entries(ITEMS)
    .filter(([, item]) => itemMatchesBiome(item, biomeName, category))
    .map(([code, item]) => ({ code, name: item.name, rarity: item.rarity, type: item.type, food: !!item.food }));
}

// New helper function to get item power contribution
export function getItemPower(itemId) {
  const item = ITEMS[itemId];
  return item && item.power ? item.power : 0;
}

const _num = (v) => (typeof v === 'number' && isFinite(v) ? v : 0);

// Infer a weapon's damage school ('melee' | 'ranged' | 'magic') from an explicit
// `attackType` field, otherwise from its code/name/type. Defaults to melee.
export function getItemCombatType(itemId) {
  const item = typeof itemId === 'string' ? ITEMS[itemId] : itemId;
  if (!item) return 'melee';
  if (item.attackType) return item.attackType;
  const hay = `${typeof itemId === 'string' ? itemId : ''} ${item.name || ''} ${item.type || ''}`.toLowerCase();
  if (/bow|crossbow|sling|arrow|dart|javelin|throw/.test(hay)) return 'ranged';
  if (/staff|wand|tome|orb|rod|scepter|sceptre|grimoire|spell|rune|stave|focus/.test(hay)) return 'magic';
  return 'melee';
}

/**
 * Typed combat contribution of a single equipped item, split across the three
 * schools of attack and defence. Resolution order:
 *   - explicit per-school stats (meleeAttack/rangedAttack/magicAttack,
 *     meleeDefense/rangedDefense/magicDefense) always stack;
 *   - a generic `stats.attack` (or, for a weapon lacking it, its `power`) is
 *     assigned to the weapon's inferred damage school;
 *   - a generic `stats.defense` protects against ALL schools (armour shields
 *     the wearer from every kind of blow).
 * Returns { meleeAtk, rangedAtk, magicAtk, meleeDef, rangedDef, magicDef }.
 */
export function getItemCombatContribution(itemId) {
  const out = { meleeAtk: 0, rangedAtk: 0, magicAtk: 0, meleeDef: 0, rangedDef: 0, magicDef: 0 };
  const item = typeof itemId === 'string' ? ITEMS[itemId] : itemId;
  if (!item) return out;
  const s = item.stats || {};

  // Attack — explicit typed stats first.
  out.meleeAtk  += _num(s.meleeAttack);
  out.rangedAtk += _num(s.rangedAttack);
  out.magicAtk  += _num(s.magicAttack);
  // Generic attack, or a weapon's raw power when it has no explicit attack stat.
  const genericAtk = _num(s.attack) || (item.equipSlot === 'weapon' && !s.attack ? _num(item.power) : 0);
  if (genericAtk) {
    const t = getItemCombatType(itemId);
    if (t === 'ranged') out.rangedAtk += genericAtk;
    else if (t === 'magic') out.magicAtk += genericAtk;
    else out.meleeAtk += genericAtk;
  }

  // Defence — explicit typed stats first, then generic defence vs all schools.
  out.meleeDef  += _num(s.meleeDefense);
  out.rangedDef += _num(s.rangedDefense);
  out.magicDef  += _num(s.magicDefense);
  const genericDef = _num(s.defense);
  if (genericDef) {
    out.meleeDef  += genericDef;
    out.rangedDef += genericDef;
    out.magicDef  += genericDef;
  }

  return out;
}

// ---------------------------------------------------------------------------
// Food / nourishment
// ---------------------------------------------------------------------------
// Edible items carry `food: true` and a `nourishment` value — how many units of
// hunger one item satisfies. Higher nourishment = more filling. Used by the
// starvation/upkeep logic and the resource HUD's food readout.

export const FOOD_ITEMS = Object.keys(ITEMS).filter(code => ITEMS[code]?.food);

export function isFood(code) {
  return !!ITEMS[code]?.food;
}

// Nourishment per single unit of an item (0 for non-food).
export function getNourishment(code) {
  const item = ITEMS[code];
  return item?.food ? (item.nourishment ?? 1) : 0;
}

// Total nourishment available in an items bag ({ CODE: qty, ... }).
export function totalNourishment(items = {}) {
  let total = 0;
  for (const [code, qty] of Object.entries(items)) {
    if (code.startsWith('_')) continue; // skip metadata like _x/_y
    total += getNourishment(code) * (Number(qty) || 0);
  }
  return total;
}

// Total count of food units in an items bag (ignores nourishment weighting).
export function totalFoodQuantity(items = {}) {
  let total = 0;
  for (const [code, qty] of Object.entries(items)) {
    if (code.startsWith('_')) continue;
    if (isFood(code)) total += (Number(qty) || 0);
  }
  return total;
}