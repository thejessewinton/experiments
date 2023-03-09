import { type JobStatus } from "@prisma/client";
import { create } from "zustand";

type JobType = { id: string; title: string } | null;

interface JobState {
  activeJob: JobType;
  setActiveJob: (job: JobType) => void;
  activeStatus: JobStatus | null;
  setActiveStatus: (status: JobStatus | null) => void;
}

export const useJobStore = create<JobState>((set) => ({
  activeJob: null,
  setActiveJob: (job) => set({ activeJob: job }),
  activeStatus: null,
  setActiveStatus: (status) => set({ activeStatus: status }),
}));
