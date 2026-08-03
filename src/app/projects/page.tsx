import ProjectsArchive from "@/components/ProjectsArchive";

type ProjectsPageProps = {
  searchParams?: Promise<{
    audience?: string;
    sort?: string;
  }>;
};

export default async function ProjectsArchivePage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;
  const developerMode =
    params?.audience === "developer" || params?.sort === "developer";

  return (
    <ProjectsArchive
      developerMode={developerMode}
      initialSort={developerMode ? "developer" : "recruiter"}
    />
  );
}
