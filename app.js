import { app } from 'mu';
import { getImpactBySdg } from './services/impact-by-sdg';
import { getTotalDecisions } from './services/total-decisions';
import { getLinkedDecisionsPerSdg } from './services/linked-decisions-per-sdg';

app.get('/health', async (_req, res) => {
  res.send({ status: 'ok' });
});

app.get('/impact-by-sdg', async (req, res) => {
  const data = await getImpactBySdg();
  res.json(data);
});

app.get('/total-decisions', async (req, res) => {
  const count = await getTotalDecisions();
  res.json({
    count: Number.parseInt(count, 10),
  });
});

app.get('/linked-decisions-per-sdg', async (req, res) => {
  const count = await getLinkedDecisionsPerSdg();
  res.json({
    count: Number.parseInt(count, 10),
  });
});
