// import { prisma } from "@/lib/api/prisma";
// import bcrypt from "bcrypt";

// export async function registerUser(name: string, email: string, password: string) {
//   const existing = await prisma.user.findUnique({ where: { email } });
//   if (existing) throw new Error("User already exists");

//   const hashed = await bcrypt.hash(password, 10);
//   return prisma.user.create({
//     data: {
//       name,
//       email,
//       password: hashed,
//     },
//   });
// }

// export async function authenticateUser(email: string, password: string) {
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) return null;

//   const isMatch = await bcrypt.compare(password, user.password);
//   return isMatch ? user : null;
// }


// // src/lib/auth.ts
// import { prisma } from "@/lib/api/prisma";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// // Use a strong secret for production (from .env)
// const SECRET = process.env.JWT_SECRET || "supersecretkey";

// // Hash a plain password
// export async function hashPassword(password: string): Promise<string> {
//   const saltRounds = 10;
//   return bcrypt.hash(password, saltRounds);
// }

// // Compare a plain password with a hash
// export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
//   return bcrypt.compare(password, hashed);
// }

// // Register a user
// export async function registerUser(name: string, email: string, password: string) {
//   const hashedPassword = await hashPassword(password);

//   const user = await prisma.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//     },
//   });

//   return user;
// }

// // Authenticate user and return user if valid
// export async function authenticateUser(email: string, password: string) {
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) return null;

//   const isValid = await verifyPassword(password, user.password);
//   return isValid ? user : null;
// }

// // Generate a JWT token
// export function generateToken(payload: object): string {
//   return jwt.sign(payload, SECRET, { expiresIn: "7d" });
// }

// // Verify and decode JWT token
// export function verifyToken(token: string): any | null {
//   try {
//     return jwt.verify(token, SECRET);
//   } catch {
//     return null;
//   }
// }


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/api/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "YB8h6q3gE+WnqFznZsbClP9kxZ4LtJcNl3m2qN2Fw5s=";

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// Compare password
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

// Generate JWT token
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

// // Verify token
// export function verifyToken(token: string): { userId: string } | null {
//   try {
//     return jwt.verify(token, JWT_SECRET) as { userId: string };
//   } catch {
//     return null;
//   }
// }

export function verifyToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return decoded.id;
  } catch {
    return null;
  }
}