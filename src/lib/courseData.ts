import { getSinglePage } from "@/lib/contentParser";
import { slugify } from "@/lib/utils/textConverter";
import type {
  Course,
  CourseCreator,
  CourseReview,
  CourseReviewCollection,
} from "@/types";

export const getCourses = () => getSinglePage("courses") as Course[];

export const getCourseCreators = () =>
  getSinglePage("course_creators") as CourseCreator[];

export const getCourseReviews = () =>
  getSinglePage("course_reviews") as CourseReviewCollection[];

export const getCreator = (slug: string) =>
  getCourseCreators().find((creator) => creator.slug === slug);

export const getCoursesByCreator = (creatorSlug: string) =>
  getCourses().filter(
    (course) => course.frontmatter.course_creator === creatorSlug,
  );

export const getCourseReviewItems = (courseSlug: string): CourseReview[] =>
  getCourseReviews().find(
    (collection) => collection.frontmatter.course === courseSlug,
  )?.frontmatter.reviews ?? [];

export const getRating = (reviews: CourseReview[]) => {
  if (!reviews.length) return 0;
  return (
    reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
  );
};

export const getCategories = () =>
  Array.from(
    new Set(getCourses().map((course) => slugify(course.frontmatter.category))),
  );

export const getLevels = () =>
  Array.from(
    new Set(getCourses().map((course) => slugify(course.frontmatter.level))),
  );

export const getCoursesByCategory = (categorySlug: string) =>
  getCourses().filter(
    (course) => slugify(course.frontmatter.category) === categorySlug,
  );

export type CourseFilters = {
  q?: string;
  scope?: "courses" | "all";
  level?: string;
  category?: string;
  sort?: string;
};

export const filterCourses = (courses: Course[], filters: CourseFilters) => {
  const query = filters.q?.trim().toLowerCase();
  const filteredCourses = courses.filter((course) => {
    const creator = getCreator(course.frontmatter.course_creator);
    const courseText = [
      course.frontmatter.title,
      course.frontmatter.description,
      course.frontmatter.category,
      course.frontmatter.level,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const searchableText =
      filters.scope === "all"
        ? `${courseText} ${creator?.frontmatter.title ?? ""}`
            .trim()
            .toLowerCase()
        : courseText;

    return (
      (!query || searchableText.includes(query)) &&
      (!filters.level || slugify(course.frontmatter.level) === filters.level) &&
      (!filters.category ||
        slugify(course.frontmatter.category) === filters.category)
    );
  });

  return filteredCourses.toSorted((a, b) => {
    switch (filters.sort) {
      case "popular":
        return b.frontmatter.stats.students - a.frontmatter.stats.students;
      case "price-low":
        return a.frontmatter.price.amount - b.frontmatter.price.amount;
      case "price-high":
        return b.frontmatter.price.amount - a.frontmatter.price.amount;
      default:
        return 0;
    }
  });
};
