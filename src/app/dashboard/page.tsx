// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import MovieList from "@/components/Research/MovieList";

type Billionaire = {
  name: string;
  rank: number | null;
};

export default function DashboardPage() {
  const [billionaires, setBillionaires] = useState<Billionaire[]>([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    fetch("/api/billionaires") // You'll need to create this endpoint if it's not there
      .then(res => res.json())
      .then(data => {
        setBillionaires(data);
        if (data.length > 0) setSelected(data[0].name);
      })
      .catch(() => console.error("Failed to fetch billionaires"));
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen">
      <aside className="w-full lg:w-1/4 bg-white border-r p-4">
        <h2 className="text-xl font-bold mb-4">Billionaires</h2>
        <ul className="space-y-2">
          {billionaires.map((b, i) => (
            <li key={i}>
              <button
                onClick={() => setSelected(b.name)}
                className={`w-full text-left p-2 rounded hover:bg-blue-100 transition ${
                  selected === b.name ? "bg-blue-200 font-semibold" : ""
                }`}
              >
                {b.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 overflow-y-auto p-4">
        {selected ? <MovieList billionaire={selected} onBack={() => setSelected("")} /> : <p>Select a billionaire</p>}
      </main>
    </div>
  );
}
