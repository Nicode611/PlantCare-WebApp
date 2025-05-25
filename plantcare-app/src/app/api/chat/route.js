import { NextResponse } from 'next/server';
import { groqClient } from '../../../groq/groqClient';

export async function POST(request) {
  try {
    const { messages } = await request.json();
    const completion = await groqClient.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: 'Vous êtes un assistant utile.' },
        ...messages,
      ],
    });
    return NextResponse.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error('Erreur lors de l’appel à Groq', err);
    return NextResponse.json(
      { error: 'Erreur lors de l’appel à Groq' },
      { status: 500 }
    );
  }
}