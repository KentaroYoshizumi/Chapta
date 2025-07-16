import Link from 'next/link';

// サーバーサイドでデータ取得
async function fetchReviewRequests() {
  const res = await fetch('http://localhost:8080/review-requests', {
    cache: 'no-store', // 開発中は常に最新を取得
  });

  if (!res.ok) {
    throw new Error('レビュー依頼の取得に失敗しました');
  }

  const data = await res.json();
  return data || []; // null 対策
}

// サーバーコンポーネント
export default async function ReviewRequestList() {
  const reviewRequests = await fetchReviewRequests();

  return (
    <main className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">レビュー依頼一覧</h1>
      {reviewRequests.length === 0 ? (
        <p>レビュー依頼はまだ登録されていません。</p>
      ) : (
        <ul className="space-y-4">
          {reviewRequests.map((req: any, index: number) => (
            <li key={index} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{req.title}</h2>
              <p className="text-gray-600 mb-2">ジャンル: {req.genre}</p>
              <p className="mb-2">{req.body}</p>
              <Link
                href={`/review-requests/${index}`}
                className="text-blue-600 hover:underline inline-block mt-2"
              >
                詳細を見る
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
