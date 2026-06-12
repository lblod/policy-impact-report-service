import { querySudo as query } from '../helpers/sudo-query.js';
import { decisionsByImpactQuery } from '../queries/decisions-by-impact.js';

export async function getDecisionsByImpact(governingBody, sdgUris = []) {
  const result = await query(decisionsByImpactQuery(governingBody, sdgUris));

  const counts = { positive: 0, negative: 0 };
  for (const binding of result.results.bindings) {
    const impact = binding.impact.value;
    const count = Number.parseInt(binding.count.value, 10);
    if (impact.endsWith('/positive')) counts.positive = count;
    else if (impact.endsWith('/negative')) counts.negative = count;
  }
  return counts;
}
