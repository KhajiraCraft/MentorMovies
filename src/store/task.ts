// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { pick } from "radash";

// export interface TaskStore {
//   id: string;
//   question: string;
//   questions: string;
//   finalReport: string;
//   query: string;
//   title: string;
//   suggestion: string;
//   requirement: string;
//   tasks: SearchTask[];
//   sources: Source[];
//   feedback: string;
// }

// type TaskFunction = {
//   update: (tasks: SearchTask[]) => void;
//   setId: (id: string) => void;
//   setTitle: (title: string) => void;
//   setSuggestion: (suggestion: string) => void;
//   setRequirement: (requirement: string) => void;
//   setQuery: (query: string) => void;
//   updateTask: (query: string, task: Partial<SearchTask>) => void;
//   removeTask: (query: string) => boolean;
//   setQuestion: (question: string) => void;
//   updateQuestions: (questions: string) => void;
//   updateFinalReport: (report: string) => void;
//   setSources: (sources: Source[]) => void;
//   setFeedback: (feedback: string) => void;
//   clear: () => void;
//   reset: () => void;
//   backup: () => TaskStore;
//   restore: (taskStore: TaskStore) => void;
// };

// const defaultValues: TaskStore = {
//   id: "",
//   question: "",
//   questions: "",
//   finalReport: "",
//   query: "",
//   title: "",
//   suggestion: "",
//   requirement: "",
//   tasks: [],
//   sources: [],
//   feedback: "",
// };

// export const useTaskStore = create(
//   persist<TaskStore & TaskFunction>(
//     (set, get) => ({
//       ...defaultValues,
//       update: (tasks) => set(() => ({ tasks: [...tasks] })),
//       setId: (id) => set(() => ({ id })),
//       setTitle: (title) => set(() => ({ title })),
//       setSuggestion: (suggestion) => set(() => ({ suggestion })),
//       setRequirement: (requirement) => set(() => ({ requirement })),
//       setQuery: (query) => set(() => ({ query })),
//       updateTask: (query, task) => {
//         const newTasks = get().tasks.map((item) => {
//           return item.query === query ? { ...item, ...task } : item;
//         });
//         set(() => ({ tasks: [...newTasks] }));
//       },
//       removeTask: (query) => {
//         set((state) => ({
//           tasks: state.tasks.filter((task) => task.query !== query),
//         }));
//         return true;
//       },
//       setQuestion: (question) => set(() => ({ question })),
//       updateQuestions: (questions) => set(() => ({ questions })),
//       updateFinalReport: (report) => set(() => ({ finalReport: report })),
//       setSources: (sources) => set(() => ({ sources })),
//       setFeedback: (feedback) => set(() => ({ feedback })),
//       clear: () => set(() => ({ tasks: [] })),
//       reset: () => set(() => ({ ...defaultValues })),
//       backup: () => {
//         return {
//           ...pick(get(), Object.keys(defaultValues) as (keyof TaskStore)[]),
//         } as TaskStore;
//       },
//       restore: (taskStore) => set(() => ({ ...taskStore })),
//     }),
//     { name: "research" }
//   )
// );

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { pick } from "radash";

// Types for your AI-generated movie data
export interface MovieResult {
  title: string;
  context: string;
}

// Define the shape of your store
export interface TaskStore {
  id: string;
  question: string;
  questions: string;
  finalReport: string;
  query: string;
  title: string;
  suggestion: string;
  requirement: string;
  tasks: SearchTask[];         // Assume this type exists elsewhere
  sources: Source[];           // Assume this type exists elsewhere
  feedback: string;
  result: MovieResult[];       // 🔥 This is the new field storing AI movie results
}

// All store functions
type TaskFunction = {
  update: (tasks: SearchTask[]) => void;
  setId: (id: string) => void;
  setTitle: (title: string) => void;
  setSuggestion: (suggestion: string) => void;
  setRequirement: (requirement: string) => void;
  setQuery: (query: string) => void;
  updateTask: (query: string, task: Partial<SearchTask>) => void;
  removeTask: (query: string) => boolean;
  setQuestion: (question: string) => void;
  updateQuestions: (questions: string) => void;
  updateFinalReport: (report: string) => void;
  setSources: (sources: Source[]) => void;
  setFeedback: (feedback: string) => void;
  setResult: (result: MovieResult[]) => void;  // 🔥 Function to update movie result
  clear: () => void;
  reset: () => void;
  backup: () => TaskStore;
  restore: (taskStore: TaskStore) => void;
};

// Default values for the store
const defaultValues: TaskStore = {
  id: "",
  question: "",
  questions: "",
  finalReport: "",
  query: "",
  title: "",
  suggestion: "",
  requirement: "",
  tasks: [],
  sources: [],
  feedback: "",
  result: [],   // 🔥 Initialize with empty array
};

// Zustand store with persist middleware
export const useTaskStore = create(
  persist<TaskStore & TaskFunction>(
    (set, get) => ({
      ...defaultValues,

      update: (tasks) => set(() => ({ tasks: [...tasks] })),
      setId: (id) => set(() => ({ id })),
      setTitle: (title) => set(() => ({ title })),
      setSuggestion: (suggestion) => set(() => ({ suggestion })),
      setRequirement: (requirement) => set(() => ({ requirement })),
      setQuery: (query) => set(() => ({ query })),

      updateTask: (query, task) => {
        const newTasks = get().tasks.map((item) =>
          item.query === query ? { ...item, ...task } : item
        );
        set(() => ({ tasks: [...newTasks] }));
      },

      removeTask: (query) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.query !== query),
        }));
        return true;
      },

      setQuestion: (question) => set(() => ({ question })),
      updateQuestions: (questions) => set(() => ({ questions })),
      updateFinalReport: (report) => set(() => ({ finalReport: report })),
      setSources: (sources) => set(() => ({ sources })),
      setFeedback: (feedback) => set(() => ({ feedback })),

      setResult: (result) => set(() => ({ result })),  // 🔥 Add setter for result

      clear: () => set(() => ({ tasks: [] })),
      reset: () => set(() => ({ ...defaultValues })),

      backup: () => {
        return {
          ...pick(get(), Object.keys(defaultValues) as (keyof TaskStore)[]),
        } as TaskStore;
      },

      restore: (taskStore) => set(() => ({ ...taskStore })),
    }),
    {
      name: "research", // Local storage key
    }
  )
);
