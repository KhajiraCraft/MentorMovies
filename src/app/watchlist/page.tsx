
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type WatchlistItem = {
  id: string;
  title: string;
  year: number;
  name: string;
  context?: string;
};

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/watchlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setItems(data.watchlist || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [router]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">🎞️ Your Watchlist</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">No movies in your watchlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg">
              <h3 className="text-lg font-semibold">{item.title} ({item.year})</h3>
              <p className="text-sm text-gray-600 italic mb-2">Recommended by: {item.name}</p>
              {item.context && <p className="text-sm text-gray-700">{item.context}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
