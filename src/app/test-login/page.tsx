// src/app/test-login/page.tsx
"use client";

import { useState } from "react";

export default function TestLogin() {
  const [response, setResponse] = useState("");

  const testLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "example@email.com",
        password: "your_password",
      }),
    });

    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  };

  return (
    <div className="p-4">
      <button onClick={testLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
        Test Login
      </button>
      <pre className="mt-4 bg-gray-100 p-2">{response}</pre>
    </div>
  );
}
