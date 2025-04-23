// import { NextRequest, NextResponse } from "next/server";
// import { registerUser } from "@/lib/auth";

// export async function POST(req: NextRequest) {
//   try {
//     const { name, email, password } = await req.json();
//     const user = await registerUser(name, email, password);
//     return NextResponse.json({ success: true, user: { name: user.name, email: user.email } });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 400 });
//   }
// }

// src/app/api/auth/signup/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { registerUser } from "@/lib/auth";

// export async function POST(req: NextRequest) {
//   try {
//     const { name, email, password } = await req.json();

//     if (!name || !email || !password) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     const user = await registerUser(name, email, password);
//     return NextResponse.json({
//       success: true,
//       user: { name: user.name, email: user.email },
//     });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 400 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already used" }, { status: 409 });
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  return NextResponse.json({ success: true, user: { id: user.id, email: user.email } });
}
