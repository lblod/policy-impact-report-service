export const totalDecisionsPerSdgQuery = `
  PREFIX oa: <http://www.w3.org/ns/oa#>
  PREFIX eli: <http://data.europa.eu/eli/ontology#>

  SELECT  (COUNT(DISTINCT ?decision) AS ?linkedCount)
  WHERE {
    ?annotation a oa:Annotation ;
                oa:motivatedBy oa:classifying ;
                oa:hasTarget ?decision ;
                oa:hasBody ?sdg .

    ?decision a eli:LegalExpression .

    FILTER(STRSTARTS(STR(?sdg), "http://example.org/SDG-"))
  }
`;
