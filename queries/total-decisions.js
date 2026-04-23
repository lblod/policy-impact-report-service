export const totalDecisionsQuery = `
   PREFIX eli: <http://data.europa.eu/eli/ontology#>

  SELECT (COUNT(DISTINCT ?decision) AS ?totalCount)
  WHERE {
    ?decision a eli:LegalExpression .
  }
`;
