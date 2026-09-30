import CreatorCard from "@/components/CreatorCard";
import Pagination from "@/components/Pagination";
import type { CourseCreator } from "@/types";

const CreatorArchive = ({
  creators,
  title,
  description,
  currentPage,
  totalPages,
}: {
  creators: CourseCreator[];
  title: string;
  description?: string;
  currentPage: number;
  totalPages: number;
}) => (
  <>
    <section className="course-grid-hero">
      <div className="container relative z-10 py-36 text-white lg:py-44">
        <p className="mb-4 font-secondary text-sm uppercase tracking-[0.22em] text-primary">
          People worth learning from
        </p>
        <h1 className="max-w-3xl text-white">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-white/80">{description}</p>
        )}
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {creators.map((creator) => (
            <CreatorCard key={creator.slug} creator={creator} />
          ))}
        </div>
        <div className="mt-14">
          <Pagination
            section="creators"
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </section>
  </>
);

export default CreatorArchive;
