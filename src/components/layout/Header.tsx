// // src/components/layout/Header.tsx
// "use client";

// import Link from "next/link";

// export default function Header() {
//   return (
//     <header className="sticky top-0 z-50 bg-black text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         <Link href="/" className="text-2xl font-bold tracking-tight">
//           MentorFlix
//         </Link>
//         <nav className="space-x-6 hidden md:flex">
//           <Link href="/dashboard" className="hover:text-blue-400 transition">
//             Dashboard
//           </Link>
//           <Link href="/login" className="hover:text-blue-400 transition">
//             Login
//           </Link>
//           <Link href="/signup" className="hover:text-blue-400 transition">
//             Sign Up
//           </Link>
//         </nav>
//       </div>
//     </header>
//   );
// }



// src/components/layout/Header.tsx
// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X } from "lucide-react"; // optional icon lib: install with `npm i lucide-react`

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-xl">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//         {/* Brand */}
//         <Link href="/" className="text-2xl font-extrabold tracking-tight hover:text-blue-400 transition">
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//             MentorFlix
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex space-x-8 text-sm font-medium">
//           <Link href="/dashboard" className="hover:text-blue-400 transition duration-200">
//             Dashboard
//           </Link>
//           <Link href="/login" className="hover:text-blue-400 transition duration-200">
//             Login
//           </Link>
//           <Link href="/signup" className="hover:text-blue-400 transition duration-200">
//             Sign Up
//           </Link>
//         </nav>

//         {/* Mobile Hamburger */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden p-2 rounded hover:bg-gray-800 transition"
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-black border-t border-gray-700 px-6 pb-4 space-y-3">
//           <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">
//             Dashboard
//           </Link>
//           <Link href="/login" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">
//             Login
//           </Link>
//           <Link href="/signup" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">
//             Sign Up
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// }


// // src/components/layout/Header.tsx
// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-xl">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//         {/* Brand - now links to dashboard */}
//         <Link
//           href="/"
//           className="text-2xl font-extrabold tracking-tight hover:text-blue-400 transition"
//         >
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//             MentorFlix
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex space-x-8 text-sm font-medium">
//           <Link
//             href="/"
//             className="hover:text-blue-400 transition duration-200"
//           >
//             Dashboard
//           </Link>
//           <Link
//             href="/login"
//             className="hover:text-blue-400 transition duration-200"
//           >
//             Login
//           </Link>
//           <Link
//             href="/signup"
//             className="hover:text-blue-400 transition duration-200"
//           >
//             Sign Up
//           </Link>
//         </nav>

//         {/* Mobile Hamburger */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden p-2 rounded hover:bg-gray-800 transition"
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-black border-t border-gray-700 px-6 pb-4 space-y-3">
//           <Link
//             href="/"
//             onClick={() => setIsOpen(false)}
//             className="block hover:text-blue-400"
//           >
//             Dashboard
//           </Link>
//           <Link
//             href="/login"
//             onClick={() => setIsOpen(false)}
//             className="block hover:text-blue-400"
//           >
//             Login
//           </Link>
//           <Link
//             href="/signup"
//             onClick={() => setIsOpen(false)}
//             className="block hover:text-blue-400"
//           >
//             Sign Up
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// }

// src/components/layout/Header.tsx
// "use client";

// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// interface Props {
//   onBackToDashboard?: () => void;
// }

// export default function Header({ onBackToDashboard }: Props) {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleClick = () => {
//     setIsOpen(false);
//     onBackToDashboard?.();
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-xl">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <button
//           onClick={handleClick}
//           className="text-2xl font-extrabold tracking-tight hover:text-blue-400 transition"
//         >
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//             MentorFlix
//           </span>
//         </button>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex space-x-8 text-sm font-medium">
//           <button
//             onClick={handleClick}
//             className="hover:text-blue-400 transition duration-200"
//           >
//             Dashboard
//           </button>
//         </nav>

//         {/* Mobile Toggle */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden p-2 rounded hover:bg-gray-800 transition"
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Nav */}
//       {isOpen && (
//         <div className="md:hidden bg-black border-t border-gray-700 px-6 pb-4 space-y-3">
//           <button
//             onClick={handleClick}
//             className="block hover:text-blue-400"
//           >
//             Dashboard
//           </button>
//         </div>
//       )}
//     </header>
//   );
// }

// "use client";

// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// type Props = {
//   onBackToDashboard: () => void;
// };

// export default function Header({ onBackToDashboard }: Props) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="w-full bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//         {/* Brand */}
//         <button
//           onClick={onBackToDashboard}
//           className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition"
//         >
//           MentorFlix
//         </button>

//         {/* Desktop nav */}
//         <nav className="hidden md:flex space-x-8 text-sm font-medium">
//           <button onClick={onBackToDashboard} className="hover:text-blue-400 transition duration-200">
//             Dashboard
//           </button>
//         </nav>

//         {/* Mobile Hamburger */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden p-2 rounded hover:bg-gray-800 transition"
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Dropdown */}
//       {isOpen && (
//         <div className="md:hidden bg-black border-t border-gray-700 px-6 pb-4 space-y-3">
//           <button onClick={onBackToDashboard} className="block w-full text-left hover:text-blue-400">
//             Dashboard
//           </button>
//         </div>
//       )}
//     </header>
//   );
// }


// "use client";

// import Link from "next/link";
// import { usePhaseStore } from "@/store/phase";

// export default function Header() {
//   const resetFlow = usePhaseStore((s) => s.reset);

//   return (
//     <header className="w-full bg-black text-white p-4 shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <button onClick={resetFlow} className="text-2xl font-bold text-white hover:text-blue-400 transition">
//           MentorFlix
//         </button>
//         <button onClick={resetFlow} className="hover:text-blue-400 transition">
//             Dashboard
//           </button>
//           <Link href="/signup" className="hover:text-blue-400 transition duration-200">
//   Signup
// </Link>
// <Link href="/login" className="hover:text-blue-400 transition duration-200">
//   Login
// </Link>
//         <nav className="space-x-6 hidden md:flex">
//         <Link href="/logout" className="hover:text-blue-400 transition duration-200">
//   Logout
// </Link>
          
//         </nav>
//       </div>
//     </header>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { usePhaseStore } from "@/store/phase";

// export default function Header() {
//   const resetFlow = usePhaseStore((s) => s.reset);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("auth_token");
//     setIsLoggedIn(!!token);
//   }, []);

//   return (
//     <header className="w-full bg-black text-white p-4 shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <button
//           onClick={resetFlow}
//           className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
//         >
//           MentorFlix
//         </button>

//         {/* Navigation */}
//         <div className="flex items-center space-x-6 text-sm font-medium">
//           <button onClick={resetFlow} className="hover:text-blue-400 transition">
//             Dashboard
//           </button>
          
//           <Link href="/login" className="hover:text-blue-400 transition">
//             Login
//           </Link>
//           {isLoggedIn && (
//             <Link href="/logout" className="hover:text-red-400 transition">
//               Logout
//             </Link>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePhaseStore } from "@/store/phase";

export default function Header() {
  const resetFlow = usePhaseStore((s) => s.reset);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Initial check
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);

    // Listen for localStorage changes (cross-tab + same tab)
    const handleStorageChange = () => {
      const token = localStorage.getItem("auth_token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);

    // Optional: update on focus (in case token changed)
    window.addEventListener("focus", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleStorageChange);
    };
  }, []);

  return (
    <header className="w-full bg-black text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={resetFlow}
          className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          MentorFlix
        </button>

        {/* Navigation */}
        <div className="flex items-center space-x-6 text-sm font-medium">
          <button onClick={resetFlow} className="hover:text-blue-400 transition">
            Dashboard
          </button>

          {!isLoggedIn ? (
            <Link href="/login" className="hover:text-blue-400 transition">
              Login
            </Link>
          ) : (
            <Link href="/logout" className="hover:text-red-400 transition">
              Logout
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
