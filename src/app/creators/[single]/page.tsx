import config from "@/config/config.json";
import { getCourseCreators, getCoursesByCreator } from "@/lib/courseData";
import CreatorProfile from "@/partials/CreatorProfile";
import SeoMeta from "@/partials/SeoMeta";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export const generateStaticParams = () =>
  getCourseCreators().map((creator) => ({ single: creator.slug! }));

const CreatorSingle = async ({
  params,
}: {
  params: Promise<{ single: string }>;
}) => {
  const { single } = await params;
  const creator = getCourseCreators().find((item) => item.slug === single);
  if (!creator) notFound();
  const allCourses = getCoursesByCreator(single);
  const totalPages = Math.ceil(allCourses.length / config.settings.pagination);
  const { title, meta_title, description, image } = creator.frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <CreatorProfile
        creator={creator}
        courses={allCourses.slice(0, config.settings.pagination)}
        courseCount={allCourses.length}
        currentPage={1}
        totalPages={totalPages}
      />
    </>
  );
};

export default CreatorSingle;
