import CourseVideo from "@/components/CourseVideo";
import MDXContent from "@/helpers/MDXContent";
import CourseReviews from "@/components/CourseReviews";
import {
  getCourseCreators,
  getCourseReviewItems,
  getCourses,
  getRating,
} from "@/lib/courseData";
import CourseSidebar from "@/partials/CourseSidebar";
import SeoMeta from "@/partials/SeoMeta";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FaChartSimple,
  FaShareNodes,
  FaStar,
  FaUsers,
  FaVideo,
} from "react-icons/fa6";

export const dynamicParams = false;

export const generateStaticParams = () =>
  getCourses().map((course) => ({ single: course.slug! }));

const CourseSingle = async ({
  params,
  searchParams,
}: {
  params: Promise<{ single: string }>;
  searchParams: Promise<{ tab?: string }>;
}) => {
  const { single } = await params;
  const requestedTab = (await searchParams).tab;
  const activeTab = ["about", "lessons", "reviews"].includes(requestedTab ?? "")
    ? requestedTab!
    : "about";
  const course = getCourses().find((item) => item.slug === single);
  if (!course) notFound();

  const creator = getCourseCreators().find(
    (item) => item.slug === course.frontmatter.course_creator,
  );
  const reviews = getCourseReviewItems(single);
  const rating = getRating(reviews);
  const { frontmatter, content } = course;
  const { title, meta_title, description, image, level, stats, modules } =
    frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <section className="section-ph overflow-visible text-white">
        <div className="container relative z-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="max-w-4xl text-h2-sm font-semibold text-white lg:text-h2">
                {title}
              </h1>
              {description && (
                <p className="mt-2 text-lg font-medium text-white/90">
                  {description}
                </p>
              )}
              {creator && (
                <p className="mt-6">
                  by{" "}
                  <Link
                    className="font-medium text-primary hover:underline"
                    href={`/creators/${creator.slug}`}
                  >
                    {creator.frontmatter.title}
                  </Link>
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-text-dark">
                <span className="rounded-full bg-body px-5 py-2">
                  <FaChartSimple className="mr-2 inline text-secondary" />
                  {level}
                </span>
                <span className="rounded-full bg-body px-5 py-2">
                  <FaStar className="mr-2 inline text-secondary" />
                  {rating ? rating.toFixed(1) : "New"} ({reviews.length}{" "}
                  reviews)
                </span>
                <span className="rounded-full bg-body px-5 py-2">
                  <FaUsers className="mr-2 inline text-secondary" />
                  {stats.students} students
                </span>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary self-start gap-2 py-3"
            >
              <FaShareNodes /> Share
            </button>
          </div>

          <div className="relative mt-14 pb-4">
            <div className="lg:w-[calc(66.666%-1.25rem)]">
              <CourseVideo title={title} />
            </div>
            <div className="mt-8 lg:absolute lg:right-0 lg:top-0 lg:z-10 lg:mt-0 lg:w-[calc(33.333%-1.25rem)]">
              <CourseSidebar course={course} creator={creator} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="lg:w-[calc(66.666%-1.75rem)]">
            <nav
              aria-label="Course sections"
              className="mb-9 flex flex-wrap gap-3"
            >
              {[
                ["about", "About"],
                ["lessons", "Lessons"],
                ["reviews", "Reviews"],
              ].map(([tab, label]) => (
                <Link
                  key={tab}
                  href={`/courses/${single}?tab=${tab}`}
                  scroll={false}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${activeTab === tab ? "bg-primary text-text-dark" : "bg-light text-text"}`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {activeTab === "about" && (
              <div className="content course-content">
                <MDXContent content={content} />
              </div>
            )}

            {activeTab === "lessons" && (
              <div>
                <h2 className="text-xl font-semibold">Explore the Modules</h2>
                <p className="mt-5 leading-7">
                  Immerse yourself in the course content as we break down each
                  module into comprehensive lessons, providing practical
                  insights and hands-on experiences.
                </p>

                <h3 className="mt-7 text-lg font-semibold">Lesson List</h3>
                <div className="mt-5 space-y-5">
                  {modules?.map((module, index) => (
                    <article
                      key={module.title}
                      className="flex items-start gap-5"
                    >
                      <span className="flex size-14 shrink-0 items-center justify-center rounded-[18px] bg-primary text-xl text-text-dark">
                        <FaVideo aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="text-base font-medium">
                          Module {index + 1}: {module.title}
                        </h4>
                        <p className="mt-1 text-sm leading-6">
                          {module.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                <h3 className="mt-8 text-lg font-semibold">Lesson Content</h3>
                <p className="mt-4 leading-7">
                  Engage with each lesson through captivating video content,
                  detailed textual explanations, and interactive elements.
                  Download resources, complete assignments, and test your
                  understanding with quizzes.
                </p>

                <h3 className="mt-8 text-lg font-semibold">
                  Lesson Progress Tracking
                </h3>
                <p className="mt-4 leading-7">
                  Witness your growth as you complete lessons, with an intuitive
                  progress tracking feature guiding you through your learning
                  journey.
                </p>
                <div className="mt-10 rounded-[20px] border border-border p-6">
                  <p className="text-sm">Learning progress</p>
                  <strong className="mt-2 block font-secondary text-3xl text-text-dark">
                    55%
                  </strong>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-light">
                    <div className="h-full w-[55%] rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <CourseReviews title={title} reviews={reviews} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseSingle;
