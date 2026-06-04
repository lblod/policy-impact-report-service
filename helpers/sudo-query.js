const SPARQL_ENDPOINT =
  process.env.MU_SPARQL_ENDPOINT || 'http://database:8890/sparql';

// Minimal sudo SPARQL client: sends the query straight to the SPARQL endpoint
// with the `mu-auth-sudo` header so mu-authorization grants access to all
// graphs. This is needed for the aggregate report queries, which join across
// graphs (annotations, jobs/tasks, expressions) that the unauthenticated
// session is not granted to read together.
//
// Implemented with the global `fetch` (Node 18+) to avoid pulling in an extra
// dependency that is incompatible with this template (the published
// @lblod/mu-auth-sudo targets Node >= 22 and is CommonJS).
export async function querySudo(queryString) {
  const response = await fetch(SPARQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/sparql-results+json',
      'mu-auth-sudo': 'true',
    },
    body: new URLSearchParams({ query: queryString }).toString(),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `SPARQL sudo query failed (${response.status} ${response.statusText}): ${body}`,
    );
  }

  return response.json();
}
