const SAFE_IRI = /^https?:\/\/[^\s<>"{}|\\^`]+$/;

export function sanitizeSdgUris(sdgUris = []) {
  const list = Array.isArray(sdgUris) ? sdgUris : [sdgUris];
  return list.filter((uri) => typeof uri === 'string' && SAFE_IRI.test(uri));
}

export function sdgValuesClause(sdgUris = []) {
  const uris = sanitizeSdgUris(sdgUris);
  if (uris.length === 0) return '';
  return `VALUES ?sdg { ${uris.map((uri) => `<${uri}>`).join(' ')} }`;
}
