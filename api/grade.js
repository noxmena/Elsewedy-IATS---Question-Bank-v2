export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // If you want to hard-code the API key directly in this file, replace the placeholder below.
  // It is safer to use Vercel environment variables or a local .env file instead.
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === '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') {
    return res.status(500).json({ error: 'Missing OpenRouter API key on server' });
  }

  try {
    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (err) {
    console.error('API proxy error', err);
    return res.status(502).json({ error: 'Upstream request failed' });
  }
}
