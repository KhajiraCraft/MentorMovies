// src/app/api/billionaires/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/api/prisma";

export async function GET() {
  const billionaires = await prisma.billionaire.findMany({
    orderBy: { rank: "asc" },
    select: { name: true, rank: true },
  });

  return NextResponse.json(billionaires);
}
