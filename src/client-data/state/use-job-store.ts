import { type JobStatus } from "@prisma/client";
import create from "zustand";

interface JobState {
  activeStatus: JobStatus | null;
  setActiveStatus: (status: JobStatus | null) => void;
}

export const useJobStore = create<JobState>((set) => ({
  activeStatus: null,
  setActiveStatus: (status) => set({ activeStatus: status }),
}));
