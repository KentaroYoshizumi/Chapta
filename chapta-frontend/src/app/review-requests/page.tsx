// chapta-frontend/src/app/review-requests/page.tsx

import Link from 'next/link';

export default function ReviewRequestsPage() {
  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">レビュー依頼ページ</h1>
      <p>
        <Link href="/review-requests/list" className="text-blue-600 hover:underline">
          レビュー依頼一覧へ
        </Link>
      </p>
      <p>
        <Link href="/review-requests/register" className="text-blue-600 hover:underline">
          レビュー依頼新規登録へ
        </Link>
      </p>
    </main>
  );
}
