"use client";

import { humanize } from "@/lib/utils/textConverter";
import { Children, type ReactNode, useState } from "react";

const FEATURED_FILTER = "featured";

const CourseCategoryFilter = ({
  categories,
  courseCategories,
  children,
}: {
  categories: string[];
  courseCategories: string[];
  children: ReactNode;
}) => {
  const [activeFilter, setActiveFilter] = useState(FEATURED_FILTER);
  const courseCards = Children.toArray(children);
  const visibleCards = courseCards
    .filter(
      (_, index) =>
        activeFilter === FEATURED_FILTER ||
        courseCategories[index] === activeFilter,
    )
    .slice(0, 6);

  return (
    <div className="space-y-12">
      <div
        className="flex flex-wrap justify-center gap-3"
        aria-label="Filter featured courses by category"
      >
        {[FEATURED_FILTER, ...categories].map((category) => {
          const isActive = category === activeFilter;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(category)}
              className={`rounded-full px-5 py-2.5 text-sm transition ${
                isActive
                  ? "bg-primary text-text-dark"
                  : "bg-light text-text hover:bg-primary hover:text-text-dark"
              }`}
            >
              {humanize(category)}
            </button>
          );
        })}
      </div>

      <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {visibleCards}
      </div>
    </div>
  );
};

export default CourseCategoryFilter;
