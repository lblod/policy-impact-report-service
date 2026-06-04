import { querySudo as query } from '../helpers/sudo-query.js';
import { totalDecisionsQuery } from '../queries/total-decisions';

export async function getTotalDecisions(governingBody) {
  const result = await query(totalDecisionsQuery(governingBody));

  return result.results.bindings[0]?.totalCount?.value ?? 0;
}
