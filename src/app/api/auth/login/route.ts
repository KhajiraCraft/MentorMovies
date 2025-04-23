// import { NextRequest, NextResponse } from "next/server";
// import { authenticateUser } from "@/lib/auth";

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();
//     const user = await authenticateUser(email, password);
//     if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

//     return NextResponse.json({ success: true, user: { name: user.name, email: user.email } });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 400 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { registerUser } from "@/lib/auth";
// import { prisma } from "@/lib/api/prisma";


// export async function POST(req: NextRequest) {
//   try {
//     const { name, email, password } = await req.json();

//     if (!name || !email || !password) {
//       return NextResponse.json({ error: "All fields are required." }, { status: 400 });
//     }

   
//     const user = await prisma.user.findUnique({
//       where: { email },
//       select: {
//         id: true,
//         email: true,
//         password: true,
//         name: true, // ✅ add this line
//         createdAt: true,
//       },
//     });
    
//     return NextResponse.json({
//       success: true,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (err: any) {
//     console.error("Signup error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// src/app/api/auth/login/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/api/prisma";
// import { compare } from "bcrypt";
// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET || "supersecretkey";

// export async function POST(req: NextRequest) {
//   const { email, password } = await req.json();

//   const user = await prisma.user.findUnique({
//     where: { email },
//     select: {
//       id: true,
//       email: true,
//       password: true,
//       name: true,      // ✅ ensure this is included
//     },
//   });

//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   const valid = await compare(password, user.password);
//   if (!valid) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "7d" });

//   return NextResponse.json({
//     token,
//     user: {
//       id: user.id,
//       email: user.email,
//       name: user.name,
//     },
//   });
// }


import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/api/prisma";
import { comparePassword, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await comparePassword(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = generateToken(user.id);
  return NextResponse.json({
    success: true,
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
}
