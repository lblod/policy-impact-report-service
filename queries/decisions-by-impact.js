import { sdgValuesClause } from '../helpers/sdg-filter.js';

export const decisionsByImpactQuery = (governingBody, sdgUris = []) => `
  PREFIX oa: <http://www.w3.org/ns/oa#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>

  SELECT ?impact (COUNT(DISTINCT ?decision) AS ?count)
  WHERE {
    ${sdgValuesClause(sdgUris)}

    ?annotation a oa:Annotation ;
    oa:motivatedBy oa:classifying ;
    oa:hasTarget ?decision ;
    oa:hasBody ?sdg .

    ?decision ext:owningBody <${governingBody}> .

    ?annotation oa:hasBody ?impact .
    ?impact skos:inScheme <http://mu.semte.ch/vocabularies/ext/impact> .

    ?sdg skos:inScheme <http://data.lblod.gift/id/conceptscheme/sdg-simple> .
  }
  GROUP BY ?impact
`;
