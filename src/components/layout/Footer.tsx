// src/components/layout/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-400 py-6 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} MentorFlix. All rights reserved.</p>
          <p>
            Powered by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              TMDB
            </a>
          </p>
        </div>
      </footer>
    );
  }
  