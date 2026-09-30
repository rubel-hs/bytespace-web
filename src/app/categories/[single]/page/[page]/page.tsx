import config from "@/config/config.json";
import { getCategories, getCoursesByCategory } from "@/lib/courseData";
import { humanize } from "@/lib/utils/textConverter";
import CourseArchive from "@/partials/CourseArchive";
import SeoMeta from "@/partials/SeoMeta";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export const generateStaticParams = () =>
  getCategories().flatMap((single) => {
    const totalPages = Math.ceil(
      getCoursesByCategory(single).length / config.settings.pagination,
    );
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
      single,
      page: String(index + 2),
    }));
  });

const CategoryCoursesPage = async ({
  params,
}: {
  params: Promise<{ single: string; page: string }>;
}) => {
  const { single, page } = await params;
  const currentPage = Number(page);
  const courses = getCoursesByCategory(single);
  const totalPages = Math.ceil(courses.length / config.settings.pagination);
  if (
    !Number.isInteger(currentPage) ||
    currentPage < 2 ||
    currentPage > totalPages
  )
    notFound();
  const offset = (currentPage - 1) * config.settings.pagination;
  const title = `${humanize(single)} courses`;
  return (
    <>
      <SeoMeta
        title={`${title} — Page ${currentPage}`}
        description={`Explore ${humanize(single)} courses from ByteSpace creators.`}
      />
      <CourseArchive
        courses={courses.slice(offset, offset + config.settings.pagination)}
        title={title}
        description={`Build practical ${humanize(single).toLowerCase()} skills with focused courses from expert creators.`}
        currentPage={currentPage}
        totalPages={totalPages}
        section={`categories/${single}`}
      />
    </>
  );
};

export default CategoryCoursesPage;
