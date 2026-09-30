import ImageFallback from "@/helpers/ImageFallback";
import type { Course, CourseCreator } from "@/types";
import Link from "next/link";
import {
  FaAward,
  FaFolderOpen,
  FaHandshakeAngle,
  FaVideo,
} from "react-icons/fa6";

const includeIcons = [FaFolderOpen, FaVideo, FaAward, FaHandshakeAngle];

const CourseSidebar = ({
  course,
  creator,
}: {
  course: Course;
  creator?: CourseCreator;
}) => {
  const { featured_lessons, includes, price, stats } = course.frontmatter;
  const priceLabel = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    maximumFractionDigits: 0,
  }).format(price.amount);

  return (
    <aside className="rounded-[28px] border border-border bg-body p-6 text-text shadow-lg lg:p-8">
      <h2 className="text-xl font-semibold">
        {stats.lesson_count} lessons ({stats.duration})
      </h2>
      <ol className="mt-6 space-y-4">
        {featured_lessons?.map((lesson, index) => (
          <li
            key={lesson.title}
            className="grid grid-cols-[28px_1fr_auto] gap-2 text-sm leading-tight"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="font-medium text-text-dark">{lesson.title}</span>
            <span className="text-xs text-secondary">{lesson.duration}</span>
          </li>
        ))}
      </ol>
      {stats.lesson_count > (featured_lessons?.length ?? 0) && (
        <p className="mt-4 text-sm">
          {stats.lesson_count - (featured_lessons?.length ?? 0)} more lessons
        </p>
      )}

      <p className="mt-7 text-sm leading-6">
        Ready to dive in? Enroll now and start building your future.
      </p>
      <p className="mt-5">
        <strong className="font-secondary text-3xl font-semibold text-secondary">
          {priceLabel}
        </strong>
        /{price.billing_label}
      </p>
      <a
        href="#enroll"
        className="mt-5 block rounded-full bg-primary px-6 py-3 text-center font-medium text-text-dark transition hover:brightness-95"
      >
        Enroll now
      </a>

      <h3 className="mt-7 text-lg font-semibold">This course includes</h3>
      <ul className="mt-5 space-y-4 text-sm">
        {includes?.map((item, index) => {
          const Icon = includeIcons[index % includeIcons.length];
          return (
            <li key={item} className="flex items-center gap-3">
              <Icon className="text-secondary" />
              {item}
            </li>
          );
        })}
      </ul>

      {creator && (
        <div className="mt-7 border-t border-border pt-6">
          <div className="flex items-center gap-4">
            <ImageFallback
              src={creator.frontmatter.image || "/images/avatar.png"}
              fallback="/images/avatar.png"
              width={56}
              height={56}
              alt={creator.frontmatter.title}
              className="size-14 rounded-full object-cover"
            />
            <div>
              <h3 className="text-base font-semibold">
                {creator.frontmatter.title}
              </h3>
              <p className="text-sm">{creator.frontmatter.designation}</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-6">
            {creator.frontmatter.description}
          </p>
          <Link
            href={`/creators/${creator.slug}`}
            className="mt-5 inline-block rounded-full border border-border px-4 py-2 text-sm text-text-dark hover:border-secondary hover:text-secondary"
          >
            See full profile
          </Link>
        </div>
      )}
    </aside>
  );
};

export default CourseSidebar;
