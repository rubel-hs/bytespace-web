"use client";

import ImageFallback from "@/helpers/ImageFallback";
import type { CourseReview } from "@/types";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

const reviewBreakdown = [
  { stars: 5, count: 720, width: "88%" },
  { stars: 4, count: 120, width: "36%" },
  { stars: 3, count: 21, width: "20%" },
  { stars: 2, count: 12, width: "8%" },
  { stars: 1, count: 16, width: "12%" },
];

const filters = ["all", 5, 4, 3, 2, 1] as const;
type RatingFilter = (typeof filters)[number];

const CourseReviews = ({
  title,
  reviews,
}: {
  title: string;
  reviews: CourseReview[];
}) => {
  const [selectedRating, setSelectedRating] = useState<RatingFilter>("all");
  const filteredReviews =
    selectedRating === "all"
      ? reviews
      : reviews.filter((review) => review.rating === selectedRating);

  return (
    <div>
      <h2 className="text-xl font-semibold">What Learners Are Saying</h2>
      <p className="mt-5 leading-7">
        Discover what our learners have to say about their experience with
        &lsquo;{title}&rsquo;. Read reviews and ratings from individuals who
        have embarked on the transformative journey of mastering digital asset
        creation.
      </p>

      <div className="mt-7 flex flex-col gap-6 rounded-[20px] border border-border p-6 sm:flex-row sm:items-center lg:p-8">
        <div className="flex size-28 shrink-0 flex-col items-center justify-center rounded-lg bg-primary text-text-dark">
          <span className="text-sm">Ratings</span>
          <strong className="font-secondary text-4xl font-semibold">4.7</strong>
        </div>
        <div className="grow space-y-2.5">
          {reviewBreakdown.map((row) => (
            <div
              key={row.stars}
              className="grid grid-cols-[minmax(90px,1fr)_auto_32px] items-center gap-3"
            >
              <div className="h-2 overflow-hidden rounded-full bg-light">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: row.width }}
                />
              </div>
              <span
                className="flex gap-1 text-sm"
                aria-label={`${row.stars} stars`}
              >
                {Array.from({ length: 5 }, (_, index) =>
                  index < row.stars ? (
                    <FaStar key={index} className="text-text-dark" />
                  ) : (
                    <FaRegStar key={index} className="text-border" />
                  ),
                )}
              </span>
              <span className="text-right text-xs">{row.count}</span>
            </div>
          ))}
        </div>
      </div>

      <h3 className="mt-7 text-lg font-semibold">Individual Reviews:</h3>
      <div className="mt-5 flex flex-wrap gap-3" aria-label="Filter reviews">
        {filters.map((filter) => {
          const isSelected = selectedRating === filter;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isSelected}
              aria-controls="course-review-list"
              onClick={() => setSelectedRating(filter)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${isSelected ? "bg-primary text-text-dark" : "bg-light text-text hover:bg-border"}`}
            >
              {filter !== "all" && <FaStar className="mr-1.5 inline" />}
              {filter === "all" ? "All ratings" : filter}
            </button>
          );
        })}
      </div>

      <div id="course-review-list" className="mt-6 space-y-5">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <article
              key={`${review.reviewer_name}-${review.date}`}
              className="rounded-[20px] border border-border p-6 transition-shadow duration-300 hover:card-shadow lg:p-8"
            >
              <div className="flex items-center gap-4">
                <ImageFallback
                  src={review.reviewer_image || "/images/avatar.png"}
                  fallback="/images/avatar.png"
                  width={52}
                  height={52}
                  alt={review.reviewer_name}
                  className="size-13 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-base font-semibold">
                    {review.reviewer_name}
                  </h3>
                  <p className="text-sm">{review.reviewer_role}</p>
                </div>
                <time
                  className="ml-auto text-xs text-text-light"
                  dateTime={review.date}
                >
                  a year ago
                </time>
              </div>
              <p
                className="mt-5 flex gap-1 text-text-dark"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }, (_, index) =>
                  index < review.rating ? (
                    <FaStar key={index} />
                  ) : (
                    <FaRegStar key={index} className="text-border" />
                  ),
                )}
              </p>
              <p className="mt-5 leading-7">&ldquo;{review.content}&rdquo;</p>
            </article>
          ))
        ) : (
          <div
            role="status"
            className="rounded-[20px] border border-border bg-light px-6 py-12 text-center"
          >
            <h3 className="text-base font-semibold">
              No {selectedRating}-star reviews yet
            </h3>
            <p className="mt-2 text-sm">
              Choose another rating to see more learner feedback.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseReviews;
