import CourseFilterControls from "@/components/CourseFilterControls";
import CourseGrid from "@/components/CourseGrid";
import CourseSearchSubmit from "@/components/CourseSearchSubmit";
import type { CourseFilters } from "@/lib/courseData";
import { humanize } from "@/lib/utils/textConverter";
import type { Course } from "@/types";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";

const CourseArchive = ({
  courses,
  title,
  description,
  currentPage,
  totalPages,
  section,
  filters,
  categories,
  levels,
}: {
  courses: Course[];
  title: string;
  description?: string;
  currentPage: number;
  totalPages: number;
  section: string;
  filters: CourseFilters;
  categories: string[];
  levels: string[];
}) => {
  const query = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value),
  ) as Record<string, string>;

  const categoryHref = (category?: string) => {
    const params = new URLSearchParams(query);
    if (category) params.set("category", category);
    else params.delete("category");
    const search = params.toString();
    return `/courses${search ? `?${search}` : ""}`;
  };

  return (
    <>
      <section className="section-ph">
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-white">Find Your Next Course</h1>
          {description && <p className="sr-only">{description}</p>}
          <form
            action="/courses"
            className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
            role="search"
          >
            <label className="relative flex-1">
              <span className="sr-only">Search courses</span>
              <FaMagnifyingGlass className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-text-light" />
              <input
                type="search"
                name="q"
                defaultValue={filters.q}
                placeholder="Search"
                className="h-14 w-full rounded-full border-0 bg-body py-3 pl-12 pr-5 text-text-dark outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <CourseSearchSubmit
              defaultScope={
                filters.scope === "creators" ? "creators" : "courses"
              }
            />
          </form>
        </div>
      </section>

      <section className="section pt-12 lg:pt-16">
        <div className="container">
          <CourseFilterControls
            key={`${filters.level ?? ""}:${filters.category ?? ""}:${filters.sort ?? ""}`}
            q={filters.q}
            scope={filters.scope}
            defaultLevel={filters.level}
            defaultCategory={filters.category}
            defaultSort={filters.sort}
            levels={levels.map((level) => ({
              label: humanize(level),
              value: level,
            }))}
            categories={categories.map((category) => ({
              label: humanize(category),
              value: category,
            }))}
          />

          <nav
            className="mb-12 flex flex-wrap gap-3"
            aria-label="Course categories"
          >
            <Link
              href={categoryHref()}
              className={`rounded-full px-5 py-2.5 text-sm transition ${!filters.category ? "bg-primary text-text-dark" : "bg-light text-text hover:bg-primary"}`}
            >
              Featured
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={categoryHref(category)}
                className={`rounded-full px-5 py-2.5 text-sm transition ${filters.category === category ? "bg-primary text-text-dark" : "bg-light text-text hover:bg-primary"}`}
              >
                {humanize(category)}
              </Link>
            ))}
          </nav>

          <h2 className="mb-7 text-2xl">{title}</h2>
          <CourseGrid
            courses={courses}
            currentPage={currentPage}
            totalPages={totalPages}
            section={section}
            query={query}
          />
        </div>
      </section>
    </>
  );
};

export default CourseArchive;
