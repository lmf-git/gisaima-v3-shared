/**
 * In-world day/night cycle — shared so the SERVER can apply mechanical effects
 * (night sight penalty, nocturnal monster surge) from the same clock the web
 * client uses for the ambient tint. The clock is the world's tick count.
 *
 *   DAY_TICKS = 60 → one in-world day ≈ 1 real hour (one tick ≈ one minute).
 *   First half of the cycle is day, second half night, so a freshly seeded
 *   world (tickCount near 0) opens at dawn rather than midnight.
 */
export const DAY_TICKS = 60;

const clamp01 = (n) => Math.max(0, Math.min(1, n));

// Resolve a tick to the state of the sky: { t, daylight, isNight, phase }.
export function dayCycle(tick) {
  const ticks = Number(tick);
  const n = Number.isFinite(ticks) ? ticks : DAY_TICKS * 0.15;
  const t = (((n % DAY_TICKS) + DAY_TICKS) % DAY_TICKS) / DAY_TICKS;

  const altitude = Math.sin(t * Math.PI * 2);
  const daylight = clamp01((altitude + 0.5) / 1.5);
  const isNight = t >= 0.5;

  let phase;
  if (t < 0.06) phase = 'dawn';
  else if (t < 0.44) phase = 'day';
  else if (t < 0.56) phase = 'dusk';
  else phase = 'night';

  return { t, daylight, isNight, phase };
}

/** True when the sun is below the horizon for the given tick. */
export function isNight(tick) {
  return dayCycle(tick).isNight;
}

export default dayCycle;
