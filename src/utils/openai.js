// Uses Create React App env variable for the API key
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export async function fetchOpenAIAnalysis(prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4-vision-preview',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  return response.json();
}


export async function generateOpenAIImage(prompt) {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1024x1024'
      })
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data?.error?.message || 'Unknown error';
      console.error('OpenAI Image API error:', errorMsg);
      return `ERROR: ${errorMsg}`;
    }
    return data.data?.[0]?.url || '';
  } catch (err) {
    console.error('OpenAI Image API network error:', err);
    return '';
  }
}
