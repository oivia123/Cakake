import { buildPrompt } from "../utils/buildPrompt";

export async function generateCakeDescription({ tarotCards, allergies, inventory }) {
  const prompt = buildPrompt(
    tarotCards,
    allergies,
    inventory.missingIngredients,
    inventory.availableCakes
  );

  const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_HF_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: prompt })
  });

  const data = await response.json();
  const fullOutput = data[0]?.generated_text || "AI 模型未返回结果。";

  // 从“---”之后开始截取生成内容
  const parts = fullOutput.split('---');
  const modelOutput = parts.length > 1 ? parts[parts.length - 1].trim() : fullOutput.trim();

  // 清除模型误加的 "- Cake Name" 行（如果它仍然没听话）
  const filtered = modelOutput
    .split('\n')
    .filter(line => !line.match(/^-\s.*Cake$/)) // 过滤形如 "- Mocha Macadamia Tart" 的行
    .join('\n')
    .trim();

  console.log('🧁 Cleaned LLM output:', filtered);
  return filtered;
}