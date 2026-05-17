export const profile = {
  name: "Abhinav Ranish",
  shortName: "Abhinav",
  role: "Software Engineer",
  focus: ["Cybersecurity", "AI", "Full-stack systems"],
  headline: "Software engineer building practical AI, security, and product systems.",
  recruiterSummary:
    "Computer Science student at Arizona State University with hands-on software engineering, cybersecurity, and AI internship experience. I build production-minded tools across full-stack apps, automation, security workflows, and applied machine learning.",
  developerSummary:
    "I like building useful systems end to end: AI tools with real data pipelines, security automation, browser extensions, research prototypes, and full-stack products that ship.",
  journeySummary:
    "An animated story mode about the path from curiosity to software, cybersecurity, AI, and the projects that shaped the direction.",
  location: "Tempe, Arizona",
  education: "Computer Science, Arizona State University",
  image: "/me.png",
  recruiterImage: "/newpic.png",
  resume: "/resume.pdf",
  links: {
    email: "mailto:aranish@asu.edu",
    github: "https://github.com/abhinav-ranish",
    githubOrg: "https://github.com/aranish-uk",
    linkedin: "https://linkedin.com/in/abhinavranish",
    x: "https://x.com/madebyabhinav",
  },
  proof: [
    { label: "Internships", value: "4+" },
    { label: "Merged Rust PRs", value: "7" },
    { label: "Featured builds", value: "10+" },
    { label: "ASU Dean's List", value: "6x" },
  ],
};

export const audienceModes = [
  {
    href: "/recruiters",
    label: "Recruiters",
    title: "Professional overview",
    description:
      "A clean, resume-first view with experience, selected projects, proof points, and direct contact links.",
  },
  {
    href: "/developers",
    label: "Developers",
    title: "Technical deep dive",
    description:
      "Projects, research, open source, architecture notes, and the technical range behind the portfolio.",
  },
  {
    href: "/journey",
    label: "Journey",
    title: "Anime story mode",
    description:
      "A gamified, animated origin story from childhood curiosity to software, security, AI, and startups.",
  },
] as const;
