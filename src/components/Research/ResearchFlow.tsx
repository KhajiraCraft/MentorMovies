// // src/components/Research/ResearchFlow.tsx
// "use client";

// import { useState } from "react";
// import SelectBillionaire from "./SelectBillionaire";
// import ResearchProgress from "./ResearchProgress";
// import MovieList from "./MovieList";

// export type ResearchPhase = "select" | "loading" | "result";

// export default function ResearchFlow() {
//   const [phase, setPhase] = useState<ResearchPhase>("select");
//   const [selectedName, setSelectedName] = useState<string>("");

//   return (
//     <>
//       {phase === "select" && (
//         <SelectBillionaire
//           onSelect={(name) => {
//             setSelectedName(name);
//             setPhase("loading");
//           }}
//         />
//       )}

//       {phase === "loading" && (
//         <ResearchProgress
//           name={selectedName}
//           onComplete={() => setPhase("result")}
//         />
//       )}

//       {phase === "result" && <MovieList billionaire={selectedName}/>}
//     </>
//   );
// }



// // src/components/Research/ResearchFlow.tsx
// "use client";

// import { useState } from "react";
// import SelectBillionaire from "./SelectBillionaire";
// import ResearchProgress from "./ResearchProgress";
// import MovieList from "./MovieList";

// export type ResearchPhase = "select" | "loading" | "result";

// export default function ResearchFlow() {
//   const [phase, setPhase] = useState<ResearchPhase>("select");
//   const [selectedName, setSelectedName] = useState<string>("");

//   const handleBack = () => {
//     setSelectedName("");
//     setPhase("select");
//   };

//   return (
//     <>
//       {phase === "select" && (
//         <SelectBillionaire
//           onSelect={(name) => {
//             setSelectedName(name);
//             setPhase("loading");
//           }}
//         />
//       )}

//       {phase === "loading" && (
//         <ResearchProgress
//           name={selectedName}
//           onComplete={() => setPhase("result")}
//         />
//       )}

//       {phase === "result" && (
//         <MovieList billionaire={selectedName} onBack={handleBack} />
//       )}
//     </>
//   );
// }

// // src/components/Research/ResearchFlow.tsx
// "use client";

// import { useState } from "react";
// import SelectBillionaire from "./SelectBillionaire";
// import ResearchProgress from "./ResearchProgress";
// import MovieList from "./MovieList";
// import Header from "../layout/Header";

// export type ResearchPhase = "select" | "loading" | "result";

// export default function ResearchFlow() {
//   const [phase, setPhase] = useState<ResearchPhase>("select");
//   const [selectedName, setSelectedName] = useState<string>("");

//   const handleBackToDashboard = () => {
//     setPhase("select");
//     setSelectedName("");
//   };

//   return (
//     <>
//       <Header onBackToDashboard={handleBackToDashboard} />
//       {phase === "select" && (
//         <SelectBillionaire
//           onSelect={(name) => {
//             setSelectedName(name);
//             setPhase("loading");
//           }}
//         />
//       )}
//       {phase === "loading" && (
//         <ResearchProgress
//           name={selectedName}
//           onComplete={() => setPhase("result")}
//         />
//       )}
//       {phase === "result" && (
//         <MovieList
//           billionaire={selectedName}
//           onBack={handleBackToDashboard}
//         />
//       )}
//     </>
//   );
// }

"use client";

import { usePhaseStore } from "@/store/phase";
import SelectBillionaire from "./SelectBillionaire";
import ResearchProgress from "./ResearchProgress";
import MovieList from "./MovieList";

export default function ResearchFlow() {
  const { phase, selectedBillionaire, setPhase, setBillionaire } = usePhaseStore();

  return (
    <>
      {phase === "select" && (
        <SelectBillionaire onSelect={(name) => {
          setBillionaire(name);
          setPhase("loading");
        }} />
      )}
      {phase === "loading" && (
        <ResearchProgress name={selectedBillionaire} onComplete={() => setPhase("result")} />
      )}
      {phase === "result" && (
        <MovieList 
          billionaire={selectedBillionaire} 
          onBack={() => {
            setBillionaire("");
            setPhase("select");
          }}
        />
      )}
    </>
  );
}
