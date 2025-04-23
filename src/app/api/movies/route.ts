// import { NextRequest, NextResponse } from "next/server";
// import { useTaskStore } from "@/store/task";

// export async function GET() {
//   const { finalReport, sources } = useTaskStore.getState();

//   if (!finalReport || finalReport.length === 0) {
//     return NextResponse.json(
//       { error: "No final report data found" },
//       { status: 404 }
//     );
//   }

//   // Simple title extractor from Final Report
//   const movieTitles = extractTitlesFromFinalReport(finalReport);

//   return NextResponse.json({ movies: movieTitles, sources });
// }

// // Helper: Extract movie titles from Markdown Final Report
// function extractTitlesFromFinalReport(text: string): string[] {
//   // Example assumes AI formats as: ## Movie Title or - Movie Title
//   const lines = text.split("\n");

//   return lines
//     .filter((line) => line.startsWith("##") || line.startsWith("-"))
//     .map((line) => line.replace(/^##|^-/, "").trim());
// }

// // START OF RECENT
// import { NextRequest, NextResponse } from "next/server";

// let cachedFinalReport: string | null = null;
// let cachedSources: { title?: string; url: string }[] = [];
// let cachedMovies: { title: string; context: string }[] = [];

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { finalReport, sources, movies } = body;

//     if (!finalReport || typeof finalReport !== "string") {
//       return NextResponse.json({ error: "Invalid final report" }, { status: 400 });
//     }

//     cachedFinalReport = finalReport;
//     cachedSources = sources || [];
//     cachedMovies = movies || [];

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to save report" }, { status: 500 });
//   }
// }

// export async function GET() {
//   if (!cachedFinalReport) {
//     return NextResponse.json({ error: "No report found" }, { status: 404 });
//   }

//   return NextResponse.json({ movies: cachedMovies, sources: cachedSources });
// }
// // END OF RECENT

// //START OF MODT RECENT
// import { NextRequest, NextResponse } from "next/server";

// let cachedFinalReport: string | null = null;
// let cachedSources: { title?: string; url: string }[] = [];
// let cachedMovies: { title: string; context: string; year?: number }[] = [];

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { finalReport, sources, movies } = body;

//     console.log("📨 [POST] /api/movies received body:");
//     console.log(JSON.stringify({ finalReport: finalReport?.slice(0, 100), sources, movies }, null, 2));

//     if (!Array.isArray(movies) || !movies.length) {
//       console.warn("⚠️ [POST] movies array is missing or empty.");
//       return NextResponse.json({ error: "Invalid or empty movie list" }, { status: 400 });
//     }

//     cachedFinalReport = finalReport || null;
//     cachedSources = Array.isArray(sources) ? sources : [];
//     cachedMovies = movies;

//     console.log(`✅ [POST] Cached ${cachedMovies.length} movies.`);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("❌ [POST] Failed to handle movie data:", error);
//     return NextResponse.json({ error: "Failed to save report" }, { status: 500 });
//   }
// }

// export async function GET() {
//   console.log("📥 [GET] /api/movies called.");

//   if (!cachedMovies.length) {
//     console.warn("⚠️ [GET] No cached movies yet.");
//     return NextResponse.json({ movies: [], sources: [], message: "No movies cached" });
//   }

//   console.log("🎬 [GET] Returning", cachedMovies.length, "movies.");
//   return NextResponse.json({ movies: cachedMovies, sources: cachedSources });
// }

// //MOST RECENT END

////MOST MOST RECENT START
// src/app/api/movies/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/api/prisma";

// // POST: Save new movies and recommendations
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { finalReport, sources = [], movies = [] } = body;

//     console.log("📨 [POST] /api/movies received:", {
//       finalReportSnippet: finalReport?.slice(0, 200),
//       sourceCount: sources.length,
//       movieCount: movies.length,
//     });

//     if (!Array.isArray(movies) || movies.length === 0) {
//       console.warn("⚠️ No movies provided in request.");
//       return NextResponse.json({ error: "Movie list is empty" }, { status: 400 });
//     }

//     for (const movie of movies) {
//       const { title, year, context } = movie;
//       console.log("🎞️ Processing movie:", { title, year, context });

//       const existingMovie = await prisma.movie.findFirst({
//         where: {
//           title,
//           year: year || undefined,
//         },
//       });

//       const dbMovie = existingMovie
//         ? (console.log("✅ Movie already exists in DB:", title), existingMovie)
//         : await prisma.movie.create({
//             data: { title, year: year || undefined, context: context || "" },
//           });

//       const billionaireName = extractBillionaireNameFromContext(context || "") || "Unknown";
//       console.log("🧠 Parsed billionaire name:", billionaireName);

//       const billionaire = await prisma.billionaire.upsert({
//         where: { name: billionaireName },
//         update: {},
//         create: { name: billionaireName, rank: 0 },
//       });

//       const existingRecommendation = await prisma.recommendation.findFirst({
//         where: {
//           movieId: dbMovie.id,
//           billionaireId: billionaire.id,
//         },
//       });

//       if (!existingRecommendation) {
//         await prisma.recommendation.create({
//           data: {
//             context: context || "",
//             movieId: dbMovie.id,
//             billionaireId: billionaire.id,
//           },
//         });
//         console.log("➕ Added recommendation for:", title, "by", billionaireName);
//       } else {
//         console.log("ℹ️ Recommendation already exists for:", title, "by", billionaireName);
//       }
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("❌ Error in POST /api/movies:", error);
//     return NextResponse.json({ error: "Failed to save movies" }, { status: 500 });
//   }
// }

// // GET: Return all stored movies with billionaire recommendations
// export async function GET() {
//   try {
//     console.log("📥 [GET] /api/movies called");

//     const movies = await prisma.movie.findMany({
//       include: {
//         recommendations: {
//           include: {
//             billionaire: true,
//           },
//         },
//       },
//     });

//     console.log("🎬 Retrieved raw movies:", movies.length);

//     const formatted = movies.map((movie: { 
//       title: string;
//       year: number | null;
//       context: string;
//       recommendations: {
//         context: string;
//         billionaire: {
//           name: string;
//         };
//       }[];
//     }) => ({
//       title: movie.title,
//       year: movie.year,
//       context: movie.context,
//       recommendations: movie.recommendations.map((rec) => ({
//         context: rec.context,
//         billionaire: rec.billionaire.name,
//       })),
//     }));

//     console.log("✅ [GET] Returning", formatted.length, "movies with recommendations");
//     return NextResponse.json({ movies: formatted });
//   } catch (error) {
//     console.error("❌ Error in GET /api/movies:", error);
//     return NextResponse.json({ error: "Failed to retrieve movies" }, { status: 500 });
//   }
// }

// function extractBillionaireNameFromContext(context: string): string | null {
//   const match = context.match(/by ([A-Z][a-z]+(?: [A-Z][a-z]+)+)/);
//   return match ? match[1] : null;
// }
// //MOST MOST RECENT END


// //MOST MOST MOST RECENT START
// // src/app/api/movies/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/api/prisma";

// // POST: Save new movies and recommendations
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { finalReport, sources = [], movies = [], billionaireName } = body;

//     console.log("📨 [POST] /api/movies received:", {
//       finalReportSnippet: finalReport?.slice(0, 200),
//       sourceCount: sources.length,
//       movieCount: movies.length,
//       billionaireName,
//     });

//     if (!Array.isArray(movies) || movies.length === 0) {
//       console.warn("⚠️ No movies provided in request.");
//       return NextResponse.json({ error: "Movie list is empty" }, { status: 400 });
//     }

//     if (!billionaireName) {
//       console.warn("⚠️ No billionaire name provided in request.");
//       return NextResponse.json({ error: "Missing billionaire name" }, { status: 400 });
//     }

//     const billionaire = await prisma.billionaire.upsert({
//       where: { name: billionaireName },
//       update: {},
//       create: { name: billionaireName, rank: 0 },
//     });

//     for (const movie of movies) {
//       const { title, year, context } = movie;
//       console.log("🎞️ Processing movie:", { title, year, context });

//       const existingMovie = await prisma.movie.findFirst({
//         where: {
//           title,
//           year: year || undefined,
//         },
//       });

//       const dbMovie = existingMovie
//         ? (console.log("✅ Movie already exists in DB:", title), existingMovie)
//         : await prisma.movie.create({
//             data: { title, year: year || undefined, context: context || "" },
//           });

//       const existingRecommendation = await prisma.recommendation.findFirst({
//         where: {
//           movieId: dbMovie.id,
//           billionaireId: billionaire.id,
//         },
//       });

//       if (!existingRecommendation) {
//         await prisma.recommendation.create({
//           data: {
//             context: context || "",
//             movieId: dbMovie.id,
//             billionaireId: billionaire.id,
//           },
//         });
//         console.log("➕ Added recommendation for:", title, "by", billionaireName);
//       } else {
//         console.log("ℹ️ Recommendation already exists for:", title, "by", billionaireName);
//       }
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("❌ Error in POST /api/movies:", error);
//     return NextResponse.json({ error: "Failed to save movies" }, { status: 500 });
//   }
// }

// // GET: Return all stored movies with billionaire recommendations
// export async function GET() {
//   try {
//     console.log("📥 [GET] /api/movies called");

//     const movies = await prisma.movie.findMany({
//       include: {
//         recommendations: {
//           include: {
//             billionaire: true,
//           },
//         },
//       },
//     });

//     console.log("🎬 Retrieved raw movies:", movies.length);

//     const formatted = movies.map((movie) => ({
//       title: movie.title,
//       year: movie.year,
//       context: movie.context,
//       recommendations: movie.recommendations.map((rec) => ({
//         context: rec.context,
//         billionaire: rec.billionaire.name,
//       })),
//     }));

//     console.log("✅ [GET] Returning", formatted.length, "movies with recommendations");
//     return NextResponse.json({ movies: formatted });
//   } catch (error) {
//     console.error("❌ Error in GET /api/movies:", error);
//     return NextResponse.json({ error: "Failed to retrieve movies" }, { status: 500 });
//   }
// }

// //MOST MOST MOST RECENT END

// src/app/api/movies/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/api/prisma";

// POST: Save new movies and recommendations
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { finalReport, sources = [], movies = [], billionaireName } = body;

    console.log("📨 [POST] /api/movies received:", {
      finalReportSnippet: finalReport?.slice(0, 200),
      sourceCount: sources.length,
      movieCount: movies.length,
      billionaireName,
    });

    if (!Array.isArray(movies) || movies.length === 0) {
      console.warn("⚠️ No movies provided in request.");
      return NextResponse.json({ error: "Movie list is empty" }, { status: 400 });
    }

    if (!billionaireName) {
      console.warn("⚠️ No billionaire name provided in request.");
      return NextResponse.json({ error: "Missing billionaire name" }, { status: 400 });
    }

    const billionaire = await prisma.billionaire.upsert({
      where: { name: billionaireName },
      update: {},
      create: { name: billionaireName, rank: 0 },
    });

    for (const movie of movies) {
      const { title, year, context } = movie;
      console.log("🎞️ Processing movie:", { title, year, context });

      const existingMovie = await prisma.movie.findFirst({
        where: {
          title,
          year: year || undefined,
        },
      });

      const dbMovie = existingMovie
        ? (console.log("✅ Movie already exists in DB:", title), existingMovie)
        : await prisma.movie.create({
            data: { title, year: year || undefined, context: context || "" },
          });

      const existingRecommendation = await prisma.recommendation.findFirst({
        where: {
          movieId: dbMovie.id,
          billionaireId: billionaire.id,
        },
      });

      if (!existingRecommendation) {
        await prisma.recommendation.create({
          data: {
            context: context || "",
            movieId: dbMovie.id,
            billionaireId: billionaire.id,
          },
        });
        console.log("➕ Added recommendation for:", title, "by", billionaireName);
      } else {
        console.log("ℹ️ Recommendation already exists for:", title, "by", billionaireName);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error in POST /api/movies:", error);
    return NextResponse.json({ error: "Failed to save movies" }, { status: 500 });
  }
}

// GET: Return movies for a specific billionaire only
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const billionaireName = url.searchParams.get("billionaire");

    console.log("📥 [GET] /api/movies called for:", billionaireName || "ALL");

    if (!billionaireName) {
      return NextResponse.json({ error: "Missing billionaire name in query" }, { status: 400 });
    }

    const billionaire = await prisma.billionaire.findUnique({
      where: { name: billionaireName },
      include: {
        recommendations: {
          include: {
            movie: true,
          },
        },
      },
    });

    if (!billionaire) {
      console.warn("❗ No billionaire found:", billionaireName);
      return NextResponse.json({ movies: [], message: "No such billionaire" });
    }

    const movies = billionaire.recommendations.map((rec) => ({
      title: rec.movie.title,
      year: rec.movie.year,
      context: rec.context,
    }));

    console.log(`✅ Found ${movies.length} movies for ${billionaireName}`);
    return NextResponse.json({ movies });
  } catch (error) {
    console.error("❌ Error in GET /api/movies:", error);
    return NextResponse.json({ error: "Failed to retrieve movies" }, { status: 500 });
  }
}


// HEAD: Check if billionaire already has movies
export async function HEAD(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const billionaireName = url.searchParams.get("billionaire");

    if (!billionaireName) {
      return new NextResponse(null, { status: 400 });
    }

    const recommendations = await prisma.recommendation.findFirst({
      where: {
        billionaire: { name: billionaireName },
      },
    });

    return new NextResponse(null, {
      status: recommendations ? 200 : 404,
    });
  } catch (error) {
    console.error("❌ Error in HEAD /api/movies:", error);
    return new NextResponse(null, { status: 500 });
  }
}
