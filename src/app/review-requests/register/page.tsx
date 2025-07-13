'use client';

import { useState } from 'react';

export default function ReviewRequestForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [genre, setGenre] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8080/review-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, genre }),
    });

    if (res.ok) {
      setMessage('レビュー依頼の登録に成功しました！');
      setTitle('');
      setBody('');
      setGenre('');
    } else {
      setMessage('登録に失敗しました。');
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">レビュー依頼を登録する</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">依頼内容</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">ジャンル</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          登録する
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}
