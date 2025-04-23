// RECENT START
// import { useTaskStore } from "@/store/task";
// import { useSettingStore } from "@/store/setting";
// import { useGlobalStore } from "@/store/global";
// import useDeepResearch from "@/hooks/useDeepResearch";
// import useAiProvider from "@/hooks/useAiProvider";
// import { toast } from "sonner";

// export default function useRunResearch() {
//   const { deepResearch, writeFinalReport } = useDeepResearch();
//   const { hasApiKey } = useAiProvider();

//   async function waitUntilTasksComplete(timeout = 90000, interval = 500) {
//     const startTime = Date.now();
//     return new Promise<void>((resolve, reject) => {
//       const check = setInterval(() => {
//         const tasks = useTaskStore.getState().tasks;
//         const unfinished = tasks.filter(t => t.state !== "completed");

//         if (unfinished.length === 0 && tasks.length > 0) {
//           clearInterval(check);
//           resolve();
//         }
//         if (Date.now() - startTime > timeout) {
//           clearInterval(check);
//           reject(new Error("⏱️ Task completion timed out."));
//         }
//       }, interval);
//     });
//   }

//   async function runResearchFlow(name: string) {
//     const { setQuestion, setQuery } = useTaskStore.getState();
//     const { mode } = useSettingStore.getState();

//     if ((mode === "local" && hasApiKey()) || mode === "proxy") {
//       const query = `What movies have been recommended or mentioned by ${name}? Focus on finding their favorite films, movie recommendations, or any movies they've publicly discussed.`;

//       setQuestion(query);
//       setQuery([
//         `Initial Query: ${query}`,
//         `Follow-up Questions: Direct research without questions`,
//         `Follow-up Feedback: Direct research mode`,
//       ].join("\n\n"));

//       toast.info(`🔍 Starting research on ${name}...`);
//       await deepResearch();

//       toast.loading("⏳ Waiting for tasks to finish...");
//       await waitUntilTasksComplete();

//       toast.success("✅ Tasks done. Writing final report...");
//       await writeFinalReport();

//       const { finalReport, sources } = useTaskStore.getState();

//       let movies = [];
//       try {
//         const start = finalReport.indexOf("[");
//         const end = finalReport.lastIndexOf("]") + 1;
//         if (start !== -1 && end !== -1 && start < end) {
//           movies = JSON.parse(finalReport.slice(start, end));
//         } else {
//           toast.warning("⚠️ Couldn't find movie list in report.");
//         }
//       } catch (err) {
//         console.error("❌ Movie parse error:", err);
//         toast.error("Failed to parse movies from report.");
//       }

//       const res = await fetch("/api/movies", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ finalReport, sources, movies }),
//       });

//       if (!res.ok) {
//         toast.error("❌ Failed to save movies to API.");
//       } else {
//         toast.success("🎬 Movies saved successfully.");
//       }
//     } else {
//       useGlobalStore.getState().setOpenSetting(true);
//     }
//   }

//   return { runResearchFlow };
// }
// RECENT END

// src/hooks/useRunResearch.ts
// import { useTaskStore } from "@/store/task";
// import { useSettingStore } from "@/store/setting";
// import { useGlobalStore } from "@/store/global";
// import useDeepResearch from "@/hooks/useDeepResearch";
// import useAiProvider from "@/hooks/useAiProvider";
// import { toast } from "sonner";

// export default function useRunResearch() {
//   const { deepResearch, writeFinalReport } = useDeepResearch();
//   const { hasApiKey } = useAiProvider();

//   async function waitUntilTasksComplete(timeout = 90000, interval = 500) {
//     const startTime = Date.now();
//     return new Promise<void>((resolve, reject) => {
//       const check = setInterval(() => {
//         const tasks = useTaskStore.getState().tasks;
//         const unfinished = tasks.filter((t) => t.state !== "completed");

//         if (unfinished.length === 0 && tasks.length > 0) {
//           clearInterval(check);
//           resolve();
//         }

//         if (Date.now() - startTime > timeout) {
//           clearInterval(check);
//           reject(new Error("⏱️ Task completion timed out."));
//         }
//       }, interval);
//     });
//   }

//   async function runResearchFlow(name: string) {
//     const { setQuestion, setQuery } = useTaskStore.getState();
//     const { mode } = useSettingStore.getState();

//     if ((mode === "local" && hasApiKey()) || mode === "proxy") {
//       // First: Check if movies already exist for this billionaire
//       const checkRes = await fetch("/api/movies");
//       const checkData = await checkRes.json();
//       console.log("🧠 Movie check response:", checkData);

//       if (checkData?.movies && Array.isArray(checkData.movies)) {
//         const alreadyHasData = checkData.movies.some((movie: any) =>
//           movie.recommendations?.some((rec: any) => rec.billionaire === name)
//         );

//         if (alreadyHasData) {
//           toast.success(`🎉 Movie data already exists for ${name}.`);
//           return;
//         }
//       }

//       // Proceed with research
//       const query = `What movies have been recommended or mentioned by ${name}? Focus on finding their favorite films, movie recommendations, or any movies they've publicly discussed.`;

//       setQuestion(query);
//       setQuery([
//         `Initial Query: ${query}`,
//         `Follow-up Questions: Direct research without questions`,
//         `Follow-up Feedback: Direct research mode`,
//       ].join("\n\n"));

//       toast.info(`🔍 Starting research on ${name}...`);
//       await deepResearch();

//       toast.loading("⏳ Waiting for tasks to finish...");
//       await waitUntilTasksComplete();

//       toast.success("✅ Tasks done. Writing final report...");
//       await writeFinalReport();

//       const { finalReport, sources } = useTaskStore.getState();
//       let movies = [];

//       try {
//         const start = finalReport.indexOf("[");
//         const end = finalReport.lastIndexOf("]") + 1;

//         if (start !== -1 && end !== -1 && start < end) {
//           movies = JSON.parse(finalReport.slice(start, end));
//         } else {
//           toast.warning("⚠️ Couldn't find movie list in report.");
//         }
//       } catch (err) {
//         console.error("❌ Movie parse error:", err);
//         toast.error("Failed to parse movies from report.");
//       }

//       const res = await fetch("/api/movies", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ finalReport, sources, movies, billionaireName: name }),
//       });

//       if (!res.ok) {
//         toast.error("❌ Failed to save movies to API.");
//       } else {
//         toast.success("🎬 Movies saved successfully.");
//       }
//     } else {
//       useGlobalStore.getState().setOpenSetting(true);
//     }
//   }

//   return { runResearchFlow };
// }



// import { useTaskStore } from "@/store/task";
// import { useSettingStore } from "@/store/setting";
// import { useGlobalStore } from "@/store/global";
// import useDeepResearch from "@/hooks/useDeepResearch";
// import useAiProvider from "@/hooks/useAiProvider";
// import { toast } from "sonner";

// export default function useRunResearch() {
//   const { deepResearch, writeFinalReport } = useDeepResearch();
//   const { hasApiKey } = useAiProvider();

//   async function waitUntilTasksComplete(timeout = 900000, interval = 500) {
//     const startTime = Date.now();
//     return new Promise<void>((resolve, reject) => {
//       const check = setInterval(() => {
//         const tasks = useTaskStore.getState().tasks;
//         const unfinished = tasks.filter((t) => t.state !== "completed");

//         if (unfinished.length === 0 && tasks.length > 0) {
//           clearInterval(check);
//           resolve();
//         }

//         if (Date.now() - startTime > timeout) {
//           clearInterval(check);
//           reject(new Error("⏱️ Task completion timed out."));
//         }
//       }, interval);
//     });
//   }

//   async function runResearchFlow(name: string) {
//     const { setQuestion, setQuery } = useTaskStore.getState();
//     const { mode } = useSettingStore.getState();

//     if ((mode === "local" && hasApiKey()) || mode === "proxy") {
//       // ✅ Check if this billionaire already has stored movies
//       try {
//         const res = await fetch(`/api/movies?billionaire=${encodeURIComponent(name)}`);
//         const data = await res.json();

//         if (data.movies && data.movies.length > 0) {
//           toast.info(`📦 ${name} already has saved movie recommendations.`);
//           return;
//         }
//       } catch (err) {
//         console.warn("⚠️ Error checking existing movies:", err);
//       }

//       // ✅ Proceed with research
//       const query = `What movies have been recommended or mentioned by ${name}? Focus on finding their favorite films, movie recommendations, or any movies they've publicly discussed.`;

//       setQuestion(query);
//       setQuery([
//         `Initial Query: ${query}`,
//         `Follow-up Questions: Direct research without questions`,
//         `Follow-up Feedback: Direct research mode`,
//       ].join("\n\n"));

//       toast.info(`🔍 Starting research on ${name}...`);
//       await deepResearch();

//       toast.loading("⏳ Waiting for tasks to finish...");
//       await waitUntilTasksComplete();

//       toast.success("✅ Tasks done. Writing final report...");
//       await writeFinalReport();

//       const { finalReport, sources } = useTaskStore.getState();
//       let movies = [];

//       try {
//         const start = finalReport.indexOf("[");
//         const end = finalReport.lastIndexOf("]") + 1;

//         if (start !== -1 && end !== -1 && start < end) {
//           movies = JSON.parse(finalReport.slice(start, end));
//         } else {
//           toast.warning("⚠️ Couldn't find movie list in report.");
//         }
//       } catch (err) {
//         console.error("❌ Movie parse error:", err);
//         toast.error("Failed to parse movies from report.");
//       }

//       const res = await fetch("/api/movies", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ finalReport, sources, movies, billionaireName: name }),
//       });

//       if (!res.ok) {
//         toast.error("❌ Failed to save movies to API.");
//       } else {
//         toast.success("🎬 Movies saved successfully.");
//       }
//     } else {
//       useGlobalStore.getState().setOpenSetting(true);
//     }
//   }

//   return { runResearchFlow };
// }



import { useTaskStore } from "@/store/task";
import { useSettingStore } from "@/store/setting";
import { useGlobalStore } from "@/store/global";
import useDeepResearch from "@/hooks/useDeepResearch";
import useAiProvider from "@/hooks/useAiProvider";

export default function useRunResearch() {
  const { deepResearch, writeFinalReport } = useDeepResearch();
  const { hasApiKey } = useAiProvider();

  async function waitUntilTasksComplete(timeout = 90000, interval = 500) {
    const startTime = Date.now();
    return new Promise<void>((resolve, reject) => {
      const check = setInterval(() => {
        const tasks = useTaskStore.getState().tasks;
        const unfinished = tasks.filter((t) => t.state !== "completed");

        if (unfinished.length === 0 && tasks.length > 0) {
          clearInterval(check);
          resolve();
        }

        if (Date.now() - startTime > timeout) {
          clearInterval(check);
          reject(new Error("⏱️ Task completion timed out."));
        }
      }, interval);
    });
  }

  async function runResearchFlow(name: string) {
    const { setQuestion, setQuery } = useTaskStore.getState();
    const { mode } = useSettingStore.getState();

    if ((mode === "local" && hasApiKey()) || mode === "proxy") {
      // ✅ Check if this billionaire already has stored movies
      try {
        const res = await fetch(`/api/movies?billionaire=${encodeURIComponent(name)}`);
        const data = await res.json();

        if (data.movies && data.movies.length > 0) {
          return;
        }
      } catch (err) {
        console.warn("⚠️ Error checking existing movies:", err);
      }

      // ✅ Proceed with research
      const query = `What movies have been recommended or mentioned by ${name}? Focus on finding their favorite films, movie recommendations, or any movies they've publicly discussed.`;

      setQuestion(query);
      setQuery([
        `Initial Query: ${query}`,
        `Follow-up Questions: Direct research without questions`,
        `Follow-up Feedback: Direct research mode`,
      ].join("\n\n"));

      await deepResearch();
      await waitUntilTasksComplete();
      await writeFinalReport();

      const { finalReport, sources } = useTaskStore.getState();
      let movies = [];

      try {
        const start = finalReport.indexOf("[");
        const end = finalReport.lastIndexOf("]") + 1;

        if (start !== -1 && end !== -1 && start < end) {
          movies = JSON.parse(finalReport.slice(start, end));
        }
      } catch (err) {
        console.error("❌ Movie parse error:", err);
      }

      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ finalReport, sources, movies, billionaireName: name }),
      });

    } else {
      useGlobalStore.getState().setOpenSetting(true);
    }
  }

  return { runResearchFlow };
}