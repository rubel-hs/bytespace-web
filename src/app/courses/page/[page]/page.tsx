import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { getCourses } from "@/lib/courseData";
import CourseArchive from "@/partials/CourseArchive";
import SeoMeta from "@/partials/SeoMeta";
import type { RegularPage } from "@/types";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export const generateStaticParams = () => {
  const totalPages = Math.ceil(
    getCourses().length / config.settings.pagination,
  );
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
};

const CoursesPage = async ({
  params,
}: {
  params: Promise<{ page: string }>;
}) => {
  const { page } = await params;
  const currentPage = Number(page);
  const index = getListPage("courses/_index.md") as RegularPage;
  const courses = getCourses();
  const totalPages = Math.ceil(courses.length / config.settings.pagination);

  if (
    !Number.isInteger(currentPage) ||
    currentPage < 2 ||
    currentPage > totalPages
  )
    notFound();

  const offset = (currentPage - 1) * config.settings.pagination;
  const currentCourses = courses.slice(
    offset,
    offset + config.settings.pagination,
  );
  const { title, meta_title, description, image } = index.frontmatter;

  return (
    <>
      <SeoMeta
        title={`${title} — Page ${currentPage}`}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <CourseArchive
        courses={currentCourses}
        title={title}
        description={description}
        currentPage={currentPage}
        totalPages={totalPages}
        section="courses"
      />
    </>
  );
};

export default CoursesPage;
