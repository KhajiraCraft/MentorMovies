// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/api/prisma";
// import { verifyToken } from "@/lib/auth";

// export async function GET(req: NextRequest) {
//   const token = req.headers.get("authorization")?.split(" ")[1];
//   const decoded = verifyToken(token || "");
//   if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const watchlist = await prisma.watchlistItem.findMany({
//     where: { userId: (decoded as any).userId },
//     orderBy: { createdAt: "desc" },
//   });

//   return NextResponse.json({ watchlist });
// }

// export async function POST(req: NextRequest) {
//   const token = req.headers.get("authorization")?.split(" ")[1];
//   const decoded = verifyToken(token || "");
//   if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { title, year, context } = await req.json();

//   const newItem = await prisma.watchlistItem.create({
//     data: {
//       userId: (decoded as any).userId,
//       title,
//       year,
//       context,
//     },
//   });

//   return NextResponse.json({ item: newItem });
// }


// import { NextRequest, NextResponse } from "next/server";
// import { verifyToken } from "@/lib/auth";
// import { prisma } from "@/lib/api/prisma";

// export async function POST(req: NextRequest) {
//   const token = req.headers.get("authorization")?.replace("Bearer ", "");
//   const body = await req.json();

//   if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const decoded = verifyToken(token);
//   if (!decoded) return NextResponse.json({ error: "Invalid token" }, { status: 403 });

//   const { title, year, context } = body;

//   await prisma.watchlistItem.create({
//     data: {
//       userId: decoded.userId,
//       title,
//       year,
//       context,
//       name: "", // optional
//     },
//   });

//   return NextResponse.json({ success: true });
// }


// src/app/api/watchlist/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { verifyToken } from "@/lib/auth";

// Handle GET: Return all watchlist items for a user
export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = verifyToken(token);
  if (!userId) return NextResponse.json({ error: "Invalid token" }, { status: 403 });

  const watchlist = await prisma.watchlistItem.findMany({
    where: {
      userId: userId, // ✅ FIXED: ensure userId is passed as a string, not an object
    },
  });

  return NextResponse.json({ watchlist });
}

