import "dotenv/config";
import express from "express";
import { z } from "zod";
import { generateRecommendations, draftCustomRole } from "./lib/analysis.js";
import { inventory } from "./lib/mock-data.js";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "multicloud-iam-codex-starter" });
});

app.get("/api/inventory", (_req, res) => {
  res.json(inventory);
});

app.get("/api/recommendations", async (_req, res) => {
  try {
    const results = await generateRecommendations();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
});

app.post("/api/custom-role-draft", async (req, res) => {
  const schema = z.object({ principalId: z.string() });
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  try {
    const result = await draftCustomRole(parsed.data.principalId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
});

app.get("/api/principals/:id", (req, res) => {
  const principal = inventory.principals.find((p) => p.id === req.params.id);
  if (!principal) {
    res.status(404).json({ error: "Principal not found" });
    return;
  }

  const assignments = inventory.assignments.filter((a) => a.principalId === principal.id);
  const definitions = inventory.definitions.filter((d) => assignments.some((a) => a.accessDefinitionId === d.id));
  const usageEvents = inventory.usageEvents.filter((u) => u.principalId === principal.id);

  res.json({ principal, assignments, definitions, usageEvents });
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
