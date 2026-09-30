import ImageFallback from "@/helpers/ImageFallback";
import { getCourseReviewItems, getCreator, getRating } from "@/lib/courseData";
import { humanize } from "@/lib/utils/textConverter";
import type { Course } from "@/types";
import Link from "next/link";
import {
  FaChartSimple,
  FaRegClock,
  FaRegCommentDots,
  FaStar,
} from "react-icons/fa6";

const formatPrice = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

const CourseCard = ({ course }: { course: Course }) => {
  const { frontmatter, slug } = course;
  const creator = getCreator(frontmatter.course_creator);
  const reviews = getCourseReviewItems(slug!);
  const rating = getRating(reviews);
  const visibleReviewers = reviews.slice(0, 4);
  const remainingLearners = Math.max(
    frontmatter.stats.students - visibleReviewers.length,
    0,
  );

  return (
    <article className="group flex h-full flex-col rounded-[24px] border border-border bg-body p-4 transition duration-300 hover:card-shadow">
      <Link
        href={`/courses/${slug}`}
        className="relative block overflow-hidden rounded-[18px] bg-light"
      >
        <ImageFallback
          src={frontmatter.image || "/images/image-placeholder.png"}
          fallback="/images/image-placeholder.png"
          alt={frontmatter.title}
          width={512}
          height={293}
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          className="aspect-[512/293] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-2 text-[11px] text-text-dark">
          <span className="rounded-full bg-body/90 px-3 py-1.5 backdrop-blur-sm">
            {frontmatter.stats.lesson_count} lessons
          </span>
          <span className="rounded-full bg-body/90 px-3 py-1.5 backdrop-blur-sm">
            <FaRegClock className="mr-1 inline" />
            {frontmatter.stats.duration}
          </span>
          <span className="rounded-full bg-body/90 px-3 py-1.5 backdrop-blur-sm">
            <FaRegCommentDots className="mr-1 inline" />
            {reviews.length} reviews
          </span>
        </div>
      </Link>

      <div className="flex grow flex-col px-1 pb-2 pt-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h2 className="min-w-0 flex-1 text-xl font-semibold leading-tight">
            <Link
              className="transition-colors hover:text-secondary"
              href={`/courses/${slug}`}
            >
              {frontmatter.title}
            </Link>
          </h2>
          <span className="flex shrink-0 items-center gap-1 text-lg text-text">
            {rating ? rating.toFixed(1) : "New"}
            <FaStar className="text-border" />
          </span>
        </div>
        <p className="mt-2 text-sm">
          by{" "}
          <Link
            className="text-secondary hover:underline"
            href={`/creators/${frontmatter.course_creator}`}
          >
            {creator?.frontmatter.title ?? humanize(frontmatter.course_creator)}
          </Link>
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-light px-3 py-2 text-sm">
            <FaChartSimple /> {frontmatter.level}
          </span>
          {visibleReviewers.length > 0 && (
            <div
              className="flex items-center -space-x-2"
              aria-label={`${visibleReviewers.length} learner profiles${remainingLearners ? ` and ${remainingLearners} more learners` : ""}`}
            >
              {visibleReviewers.map((review) => (
                <ImageFallback
                  key={`${review.reviewer_name}-${review.date}`}
                  src={review.reviewer_image || "/images/avatar.png"}
                  fallback="/images/avatar.png"
                  alt={review.reviewer_name}
                  title={review.reviewer_name}
                  width={36}
                  height={36}
                  className="size-9 rounded-full border-2 border-body object-cover"
                />
              ))}
              {remainingLearners > 0 && (
                <span className="relative flex h-9 min-w-9 items-center justify-center rounded-full border-2 border-body bg-primary px-2 text-xs font-medium text-text-dark">
                  {remainingLearners}+
                </span>
              )}
            </div>
          )}
        </div>

        <p className="mt-5 text-sm">
          <strong className="font-secondary text-2xl text-secondary">
            {formatPrice(frontmatter.price.amount, frontmatter.price.currency)}
          </strong>
          /{frontmatter.price.billing_label}
        </p>
      </div>
    </article>
  );
};

export default CourseCard;
