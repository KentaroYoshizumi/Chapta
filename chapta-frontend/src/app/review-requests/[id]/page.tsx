// chapta-frontend/src/app/review-requests/[id]/page.tsx

import { notFound } from 'next/navigation';

type ReviewRequest = {
  id: number;
  title: string;
  body: string;
  genre: string;
};

async function getReviewRequest(id: string): Promise<ReviewRequest | null> {
  try {
    const res = await fetch(`http://localhost:8080/review-requests/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ReviewRequestDetail({
  params,
}: {
  params: { id: string };
}) {
  const review = await getReviewRequest(params.id);

  if (!review) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">{review.title}</h1>
      <p className="mb-2 text-gray-700">
        <strong>ジャンル:</strong> {review.genre}
      </p>
      <p>{review.body}</p>
    </main>
  );
}
