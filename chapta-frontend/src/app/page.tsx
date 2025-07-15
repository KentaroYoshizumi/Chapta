'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-2xl font-bold mb-6">📚 Chapta トップページ</h1>

      <ul className="space-y-4 text-lg">
        <li>
          <Link href="/review-requests" className="text-blue-600 hover:underline">
            📄 レビュー依頼一覧
          </Link>
        </li>
        <li>
          <Link href="/review-requests/register" className="text-blue-600 hover:underline">
            ✏️ レビュー依頼の新規登録
          </Link>
        </li>
        <li>
          <Link href="/reviewers/register" className="text-blue-600 hover:underline">
            🧑‍💼 書評家の新規登録
          </Link>
        </li>
      </ul>
    </main>
  );
}
