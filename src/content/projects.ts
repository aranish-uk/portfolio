import projectsData from "@/components/data/projects.json";

export type Project = {
  title: string;
  description: string;
  technologies?: string[];
  visit?: string;
  web?: string;
  image?: string;
  category?: string | string[];
  workinprogress?: boolean;
  collaboration?: boolean;
};

export type Audience = "recruiter" | "developer" | "story";

export type ProjectMeta = {
  recruiterWeight: number;
  developerWeight: number;
  storyWeight: number;
  impact: "High" | "Medium" | "Experimental";
  complexity: "High" | "Medium" | "Focused";
  spotlight?: boolean;
};

const defaultMeta: ProjectMeta = {
  recruiterWeight: 20,
  developerWeight: 20,
  storyWeight: 20,
  impact: "Medium",
  complexity: "Medium",
};

export const projectMeta: Record<string, ProjectMeta> = {
  IntelliTab: {
    recruiterWeight: 95,
    developerWeight: 98,
    storyWeight: 75,
    impact: "High",
    complexity: "High",
    spotlight: true,
  },
  CVfy: {
    recruiterWeight: 96,
    developerWeight: 88,
    storyWeight: 72,
    impact: "High",
    complexity: "High",
    spotlight: true,
  },
  Readflow: {
    recruiterWeight: 78,
    developerWeight: 80,
    storyWeight: 55,
    impact: "Medium",
    complexity: "Medium",
    spotlight: true,
  },
  "Stock AI Analyzer": {
    recruiterWeight: 88,
    developerWeight: 84,
    storyWeight: 66,
    impact: "High",
    complexity: "High",
    spotlight: true,
  },
  FaceTagger: {
    recruiterWeight: 76,
    developerWeight: 90,
    storyWeight: 70,
    impact: "High",
    complexity: "High",
    spotlight: true,
  },
  "Contract Generator RAG": {
    recruiterWeight: 82,
    developerWeight: 78,
    storyWeight: 58,
    impact: "High",
    complexity: "Medium",
    spotlight: true,
  },
  WiSpec: {
    recruiterWeight: 86,
    developerWeight: 94,
    storyWeight: 80,
    impact: "High",
    complexity: "High",
    spotlight: true,
  },
  Posta: {
    recruiterWeight: 72,
    developerWeight: 86,
    storyWeight: 50,
    impact: "Medium",
    complexity: "High",
  },
  Velarith: {
    recruiterWeight: 74,
    developerWeight: 88,
    storyWeight: 62,
    impact: "Medium",
    complexity: "High",
  },
  ClawHub: {
    recruiterWeight: 68,
    developerWeight: 92,
    storyWeight: 54,
    impact: "Medium",
    complexity: "High",
  },
  CartGuessr: {
    recruiterWeight: 55,
    developerWeight: 68,
    storyWeight: 90,
    impact: "Medium",
    complexity: "Medium",
  },
  "Net Audit Suite": {
    recruiterWeight: 78,
    developerWeight: 86,
    storyWeight: 60,
    impact: "High",
    complexity: "High",
  },
};

export const projects = (projectsData as Project[]).map((project) => ({
  ...project,
  meta: projectMeta[project.title] ?? defaultMeta,
}));

export type ProjectWithMeta = (typeof projects)[number];

export function getProjectCategories(project: Project) {
  if (!project.category) return [];
  return Array.isArray(project.category) ? project.category : [project.category];
}

export function getAllCategories() {
  const categories = new Set<string>();
  projects.forEach((project) => {
    getProjectCategories(project).forEach((category) => categories.add(category));
  });
  return ["All", ...Array.from(categories).sort()];
}

export function getFeaturedProjects(audience: Audience, count = 3) {
  const weightKey = `${audience}Weight` as const;

  return [...projects]
    .sort((a, b) => {
      const weightDelta = b.meta[weightKey] - a.meta[weightKey];
      if (weightDelta !== 0) return weightDelta;
      return a.title.localeCompare(b.title);
    })
    .slice(0, count);
}

export function getProjectByTitle(title: string) {
  return projects.find((project) => project.title === title);
}
