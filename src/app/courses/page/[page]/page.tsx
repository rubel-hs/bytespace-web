import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import {
  filterCourses,
  getCategories,
  getCourses,
  getLevels,
  type CourseFilters,
} from "@/lib/courseData";
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
  searchParams,
}: {
  params: Promise<{ page: string }>;
  searchParams: Promise<CourseFilters>;
}) => {
  const { page } = await params;
  const filters = await searchParams;
  const currentPage = Number(page);
  const index = getListPage("courses/_index.md") as RegularPage;
  const courses = filterCourses(getCourses(), filters);
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
        filters={filters}
        categories={getCategories()}
        levels={getLevels()}
      />
    </>
  );
};

export default CoursesPage;
