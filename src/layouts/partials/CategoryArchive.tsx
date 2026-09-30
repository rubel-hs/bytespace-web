import Pagination from "@/components/Pagination";
import { getCoursesByCategory } from "@/lib/courseData";
import { humanize } from "@/lib/utils/textConverter";
import Link from "next/link";
import { FaArrowRight, FaLayerGroup } from "react-icons/fa6";

const CategoryArchive = ({
  categories,
  currentPage,
  totalPages,
}: {
  categories: string[];
  currentPage: number;
  totalPages: number;
}) => (
  <>
    <section className="section-ph">
      <div className="container relative z-10 text-white">
        <p className="mb-4 font-secondary text-sm uppercase tracking-[0.22em] text-primary">
          Find your path
        </p>
        <h1 className="text-white">Course categories</h1>
        <p className="mt-5 max-w-2xl text-lg text-white/80">
          Browse focused learning paths and find the next skill you want to
          master.
        </p>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const count = getCoursesByCategory(category).length;
            return (
              <Link
                key={category}
                href={`/categories/${category}`}
                className="group rounded-[24px] border border-border p-7 transition duration-300 hover:border-secondary hover:card-shadow"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-text-dark">
                  <FaLayerGroup />
                </span>
                <h2 className="mt-6 text-2xl">{humanize(category)}</h2>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span>
                    {count} {count === 1 ? "course" : "courses"}
                  </span>
                  <FaArrowRight className="transition-colors group-hover:text-secondary" />
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-14">
          <Pagination
            section="categories"
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </section>
  </>
);

export default CategoryArchive;
