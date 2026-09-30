import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { getCourseCreators } from "@/lib/courseData";
import CreatorArchive from "@/partials/CreatorArchive";
import SeoMeta from "@/partials/SeoMeta";
import type { RegularPage } from "@/types";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export const generateStaticParams = () => {
  const totalPages = Math.ceil(
    getCourseCreators().length / config.settings.pagination,
  );
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
};

const CreatorsPage = async ({
  params,
}: {
  params: Promise<{ page: string }>;
}) => {
  const currentPage = Number((await params).page);
  const index = getListPage("course_creators/_index.md") as RegularPage;
  const creators = getCourseCreators();
  const totalPages = Math.ceil(creators.length / config.settings.pagination);
  if (
    !Number.isInteger(currentPage) ||
    currentPage < 2 ||
    currentPage > totalPages
  )
    notFound();
  const offset = (currentPage - 1) * config.settings.pagination;
  const { title, meta_title, description, image } = index.frontmatter;

  return (
    <>
      <SeoMeta
        title={`${title} — Page ${currentPage}`}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <CreatorArchive
        creators={creators.slice(offset, offset + config.settings.pagination)}
        title={title}
        description={description}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default CreatorsPage;
