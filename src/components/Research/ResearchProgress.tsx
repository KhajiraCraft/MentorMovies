// "use client";
// import { useEffect } from "react";
// import { LoaderCircle } from "lucide-react";
// import useRunResearch from "@/hooks/useRunResearch";
// import useAccurateTimer from "@/hooks/useAccurateTimer";

// type Props = {
//   name: string;
//   onComplete: () => void;
// };

// export default function ResearchProgress({ name, onComplete }: Props) {
//   const { runResearchFlow } = useRunResearch();
//   const { formattedTime, start, stop } = useAccurateTimer();

//   useEffect(() => {
//     async function run() {
//       start();
//       await runResearchFlow(name);
//       stop();
//       onComplete();
//     }

//     run();
//   }, [name]);

//   return (
//     <div className="flex flex-col items-center gap-4 mt-10">
//       <LoaderCircle className="animate-spin w-10 h-10 text-blue-600" />
//       <p className="text-center text-sm">Running research pipeline...</p>
//       <small className="font-mono text-muted-foreground">{formattedTime}</small>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import useRunResearch from "@/hooks/useRunResearch";
import useAccurateTimer from "@/hooks/useAccurateTimer";

type Props = {
  name: string;
  onComplete: () => void;
};

const statusMessages = [
  "🧠 Gathering data from global sources...",
  "🔍 Analyzing interviews, tweets, and talks...",
  "🎬 Extracting movie references...",
  "📊 Ranking by influence & recurrence...",
  "✨ Finalizing personalized recommendations..."
];

export default function ResearchProgress({ name, onComplete }: Props) {
  const { runResearchFlow } = useRunResearch();
  const { formattedTime, start, stop } = useAccurateTimer();
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    start();
    runResearchFlow(name).then(() => {
      stop();
      onComplete();
    });
  }, [name]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="animate-pulse mb-4">
        <LoaderCircle className="animate-spin text-blue-600 w-12 h-12" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Researching <span className="text-blue-600">{name}</span>'s movie brain...
      </h2>

      <p className="text-gray-600 text-sm max-w-md mb-6 transition-all duration-500 ease-in-out">
        {statusMessages[statusIndex]}
      </p>

      <div className="text-xs text-muted-foreground font-mono">
        
      </div>
    </section>
  );
}
