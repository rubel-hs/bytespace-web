import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { getCourseCreators } from "@/lib/courseData";
import CreatorArchive from "@/partials/CreatorArchive";
import SeoMeta from "@/partials/SeoMeta";
import type { RegularPage } from "@/types";

const Creators = () => {
  const index = getListPage("course_creators/_index.md") as RegularPage;
  const creators = getCourseCreators();
  const totalPages = Math.ceil(creators.length / config.settings.pagination);
  const { title, meta_title, description, image } = index.frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <CreatorArchive
        creators={creators.slice(0, config.settings.pagination)}
        title={title}
        description={description}
        currentPage={1}
        totalPages={totalPages}
      />
    </>
  );
};

export default Creators;
