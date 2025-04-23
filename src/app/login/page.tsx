// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage("Logging in...");

//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();

//     if (data.success) {
//       setMessage("✅ Login successful! Redirecting...");
//       router.push("/dashboard");
//     } else {
//       setMessage(`❌ ${data.error}`);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="border rounded px-4 py-2 w-full"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="border rounded px-4 py-2 w-full"
//           required
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Sign In
//         </button>
//       </form>
//       {message && <p className="mt-4 text-sm">{message}</p>}
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       localStorage.setItem("auth_token", data.token);
//       router.push("/");
//     } else {
//       setError(data.error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
//       <h2 className="text-xl font-bold mb-4">Log In</h2>
//       <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full mb-2" />
//       <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="border p-2 w-full mb-2" />
//       <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Log In</button>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </form>
//   );
// }


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       localStorage.setItem("auth_token", data.token);
//       toast.success("✅ Logged in successfully!");
//       router.push("/");
//     } else {
//       toast.error(`🚫 ${data.error}`);
//       setError(data.error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex items-center justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-2xl font-extrabold text-white text-center mb-6">Login</h2>
//         <input
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           placeholder="Email"
//           className="input-field"
//         />
//         <input
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           placeholder="Password"
//           type="password"
//           className="input-field"
//         />
//         <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full transition">
//           Log In
//         </button>
//         {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
//       </form>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("auth_token", data.token);
      toast.success("Welcome back!");
      router.push("/");
    } else {
      toast.error(data.error || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 space-y-4"
      >
        <h2 className="text-2xl font-extrabold text-center text-gray-800">
          Log in to MentorFlix
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white text-gray-800 placeholder-gray-500 rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"

        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white text-gray-800 placeholder-gray-500 rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"

        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Log In
        </button>
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
