import CourseGrid from "@/components/CourseGrid";
import ImageFallback from "@/helpers/ImageFallback";
import type { Course, CourseCreator } from "@/types";

const CreatorProfile = ({
  creator,
  courses,
  courseCount,
  currentPage,
  totalPages,
}: {
  creator: CourseCreator;
  courses: Course[];
  courseCount: number;
  currentPage: number;
  totalPages: number;
}) => {
  const { title, description, image, designation, followers, specialties } =
    creator.frontmatter;

  return (
    <>
      <section className="section-ph">
        <div className="container relative z-10 text-white">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
            <ImageFallback
              src={image || "/images/avatar.png"}
              fallback="/images/avatar.png"
              width={144}
              height={144}
              alt={title}
              className="size-28 rounded-[24px] object-cover sm:size-32"
            />
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-white">{title}</h1>
                <span className="rounded-full bg-primary px-5 py-2 font-medium text-text-dark">
                  Creator
                </span>
              </div>
              {designation && (
                <p className="mt-2 text-lg text-white/80">{designation}</p>
              )}
              {specialties?.length ? (
                <p className="mt-2 text-sm text-primary">
                  {specialties.join(" · ")}
                </p>
              ) : null}
            </div>
          </div>
          <div className="mt-9 max-w-4xl text-lg leading-8 text-white/85">
            {creator.content}
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-body px-5 py-2 text-text-dark">
              {courseCount} products
            </span>
            <span className="rounded-full bg-body px-5 py-2 text-text-dark">
              {followers ?? 0} followers
            </span>
            <button
              type="button"
              className="ml-0 rounded-full bg-primary px-7 py-2.5 font-medium text-text-dark sm:ml-auto"
            >
              Follow
            </button>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="mb-10">
            <p className="font-secondary text-sm uppercase tracking-[0.2em] text-secondary">
              Created by {title}
            </p>
            <h2 className="mt-2">Explore the courses</h2>
            {description && <p className="mt-3 max-w-2xl">{description}</p>}
          </div>
          <CourseGrid
            courses={courses}
            currentPage={currentPage}
            totalPages={totalPages}
            section={`creators/${creator.slug}`}
          />
        </div>
      </section>
    </>
  );
};

export default CreatorProfile;
