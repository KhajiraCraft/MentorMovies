// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage("Creating account...");

//     const res = await fetch("/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();

//     if (data.success) {
//       setMessage("✅ Account created! Redirecting...");
//       router.push("/login");
//     } else {
//       setMessage(`❌ ${data.error}`);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           onChange={handleChange}
//           className="border rounded px-4 py-2 w-full"
//           required
//         />
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
//           Sign Up
//         </button>
//       </form>
//       {message && <p className="mt-4 text-sm">{message}</p>}
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       router.push("/login");
//     } else {
//       setError(data.error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
//       <h2 className="text-xl font-bold mb-4">Sign Up</h2>
//       <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="border p-2 w-full mb-2" />
//       <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="border p-2 w-full mb-2" />
//       <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" type="password" className="border p-2 w-full mb-2" />
//       <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Sign Up</button>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </form>
//   );
// }



// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// export default function SignupPage() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       toast.success("🎉 Account created! Redirecting to login...");
//       router.push("/login");
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
//         <h2 className="text-2xl font-extrabold text-white text-center mb-6">Sign Up</h2>
//         <input
//           value={form.name}
//           onChange={e => setForm({ ...form, name: e.target.value })}
//           placeholder="Full Name"
//           className="input-field"
//         />
//         <input
//           value={form.email}
//           onChange={e => setForm({ ...form, email: e.target.value })}
//           placeholder="Email"
//           className="input-field"
//         />
//         <input
//           value={form.password}
//           onChange={e => setForm({ ...form, password: e.target.value })}
//           placeholder="Password"
//           type="password"
//           className="input-field"
//         />
//         <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full transition">
//           Sign Up
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

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Account created! Please log in.");
      router.push("/login");
    } else {
      toast.error(data.error || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 space-y-4"
      >
        <h2 className="text-2xl font-extrabold text-center text-gray-800">
          Create your MentorFlix Account
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-white text-gray-800 placeholder-gray-500 rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"

        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-white text-gray-800 placeholder-gray-500 rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"

        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full bg-white text-gray-800 placeholder-gray-500 rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"

        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Sign Up
        </button>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}

