export const totalDecisionsQuery = `
PREFIX eli: <http://data.europa.eu/eli/ontology#>
PREFIX gold: <http://purl.org/linguistics/gold/translation>

SELECT (COUNT(DISTINCT ?decision) AS ?totalCount)
WHERE {

  ?decision a eli:Expression .

  FILTER NOT EXISTS {
    ?decision gold:translation ?translated .
  }

}
`;
