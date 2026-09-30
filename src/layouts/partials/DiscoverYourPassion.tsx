import CourseCard from "@/components/CourseCard";
import CourseCategoryFilter from "@/components/CourseCategoryFilter";
import { slugify, markdownify } from "@/lib/utils/textConverter";
import type { Course } from "@/types";

const DiscoverYourPassion = ({
  data,
  courses,
  categories,
}: {
  data: { title: string; content: string };
  courses: Course[];
  categories: string[];
}) => {
  return (
    <section className="section">
      <div className="container">
        <div className="section-container">
          <div className="section-intro centralize">
            <h2
              className="title hasHighlight"
              dangerouslySetInnerHTML={markdownify(data.title)}
            />
            <p
              className="subtitle"
              dangerouslySetInnerHTML={markdownify(data.content)}
            />
          </div>
          <div className="section-content">
            <CourseCategoryFilter
              categories={categories}
              courseCategories={courses.map((course) =>
                slugify(course.frontmatter.category),
              )}
            >
              {courses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </CourseCategoryFilter>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverYourPassion;
