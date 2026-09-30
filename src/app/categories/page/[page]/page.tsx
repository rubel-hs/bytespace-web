import config from "@/config/config.json";
import { getCategories } from "@/lib/courseData";
import CategoryArchive from "@/partials/CategoryArchive";
import SeoMeta from "@/partials/SeoMeta";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export const generateStaticParams = () => {
  const totalPages = Math.ceil(
    getCategories().length / config.settings.pagination,
  );
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
};

const CategoriesPage = async ({
  params,
}: {
  params: Promise<{ page: string }>;
}) => {
  const currentPage = Number((await params).page);
  const categories = getCategories();
  const totalPages = Math.ceil(categories.length / config.settings.pagination);
  if (
    !Number.isInteger(currentPage) ||
    currentPage < 2 ||
    currentPage > totalPages
  )
    notFound();
  const offset = (currentPage - 1) * config.settings.pagination;
  return (
    <>
      <SeoMeta
        title={`Course Categories — Page ${currentPage}`}
        description="Browse ByteSpace courses by category."
      />
      <CategoryArchive
        categories={categories.slice(
          offset,
          offset + config.settings.pagination,
        )}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default CategoriesPage;
