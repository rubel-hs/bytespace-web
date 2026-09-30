import config from "@/config/config.json";
import {
  getCategories,
  getCoursesByCategory,
  getLevels,
} from "@/lib/courseData";
import { humanize } from "@/lib/utils/textConverter";
import CourseArchive from "@/partials/CourseArchive";
import SeoMeta from "@/partials/SeoMeta";

export const dynamicParams = false;
export const generateStaticParams = () =>
  getCategories().map((single) => ({ single }));

const CategorySingle = async (props: {
  params: Promise<{ single: string }>;
}) => {
  const { single } = await props.params;
  const courses = getCoursesByCategory(single);
  const totalPages = Math.ceil(courses.length / config.settings.pagination);
  const title = `${humanize(single)} courses`;

  return (
    <>
      <SeoMeta
        title={title}
        description={`Explore ${humanize(single)} courses from ByteSpace creators.`}
      />
      <CourseArchive
        courses={courses.slice(0, config.settings.pagination)}
        title={title}
        description={`Build practical ${humanize(single).toLowerCase()} skills with focused courses from expert creators.`}
        currentPage={1}
        totalPages={totalPages}
        section={`categories/${single}`}
        filters={{ category: single }}
        categories={getCategories()}
        levels={getLevels()}
      />
    </>
  );
};

export default CategorySingle;
