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

export const getCoursesByCategory = (categorySlug: string) =>
  getCourses().filter(
    (course) => slugify(course.frontmatter.category) === categorySlug,
  );
