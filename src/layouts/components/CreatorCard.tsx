import ImageFallback from "@/helpers/ImageFallback";
import { getCoursesByCreator } from "@/lib/courseData";
import type { CourseCreator } from "@/types";
import Link from "next/link";

const CreatorCard = ({ creator }: { creator: CourseCreator }) => {
  const courses = getCoursesByCreator(creator.slug!);
  const { title, description, image, designation, followers } =
    creator.frontmatter;

  return (
    <article className="flex h-full flex-col items-center rounded-3xl border border-border bg-body p-7 text-center transition duration-300 hover:card-shadow">
      <ImageFallback
        src={image || "/images/avatar.png"}
        fallback="/images/avatar.png"
        width={144}
        height={144}
        alt={title}
        className="size-28 rounded-3xl object-cover"
      />
      <h2 className="mt-6 text-2xl">
        <Link
          className="hover:text-secondary"
          href={`/creators/${creator.slug}`}
        >
          {title}
        </Link>
      </h2>
      {designation && (
        <p className="mt-1 text-sm text-secondary">{designation}</p>
      )}
      {description && (
        <p className="mt-4 grow text-sm leading-6">{description}</p>
      )}
      <div className="mt-6 flex gap-2 text-sm">
        <span className="rounded-full bg-light px-4 py-2">
          {courses.length} {courses.length === 1 ? "course" : "courses"}
        </span>
        <span className="rounded-full bg-light px-4 py-2">
          {followers ?? 0} followers
        </span>
      </div>
    </article>
  );
};

export default CreatorCard;
