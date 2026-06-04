import { query } from 'mu';
import { totalDecisionsPerSdgQuery } from '../queries/linked-decisions-per-sdg.js';

export async function getLinkedDecisionsPerSdg(governingBody) {
  const result = await query(totalDecisionsPerSdgQuery(governingBody));
  return result.results.bindings[0]?.linkedCount?.value ?? 0;
}
