import CourseGrid from "@/components/CourseGrid";
import type { Course } from "@/types";
import {
  FaArrowDownWideShort,
  FaChartSimple,
  FaLayerGroup,
  FaSliders,
} from "react-icons/fa6";

const CourseArchive = ({
  courses,
  title,
  description,
  currentPage,
  totalPages,
  section,
}: {
  courses: Course[];
  title: string;
  description?: string;
  currentPage: number;
  totalPages: number;
  section: string;
}) => (
  <>
    <section className="course-grid-hero">
      <div className="container relative z-10 py-36 text-white lg:py-44">
        <p className="mb-4 font-secondary text-sm uppercase tracking-[0.22em] text-primary">
          Learn without limits
        </p>
        <h1 className="max-w-3xl text-white">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-white/80">{description}</p>
        )}
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            <span className="course-filter">
              <FaSliders /> Filter
            </span>
            <span className="course-filter">
              <FaChartSimple /> Level
            </span>
            <span className="course-filter">
              <FaLayerGroup /> Category
            </span>
          </div>
          <span className="course-filter self-start sm:self-auto">
            <FaArrowDownWideShort /> Most relevant
          </span>
        </div>
        <CourseGrid
          courses={courses}
          currentPage={currentPage}
          totalPages={totalPages}
          section={section}
        />
      </div>
    </section>
  </>
);

export default CourseArchive;
