export const totalDecisionsQuery = (governingBody) => `
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX oa: <http://www.w3.org/ns/oa#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX eli: <http://data.europa.eu/eli/ontology#>
PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>

SELECT (COUNT(DISTINCT ?expression) AS ?totalCount)
WHERE {
    ?task prov:generated ?annotation.
    ?annotation oa:motivatedBy oa:classifying .
    ?annotation oa:hasTarget ?expression .
    ?expression a eli:Expression .
    ?expression ext:owningBody <${governingBody}> .
    ?task dct:isPartOf ?job.
    ?job <http://mu.semte.ch/vocabularies/ext/codelist>  <http://data.lblod.gift/id/conceptscheme/sdg-simple>.
  }
`;
