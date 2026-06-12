export async function gradeQuestionWithOpenRouterFree(questionData, userAnswer) {
  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || "";
  
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://elsewedy-iats-bank.v2", 
        "X-Title": "Elsewedy Question Bank v2"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free", 
        temperature: 0.1,
        messages: [
          {
            role: "system",
            content: `You are an automated technical exam grading engine. Evaluate the user's answer strictly against the model answer. Return a single, valid JSON object only. Do not wrap in markdown code blocks.
            
            Schema:
            {
              "isCorrect": boolean,
              "score": number,
              "feedback": "string",
              "modelAnswer": "string"
            }`
          },
          {
            role: "user",
            content: `Question: "${questionData.question}"
Type: "${questionData.type}"
Expected: "${questionData.answer}"
User: "${userAnswer}"`
          }
        ]
      })
    });

    const data = await response.json();
    let rawText = data.choices[0].message.content.trim();

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      rawText = jsonMatch[0];
    }

    return JSON.parse(rawText);

  } catch (error) {
    console.error("OpenRouter Grading Error: ", error);
    return {
      isCorrect: false,
      score: 0,
      feedback: "Grading temporary unavailable (Network Timeout). Please try again.",
      modelAnswer: questionData.answer || ""
    };
  }
}
