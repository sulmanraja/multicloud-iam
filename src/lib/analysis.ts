import OpenAI from "openai";
import { z } from "zod";
import { inventory } from "./mock-data.js";

const recommendationSchema = z.object({
  summary: z.string(),
  topFindings: z.array(z.string()).min(1),
  recommendations: z.array(
    z.object({
      principalId: z.string(),
      currentDefinition: z.string(),
      action: z.string(),
      rationale: z.string()
    })
  ).min(1)
});

const customRoleDraftSchema = z.object({
  principalId: z.string(),
  cloud: z.enum(["aws", "azure", "gcp"]),
  proposedName: z.string(),
  includedPermissions: z.array(z.string()).min(1),
  excludedPermissions: z.array(z.string()),
  rationale: z.string(),
  confidence: z.enum(["low", "medium", "high"])
});

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing. Add it to your .env file.");
  }
  return new OpenAI({ apiKey });
}

export async function generateRecommendations() {
  const client = getClient();

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-5.4-mini",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              "You are a cloud IAM security expert. Analyze multi-cloud IAM role and policy inventory data. Return compact JSON only."
          }
        ]
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Analyze this inventory and propose least-privilege recommendations:\n${JSON.stringify(inventory, null, 2)}`
          }
        ]
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "iam_recommendations",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            summary: { type: "string" },
            topFindings: { type: "array", items: { type: "string" } },
            recommendations: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  principalId: { type: "string" },
                  currentDefinition: { type: "string" },
                  action: { type: "string" },
                  rationale: { type: "string" }
                },
                required: ["principalId", "currentDefinition", "action", "rationale"]
              }
            }
          },
          required: ["summary", "topFindings", "recommendations"]
        }
      }
    }
  });

  const parsed = JSON.parse(response.output_text);
  return recommendationSchema.parse(parsed);
}

export async function draftCustomRole(principalId: string) {
  const client = getClient();
  const principal = inventory.principals.find((p) => p.id === principalId);
  const assignments = inventory.assignments.filter((a) => a.principalId === principalId);
  const definitions = inventory.definitions.filter((d) => assignments.some((a) => a.accessDefinitionId === d.id));
  const usage = inventory.usageEvents.filter((u) => u.principalId === principalId);

  if (!principal) {
    throw new Error(`Unknown principal: ${principalId}`);
  }

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-5.4-mini",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              "You are a least-privilege IAM design assistant. Produce JSON only. Prefer a minimal custom definition using observed usage rather than copying broad managed access."
          }
        ]
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: JSON.stringify({ principal, definitions, usage }, null, 2)
          }
        ]
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "custom_role_draft",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            principalId: { type: "string" },
            cloud: { type: "string", enum: ["aws", "azure", "gcp"] },
            proposedName: { type: "string" },
            includedPermissions: { type: "array", items: { type: "string" } },
            excludedPermissions: { type: "array", items: { type: "string" } },
            rationale: { type: "string" },
            confidence: { type: "string", enum: ["low", "medium", "high"] }
          },
          required: [
            "principalId",
            "cloud",
            "proposedName",
            "includedPermissions",
            "excludedPermissions",
            "rationale",
            "confidence"
          ]
        }
      }
    }
  });

  const parsed = JSON.parse(response.output_text);
  return customRoleDraftSchema.parse(parsed);
}
