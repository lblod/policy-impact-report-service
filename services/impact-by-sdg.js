import { query } from 'mu';
import { impactBySdgQuery } from '../queries/impact-by-sdg.js';

export async function getImpactBySdg() {
  const result = await query(impactBySdgQuery);

  return result.results.bindings.map((b) => ({
    sdg: b.sdg.value,
    impact: b.impact.value,
    count: Number.parseInt(b.count.value, 10),
  }));
}
