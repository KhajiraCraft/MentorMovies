// // src/components/Research/SelectBillionaire.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

// type Props = {
//   onSelect: (name: string) => void;
// };

// type Billionaire = {
//   personName: string;
//   rank: number;
// };

// export default function SelectBillionaire({ onSelect }: Props) {
//   const [billionaires, setBillionaires] = useState<Billionaire[]>([]);

//   useEffect(() => {
//     fetch("https://forbes400.onrender.com/api/forbes400?limit=10")
//       .then((res) => res.json())
//       .then(setBillionaires)
//       .catch(() => toast.error("Failed to load billionaires"));
//   }, []);

//   return (
//     <section className="p-4 border rounded-md mt-4">
//       <h3 className="font-semibold text-lg mb-2">
//         Select a Billionaire to Research
//       </h3>

//       {billionaires.length === 0 ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//           {billionaires.map((b) => (
//             <Button
//               key={b.personName}
//               onClick={() => onSelect(b.personName)}
//               className="p-4 text-sm"
//             >
//               {b.personName}
//             </Button>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// src/components/Research/SelectBillionaire.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// interface Props {
//   onSelect: (name: string) => void;
// }

// interface Billionaire {
//   personName: string;
//   rank: number;
//   squareImage: string;
// }

// export default function SelectBillionaire({ onSelect }: Props) {
//   const [billionaires, setBillionaires] = useState<Billionaire[]>([]);

//   useEffect(() => {
//     fetch("https://forbes400.onrender.com/api/forbes400?limit=10")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("🌍 Forbes API Data:", data);
//         setBillionaires(data);
//       })
//       .catch((err) => {
//         console.error("❌ Failed to fetch billionaires:", err);
//         toast.error("Failed to load billionaires");
//       });
//   }, []);

//   return (
//     <section className="p-4 border rounded-md mt-4">
//       <h3 className="font-semibold text-lg mb-4">
//         Select a Billionaire to Research
//       </h3>

//       {billionaires.length === 0 ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//           {billionaires.map((b) => (
//             <div
//               key={b.personName}
//               className="cursor-pointer hover:shadow-lg border rounded p-2 text-center"
//               onClick={() => onSelect(b.personName)}
//             >
//               <img
//                 src={b.squareImage || "/default-avatar.png"}
//                 alt={b.personName}
//                 className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
//               />
//               <p className="text-sm font-medium">{b.personName}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }



// // src/components/Research/SelectBillionaire.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// interface Props {
//   onSelect: (name: string) => void;
// }

// interface Billionaire {
//   personName: string;
//   rank: number;
//   squareImage: string;
//   finalWorth: number;
//   countryOfCitizenship: string;
//   industries: string[];
//   source: string;
// }

// export default function SelectBillionaire({ onSelect }: Props) {
//   const [billionaires, setBillionaires] = useState<Billionaire[]>([]);

//   useEffect(() => {
//     fetch("https://forbes400.onrender.com/api/forbes400?limit=10")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("🌍 Forbes API Data:", data);
//         setBillionaires(data);
//       })
//       .catch((err) => {
//         console.error("❌ Failed to fetch billionaires:", err);
//         toast.error("Failed to load billionaires");
//       });
//   }, []);

//   return (
//     <section className="p-4 border rounded-md mt-4">
//       <h3 className="font-semibold text-lg mb-4">
//         Select a Billionaire to Research
//       </h3>

//       {billionaires.length === 0 ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//           {billionaires.map((b) => (
//             <div
//               key={b.personName}
//               className="cursor-pointer hover:shadow-lg border rounded p-3 text-center"
//               onClick={() => onSelect(b.personName)}
//             >
//               <img
//                 src={b.squareImage || "/default-avatar.png"}
//                 alt={b.personName}
//                 className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
//               />
//               <p className="text-sm font-semibold">{b.personName}</p>
//               <p className="text-xs text-gray-500">Rank: #{b.rank}</p>
//               <p className="text-xs text-gray-600">💰 ${(
//                 b.finalWorth / 1000
//               ).toFixed(1)}B</p>
//               <p className="text-xs text-gray-500 italic">{b.countryOfCitizenship}</p>
//               <p className="text-xs text-gray-600 truncate">
//                 {b.industries?.join(", ")}
//               </p>
//               <p className="text-[10px] text-gray-400 mt-1">Source: {b.source}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// interface Props {
//   onSelect: (name: string) => void;
// }

// interface Billionaire {
//   personName: string;
//   rank: number;
//   squareImage: string;
//   finalWorth: number;
//   countryOfCitizenship: string;
//   industries: string[];
//   source: string;
// }

// export default function SelectBillionaire({ onSelect }: Props) {
//   const [billionaires, setBillionaires] = useState<Billionaire[]>([]);

//   useEffect(() => {
//     fetch("https://forbes400.onrender.com/api/forbes400?limit=12")
//       .then((res) => res.json())
//       .then((data) => setBillionaires(data))
//       .catch((err) => {
//         console.error("❌ Failed to fetch billionaires:", err);
//         toast.error("Failed to load billionaires");
//       });
//   }, []);

//   return (
//     <section className="py-8 px-4 max-w-7xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-8">
//         🌟 Choose a Billionaire to Explore
//       </h2>

//       {billionaires.length === 0 ? (
//         <p className="text-center text-gray-500">Loading billionaires...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//           {billionaires.map((b) => (
//             <div
//               key={b.personName}
//               className="bg-white hover:bg-gray-50 hover:shadow-xl rounded-xl overflow-hidden border border-gray-200 transition cursor-pointer"
//               onClick={() => onSelect(b.personName)}
//             >
//               <div className="relative">
//                 <img
//                   src={b.squareImage || "/default-avatar.png"}
//                   alt={b.personName}
//                   className="w-full h-48 object-cover"
//                 />
//                 <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded shadow-sm">
//                   #{b.rank}
//                 </span>
//               </div>
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold mb-1">{b.personName}</h3>
//                 <p className="text-sm text-gray-600 mb-2 italic">{b.countryOfCitizenship}</p>
//                 <p className="text-sm text-gray-700 mb-1">
//                   💰 <span className="font-bold">${(b.finalWorth / 1000).toFixed(1)}B</span>
//                 </p>
//                 <p className="text-xs text-gray-500 truncate">
//                   {b.industries.join(", ")}
//                 </p>
//                 <p className="text-[11px] text-gray-400 mt-2">
//                   Source: {b.source}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// interface Props {
//   onSelect: (name: string) => void;
// }

// interface Billionaire {
//   personName: string;
//   rank: number;
//   squareImage: string;
//   finalWorth: number;
//   countryOfCitizenship: string;
//   industries: string[];
//   source: string;
// }

// export default function SelectBillionaire({ onSelect }: Props) {
//   const [billionaires, setBillionaires] = useState<Billionaire[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("All");

//   const countries = Array.from(
//     new Set(billionaires.map((b) => b.countryOfCitizenship))
//   ).sort();

//   useEffect(() => {
//     fetch("https://forbes400.onrender.com/api/forbes400?limit=100")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("🌍 Forbes API Data:", data);
//         setBillionaires(data);
//       })
//       .catch((err) => {
//         console.error("❌ Failed to fetch billionaires:", err);
//         toast.error("Failed to load billionaires");
//       });
//   }, []);

//   const filtered = billionaires.filter((b) => {
//     const matchesName = b.personName
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesCountry =
//       selectedCountry === "All" || b.countryOfCitizenship === selectedCountry;
//     return matchesName && matchesCountry;
//   });

//   return (
//     <section className="p-6 rounded-md border bg-white shadow-sm">
//       <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
//         🎬 Select a Billionaire to Research
//       </h3>

//       <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="🔍 Search by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full md:w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring"
//         />

//         <select
//           value={selectedCountry}
//           onChange={(e) => setSelectedCountry(e.target.value)}
//           className="w-full md:w-1/4 px-4 py-2 border rounded bg-white focus:outline-none focus:ring"
//         >
//           <option value="All">🌐 All Countries</option>
//           {countries.map((country) => (
//             <option key={country} value={country}>
//               🇺🇳 {country}
//             </option>
//           ))}
//         </select>
//       </div>

//       {filtered.length === 0 ? (
//         <p className="text-center text-gray-500">No billionaires found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {filtered.map((b) => (
//             <div
//               key={b.personName}
//               onClick={() => onSelect(b.personName)}
//               className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border rounded-lg p-4 text-center bg-gray-50 hover:bg-white"
//             >
//               <img
//                 src={b.squareImage || "/default-avatar.png"}
//                 alt={b.personName}
//                 className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
//               />
//               <h4 className="font-bold text-lg text-gray-700">
//                 {b.personName}
//               </h4>
//               <p className="text-sm text-gray-500">Rank #{b.rank}</p>
//               <p className="text-sm text-green-600 font-semibold">
//                 ${Math.round(b.finalWorth / 1000)}B
//               </p>
//               <p className="text-xs text-gray-400 italic">
//                 {b.countryOfCitizenship}
//               </p>
//               <p className="text-xs text-gray-500 truncate">
//                 {b.industries?.join(", ")}
//               </p>
//               <p className="text-[10px] text-gray-400 mt-1">
//                 Source: {b.source}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// interface Props {
//   onSelect: (name: string) => void;
// }

// interface Billionaire {
//   personName: string;
//   rank: number;
//   squareImage: string;
//   finalWorth: number;
//   countryOfCitizenship: string;
//   industries: string[];
//   source: string;
// }

// export default function SelectBillionaire({ onSelect }: Props) {
//   const [billionaires, setBillionaires] = useState<Billionaire[]>([]);
//   const [search, setSearch] = useState("");
//   const [country, setCountry] = useState("");

//   useEffect(() => {
//     fetch("https://forbes400.onrender.com/api/forbes400?limit=10")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("🌍 Forbes API Data:", data);
//         setBillionaires(data);
//       })
//       .catch((err) => {
//         console.error("❌ Failed to fetch billionaires:", err);
//         toast.error("Failed to load billionaires");
//       });
//   }, []);

//   const filtered = billionaires.filter((b) =>
//     b.personName.toLowerCase().includes(search.toLowerCase()) &&
//     (country === "" || b.countryOfCitizenship === country)
//   );

//   const uniqueCountries = [...new Set(billionaires.map((b) => b.countryOfCitizenship))];

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-8">
//       {/* Title */}
//       <h3 className="text-3xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
//         <span className="block text-gray-700">Explore the Minds of</span>
//         <span className="block text-blue-600">World’s Top Billionaires</span>
//       </h3>

//       {/* Filters */}
//       {/* <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-md p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
//         <input
//           type="text"
//           placeholder="🔍 Search by name"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full md:w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//         />

//         <select
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//           className="w-full md:w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//         >
//           <option value="">🌍 All Countries</option>
//           {uniqueCountries.map((c) => (
//             <option key={c} value={c}>{c}</option>
//           ))}
//         </select>
//       </div> */}

//       {/* Filters */}
// <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-md p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
//   <input
//     type="text"
//     placeholder="Search billionaire..."
//     value={search}
//     onChange={(e) => setSearch(e.target.value)}
//     className="w-full md:w-1/2 rounded-full px-4 py-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//   />

//   <select
//     value={country}
//     onChange={(e) => setCountry(e.target.value)}
//     className="w-full md:w-1/2 rounded-full px-4 py-2 bg-white text-gray-700 shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//   >
//     <option value="">🌍 All Countries</option>
//     {uniqueCountries.map((c) => (
//       <option key={c} value={c}>{c}</option>
//     ))}
//   </select>
// </div>

//       {/* Grid of Billionaires */}
//       {filtered.length === 0 ? (
//         <p className="text-center text-gray-400 italic animate-pulse mt-6">
//           No billionaires found. Try another filter.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filtered.map((b) => (
//             <div
//               key={b.personName}
//               onClick={() => onSelect(b.personName)}
//               className="cursor-pointer bg-white border-t-4 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl p-5 text-center shadow-sm"
//             >
//               <img
//                 src={b.squareImage || "/default-avatar.png"}
//                 alt={b.personName}
//                 className="w-24 h-24 rounded-full mx-auto object-cover mb-3 shadow"
//               />
//               <h4 className="text-lg font-semibold text-gray-800">{b.personName}</h4>
//               <p className="text-xs text-gray-500 mb-1">Rank #{b.rank}</p>
//               <p className="text-sm text-green-700 font-semibold mb-1">
//                 💰 ${(b.finalWorth / 1000).toFixed(1)}B
//               </p>
//               <p className="text-xs text-gray-500">{b.countryOfCitizenship} 🌎</p>
//               <div className="flex justify-center flex-wrap gap-1 mt-2">
//                 {b.industries.slice(0, 2).map((industry) => (
//                   <span
//                     key={industry}
//                     className="bg-blue-100 text-blue-800 text-[10px] font-medium px-2.5 py-0.5 rounded-full"
//                   >
//                     {industry}
//                   </span>
//                 ))}
//               </div>
//               <p className="text-[10px] text-gray-400 mt-2 italic">Source: {b.source}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  onSelect: (name: string) => void;
}

interface Billionaire {
  personName: string;
  rank: number;
  squareImage: string;
  finalWorth: number;
  countryOfCitizenship: string;
  industries: string[];
  source: string;
}

const ITEMS_PER_PAGE = 12;

export default function SelectBillionaire({ onSelect }: Props) {
  const [billionaires, setBillionaires] = useState<Billionaire[]>([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://forbes400.onrender.com/api/forbes400?limit=400")
      .then((res) => res.json())
      .then((data) => {
        console.log("🌍 Forbes API Data:", data);
        setBillionaires(data);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch billionaires:", err);
        toast.error("Failed to load billionaires");
      });
  }, []);

  const filtered = billionaires.filter(
    (b) =>
      b.personName.toLowerCase().includes(search.toLowerCase()) &&
      (country === "" || b.countryOfCitizenship === country)
  );

  const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const uniqueCountries = [...new Set(billionaires.map((b) => b.countryOfCitizenship))];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h3 className="text-3xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
        <span className="block text-gray-700">Explore the Minds of</span>
        <span className="block text-blue-600">World’s Top Billionaires</span>
      </h3>

      {/* Filters */}
      <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-md p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search billionaire..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 rounded-full px-4 py-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <select
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 rounded-full px-4 py-2 bg-white text-gray-700 shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">🌍 All Countries</option>
          {uniqueCountries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <p className="text-center text-gray-400 italic animate-pulse mt-6">
          Loading billionaires...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginated.map((b) => (
            <div
              key={b.personName}
              onClick={() => onSelect(b.personName)}
              className="cursor-pointer bg-white border-t-4 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl p-5 text-center shadow-sm"
            >
              <img
                src={b.squareImage || "/default-avatar.png"}
                alt={b.personName}
                className="w-24 h-24 rounded-full mx-auto object-cover mb-3 shadow"
              />
              <h4 className="text-lg font-semibold text-gray-800">{b.personName}</h4>
              <p className="text-xs text-gray-500 mb-1">Rank #{b.rank}</p>
              <p className="text-sm text-green-700 font-semibold mb-1">
                💰 ${(b.finalWorth / 1000).toFixed(1)}B
              </p>
              <p className="text-xs text-gray-500">{b.countryOfCitizenship} 🌎</p>
              <div className="flex justify-center flex-wrap gap-1 mt-2">
                {b.industries.slice(0, 2).map((industry) => (
                  <span
                    key={industry}
                    className="bg-blue-100 text-blue-800 text-[10px] font-medium px-2.5 py-0.5 rounded-full"
                  >
                    {industry}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-2 italic">Source: {b.source}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => {
              setCurrentPage((p) => Math.max(1, p - 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            
            className="px-4 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-300 disabled:opacity-40"
            disabled={currentPage === 1}
          >
            ← Prev
          </button>
          <span className="text-sm text-gray-700 pt-2">
            Page {currentPage} of {pageCount}
          </span>
          <button
            onClick={() => {
              setCurrentPage((p) => Math.min(pageCount, p + 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            
            className="px-4 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-300 disabled:opacity-40"
            disabled={currentPage === pageCount}
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
}
