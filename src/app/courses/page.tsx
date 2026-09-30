import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { getCourses } from "@/lib/courseData";
import CourseArchive from "@/partials/CourseArchive";
import SeoMeta from "@/partials/SeoMeta";
import type { RegularPage } from "@/types";

const Courses = () => {
  const index = getListPage("courses/_index.md") as RegularPage;
  const courses = getCourses();
  const totalPages = Math.ceil(courses.length / config.settings.pagination);
  const currentCourses = courses.slice(0, config.settings.pagination);
  const { title, meta_title, description, image } = index.frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <CourseArchive
        courses={currentCourses}
        title={title}
        description={description}
        currentPage={1}
        totalPages={totalPages}
        section="courses"
      />
    </>
  );
};

export default Courses;
