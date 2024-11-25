import {
  LlamaChatSession,
  LlamaContext,
  LlamaJsonSchemaGrammar,
  LlamaModel,
} from "node-llama-cpp";
import path from "path";
import { fileURLToPath } from "url";

async function getResponse(prompt) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const model = new LlamaModel({
    modelPath: path.join(
      __dirname,
      "models",
      "mistral-7b-instruct-v0.1.Q8_0.gguf"
    ),
    gpuLayers: 20,
  });
  const context = new LlamaContext({ model, seed: 0 });
  const session = new LlamaChatSession({ context });
  const grammar = new LlamaJsonSchemaGrammar({
    type: "object",
    properties: {
      answer: {
        type: "string",
      },
    },
  });
  const result = await session.prompt(prompt, {
    grammar,
    maxTokens: context.getContextSize(),
  });
  return result;
}

getResponse("what are some good get to know you questions").then(console.log);
