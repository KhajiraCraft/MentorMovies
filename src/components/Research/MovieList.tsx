// // "use client";

// // import { useEffect, useState } from "react";
// // import { fetchMovieDetails } from "@/lib/api/tmdb";

// // interface Props {
// //   movies: string[];
// // }

// // export default function MovieList({ movies }: Props) {
// //   const [movieData, setMovieData] = useState<any[]>([]);

// //   useEffect(() => {
// //     async function loadMovies() {
// //       const details = await Promise.all(
// //         movies.map(title => fetchMovieDetails(title))
// //       );
// //       setMovieData(details.filter(Boolean)); // Remove nulls
// //     }

// //     loadMovies();
// //   }, [movies]);

// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
// //       {movieData.map((movie, index) => (
// //         <div key={index} className="border p-2 rounded">
// //           <h3 className="font-semibold">{movie.title}</h3>
// //           <p className="text-sm">{movie.overview}</p>
// //           {movie.poster_path && (
// //             <img
// //               src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
// //               alt={movie.title}
// //               className="mt-2"
// //             />
// //           )}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { fetchMovieDetails } from "@/lib/api/tmdb";

// type MovieInput = {
//   title: string;
//   year: string;
// };

// type MovieDetail = {
//   title: string;
//   year: string;
//   tmdbData: any;
// };

// export default function MovieList() {
//   const [movies, setMovies] = useState<MovieDetail[]>([]);

//   useEffect(() => {
//     const getMovies = async () => {
//       try {
//         // 1. Fetch JSON from your own API
//         const res = await fetch("/api/movies");
//         const movieList: MovieInput[] = await res.json();

//         // 2. For each movie, fetch TMDB details
//         const detailedMovies = await Promise.all(
//           movieList.map(async (movie) => {
//             const tmdbData = await fetchMovieDetails(movie.title, movie.year);
//             return {
//               title: movie.title,
//               year: movie.year,
//               tmdbData,
//             };
//           })
//         );

//         setMovies(detailedMovies);
//       } catch (err) {
//         console.error("Error fetching movies:", err);
//       }
//     };

//     getMovies();
//   }, []);

//   return (
//     <section className="p-4">
//       <h2 className="text-xl font-bold mb-4">Movies with TMDB Details</h2>
//       <ul className="space-y-4">
//         {movies.map((movie, index) => (
//           <li key={index} className="border p-4 rounded">
//             <h3 className="text-lg font-semibold">{movie.title} ({movie.year})</h3>
//             {movie.tmdbData ? (
//               <>
//                 <p><strong>TMDB Title:</strong> {movie.tmdbData.title}</p>
//                 <p><strong>Overview:</strong> {movie.tmdbData.overview}</p>
//                 <img
//                   src={`https://image.tmdb.org/t/p/w200${movie.tmdbData.poster_path}`}
//                   alt={movie.tmdbData.title}
//                   className="mt-2"
//                 />
//               </>
//             ) : (
//               <p>No TMDB data found.</p>
//             )}
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }




// //START OF RECENT
// "use client";

// import { useEffect, useState } from "react";
// import { fetchMovieDetails } from "@/lib/api/tmdb";
// import { useTaskStore } from "@/store/task";

// type MovieInput = {
//   title: string;
//   year: number;
//   context: string;
// };

// type MovieDetail = {
//   title: string;
//   year: number;
//   context: string;
//   tmdbData: any;
// };

// export default function MovieList() {
//   const [movies, setMovies] = useState<MovieDetail[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const taskStore = useTaskStore();
  
//   useEffect(() => {
//     let isMounted = true;

//     const getMovies = async () => {
//       if (isLoading) return; // Prevent multiple simultaneous requests
      
//       try {
//         const { finalReport } = taskStore;
//         if (!finalReport) {
//           console.log('Waiting for final report...');
//           return;
//         }

//         setIsLoading(true);
//         const res = await fetch("/api/movies");
//         const data = await res.json();

//         if (!isMounted) return;

//         if (data.movies?.length) {
//           const detailedMovies = await Promise.all(
//             data.movies.map(async (movie: MovieInput) => {
//               const tmdbData = await fetchMovieDetails(movie.title, movie.year.toString());
//               return {
//                 title: movie.title,
//                 year: movie.year,
//                 context: movie.context,
//                 tmdbData,
//               };
//             })
//           );
          
//           if (isMounted) {
//             setMovies(detailedMovies);
//             setIsLoading(false);
//           }
//         }
//       } catch (err) {
//         console.error("Error in movie processing:", err);
//         setIsLoading(false);
//       }
//     };

//     getMovies();

//     return () => {
//       isMounted = false;
//     };
//   }, [taskStore.finalReport]); // Only run when finalReport changes

//   return (
//     <section className="p-4">
//       <h2 className="text-xl font-bold mb-4">Movies Mentioned</h2>
//       <ul className="space-y-4">
//         {movies.map((movie, index) => (
//           <li key={index} className="border p-4 rounded">
//             <h3 className="text-lg font-semibold">
//               {movie.title} ({movie.year})
//             </h3>
//             <p className="text-sm italic mb-2">{movie.context}</p>
//             {movie.tmdbData ? (
//               <>
//                 <p><strong>Overview:</strong> {movie.tmdbData.overview}</p>
//                 {movie.tmdbData.poster_path && (
//                   <img
//                     src={`https://image.tmdb.org/t/p/w200${movie.tmdbData.poster_path}`}
//                     alt={movie.tmdbData.title}
//                     className="mt-2"
//                   />
//                 )}
//               </>
//             ) : (
//               <p className="text-red-500">No TMDB data found.</p>
//             )}
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }
// // END OF RECENT


//// START OF MOST RECENT
// "use client";

// import { useEffect, useState } from "react";
// import { fetchMovieDetails } from "@/lib/api/tmdb";
// import { useTaskStore } from "@/store/task";

// type MovieInput = {
//   title: string;
//   year: number;
//   context: string;
// };

// type MovieDetail = {
//   title: string;
//   year: number;
//   context: string;
//   tmdbData: any;
// };

// export default function MovieList() {
//   const [movies, setMovies] = useState<MovieDetail[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const taskStore = useTaskStore();
//   const [retryCount, setRetryCount] = useState(0);

//   useEffect(() => {
//     let isMounted = true;

//     const getMovies = async () => {
//       if (isLoading) return;

//       try {
//         console.log("📡 Fetching movie list from /api/movies...");
//         const res = await fetch("/api/movies");
//         const data = await res.json();
//         const rawMovies: MovieInput[] = data.movies;

//         if (!rawMovies?.length) {
//           console.warn("⚠️ No movies returned from API. Retrying...");
//           if (retryCount < 10) {
//             setTimeout(() => setRetryCount((c) => c + 1), 10000); // Retry after 1s
//           } else {
//             console.error("🛑 Retry limit reached. Giving up.");
//           }
//           return;
//         }

//         console.log("🎬 Movies received:", rawMovies);
//         setIsLoading(true);

//         const detailedMovies = await Promise.all(
//           rawMovies.map(async (movie) => {
//             const tmdbData = await fetchMovieDetails(movie.title, movie.year.toString());
//             return {
//               ...movie,
//               tmdbData,
//             };
//           })
//         );

//         if (isMounted) {
//           setMovies(detailedMovies);
//           console.log("✅ MovieList is ready!");
//         }
//       } catch (err) {
//         console.error("❌ Failed to fetch movies:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (taskStore.finalReport) {
//       getMovies();
//     } else {
//       console.log("⏸ Skipping movie fetch – finalReport not ready.");
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, [taskStore.finalReport, retryCount]);

//   return (
//     <section className="p-4">
//       <h2 className="text-xl font-bold mb-4">Movies Mentioned</h2>
//       {isLoading && <p>⏳ Loading movie data...</p>}

//       <ul className="space-y-4">
//         {movies.map((movie, index) => (
//           <li key={index} className="border p-4 rounded">
//             <h3 className="text-lg font-semibold">
//               {movie.title} ({movie.year})
//             </h3>
//             <p className="text-sm italic mb-2">{movie.context}</p>
//             {movie.tmdbData ? (
//               <>
//                 <p><strong>Overview:</strong> {movie.tmdbData.overview}</p>
//                 {movie.tmdbData.poster_path && (
//                   <img
//                     src={`https://image.tmdb.org/t/p/w200${movie.tmdbData.poster_path}`}
//                     alt={movie.tmdbData.title}
//                     className="mt-2"
//                   />
//                 )}
//               </>
//             ) : (
//               <p className="text-red-500">No TMDB data found.</p>
//             )}
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }

////END OF MOST RECENT


// //MOST MOST RECENT
// "use client";

// import { useEffect, useState } from "react";

// type Recommendation = {
//   billionaire: string;
//   context: string;
// };

// type Movie = {
//   title: string;
//   year: number | null;
//   recommendations: Recommendation[];
// };

// export default function MovieList() {
//   const [movies, setMovies] = useState<Movie[]>([]);

//   useEffect(() => {
//     async function fetchMovies() {
//       try {
//         console.log("📡 Fetching movie list from /api/movies...");
//         const res = await fetch("/api/movies");
//         const data = await res.json();
//         console.log("🎥 Movie API result:", data);

//         if (Array.isArray(data.movies)) {
//           setMovies(data.movies);
//         } else {
//           console.warn("⚠️ No valid movie list in response.");
//         }
//       } catch (err) {
//         console.error("❌ Error fetching movies:", err);
//       }
//     }

//     fetchMovies();
//   }, []);

//   return (
//     <section className="p-4">
//       <h2 className="text-xl font-bold mb-4">Movies Mentioned</h2>
//       {movies.length === 0 ? (
//         <p>No movies found.</p>
//       ) : (
//         <ul className="space-y-6">
//           {movies.map((movie, idx) => (
//             <li key={idx} className="border p-4 rounded shadow-sm">
//               <h3 className="text-lg font-semibold">
//                 {movie.title} {movie.year ? `(${movie.year})` : ""}
//               </h3>

//               {movie.recommendations.length > 0 ? (
//                 <ul className="mt-2 pl-4 space-y-2">
//                   {movie.recommendations.map((rec, index) => (
//                     <li key={index} className="text-sm">
//                       <strong>{rec.billionaire}:</strong>{" "}
//                       <span className="italic">{rec.context}</span>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-muted-foreground">No comments found.</p>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </section>
//   );
// }
// //END OF MOST MOST RECENT

// src/components/Research/MovieList.tsx


// "use client";

// import { useEffect, useState } from "react";
// import { fetchMovieDetails } from "@/lib/api/tmdb";

// type Props = {
//   billionaire: string;
// };

// type MovieInput = {
//   title: string;
//   year: number;
//   context: string;
// };

// type MovieDetail = {
//   title: string;
//   year: number;
//   context: string;
//   tmdbData: any;
// };

// export default function MovieList({ billionaire }: Props) {
//   const [movies, setMovies] = useState<MovieDetail[]>([]);

//   useEffect(() => {
//     if (!billionaire) return;

//     async function loadMovies() {
//       try {
//         const res = await fetch(`/api/movies?billionaire=${encodeURIComponent(billionaire)}`);
//         const data = await res.json();

//         if (!Array.isArray(data.movies)) {
//           console.warn("Unexpected response format:", data);
//           return;
//         }

//         const enriched = await Promise.all(
//           data.movies.map(async (movie: MovieInput) => {
//             const tmdbData = await fetchMovieDetails(movie.title, movie.year.toString());
//             return {
//               ...movie,
//               tmdbData,
//             };
//           })
//         );

//         setMovies(enriched);
//       } catch (error) {
//         console.error("Failed to load movies:", error);
//       }
//     }

//     loadMovies();
//   }, [billionaire]);

//   return (
//     <section className="p-4">
//       <h2 className="text-xl font-bold mb-4">
//         Movies Recommended by {billionaire}
//       </h2>
//       <ul className="space-y-4">
//         {movies.map((movie, idx) => (
//           <li key={idx} className="border p-4 rounded">
//             <h3 className="text-lg font-semibold">
//               {movie.title} ({movie.year})
//             </h3>
//             <p className="text-sm italic mb-2">{movie.context}</p>
//             {movie.tmdbData ? (
//               <>
//                 <p><strong>Overview:</strong> {movie.tmdbData.overview}</p>
//                 {movie.tmdbData.poster_path && (
//                   <img
//                     src={`https://image.tmdb.org/t/p/w200${movie.tmdbData.poster_path}`}
//                     alt={movie.tmdbData.title}
//                     className="mt-2 rounded"
//                   />
//                 )}
//               </>
//             ) : (
//               <p className="text-red-500">No TMDB data found.</p>
//             )}
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { fetchMovieDetails } from "@/lib/api/tmdb";

// type Props = {
//   billionaire: string;
// };

// type MovieInput = {
//   title: string;
//   year: number;
//   context: string;
// };

// type MovieDetail = {
//   title: string;
//   year: number;
//   context: string;
//   tmdbData: any;
// };

// export default function MovieList({ billionaire }: Props) {
//   const [movies, setMovies] = useState<MovieDetail[]>([]);

//   useEffect(() => {
//     if (!billionaire) return;

//     async function loadMovies() {
//       try {
//         const res = await fetch(`/api/movies?billionaire=${encodeURIComponent(billionaire)}`);
//         const data = await res.json();

//         if (!Array.isArray(data.movies)) return;

//         const enriched = await Promise.all(
//           data.movies.map(async (movie: MovieInput) => {
//             const tmdbData = await fetchMovieDetails(movie.title, movie.year.toString());
//             return { ...movie, tmdbData };
//           })
//         );

//         setMovies(enriched);
//       } catch (error) {
//         console.error("Failed to load movies:", error);
//       }
//     }

//     loadMovies();
//   }, [billionaire]);

//   return (
//     <section className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         🎬 Movies Recommended by <span className="text-blue-600">{billionaire}</span>
//       </h2>

//       {movies.length === 0 ? (
//         <p className="text-center text-gray-500">No movies found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {movies.map((movie, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-xl"
//             >
//               {movie.tmdbData?.poster_path ? (
//                 <img
//                   src={`https://image.tmdb.org/t/p/w500${movie.tmdbData.poster_path}`}
//                   alt={movie.title}
//                   className="w-full h-72 object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-500">
//                   No Image
//                 </div>
//               )}
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold">
//                   {movie.title} ({movie.year})
//                 </h3>
//                 <p className="text-sm italic text-gray-600 mb-2">{movie.context}</p>
//                 {movie.tmdbData?.overview && (
//                   <p className="text-gray-700 text-sm">
//                     <strong>Overview:</strong> {movie.tmdbData.overview.slice(0, 200)}
//                     {movie.tmdbData.overview.length > 200 ? "..." : ""}
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { fetchMovieDetails } from "@/lib/api/tmdb";

type Props = {
  billionaire: string;
  onBack: () => void; // new: callback to go back
};

type MovieInput = {
  title: string;
  year: number;
  context: string;
};

type MovieDetail = {
  title: string;
  year: number;
  context: string;
  tmdbData: any;
};

type BillionaireInfo = {
  personName: string;
  squareImage: string;
  finalWorth: number;
  countryOfCitizenship: string;
  industries: string[];
  bio?: string; // Optional future extension
};

export default function MovieList({ billionaire, onBack }: Props) {
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const [info, setInfo] = useState<BillionaireInfo | null>(null);

  useEffect(() => {
    if (!billionaire) return;

    async function load() {
      try {
        // 1. Fetch movies
        const res = await fetch(`/api/movies?billionaire=${encodeURIComponent(billionaire)}`);
        const data = await res.json();

        if (Array.isArray(data.movies)) {
          const detailed = await Promise.all(
            data.movies.map(async (m: MovieInput) => ({
              ...m,
              tmdbData: await fetchMovieDetails(m.title, m.year.toString())
            }))
          );
          setMovies(detailed);
        }

        // 2. Fetch billionaire info from Forbes API
        const bioRes = await fetch("https://forbes400.onrender.com/api/forbes400?limit=400");
        const bioData: BillionaireInfo[] = await bioRes.json();
        const match = bioData.find(b => b.personName === billionaire);
        setInfo(match || null);
      } catch (err) {
        console.error("❌ Error loading data:", err);
      }
    }

    load();
  }, [billionaire]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 text-sm text-blue-600 hover:underline flex items-center gap-1"
      >
        ← Back to Billionaires
      </button>

      {/* Billionaire Profile */}
      {info && (
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-xl shadow-lg p-6 mb-8 border">
          <img
            src={info.squareImage || "/default-avatar.png"}
            alt={info.personName}
            className="w-28 h-28 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-2xl font-bold">{info.personName}</h2>
            <p className="text-gray-600">
              💰 ${(info.finalWorth / 1000).toFixed(1)}B – {info.countryOfCitizenship}
            </p>
            <p className="text-sm text-gray-500">
              Industry: {info.industries.join(", ")}
            </p>
          </div>
        </div>
      )}

      {/* Movie Grid */}
      <h3 className="text-xl font-semibold mb-4">🎬 Recommended Movies</h3>

      {movies.length === 0 ? (
        <p className="text-gray-500 text-center">No movies found for this billionaire.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md border hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
            >
              {movie.tmdbData?.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.tmdbData.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
              ) : (
                <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h4 className="text-lg font-bold">{movie.title} ({movie.year})</h4>
                <p className="text-sm italic text-gray-500 mb-2">{movie.context}</p>
                <p className="text-sm text-gray-700">
                  {movie.tmdbData?.overview?.slice(0, 180) || "No description."}
                  {movie.tmdbData?.overview?.length > 180 ? "..." : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}






