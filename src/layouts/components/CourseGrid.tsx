import CourseCard from "@/components/CourseCard";
import Pagination from "@/components/Pagination";
import type { Course } from "@/types";

const CourseGrid = ({
  courses,
  currentPage,
  totalPages,
  section,
}: {
  courses: Course[];
  currentPage: number;
  totalPages: number;
  section: string;
}) => (
  <>
    {courses.length ? (
      <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    ) : (
      <div className="rounded-[24px] border border-border bg-light px-6 py-16 text-center">
        <h2 className="h4">No courses yet</h2>
        <p className="mt-2">New learning experiences are on the way.</p>
      </div>
    )}
    <div className="mt-14">
      <Pagination
        section={section}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  </>
);

export default CourseGrid;
