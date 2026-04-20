import UNITS from "../definitions/UNITS.js";
import { getItemPower } from "../definitions/ITEMS.js";

/**
 * Critical Hit System Documentation
 * ---------------------------------
 * Critical hits serve multiple purposes in PvP combat:
 * 
 * 1. Stalemate Prevention:
 *    - Critical hit chance increases each battle tick (5% per tick up to 40%)
 *    - 1v1 duels get +10% critical chance after tick 3
 *    - This ensures battles eventually reach a conclusion
 * 
 * 2. Advantage System:
 *    - Landing a critical hit reduces effective attrition by 1.5
 *    - Combo criticals (multiple players) get additional 0.5 reduction
 *    - This protects players who land critical hits from being killed
 * 
 * 3. Tie-Breaking:
 *    - When both sides would normally be defeated (draw), critical hits determine winner
 *    - Side with critical hits wins over side without critical hits
 *    - This prevents mutual defeats in balanced PvP situations
 * 
 * 4. Multi-Player PvP Combat (e.g. 2v2):
 *    - Players are paired with specific opponents via engagement system
 *    - Each player rolls for critical hits against their paired opponent
 *    - When multiple players on same side land critical hits:
 *      a) They receive "combo critical" status (+0.5 protection)
 *      b) This rewards team coordination
 *    - Equal teams (e.g. 2v2) have balanced base chances
 *    - Unequal teams get advantages/disadvantages proportional to number difference
 * 
 * Critical hits apply only to player vs player combat and enhance the tactical
 * depth of PvP engagements, rewarding player skill and creating decisive outcomes.
 */

// Aggregate typed combat stats for a group (attack + defense per type, with level scaling)
export function calculateGroupCombatStats(group) {
  if (!group || !group.units) {
    return { meleeAtk: 0, rangedAtk: 0, magicAtk: 0, meleeDef: 0, rangedDef: 0, magicDef: 0, unitCount: 0 };
  }

  const totals = { meleeAtk: 0, rangedAtk: 0, magicAtk: 0, meleeDef: 0, rangedDef: 0, magicDef: 0 };
  let unitCount = 0;

  for (const unitId in group.units) {
    const unit = group.units[unitId];
    const unitType = unit.type || unit.unitType;
    let unitDef = null;

    for (const key in UNITS) {
      if (key === unitType || UNITS[key].type === unitType) {
        unitDef = UNITS[key];
        break;
      }
    }

    if (!unitDef) unitDef = {};

    const level = unit.level || 1;
    const sf = 1 + (level - 1) * 0.15; // 15% growth per level

    if (unitDef.meleeAttack !== undefined) {
      totals.meleeAtk += (unitDef.meleeAttack || 0) * sf;
      totals.rangedAtk += (unitDef.rangedAttack || 0) * sf;
      totals.magicAtk  += (unitDef.magicAttack  || 0) * sf;
      totals.meleeDef  += (unitDef.meleeDefense  || 1) * sf;
      totals.rangedDef += (unitDef.rangedDefense || 1) * sf;
      totals.magicDef  += (unitDef.magicDefense  || 1) * sf;
    } else {
      // Fallback for units without typed stats (monsters, boats)
      const p = (unitDef.power || 1) * sf;
      totals.meleeAtk += p;
      totals.meleeDef += 1 * sf;
      totals.rangedDef += 1 * sf;
      totals.magicDef  += 1 * sf;
    }

    // Unit's equipped items contribute to attack
    if (unit.equipment) {
      for (const itemCode of Object.values(unit.equipment)) {
        if (itemCode) totals.meleeAtk += getItemPower(itemCode);
      }
    }

    unitCount++;
  }

  return { ...totals, unitCount };
}

/**
 * Returns a damage multiplier (0.3–1.0) representing how much of the attacker's
 * typed damage gets through the defender's resistances.
 */
export function calculateDefenseMultiplier(attackerStats, defenderStats) {
  const totalAtk = attackerStats.meleeAtk + attackerStats.rangedAtk + attackerStats.magicAtk;
  if (totalAtk <= 0) return 1.0;

  const count = defenderStats.unitCount || 1;
  const avgMeleeDef  = defenderStats.meleeDef  / count;
  const avgRangedDef = defenderStats.rangedDef / count;
  const avgMagicDef  = defenderStats.magicDef  / count;

  // Each defense point reduces that attack type: def=5 ≈ 50% reduction
  const effMelee  = attackerStats.meleeAtk  / (1 + avgMeleeDef  / 5);
  const effRanged = attackerStats.rangedAtk / (1 + avgRangedDef / 5);
  const effMagic  = attackerStats.magicAtk  / (1 + avgMagicDef  / 5);

  return Math.max(0.3, Math.min(1.0, (effMelee + effRanged + effMagic) / totalAtk));
}

// Calculate total attack power for a group (used as "power" in battle ratios)
export function calculateGroupPower(group) {
  if (!group) return 0;
  const stats = calculateGroupCombatStats(group);
  return stats.meleeAtk + stats.rangedAtk + stats.magicAtk + calculateItemPower(group);
}

// Calculate power contribution from group's items
function calculateItemPower(group) {
  if (!group || !group.items) return 0;
  
  let totalItemPower = 0;
  
  // Handle the new format {item_code: quantity}
  if (!Array.isArray(group.items) && typeof group.items === 'object') {
    // New format - object with item codes as keys
    Object.entries(group.items).forEach(([itemCode, quantity]) => {
      if (!itemCode || typeof quantity !== 'number') return;
      
      // Get item power using helper function
      const power = getItemPower(itemCode);
      totalItemPower += power * quantity;
    });
  } else {
    // Legacy format - array of item objects
    const items = Array.isArray(group.items) ? group.items : Object.values(group.items);
    
    items.forEach(item => {
      if (item && item.id) {
        // Get item power using helper function
        const power = getItemPower(item.id);
        
        // Factor in quantity if available
        const quantity = item.quantity || 1;
        totalItemPower += power * quantity;
      }
    });
  }
  
  return totalItemPower;
}

/**
 * Calculates power ratios between two sides in battle
 */
export function calculatePowerRatios(side1Power, side2Power) {
  const totalPower = side1Power + side2Power;
  return {
    side1Ratio: totalPower > 0 ? side1Power / totalPower : 0.5,
    side2Ratio: totalPower > 0 ? side2Power / totalPower : 0.5
  };
}

/**
 * Calculates attrition (damage) based on power values and ratios
 * @param {number} sidePower - The power of the side receiving casualties
 * @param {number} sideRatio - The power ratio of the side receiving casualties
 * @param {number} opposingRatio - The power ratio of the opposing side
 */
export function calculateAttrition(sidePower, sideRatio, opposingRatio, incomingDamageMultiplier = 1.0) {
  // Base attrition per tick (5-10% of opponent's power)
  const baseAttritionRate = 0.05 + (Math.random() * 0.05);

  // Calculate raw attrition
  let attrition = Math.round(sidePower * baseAttritionRate * (opposingRatio + 0.5));

  // Power dominance factor - how much stronger the opposing side is
  const powerDominance = Math.max(0, opposingRatio * 2 - 0.5);
  const zeroAttritionChance = Math.min(0.9, (1 - powerDominance) * 0.95);

  if (sideRatio > 0.7 && opposingRatio < 0.3) {
    const dominanceDelta = sideRatio - opposingRatio;
    const noCasualtyChance = Math.min(0.8, dominanceDelta * 0.9);

    if (Math.random() < noCasualtyChance) {
      console.log(`Dominant side with ${sideRatio.toFixed(2)} power ratio avoids casualties due to overwhelming advantage`);
      return 0;
    }

    console.log(`Dominant side with ${sideRatio.toFixed(2)} power ratio takes minimal casualties`);
    attrition = 1;
  } else if (opposingRatio > 0.75 && sideRatio < 0.25 && Math.random() < zeroAttritionChance) {
    attrition = 0;
    console.log(`Side with ${sideRatio.toFixed(2)} power ratio takes no casualties due to random chance`);
  } else if (sidePower > 0) {
    const isCloselyMatched = Math.abs(sideRatio - 0.5) < 0.25;

    if (isCloselyMatched) {
      attrition = Math.max(1, attrition);
      console.log(`Close battle: ensuring minimum attrition of 1 for side with ${sideRatio.toFixed(2)} ratio`);
    } else if (attrition === 0 && sideRatio < 0.4) {
      const unluckyChance = 0.3 + (0.4 - sideRatio);
      if (Math.random() < unluckyChance) {
        attrition = 1;
        console.log(`Unlucky weaker side (${sideRatio.toFixed(2)}) takes 1 attrition despite low calculation`);
      }
    }

    if (opposingRatio > 0.75 && sideRatio < 0.25 && attrition > 0) {
      console.log(`Weaker side with ${sideRatio.toFixed(2)} power ratio takes ${attrition} casualties`);
    }
  }

  // Apply type-matchup defense reduction (high defense = fewer casualties)
  if (incomingDamageMultiplier < 1.0 && attrition > 0) {
    attrition = Math.max(0, Math.floor(attrition * incomingDamageMultiplier));
  }

  return attrition;
}

/**
 * Specialized function for player vs player combat mechanics
 * Determines critical hits and other PvP-specific effects
 * @param {Object} side1 - The first combat side
 * @param {Object} side2 - The second combat side
 * @param {number} tickCount - Current battle tick count
 * @returns {Object} Modified side objects with PvP combat flags
 */
export function processPvPCombat(side1, side2, tickCount) {
  // CRITICAL FIX: Ensure sides are valid objects before processing
  // This prevents errors when a battle has invalid or incomplete sides
  const validSide1 = side1 || { groups: {} };
  const validSide2 = side2 || { groups: {} };
  
  // Detect if sides contain player units with improved error handling
  const side1Players = extractSoloPlayerUnits(validSide1);
  const side2Players = extractSoloPlayerUnits(validSide2);
  
  // Skip if either side has no players
  if (side1Players.length === 0 || side2Players.length === 0) {
    return { side1: validSide1, side2: validSide2 };
  }
  
  console.log(`PvP combat detected: ${side1Players.length} players vs ${side2Players.length} players`);
  
  // Mark all units as being in PvP combat
  side1Players.forEach(player => {
    player.unit.pvpCombat = true;
    // Store number of opposing players to adjust mechanics
    player.unit.opposingPlayerCount = side2Players.length;
  });
  
  side2Players.forEach(player => {
    player.unit.pvpCombat = true;
    // Store number of opposing players to adjust mechanics
    player.unit.opposingPlayerCount = side1Players.length;
  });
  
  // TEAM ADVANTAGE: Check for team size advantage
  const side1TeamAdvantage = side1Players.length > side2Players.length;
  const side2TeamAdvantage = side2Players.length > side1Players.length;
  
  // Calculate base critical hit chance for this tick
  // As battle progresses, critical hits become more likely to resolve stalemates
  const baseCritChance = Math.min(0.4, 0.05 * tickCount); // 5% per tick, up to 40%
  
  // MULTI-PLAYER TARGETING: Assign targets to create engagement pairs
  // This simulates players targeting specific opponents rather than random attacks
  const engagementPairs = createEngagementPairs(side1Players, side2Players);
  
  // Process critical hits for side 1 players based on their assigned targets
  side1Players.forEach(player => {
    // Find this player's target if one exists
    const targetInfo = engagementPairs.find(pair => pair.attacker.id === player.id);
    const target = targetInfo?.defender;
    
    // Calculate critical hit chance based on multiple factors
    let critChance = baseCritChance;
    
    // Level advantage modifier
    const levelAdvantage = target ? 
      (player.unit.level || 1) - (target.unit.level || 1) : 0;
    critChance += levelAdvantage * 0.05;
    
    // Team advantage modifier - having more teammates makes critical hits more likely
    if (side1TeamAdvantage) {
      const teamBonus = 0.05 * Math.min(3, side1Players.length - side2Players.length);
      critChance += teamBonus;
      player.unit.teamAdvantage = true; // Flag for combat text
    }
    
    // Check if player is outnumbered, give slight disadvantage
    if (side2TeamAdvantage) {
      player.unit.outnumbered = true; // Flag for combat text
    }
    
    // Ensure chance is within bounds
    critChance = Math.max(0.05, Math.min(0.7, critChance));
    
    // ENHANCED: In close combat situations, increase critical hit chances to help break ties
    // This helps prevent draws in PvP where both players die
    if (side1Players.length === 1 && side2Players.length === 1 && tickCount >= 3) {
      critChance += 0.1; // Add 10% to crit chance in protracted 1v1 duels
      console.log(`Duel critical chance increased for ${player.unit.displayName || player.id} to ${critChance.toFixed(2)}`);
    }
    
    // Roll for critical hit
    if (Math.random() < critChance) {
      player.unit.criticalHit = true;
      player.unit.targetId = target?.id; // Store target ID for combat messages
      
      if (player.unit.teamAdvantage) {
        console.log(`Player ${player.unit.displayName || player.id} landed a critical hit with team advantage!`);
      } else {
        console.log(`Player ${player.unit.displayName || player.id} landed a critical hit!`);
      }
    }
  });
  
  // Process critical hits for side 2 players based on their assigned targets
  side2Players.forEach(player => {
    // Find this player's target if one exists
    const targetInfo = engagementPairs.find(pair => pair.defender.id === player.id);
    const target = targetInfo?.attacker; // This player is a defender, so their target is the attacker
    
    // Calculate critical hit chance based on multiple factors
    let critChance = baseCritChance;
    
    // Level advantage modifier
    const levelAdvantage = target ? 
      (player.unit.level || 1) - (target.unit.level || 1) : 0;
    critChance += levelAdvantage * 0.05;
    
    // Team advantage modifier - having more teammates makes critical hits more likely
    if (side2TeamAdvantage) {
      const teamBonus = 0.05 * Math.min(3, side2Players.length - side1Players.length);
      critChance += teamBonus;
      player.unit.teamAdvantage = true; // Flag for combat text
    }
    
    // Check if player is outnumbered, give slight disadvantage
    if (side1TeamAdvantage) {
      player.unit.outnumbered = true; // Flag for combat text
    }
    
    // Ensure chance is within bounds
    critChance = Math.max(0.05, Math.min(0.7, critChance));
    
    // Roll for critical hit
    if (Math.random() < critChance) {
      player.unit.criticalHit = true;
      player.unit.targetId = target?.id; // Store target ID for combat messages
      
      if (player.unit.teamAdvantage) {
        console.log(`Player ${player.unit.displayName || player.id} landed a critical hit with team advantage!`);
      } else {
        console.log(`Player ${player.unit.displayName || player.id} landed a critical hit!`);
      }
    }
  });
  
  // Apply chain reaction effects for critical hits
  // If multiple players on one side land critical hits, enhance their effect
  const side1CriticalHits = side1Players.filter(p => p.unit.criticalHit).length;
  const side2CriticalHits = side2Players.filter(p => p.unit.criticalHit).length;
  
  // If a side has multiple critical hits, mark them as combo for extra effect
  if (side1CriticalHits > 1) {
    side1Players.forEach(player => {
      if (player.unit.criticalHit) {
        player.unit.comboCritical = true;
        console.log(`Player ${player.unit.displayName || player.id} critical hit is part of a ${side1CriticalHits}x combo!`);
      }
    });
  }
  
  if (side2CriticalHits > 1) {
    side2Players.forEach(player => {
      if (player.unit.criticalHit) {
        player.unit.comboCritical = true;
        console.log(`Player ${player.unit.displayName || player.id} critical hit is part of a ${side2CriticalHits}x combo!`);
      }
    });
  }
  
  return { side1: validSide1, side2: validSide2 };
}

/**
 * Create engagement pairs between two sides of players
 * This simulates how players would target specific opponents in battle
 * @param {Array} attackers - Players on attacking side
 * @param {Array} defenders - Players on defending side
 * @returns {Array} Array of {attacker, defender} pairs
 */
function createEngagementPairs(attackers, defenders) {
  const pairs = [];
  
  // Make copies to avoid modifying the original arrays
  const remainingAttackers = [...attackers];
  const remainingDefenders = [...defenders];
  
  // First pass: Try to match players 1-to-1 until one side is exhausted
  // For example, in a 2v2 battle, this would pair each player with an opponent
  while (remainingAttackers.length > 0 && remainingDefenders.length > 0) {
    // Get a random attacker and defender
    const attackerIndex = Math.floor(Math.random() * remainingAttackers.length);
    const defenderIndex = Math.floor(Math.random() * remainingDefenders.length);
    
    const attacker = remainingAttackers.splice(attackerIndex, 1)[0];
    const defender = remainingDefenders.splice(defenderIndex, 1)[0];
    
    pairs.push({ attacker, defender });
  }
  
  // Second pass: If there are leftover attackers, pair them with already paired defenders
  // For example, in a 3v2 battle, one attacker would "gang up" on a defender
  if (remainingAttackers.length > 0 && defenders.length > 0) {
    remainingAttackers.forEach(attacker => {
      // Choose a random defender from the original list to "gang up" on
      const targetDefender = defenders[Math.floor(Math.random() * defenders.length)];
      pairs.push({ 
        attacker, 
        defender: targetDefender,
        gangUp: true // Flag that this defender is being targeted by multiple attackers
      });
    });
  }
  
  // Third pass: If there are leftover defenders, pair them with already paired attackers
  if (remainingDefenders.length > 0 && attackers.length > 0) {
    remainingDefenders.forEach(defender => {
      // Choose a random attacker from the original list to "gang up" on
      const targetAttacker = attackers[Math.floor(Math.random() * attackers.length)];
      pairs.push({ 
        attacker: targetAttacker, 
        defender,
        gangUp: true // Flag that this attacker is being targeted by multiple defenders
      });
    });
  }
  
  return pairs;
}

/**
 * Selects units to be removed as casualties based on attrition count
 * Returns an object with units to remove and players killed
 */
export function selectUnitsForCasualties(units, attritionCount) {
  if (!units || attritionCount <= 0) {
    return { unitsToRemove: [], playersKilled: [] };
  }
  
  const unitIds = Object.keys(units);
  const totalUnits = unitIds.length;
  let remainingAttrition = Math.min(attritionCount, totalUnits);
  const unitsToRemove = [];
  const playersKilled = [];
  
  // Detect PvP - is this a solo player facing others?
  const isSoloPlayer = (totalUnits === 1 && units[unitIds[0]].type === 'player');
  const isPvpCombat = units[unitIds[0]]?.pvpCombat === true;
  
  // IMPROVED PLAYER COMBAT: Special handling for player vs player
  if (isSoloPlayer && isPvpCombat) {
    // In PvP combat, we use critical hits and team dynamics
    const playerUnit = units[unitIds[0]];
    const criticalHit = playerUnit.criticalHit === true;
    const comboCritical = playerUnit.comboCritical === true; // Part of a multi-player combo
    const outnumbered = playerUnit.outnumbered === true;
    const opposingPlayerCount = playerUnit.opposingPlayerCount || 1;
    
    // Calculate effective attrition based on situation
    let effectiveAttrition = remainingAttrition;
    
    // Outnumbered players have higher chance of taking casualties
    if (outnumbered) {
      effectiveAttrition = Math.min(3, effectiveAttrition + 0.5);
    }
    
    // CRITICAL FIX: Players who land critical hits get significant protection from attrition
    if (criticalHit) {
      // Critical hit gives major protection from attrition
      effectiveAttrition = Math.max(0, effectiveAttrition - 1.5);
      
      // Combo critical gives even more protection
      if (comboCritical) {
        effectiveAttrition = Math.max(0, effectiveAttrition - 0.5);
      }
      
      console.log(`Critical hit advantage: Player ${playerUnit.displayName || playerUnit.id} reduces effective attrition from ${remainingAttrition} to ${effectiveAttrition}`);
    }
    
    // Log the special PvP circumstance with all factors
    console.log(`PvP combat for player ${playerUnit.displayName || playerUnit.id}: raw attrition=${remainingAttrition}, effective=${effectiveAttrition}, criticalHit=${criticalHit}, combo=${comboCritical}, outnumbered=${outnumbered}, vs ${opposingPlayerCount} players`);
    
    // Determine if player is killed
    let playerKilled = false;
    
    // Critical hits now protect instead of causing casualties
    if (criticalHit && effectiveAttrition < 2) {
      console.log(`Player ${playerUnit.displayName || playerUnit.id} survives due to critical hit advantage!`);
      playerKilled = false;
    }
    // Higher effective attrition threshold kills
    else if (effectiveAttrition >= 2) {
      console.log(`Player killed in PvP - sufficient attrition (${effectiveAttrition})`);
      playerKilled = true;
    }
    // Small random chance based on attrition
    else if (effectiveAttrition >= 1 && Math.random() < 0.15 * effectiveAttrition) {
      console.log(`Player killed in PvP - lucky strike with attrition ${effectiveAttrition}`);
      playerKilled = true;
    }
    else {
      console.log(`Player survived in PvP (effective attrition: ${effectiveAttrition})`);
    }
    
    if (playerKilled) {
      unitsToRemove.push(unitIds[0]);
      
      playersKilled.push({
        playerId: playerUnit.id,
        displayName: playerUnit.displayName || "Unknown Player",
        killedBy: playerUnit.targetId ? { id: playerUnit.targetId, critical: criticalHit } : undefined
      });
    }
    
    return { unitsToRemove, playersKilled };
  }
  
  // NORMAL SOLO PLAYER: Modified protection for solo player vs monsters/environment
  if (isSoloPlayer) {
    // Fix for potential rounding errors in attrition - ensure 1.9+ rounds to 2
    const adjustedAttrition = Math.round(attritionCount * 10) / 10;
    
    // Calculate how much stronger the opposing side is based on attrition
    // Attrition is roughly proportional to power difference
    const powerDifferenceMultiplier = adjustedAttrition / 1.5;
    
    // MODIFIED: Only provide enhanced protection if opponent is no more than 50% stronger
    // If power difference suggests opponent is more than 50% stronger, reduce protection
    if (powerDifferenceMultiplier > 1.5) {
      // Opponent is more than 50% stronger - player is more vulnerable
      // Lower the threshold for player death when significantly outmatched
      const deathThreshold = 1.3; // Lower than the normal threshold of 2
      
      if (adjustedAttrition >= deathThreshold) {
        const playerUnit = units[unitIds[0]];
        unitsToRemove.push(unitIds[0]);
        
        playersKilled.push({
          playerId: playerUnit.id,
          displayName: playerUnit.displayName || "Unknown Player"
        });
        
        console.log(`Solo player killed - opponent too strong (${powerDifferenceMultiplier.toFixed(1)}x stronger, attrition: ${adjustedAttrition})`);
      } else {
        console.log(`Solo player survived against stronger opponent (${powerDifferenceMultiplier.toFixed(1)}x) - low attrition (${adjustedAttrition})`);
      }
    } else if (adjustedAttrition >= 2) {
      // Standard case - only kill player with high attrition
      const playerUnit = units[unitIds[0]];
      unitsToRemove.push(unitIds[0]);
      
      playersKilled.push({
        playerId: playerUnit.id,
        displayName: playerUnit.displayName || "Unknown Player"
      });
      
      console.log(`Solo player unit killed - required higher attrition threshold (${adjustedAttrition})`);
    } else {
      // Player survives with less than 2 attrition against opponent less than 50% stronger
      console.log(`Solo player survived - opponent not significantly stronger (attrition: ${adjustedAttrition})`);
    }
    
    return { unitsToRemove, playersKilled };
  }
  
  // Normal case: First remove regular (non-player) units
  const regularUnitIds = unitIds.filter(id => units[id].type !== 'player');
  
  while (remainingAttrition > 0 && regularUnitIds.length > 0) {
    const randomIndex = Math.floor(Math.random() * regularUnitIds.length);
    const unitToRemove = regularUnitIds.splice(randomIndex, 1)[0];
    unitsToRemove.push(unitToRemove);
    remainingAttrition--;
  }
  
  // If we still need to remove more units, and we only have player units left
  if (remainingAttrition > 0) {
    const playerUnitIds = unitIds.filter(id => units[id].type === 'player');
    
    while (remainingAttrition > 0 && playerUnitIds.length > 0) {
      const randomIndex = Math.floor(Math.random() * playerUnitIds.length);
      const playerUnitId = playerUnitIds.splice(randomIndex, 1)[0];
      const playerUnit = units[playerUnitId];
      
      playersKilled.push({
        playerId: playerUnit.id,
        displayName: playerUnit.displayName || "Unknown Player"
      });
      
      unitsToRemove.push(playerUnitId);
      remainingAttrition--;
    }
  }
  
  return { unitsToRemove, playersKilled };
}

// Helper function to get critical hits from player units with enhanced info for multi-player PvP
function getPvPCriticalHits(battle) {
  const criticalHits = [];
  
  // CRITICAL FIX: Add safety checks for undefined battle sides
  if (!battle || !battle.side1 || !battle.side2) {
    return criticalHits;
  }
  
  // Helper to find player name by ID
  const findPlayerName = (sideObj, targetId) => {
    // CRITICAL FIX: Add safety check for missing groups
    if (!sideObj || !sideObj.groups) return null;
    
    for (const groupId in sideObj.groups) {
      const group = sideObj.groups[groupId];
      if (!group || !group.units) continue;
      
      for (const unitId in group.units) {
        const unit = group.units[unitId];
        if (unit.id === targetId && unit.type === 'player') {
          return unit.displayName || "Unknown Player";
        }
      }
    }
    return null;
  };
  
  // Check side 1
  if (battle.side1 && battle.side1.groups) {
    for (const groupId in battle.side1.groups) {
      const group = battle.side1.groups[groupId];
      if (group?.units) {
        // Check each unit in the group
        for (const unitId in group.units) {
          const unit = group.units[unitId];
          
          // Only consider player units for critical hit tracking
          if (unit.type === 'player' && unit.criticalHit) {
            criticalHits.push({
              playerId: unit.id,
              displayName: unit.displayName || "Unknown Player",
              targetId: unit.targetId,
              combo: unit.comboCritical ? "Combo" : undefined,
              isOutnumbered: unit.outnumbered === true,
              criticalLevel: unit.level || 1, // Include unit level for scaling
              basePower: UNITS[unit.unitType]?.power || 1 // Base power from unit type
            });
          }
        }
      }
    }
  }
  
  // Check side 2
  if (battle.side2 && battle.side2.groups) {
    for (const groupId in battle.side2.groups) {
      const group = battle.side2.groups[groupId];
      if (group?.units) {
        // Check each unit in the group
        for (const unitId in group.units) {
          const unit = group.units[unitId];
          
          // Only consider player units for critical hit tracking
          if (unit.type === 'player' && unit.criticalHit) {
            criticalHits.push({
              playerId: unit.id,
              displayName: unit.displayName || "Unknown Player",
              targetId: unit.targetId,
              combo: unit.comboCritical ? "Combo" : undefined,
              isOutnumbered: unit.outnumbered === true,
              criticalLevel: unit.level || 1, // Include unit level for scaling
              basePower: UNITS[unit.unitType]?.power || 1 // Base power from unit type
            });
          }
        }
      }
    }
  }
  
  return criticalHits;
}

// Helper function to check if any player in a side landed a critical hit
function checkSideForCriticalHits(side) {
  // CRITICAL FIX: Add safety check for undefined side or missing groups
  if (!side || !side.groups) return false;
  
  for (const groupId in side.groups) {
    const group = side.groups[groupId];
    if (group?.units) {
      // Check each unit in the group
      for (const unitId in group.units) {
        const unit = group.units[unitId];
        if (unit.type === 'player' && unit.criticalHit) {
          return true;
        }
      }
    }
  }
  
  return false;
}

// Helper function to extract solo player units from a side
function extractSoloPlayerUnits(side) {
  const players = [];
  
  // CRITICAL FIX: Return empty array if side is undefined or doesn't have groups property
  if (!side || !side.groups) {
    return players;
  }
  
  // Check each group in the side
  for (const groupId in side.groups) {
    // CRITICAL FIX: Add safety check for invalid group
    const group = side.groups[groupId];
    if (!group || !group.units) continue;
    
    const unitIds = Object.keys(group.units);
    
    // If this is a solo player group, add it to the list
    if (unitIds.length === 1 && group.units[unitIds[0]]?.type === 'player') {
      players.push({
        id: groupId,
        unitId: unitIds[0],
        unit: group.units[unitIds[0]]
      });
    }
  }
  
  return players;
}

// Calculate level advantage in PvP combat
function getAveragePlayerLevelDifference(player, opponents) {
  // Default level is 1 if not specified
  const playerLevel = player.unit.level || 1;
  
  // If no opponents, no advantage
  if (opponents.length === 0) return 0;
  
  // Calculate average opponent level
  const totalOpponentLevel = opponents.reduce((sum, opponent) => {
    return sum + (opponent.unit.level || 1);
  }, 0);
  
  const averageOpponentLevel = totalOpponentLevel / opponents.length;
  
  // Return the level difference
  return playerLevel - averageOpponentLevel;
}