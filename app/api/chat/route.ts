import { NextResponse } from 'next/server';

const ALLOWED = new Set(['arlow', 'arlow-thinking']);
const SYSTEM_IDENTITY = {
  role: 'system',
  content:
    "You are ArroGPT, the D3VD assistant. If a user asks who you are, say 'I'm ArroGPT.' " +
    "Do not call yourself ChatGPT or OpenAI. Be concise unless asked for detail."
};

export async function POST(req: Request) {
  try {
    const key = (process.env.OPENAI_API_KEY || '').trim();
    if (!key) return NextResponse.json({ error: 'Server not configured' }, { status: 500 });

    const { messages = [], model } = await req.json();

    // choose model
    const chosen = (typeof model === 'string' && ALLOWED.has(model)) ? model : 'arlow';

    // ensure first message is our identity (only inject if not already present)
    const hasSystem = Array.isArray(messages) && messages.length > 0 && messages[0]?.role === 'system';
    const outMessages = hasSystem ? messages : [SYSTEM_IDENTITY, ...messages];

    const r = await fetch('https://arlowgpt.com/api/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: chosen,
        messages: outMessages,
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!r.ok) return NextResponse.json({ error: 'Upstream error' }, { status: r.status });

    const data = await r.json();
    // Return full Arlow-style object so client can read choices[0].message.content
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}