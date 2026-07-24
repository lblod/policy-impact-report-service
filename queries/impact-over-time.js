import { sparqlEscapeUri } from 'mu';
import { sdgValuesClause } from '../helpers/sdg-filter.js';

export const impactOverTimeQuery = (governingBody, sdgUris = []) => `
  PREFIX oa: <http://www.w3.org/ns/oa#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
  PREFIX eli: <http://data.europa.eu/eli/ontology#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

  SELECT ?year ?impact (COUNT(DISTINCT ?decision) AS ?count)
  WHERE {
    ${sdgValuesClause(sdgUris)}

    ?annotation a oa:Annotation ;
    oa:motivatedBy oa:classifying ;
    oa:hasTarget ?decision ;
    oa:hasBody ?sdg .

    ?decision ext:owningBody ${sparqlEscapeUri(governingBody)} .

    {
      ?annotation oa:hasBody ?impact .
      ?impact skos:inScheme <http://mu.semte.ch/vocabularies/ext/impact> .
    } UNION {
      FILTER NOT EXISTS {
        ?annotation oa:hasBody ?unknown .
        ?unknown skos:inScheme <http://mu.semte.ch/vocabularies/ext/impact> .
      }
      BIND(<http://mu.semte.ch/vocabularies/ext/impact/unknown> AS ?impact)
    }

    ?sdg skos:inScheme <http://data.lblod.gift/id/conceptscheme/sdg-simple> .

    OPTIONAL {
      {
        ?work eli:is_realized_by ?decision .
        ?work eli:date_document ?date .
      } UNION {
        ?decision eli:date_document ?date .
      } UNION {
        ?decision ^oa:hasTarget / oa:hasBody ?datebody .
        ?datebody rdf:predicate eli:date_document .
        ?datebody rdf:object ?date .
      }
    }

    BIND(SUBSTR(STR(?date), 0, 4) AS ?year)
  }
  GROUP BY ?year ?impact
  ORDER BY ?year ?impact
`;
