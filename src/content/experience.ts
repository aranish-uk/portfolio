import experienceData from "@/components/data/experience.json";

export type Experience = {
  title: string;
  organization: string;
  duration: string;
  description: string[];
  image?: string;
};

export const experiences = experienceData as Experience[];
