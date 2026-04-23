export const impactBySdgQuery = `
PREFIX oa: <http://www.w3.org/ns/oa#>
PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>

SELECT ?sdg ?impact (COUNT(?annotation) AS ?count)
WHERE {
  VALUES ?impact {
    <http://mu.semte.ch/vocabularies/ext/impact/positive>
    <http://mu.semte.ch/vocabularies/ext/impact/negative>
  }
  ?annotation a oa:Annotation ;
              oa:motivatedBy oa:classifying ;
              oa:hasTarget ?decision ;
              oa:hasBody ?impact ;
              oa:hasBody ?sdg .

  FILTER(STRSTARTS(STR(?sdg), "http://example.org/SDG-"))
}
GROUP BY ?sdg ?impact
ORDER BY ?sdg ?impact
`;
