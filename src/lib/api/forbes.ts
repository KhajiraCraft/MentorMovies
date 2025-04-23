export async function fetchBillionaires(limit = 10) {
    const res = await fetch(`https://forbes400.onrender.com/api/forbes400?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch billionaires");
    return res.json();
  }
  