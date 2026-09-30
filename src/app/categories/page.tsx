import config from "@/config/config.json";
import { getCategories } from "@/lib/courseData";
import CategoryArchive from "@/partials/CategoryArchive";
import SeoMeta from "@/partials/SeoMeta";

const Categories = () => {
  const categories = getCategories();
  const totalPages = Math.ceil(categories.length / config.settings.pagination);
  return (
    <>
      <SeoMeta
        title="Course Categories"
        description="Browse ByteSpace courses by category."
      />
      <CategoryArchive
        categories={categories.slice(0, config.settings.pagination)}
        currentPage={1}
        totalPages={totalPages}
      />
    </>
  );
};

export default Categories;
