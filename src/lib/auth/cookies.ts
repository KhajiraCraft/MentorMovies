// // src/lib/auth/cookies.ts
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET || "supersecretkey";

// /**
//  * Set the JWT token as a cookie
//  */
// export function setAuthCookie(token: string) {
//   const cookieStore = cookies(); // ❗ No await
//   cookieStore.set("auth_token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 7, // 7 days
//   });
// }

// /**
//  * Retrieve auth token from cookie
//  */
// export function getAuthToken(): string | null {
//   const cookieStore = cookies(); // ❗ No await
//   return cookieStore.get("auth_token")?.value || null;
// }

// /**
//  * Delete auth token cookie
//  */
// export function removeAuthCookie() {
//   const cookieStore = cookies(); // ❗ No await
//   cookieStore.delete("auth_token");
// }

// /**
//  * Verify JWT token
//  */
// export function verifyAuthToken(token: string) {
//   try {
//     return jwt.verify(token, SECRET);
//   } catch {
//     return null;
//   }
// }
