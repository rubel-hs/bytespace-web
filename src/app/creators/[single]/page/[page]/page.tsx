import config from "@/config/config.json";
import { getCourseCreators, getCoursesByCreator } from "@/lib/courseData";
import CreatorProfile from "@/partials/CreatorProfile";
import SeoMeta from "@/partials/SeoMeta";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export const generateStaticParams = () =>
  getCourseCreators().flatMap((creator) => {
    const totalPages = Math.ceil(
      getCoursesByCreator(creator.slug!).length / config.settings.pagination,
    );
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
      single: creator.slug!,
      page: String(index + 2),
    }));
  });

const CreatorCoursesPage = async ({
  params,
}: {
  params: Promise<{ single: string; page: string }>;
}) => {
  const { single, page } = await params;
  const creator = getCourseCreators().find((item) => item.slug === single);
  if (!creator) notFound();
  const currentPage = Number(page);
  const allCourses = getCoursesByCreator(single);
  const totalPages = Math.ceil(allCourses.length / config.settings.pagination);
  if (
    !Number.isInteger(currentPage) ||
    currentPage < 2 ||
    currentPage > totalPages
  )
    notFound();
  const offset = (currentPage - 1) * config.settings.pagination;
  const { title, meta_title, description, image } = creator.frontmatter;

  return (
    <>
      <SeoMeta
        title={`${title} — Page ${currentPage}`}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <CreatorProfile
        creator={creator}
        courses={allCourses.slice(offset, offset + config.settings.pagination)}
        courseCount={allCourses.length}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default CreatorCoursesPage;
