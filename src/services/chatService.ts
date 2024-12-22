import { API_CONFIG } from '../config/api';

export const getChatResponse = async (
  message: string,
  language: string
): Promise<string> => {
  const response = await fetch(`${API_CONFIG.CHAT_API.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_CONFIG.CHAT_API.key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: message
      }],
      temperature: 0.7
    })
  });

  if (!response.ok) throw new Error('Chat response fetch failed');
  
  const data = await response.json();
  return data.choices[0].message.content;
};