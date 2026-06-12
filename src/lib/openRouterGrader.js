export async function gradeQuestionWithOpenRouterFree(questionData, userAnswer) {
  // Use a server-side proxy in production to avoid exposing API keys.
  const useProxy = import.meta.env.PROD || !!import.meta.env.VITE_USE_API_PROXY;
  const payload = {
    model: "openai/gpt-oss-20b:free",
    temperature: 0.1,
    messages: [
      {
        role: "system",
        content: `You are an automated technical exam grading engine. Evaluate the user's answer strictly against the model answer. Return a single, valid JSON object only. Do not wrap in markdown code blocks.
            \n            Schema:
            {
              "isCorrect": boolean,
              "score": number,
              "feedback": "string",
              "modelAnswer": "string"
            }`
      },
      {
        role: "user",
        content: `Question: "${questionData.question}"\nType: "${questionData.type}"\nExpected: "${questionData.answer}"\nUser: "${userAnswer}"`
      }
    ]
  };
  
  try {
    const endpoint = useProxy ? '/api/grade' : 'https://openrouter.ai/api/v1/chat/completions';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
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
