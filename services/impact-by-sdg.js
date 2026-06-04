import { querySudo as query } from '@lblod/mu-auth-sudo';
import { impactBySdgQuery } from '../queries/impact-by-sdg.js';

export async function getImpactBySdg(governingBody) {
  const result = await query(impactBySdgQuery(governingBody));

  return result.results.bindings.map((b) => ({
    sdg: b.sdg.value,
    impact: b.impact.value,
    count: Number.parseInt(b.count.value, 10),
  }));
}
