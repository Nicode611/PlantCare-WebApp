'use client';

import { useState } from 'react';

export default function TasksSection() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: prompt }
          ]
        }),
      });
      const { reply: text } = await res.json();
      setReply(text);
    } catch (err) {
      console.error(err);
      setReply('Erreur lors de la requête.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Écris ton message..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? '…' : 'Envoyer'}
        </button>
      </form>
      {reply && (
        <div className="mt-4 p-2 border rounded">
          <strong>Assistant :</strong> {reply}
        </div>
      )}
    </div>
  );
}