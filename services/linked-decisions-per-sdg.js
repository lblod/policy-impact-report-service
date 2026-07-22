import { querySudo as query } from '../helpers/sudo-query.js';
import { totalDecisionsPerSdgQuery } from '../queries/linked-decisions-per-sdg.js';

export async function getLinkedDecisionsPerSdg(governingBody, sdgUris = []) {
  const result = await query(totalDecisionsPerSdgQuery(governingBody, sdgUris));
  return result.results.bindings[0]?.linkedCount?.value ?? 0;
}
