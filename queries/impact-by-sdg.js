export const impactBySdgQuery = `
  PREFIX oa: <http://www.w3.org/ns/oa#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
  PREFIX ont: <http://data.europa.eu/eli/ontology#>

  SELECT ?sdg ?impact (COUNT(DISTINCT ?decision) AS ?count)
  WHERE {

    VALUES ?conceptScheme {
      <http://data.lblod.gift/id/conceptscheme/sdg-simple>
    }

    ?annotation a oa:Annotation ;
    oa:motivatedBy oa:classifying ;
    oa:hasTarget ?decision ;
    oa:hasBody ?sdg .

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

    ?sdg skos:inScheme ?conceptScheme.
  }
  GROUP BY ?sdg ?impact
  ORDER BY ?sdg ?impact
`;
