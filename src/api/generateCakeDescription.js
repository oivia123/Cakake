import { buildPrompt } from "../utils/buildPrompt";
console.log('TOKEN:', process.env.REACT_APP_HF_API_TOKEN);
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
  return data[0]?.generated_text || "AI 模型未返回结果。";
} 