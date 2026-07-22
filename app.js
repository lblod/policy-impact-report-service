import { app } from 'mu';
import { getImpactBySdg } from './services/impact-by-sdg';
import { getTotalDecisions } from './services/total-decisions';
import { getLinkedDecisionsPerSdg } from './services/linked-decisions-per-sdg';
import { getDecisionsByImpact } from './services/decisions-by-impact';

function sdgUrisFrom(query) {
  const { sdg } = query;
  if (!sdg) return [];
  return Array.isArray(sdg) ? sdg : [sdg];
}

const GOVERNING_BODY_REQUIRED_MESSAGE =
  'A governing body is required. Please provide a `governingBody` query parameter.';

app.get('/health', async (_req, res) => {
  res.send({ status: 'ok' });
});

app.get('/impact-by-sdg', async (req, res) => {
  const { governingBody } = req.query;
  if (!governingBody) {
    return res.status(400).json({ error: GOVERNING_BODY_REQUIRED_MESSAGE });
  }

  const data = await getImpactBySdg(governingBody);
  res.json(data);
});

app.get('/total-decisions', async (req, res) => {
  const { governingBody } = req.query;
  if (!governingBody) {
    return res.status(400).json({ error: GOVERNING_BODY_REQUIRED_MESSAGE });
  }

  const count = await getTotalDecisions(governingBody);
  res.json({
    count: Number.parseInt(count, 10),
  });
});

app.get('/linked-decisions-per-sdg', async (req, res) => {
  const { governingBody } = req.query;
  if (!governingBody) {
    return res.status(400).json({ error: GOVERNING_BODY_REQUIRED_MESSAGE });
  }

  const count = await getLinkedDecisionsPerSdg(
    governingBody,
    sdgUrisFrom(req.query),
  );
  res.json({
    count: Number.parseInt(count, 10),
  });
});

app.get('/decisions-by-impact', async (req, res) => {
  const { governingBody } = req.query;
  if (!governingBody) {
    return res.status(400).json({ error: GOVERNING_BODY_REQUIRED_MESSAGE });
  }

  const counts = await getDecisionsByImpact(
    governingBody,
    sdgUrisFrom(req.query),
  );
  res.json(counts);
});
