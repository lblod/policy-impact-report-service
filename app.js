import { app, query } from 'mu';

app.get('/health', async (_req, res) => {
  res.send({ status: 'ok' });
});

app.get('/impact-by-sdg', async (req, res) => {
  const result = await query(`
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
  `);
  const data = result.results.bindings.map((b) => ({
    sdg: b.sdg.value,
    impact: b.impact.value,
    count: Number.parseInt(b.count.value, 10),
  }));

  res.json(data);
});

app.get('/total-decisions', async (req, res) => {
  const result = await query(`
    PREFIX eli: <http://data.europa.eu/eli/ontology#>

    SELECT (COUNT(DISTINCT ?decision) AS ?totalCount)
    WHERE {
      ?decision a eli:LegalExpression .
    }
  `);

  const count = result.results.bindings[0]?.totalCount?.value ?? 0;

  res.json({
    count: Number.parseInt(count, 10),
  });
});

app.get('/linked-decisions-per-sdg', async (req, res) => {
  const result = await query(`
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
  `);

  const count = result.results.bindings[0]?.linkedCount?.value ?? 0;

  res.json({
    count: Number.parseInt(count, 10),
  });
});
