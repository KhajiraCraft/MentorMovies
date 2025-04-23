"use client";
import { useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Sending...");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setMessage(data.success ? "✅ User created!" : `❌ ${data.error}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} placeholder="Name" required className="border p-2 w-full" />
        <input name="email" onChange={handleChange} placeholder="Email" required className="border p-2 w-full" />
        <input name="password" onChange={handleChange} placeholder="Password" type="password" required className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
