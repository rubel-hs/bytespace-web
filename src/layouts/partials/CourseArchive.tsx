import CourseGrid from "@/components/CourseGrid";
import CourseSearchSubmit from "@/components/CourseSearchSubmit";
import type { CourseFilters } from "@/lib/courseData";
import { humanize } from "@/lib/utils/textConverter";
import type { Course } from "@/types";
import Link from "next/link";
import {
  FaArrowDownWideShort,
  FaChartSimple,
  FaChevronDown,
  FaLayerGroup,
  FaMagnifyingGlass,
  FaSliders,
} from "react-icons/fa6";

const CourseArchive = ({
  courses,
  title,
  description,
  currentPage,
  totalPages,
  section,
  filters,
  categories,
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
              defaultScope={filters.scope === "all" ? "all" : "courses"}
            />
          </form>
        </div>
      </section>

      <section className="section pt-12 lg:pt-16">
        <div className="container">
          <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              <span className="course-filter">
                <FaSliders /> Filter
              </span>
              <span className="course-filter">
                <FaChartSimple /> Level{" "}
                <FaChevronDown className="text-[10px]" />
              </span>
              <span className="course-filter">
                <FaLayerGroup /> Category
                <FaChevronDown className="text-[10px]" />
              </span>
            </div>
            <span className="course-filter self-start lg:self-auto">
              <FaArrowDownWideShort /> Most relevant
              <FaChevronDown className="text-[10px]" />
            </span>
          </div>

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

          <div className="mb-7 flex items-center justify-between gap-4">
            <h2 className="text-2xl">{title}</h2>
            <p className="text-sm text-text-light">
              {courses.length} {courses.length === 1 ? "course" : "courses"} on
              this page
            </p>
          </div>
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
