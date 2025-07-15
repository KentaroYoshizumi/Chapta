'use client';

import { useEffect, useState } from 'react';

type ReviewRequest = {
  title: string;
  body: string;
  genre: string;
};

export default function ReviewRequestList() {
  const [reviewRequests, setReviewRequests] = useState<ReviewRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviewRequests = async () => {
      try {
        const res = await fetch('http://localhost:8080/review-requests');
        if (!res.ok) throw new Error('データ取得失敗');
        const data = await res.json();
        // null 対策として fallback をつける
        setReviewRequests(data || []);
      } catch (err: any) {
        setError(err.message ?? '不明なエラー');
      } finally {
        setLoading(false);
      }
    };

    fetchReviewRequests();
  }, []);

  if (loading) return <p className="p-4">読み込み中...</p>;
  if (error) return <p className="p-4 text-red-500">エラー: {error}</p>;

  return (
    <main className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">レビュー依頼一覧</h1>
      {reviewRequests.length === 0 ? (
        <p>レビュー依頼はまだ登録されていません。</p>
      ) : (
        <ul className="space-y-4">
          {reviewRequests.map((req, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{req.title}</h2>
              <p className="text-gray-600 mb-2">ジャンル: {req.genre}</p>
              <p>{req.body}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
