import { querySudo as query } from '../helpers/sudo-query.js';
import { impactOverTimeQuery } from '../queries/impact-over-time.js';

export async function getImpactOverTime(governingBody, sdgUris = []) {
  const result = await query(impactOverTimeQuery(governingBody, sdgUris));

  const byYear = new Map();
  for (const binding of result.results.bindings) {
    const year = Number.parseInt(binding.year.value, 10);
    if (Number.isNaN(year)) continue;

    const impact = binding.impact.value;
    const count = Number.parseInt(binding.count.value, 10);

    const entry = byYear.get(year) ?? {
      year,
      positive: 0,
      negative: 0,
      unknown: 0,
    };

    if (impact.endsWith('/positive')) entry.positive = count;
    else if (impact.endsWith('/negative')) entry.negative = count;
    else if (impact.endsWith('/unknown')) entry.unknown = count;

    byYear.set(year, entry);
  }

  return Array.from(byYear.values()).sort((a, b) => a.year - b.year);
}
