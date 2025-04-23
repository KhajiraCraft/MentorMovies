// "use client";
// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { LoaderCircle } from "lucide-react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import useDeepResearch from "@/hooks/useDeepResearch";
// import useAccurateTimer from "@/hooks/useAccurateTimer";
// import useAiProvider from "@/hooks/useAiProvider";
// import { useTaskStore } from "@/store/task";
// import { useSettingStore } from "@/store/setting";
// import { useGlobalStore } from "@/store/global";

// const formSchema = z.object({
//   topic: z.string().min(2),
// });

// function DirectResearch() {
//   const { t } = useTranslation();
//   const taskStore = useTaskStore();
//   const { hasApiKey } = useAiProvider();
//   const { deepResearch, status } = useDeepResearch();
//   const {
//     formattedTime,
//     start: accurateTimerStart,
//     stop: accurateTimerStop,
//   } = useAccurateTimer();
//   const [isThinking, setIsThinking] = useState<boolean>(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       topic: "",
//     },
//   });

//   async function handleSubmit(values: z.infer<typeof formSchema>) {
//     const { mode } = useSettingStore.getState();
//     if ((mode === "local" && hasApiKey()) || mode === "proxy") {
//       const { setQuestion } = useTaskStore.getState();
//       try {
//         setIsThinking(true);
//         accurateTimerStart();
//         setQuestion(values.topic);
        
//         // Prepare the prompt similar to Feedback component
//         const prompt = [
//           `Initial Query: ${values.topic}`,
//           `Follow-up Questions: Direct research without questions`,
//           `Follow-up Feedback: Direct research mode`,
//         ].join("\n\n");
//         taskStore.setQuery(prompt);
        
//         await deepResearch();
//       } finally {
//         setIsThinking(false);
//         accurateTimerStop();
//       }
//     } else {
//       const { setOpenSetting } = useGlobalStore.getState();
//       setOpenSetting(true);
//     }
//   }

//   return (
//     <section className="p-4 border rounded-md mt-4 print:hidden">
//       <h3 className="font-semibold text-lg border-b mb-2 leading-10">
//         {t("research.directResearch.title")}
//       </h3>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(handleSubmit)}>
//           <FormField
//             control={form.control}
//             name="topic"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="mb-2 font-semibold">
//                   {t("research.directResearch.topicLabel")}
//                 </FormLabel>
//                 <FormControl>
//                   <Textarea
//                     rows={3}
//                     placeholder={t("research.directResearch.topicPlaceholder")}
//                     disabled={isThinking}
//                     {...field}
//                   />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <Button className="mt-4 w-full" disabled={isThinking} type="submit">
//             {isThinking ? (
//               <>
//                 <LoaderCircle className="animate-spin" />
//                 <span>{status}</span>
//                 <small className="font-mono">{formattedTime}</small>
//               </>
//             ) : (
//               t("research.common.startDirectResearch")
//             )}
//           </Button>
//         </form>
//       </Form>
//     </section>
//   );
// }

// export default DirectResearch;


// "use client";

// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import useDeepResearch from "@/hooks/useDeepResearch";
// import useAccurateTimer from "@/hooks/useAccurateTimer";
// import { useTaskStore } from "@/store/task";
// import { useSettingStore } from "@/store/setting";
// import { useGlobalStore } from "@/store/global";
// import { fetchBillionaires } from "@/lib/api";

// type Billionaire = {
//   id: string;
//   person: {
//     name: string;
//   };
// };

// function DirectResearch() {
//   const { deepResearch, status } = useDeepResearch();
//   const { formattedTime, start, stop } = useAccurateTimer();
//   const { hasApiKey } = useAiProvider();  // Add this hook

//   const [billionaires, setBillionaires] = useState<Billionaire[]>([]);
//   const [isThinking, setIsThinking] = useState(false);

//   useEffect(() => {
//     fetchBillionaires()
//       .then((data) => setBillionaires(data))
//       .catch(() => toast.error("Failed to load billionaires"));
//   }, []);

//   async function handleResearch(name: string) {
//     const { mode } = useSettingStore.getState();  // Only get mode from settings

//     if ((mode === "local" && hasApiKey()) || mode === "proxy") {
//       const { setQuestion, setQuery } = useTaskStore.getState();

//       try {
//         setIsThinking(true);
//         start();

//         setQuestion(name);

//         const prompt = [
//           `Initial Query: ${name}`,
//           `Follow-up Questions: Direct research without questions`,
//           `Follow-up Feedback: Direct research mode`,
//         ].join("\n\n");

//         setQuery(prompt);

//         await deepResearch();
//       } finally {
//         setIsThinking(false);
//         stop();
//       }
//     } else {
//       useGlobalStore.getState().setOpenSetting(true);
//     }
//   }

//   return (
//     <section className="p-4 border rounded-md mt-4">
//       <h3 className="font-semibold text-lg mb-2">
//         Select a Billionaire to Research
//       </h3>

//       {billionaires.length === 0 && <p>Loading...</p>}

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//         {billionaires.map((b) => (
//           <Button
//             key={b.id}
//             disabled={isThinking}
//             onClick={() => handleResearch(b.person.name)}
//           >
//             {b.person.name}
//           </Button>
//         ))}
//       </div>

//       {isThinking && (
//         <div className="mt-4">
//           <p className="text-sm">{status}</p>
//           <small className="font-mono">{formattedTime}</small>
//         </div>
//       )}
//     </section>
//   );
// }

// export default DirectResearch;


// "use client";

// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import useDeepResearch from "@/hooks/useDeepResearch";
// import useAccurateTimer from "@/hooks/useAccurateTimer";
// import { useTaskStore } from "@/store/task";
// import { useSettingStore } from "@/store/setting";
// import { useGlobalStore } from "@/store/global";
// import useAiProvider from "@/hooks/useAiProvider";  // Add this import

// type Billionaire = {
//   personName: string;  // Changed to match Forbes API response
//   rank: number;
// };

// function DirectResearch() {
//   const { deepResearch, status } = useDeepResearch();
//   const { formattedTime, start, stop } = useAccurateTimer();
//   const { hasApiKey } = useAiProvider();  // Add this hook

//   const [billionaires, setBillionaires] = useState<Billionaire[]>([]);
//   const [isThinking, setIsThinking] = useState(false);

//   useEffect(() => {
//     // Fetch from Forbes API
//     fetch('https://forbes400.onrender.com/api/forbes400?limit=10')
//       .then(response => response.json())
//       .then((data) => setBillionaires(data))
//       .catch(() => toast.error("Failed to load billionaires"));
//   }, []);

//   async function handleResearch(name: string) {
//     const { mode } = useSettingStore.getState();  // Only get mode from settings

//     if ((mode === "local" && hasApiKey()) || mode === "proxy") {
//       const { setQuestion, setQuery } = useTaskStore.getState();

//       try {
//         setIsThinking(true);
//         start();

//         // Modified prompt to specifically ask about movies
//         const movieQuery = `What movies have been recommended or mentioned by ${name}? Focus on finding their favorite films, movie recommendations, or any movies they've publicly discussed.`;
        
//         setQuestion(movieQuery);

//         const prompt = [
//           `Initial Query: ${movieQuery}`,
//           `Follow-up Questions: Direct research without questions`,
//           `Follow-up Feedback: Direct research mode`,
//         ].join("\n\n");

//         setQuery(prompt);

//         await deepResearch();
//       } finally {
//         setIsThinking(false);
//         stop();
//       }
//     } else {
//       useGlobalStore.getState().setOpenSetting(true);
//     }
//   }

//   return (
//     <section className="p-4 border rounded-md mt-4">
//       <h3 className="font-semibold text-lg mb-2">
//         Research Billionaire Movie Recommendations
//       </h3>

//       {billionaires.length === 0 && <p>Loading Forbes 400 data...</p>}

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//         {billionaires.map((b) => (
//           <Button
//             key={b.personName}
//             disabled={isThinking}
//             onClick={() => handleResearch(b.personName)}
//             className="p-4 text-sm"
//           >
//             {b.personName}
//           </Button>
//         ))}
//       </div>

//       {isThinking && (
//         <div className="mt-4 text-center">
//           <p className="text-sm">Researching movie recommendations...</p>
//           <p className="text-sm">{status}</p>
//           <small className="font-mono">{formattedTime}</small>
//         </div>
//       )}
//     </section>
//   );
// }

// export default DirectResearch;




// "use client";

// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import useDeepResearch from "@/hooks/useDeepResearch";
// import useAccurateTimer from "@/hooks/useAccurateTimer";
// import { useTaskStore } from "@/store/task";
// import { useSettingStore } from "@/store/setting";
// import { useGlobalStore } from "@/store/global";
// import useAiProvider from "@/hooks/useAiProvider";
// import MovieList from "@/components/Research/MovieList";

// type Billionaire = {
//   personName: string;
//   rank: number;
// };

// function DirectResearch() {
//   const { deepResearch, status } = useDeepResearch();
//   const { formattedTime, start, stop } = useAccurateTimer();
//   const { hasApiKey } = useAiProvider();

//   const [billionaires, setBillionaires] = useState<Billionaire[]>([]);
//   const [isThinking, setIsThinking] = useState(false);
//   const [recommendedMovies, setRecommendedMovies] = useState<string[]>([]);

//   useEffect(() => {
//     fetch("https://forbes400.onrender.com/api/forbes400?limit=10")
//       .then((res) => res.json())
//       .then((data) => setBillionaires(data))
//       .catch(() => toast.error("Failed to load billionaires"));
//   }, []);

//   // Helper: Wait for AI to populate `result`
//   async function waitForResult(timeout = 10000000) {
//     const startTime = Date.now();

//     return new Promise<void>((resolve, reject) => {
//       const interval = setInterval(() => {
//         const result = useTaskStore.getState().result;
//         if (result && result.length > 0) {
//           clearInterval(interval);
//           resolve();
//         }

//         if (Date.now() - startTime > timeout) {
//           clearInterval(interval);
//           reject(new Error("Timed out waiting for result"));
//         }
//       }, 500);
//     });
//   }

//   async function handleResearch(name: string) {
//     const { mode } = useSettingStore.getState();

//     if ((mode === "local" && hasApiKey()) || mode === "proxy") {
//       const { setQuestion, setQuery } = useTaskStore.getState();

//       try {
//         console.log("Starting research for:", name);
//         setIsThinking(true);
//         start();

//         const movieQuery = `What movies have been recommended or mentioned by ${name}? Focus on finding their favorite films, movie recommendations, or any movies they've publicly discussed.`;

//         setQuestion(movieQuery);

//         const prompt = [
//           `Initial Query: ${movieQuery}`,
//           `Follow-up Questions: Direct research without questions`,
//           `Follow-up Feedback: Direct research mode`,
//         ].join("\n\n");

//         setQuery(prompt);

//         console.log("Running deepResearch()");
//         await deepResearch();         // Start research

//         console.log("Waiting for result from Zustand...");
//         await waitForResult();        // Wait for Zustand to store result

//         console.log("Fetching from /api/movies");
//         const res = await fetch("/api/movies");
//         const data = await res.json();

//         console.log("API Response:", data);

//         if (!data.movies || data.movies.length === 0) {
//           toast.error("No movies found from AI research.");
//         } else {
//           setRecommendedMovies(data.movies);
//           toast.success("Movies successfully retrieved!");
//         }
//       } catch (err) {
//         console.error("Research failed:", err);
//         toast.error("Failed to complete research or fetch results.");
//       } finally {
//         setIsThinking(false);
//         stop();
//       }
//     } else {
//       useGlobalStore.getState().setOpenSetting(true);
//     }
//   }

//   return (
//     <section className="p-4 border rounded-md mt-4">
//       <h3 className="font-semibold text-lg mb-2">
//         Research Billionaire Movie Recommendations
//       </h3>

//       {billionaires.length === 0 && <p>Loading Forbes 400 data...</p>}

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//         {billionaires.map((b) => (
//           <Button
//             key={b.personName}
//             disabled={isThinking}
//             onClick={() => handleResearch(b.personName)}
//             className="p-4 text-sm"
//           >
//             {b.personName}
//           </Button>
//         ))}
//       </div>

//       {isThinking && (
//         <div className="mt-4 text-center">
//           <p className="text-sm">Researching movie recommendations...</p>
//           <p className="text-sm">{status}</p>
//           <small className="font-mono">{formattedTime}</small>
//         </div>
//       )}

//       {recommendedMovies.length > 0 && (
//         <MovieList movies={recommendedMovies} />
//       )}
//     </section>
//   );
// }

// export default DirectResearch;



// //MOST RECENT START
// "use client";

// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import useDeepResearch from "@/hooks/useDeepResearch";
// import useAccurateTimer from "@/hooks/useAccurateTimer";
// import { useTaskStore } from "@/store/task";
// import { useSettingStore } from "@/store/setting";
// import { useGlobalStore } from "@/store/global";
// import useAiProvider from "@/hooks/useAiProvider";
// import MovieList from "@/components/Research/MovieList";

// type Billionaire = {
//   personName: string;  // From Forbes API
//   rank: number;
// };

// function DirectResearch() {
//   const { deepResearch, status } = useDeepResearch();
//   const { formattedTime, start, stop } = useAccurateTimer();
//   const { hasApiKey } = useAiProvider();

//   const [billionaires, setBillionaires] = useState<Billionaire[]>([]);
//   const [isThinking, setIsThinking] = useState(false);
//   const [recommendedMovies, setRecommendedMovies] = useState<string[]>([]);

//   // Fetch Forbes Billionaires List
//   useEffect(() => {
//     fetch("https://forbes400.onrender.com/api/forbes400?limit=10")
//       .then((response) => response.json())
//       .then((data) => setBillionaires(data))
//       .catch(() => toast.error("Failed to load billionaires"));
//   }, []);

//   // Handle Direct Research for Selected Billionaire
//   async function handleResearch(name: string) {
//     const { mode } = useSettingStore.getState();

//     if ((mode === "local" && hasApiKey()) || mode === "proxy") {
//       const { setQuestion, setQuery } = useTaskStore.getState();

//       try {
//         setIsThinking(true);
//         start();
//         console.log('Starting research for:', name);

//         const movieQuery = `What movies have been recommended or mentioned by ${name}? Focus on finding their favorite films, movie recommendations, or any movies they've publicly discussed.`;

//         setQuestion(movieQuery);
//         console.log('Query set:', movieQuery);

//         const prompt = [
//           `Initial Query: ${movieQuery}`,
//           `Follow-up Questions: Direct research without questions`,
//           `Follow-up Feedback: Direct research mode`,
//         ].join("\n\n");

//         setQuery(prompt);
//         console.log('Full prompt:', prompt);

//         await deepResearch();  // Run AI Research
        
//         // Log the raw result from Zustand store
//         const rawResult = useTaskStore.getState().result;
//         console.log('Raw AI Research Result:', rawResult);

//         // Fetch Movie Titles from API
//         const res = await fetch("/api/movies");
//         const data = await res.json();
//         console.log('Processed Movie Data:', data);

//         if (!data.movies || data.movies.length === 0) {
//           console.log('No movies found in results');
//           toast.error("No movies found from AI research.");
//         } else {
//           console.log('Found movies:', data.movies);
//           setRecommendedMovies(data.movies);
//         }
//       } catch (error) {
//         console.error('Research Error:', error);
//         toast.error("Something went wrong during research.");
//       } finally {
//         setIsThinking(false);
//         stop();
//       }
//     } else {
//       useGlobalStore.getState().setOpenSetting(true);
//     }
//   }

//   return (
//     <section className="p-4 border rounded-md mt-4">
//       <h3 className="font-semibold text-lg mb-2">
//         Research Billionaire Movie Recommendations
//       </h3>

//       {billionaires.length === 0 && <p>Loading Forbes 400 data...</p>}

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//         {billionaires.map((b) => (
//           <Button
//             key={b.personName}
//             disabled={isThinking}
//             onClick={() => handleResearch(b.personName)}
//             className="p-4 text-sm"
//           >
//             {b.personName}
//           </Button>
//         ))}
//       </div>

//       {isThinking && (
//         <div className="mt-4 text-center">
//           <p className="text-sm">Researching movie recommendations...</p>
//           <p className="text-sm">{status}</p>
//           <small className="font-mono">{formattedTime}</small>
//         </div>
//       )}

//       {recommendedMovies.length > 0 && (
//         <MovieList/>
//       )}
//     </section>
//   );
// }

// export default DirectResearch;

// // MOST RECENT END





// "use client";

// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import useDeepResearch from "@/hooks/useDeepResearch";
// import useAccurateTimer from "@/hooks/useAccurateTimer";
// import { useTaskStore } from "@/store/task";
// import { useSettingStore } from "@/store/setting";
// import { useGlobalStore } from "@/store/global";
// import useAiProvider from "@/hooks/useAiProvider";
// import MovieList from "@/components/Research/MovieList";

// type Billionaire = {
//   personName: string;  // From Forbes API
//   rank: number;
// };

// function DirectResearch() {
//   const { deepResearch, status } = useDeepResearch();
//   const { formattedTime, start, stop } = useAccurateTimer();
//   const { hasApiKey } = useAiProvider();

//   const [billionaires, setBillionaires] = useState<Billionaire[]>([]); //local state for billionaire data
//   const [isThinking, setIsThinking] = useState(false);
//   const [recommendedMovies, setRecommendedMovies] = useState<string[]>([]);

//   // Fetch Forbes Billionaires List
//   useEffect(() => {
//     fetch("https://forbes400.onrender.com/api/forbes400?limit=10")
//       .then((response) => response.json())
//       .then((data) => setBillionaires(data))
//       .catch(() => toast.error("Failed to load billionaires"));
//   }, []);

//   // Handle Direct Research for Selected Billionaire
//   async function handleResearch(name: string) {
//     const { mode } = useSettingStore.getState();

//     if ((mode === "local" && hasApiKey()) || mode === "proxy") {
//       const { setQuestion, setQuery } = useTaskStore.getState();

//       try {
//         setIsThinking(true);
//         start();
//         console.log('Starting research for:', name);

//         const movieQuery = `What movies have been recommended or mentioned by ${name}? Focus on finding their favorite films, movie recommendations, or any movies they've publicly discussed.`;

//         setQuestion(movieQuery);
//         console.log('Query set:', movieQuery);

//         const prompt = [
//           `Initial Query: ${movieQuery}`,
//           `Follow-up Questions: Direct research without questions`,
//           `Follow-up Feedback: Direct research mode`,
//         ].join("\n\n");

//         setQuery(prompt);
//         console.log('Full prompt:', prompt);

//         await deepResearch();  // Run AI Research
        
//         // Log the raw result from Zustand store
//         const rawResult = useTaskStore.getState().result;
//         console.log('Raw AI Research Result:', rawResult);

//         // Fetch Movie Titles from API
//         const res = await fetch("/api/movies");
//         const data = await res.json();
//         console.log('Processed Movie Data:', data);

//         if (!data.movies || data.movies.length === 0) {
//           console.log('No movies found in results');
//           toast.error("No movies found from AI research.");
//         } else {
//           console.log('Found movies:', data.movies);
//           setRecommendedMovies(data.movies);
//         }
//       } catch (error) {
//         console.error('Research Error:', error);
//         toast.error("Something went wrong during research.");
//       } finally {
//         setIsThinking(false);
//         stop();
//       }
//     } else {
//       useGlobalStore.getState().setOpenSetting(true);
//     }
//   }

//   return (
//     <section className="p-4 border rounded-md mt-4">
//       <h3 className="font-semibold text-lg mb-2">
//         Research Billionaire Movie Recommendations
//       </h3>

//       {billionaires.length === 0 && <p>Loading Forbes 400 data...</p>}

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//         {billionaires.map((b) => (
//           <Button
//             key={b.personName}
//             disabled={isThinking}
//             onClick={() => handleResearch(b.personName)}
//             className="p-4 text-sm"
//           >
//             {b.personName}
//           </Button>
//         ))}
//       </div>

//       {isThinking && (
//         <div className="mt-4 text-center">
//           <p className="text-sm">Researching movie recommendations...</p>
//           <p className="text-sm">{status}</p>
//           <small className="font-mono">{formattedTime}</small>
//         </div>
//       )}

//       {recommendedMovies.length > 0 && (
//         <MovieList />
//       )}
//     </section>
//   );
// }

// export default DirectResearch;

"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import useDeepResearch from "@/hooks/useDeepResearch";
import useAccurateTimer from "@/hooks/useAccurateTimer";
import { useTaskStore } from "@/store/task";
import { useSettingStore } from "@/store/setting";
import { useGlobalStore } from "@/store/global";
import useAiProvider from "@/hooks/useAiProvider";
import MovieList from "@/components/Research/MovieList";

type Billionaire = {
  personName: string;
  rank: number;
};

function DirectResearch() {
  const { deepResearch, writeFinalReport, status } = useDeepResearch();
  const { formattedTime, start, stop } = useAccurateTimer();
  const { hasApiKey } = useAiProvider();

  const [billionaires, setBillionaires] = useState<Billionaire[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://forbes400.onrender.com/api/forbes400?limit=10")
      .then((res) => res.json())
      .then(setBillionaires)
      .catch(() => toast.error("Failed to load billionaires"));
  }, []);

  // ⏳ Wait until all tasks are completed
  async function waitUntilTasksComplete(timeout = 90000, interval = 500) {
    const startTime = Date.now();
    return new Promise<void>((resolve, reject) => {
      const checker = setInterval(() => {
        const tasks = useTaskStore.getState().tasks;
        const unfinished = tasks.filter((task) => task.state !== "completed");

        if (unfinished.length === 0 && tasks.length > 0) {
          clearInterval(checker);
          resolve();
        }

        if (Date.now() - startTime > timeout) {
          clearInterval(checker);
          reject(new Error("⏱️ Task completion timed out."));
        }
      }, interval);
    });
  }

  async function handleResearch(name: string) {
    const { mode } = useSettingStore.getState();

    if ((mode === "local" && hasApiKey()) || mode === "proxy") {
      const { setQuestion, setQuery } = useTaskStore.getState();

      try {
        setIsThinking(true);
        start();
        toast.info(`Starting research on ${name}...`);

        const movieQuery = `What movies have been recommended or mentioned by ${name}? Focus on finding their favorite films, movie recommendations, or any movies they've publicly discussed.`;

        setQuestion(movieQuery);

        const prompt = [
          `Initial Query: ${movieQuery}`,
          `Follow-up Questions: Direct research without questions`,
          `Follow-up Feedback: Direct research mode`,
        ].join("\n\n");

        setQuery(prompt);

        await deepResearch();

        toast.loading("⏳ Waiting for all research tasks to finish...");
        await waitUntilTasksComplete();

        toast.success("✅ All research tasks completed. Generating final report...");

        await writeFinalReport();

        const { finalReport, sources } = useTaskStore.getState();
        console.log("🧾 Final Report (raw):", finalReport);
        let movies = [];
        try {
          const start = finalReport.indexOf("[");
          const end = finalReport.lastIndexOf("]") + 1;

          if (start !== -1 && end !== -1 && start < end) {
            movies = JSON.parse(finalReport.slice(start, end));
            setRecommendedMovies(movies);
          } else {
            console.warn("⚠️ No movie JSON found in final report.");
          }
        } catch (err) {
          console.error("❌ Failed to parse movies from final report:", err);
        }

        const response = await fetch("/api/movies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ finalReport, sources, movies }),
        });

        if (!response.ok) {
          toast.error("❌ Failed to save report.");
        } else {
          toast.success(`🎬 Movies for ${name} successfully saved!`);
        }

      } catch (err) {
        console.error("❌ Research error:", err);
        toast.error("Something went wrong during research.");
      } finally {
        setIsThinking(false);
        stop();
      }
    } else {
      useGlobalStore.getState().setOpenSetting(true);
    }
  }

  return (
    <section className="p-4 border rounded-md mt-4">
      <h3 className="font-semibold text-lg mb-2">
        Research Billionaire Movie Recommendations
      </h3>

      {billionaires.length === 0 && <p>Loading Forbes 400 data...</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {billionaires.map((b) => (
          <Button
            key={b.personName}
            disabled={isThinking}
            onClick={() => handleResearch(b.personName)}
            className="p-4 text-sm"
          >
            {b.personName}
          </Button>
        ))}
      </div>

      {isThinking && (
        <div className="mt-4 text-center">
          <p className="text-sm">Running research pipeline...</p>
          <p className="text-sm">{status}</p>
          <small className="font-mono">{formattedTime}</small>
        </div>
      )}

      {recommendedMovies.length > 0 && <MovieList />}
    </section>
  );
}

export default DirectResearch;
