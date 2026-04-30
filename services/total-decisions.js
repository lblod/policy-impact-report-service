import { query } from 'mu';
import { totalDecisionsQuery } from '../queries/total-decisions';

export async function getTotalDecisions() {
  const result = await query(totalDecisionsQuery);

  return result.results.bindings[0]?.totalCount?.value ?? 0;
}
