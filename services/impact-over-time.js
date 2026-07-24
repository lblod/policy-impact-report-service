import { querySudo as query } from '../helpers/sudo-query.js';
import { impactOverTimeQuery } from '../queries/impact-over-time.js';

export async function getImpactOverTime(governingBody, sdgUris = []) {
  const result = await query(impactOverTimeQuery(governingBody, sdgUris));

  const byYear = new Map();
  for (const binding of result.results.bindings) {
    const rawYear = binding.year?.value;
    const parsed = rawYear ? Number.parseInt(rawYear, 10) : NaN;
    const year = Number.isNaN(parsed) ? null : parsed;

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

  return Array.from(byYear.values()).sort((a, b) => {
    if (a.year === null) return 1;
    if (b.year === null) return -1;
    return a.year - b.year;
  });
}
