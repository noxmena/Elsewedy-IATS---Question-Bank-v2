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

    // Retry logic for transient network issues
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const text = await response.text().catch(() => '');
          console.error(`OpenRouter upstream error (${response.status}):`, text);
          if (attempt < maxAttempts) {
            await new Promise(r => setTimeout(r, 500 * attempt));
            continue;
          }
          return {
            isCorrect: false,
            score: 0,
            feedback: `Grading temporary unavailable (Upstream ${response.status}). Please try again.`,
            modelAnswer: questionData.answer || ""
          };
        }

        const data = await response.json();
        let rawText = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) ? String(data.choices[0].message.content).trim() : '';

        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) rawText = jsonMatch[0];

        try {
          return JSON.parse(rawText);
        } catch (parseErr) {
          console.error('Failed to parse OpenRouter response:', parseErr, rawText);
          return {
            isCorrect: false,
            score: 0,
            feedback: 'Grading temporary unavailable (Invalid AI response). Please try again.',
            modelAnswer: questionData.answer || ""
          };
        }
      } catch (err) {
        console.error('OpenRouter request failed (attempt', attempt, '):', err);
        if (attempt < maxAttempts) {
          await new Promise(r => setTimeout(r, 500 * attempt));
          continue;
        }
        return {
          isCorrect: false,
          score: 0,
          feedback: 'Grading temporary unavailable (Network Timeout). Please try again.',
          modelAnswer: questionData.answer || ""
        };
      }
    }

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
