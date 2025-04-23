// // const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Store your TMDB key in .env.local

// const TMDB_API_KEY = "c5c65a7cf23fb1d70e2847c1770236ae";
// const TMDB_API_BASE = "https://api.themoviedb.org/3";

// export async function fetchMovieDetails(title: string) {
//   try {
//     const res = await fetch(
//       `${TMDB_API_BASE}/search/movie?query=${encodeURIComponent(title)}&api_key=${TMDB_API_KEY}`
//     );

//     if (!res.ok) {
//       throw new Error(`Failed to fetch TMDB movie for ${title}`);
//     }

//     const data = await res.json();

//     // Return the first movie result
//     return data.results[0] || null;
//   } catch (error) {
//     console.error("TMDB Error:", error);
//     return null;
//   }
// }
// const TMDB_API_KEY = process.env.TMDB_API_KEY;
// const TMDB_API_KEY = "c5c65a7cf23fb1d70e2847c1770236ae";

// export async function fetchMovieDetails(title: string, year?: string) {
//   const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&year=${year || ''}`;

//   const res = await fetch(url);
//   const data = await res.json();

//   if (data.results && data.results.length > 0) {
//     return data.results[0]; // Take the most relevant result
//   }

//   return null;
// }

export async function fetchMovieDetails(title: string, year?: string) {
  const TMDB_API_KEY = "c5c65a7cf23fb1d70e2847c1770236ae";
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&year=${year || ''}`;

  const res = await fetch(url);
  const data = await res.json();
  console.log(data); // Add this line to log the response t
  if (data.results && data.results.length > 0) {
    return data.results[0];
  }

  return null;
}
