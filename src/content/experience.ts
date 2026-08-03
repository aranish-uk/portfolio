import experienceData from "@/components/data/experience.json";

export type Experience = {
  title: string;
  organization: string;
  duration: string;
  description: string[];
  image?: string;
};

// Hidden from the public site (UI, AI chat, and the Groq system prompt all read
// experience.json directly, so the entry lives here instead of in the JSON).
// To restore, paste this object back into experience.json after the Ampcus entry.
//
// {
//   "title": "AI / SWE Intern",
//   "organization": "TRANZYD",
//   "duration": "Dec 2024 - May 2025",
//   "image": "/work/tranzyd.jpg",
//   "description": [
//     "Architected end-to-end AI contract intelligence platform processing ~25 legal contracts: built automated clause extraction, semantic comparison (FAISS + sentence-transformers), and draft generation—cutting manual review by ~40%.",
//     "Joined to support AI contract automation; quickly took on core feature development responsibilities.",
//     "Integrated backend logic using Python, SQLite, and python-docx for contract storage and document generation.",
//     "Designed clause-matching workflows for OLD/NEW comparisons with checkbox-driven contract generation UI.",
//     "Prototyped an AI stock analyzer using RAG pipelines, FAISS, and sentiment models to explore LLM-based tools."
//   ]
// }

export const experiences = experienceData as Experience[];
