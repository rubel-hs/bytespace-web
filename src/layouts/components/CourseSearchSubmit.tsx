"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

type SearchScope = "courses" | "creators";

const CourseSearchSubmit = ({
  defaultScope = "courses",
}: {
  defaultScope?: SearchScope;
}) => {
  const [scope, setScope] = useState<SearchScope>(defaultScope);

  return (
    <div className="relative z-20 flex h-14 rounded-full bg-primary text-text-dark transition focus-within:ring-2 focus-within:ring-body">
      <button
        type="submit"
        name="scope"
        value={scope}
        className="min-w-28 grow rounded-l-full px-6 text-center font-medium transition-colors hover:bg-dark/5 focus-visible:outline-none sm:min-w-32"
      >
        {scope === "creators" ? "Creators" : "Courses"}
      </button>

      <div className="group/menu relative w-12 shrink-0">
        <button
          type="button"
          aria-label="Choose search type"
          className="flex size-full items-center justify-center rounded-r-full border-l border-text-dark/10 transition-colors hover:bg-dark/5 focus-visible:outline-none"
        >
          <FaChevronDown className="text-xs transition-transform group-hover/menu:rotate-180" />
        </button>

        <div className="absolute right-0 top-full hidden min-w-44 pt-2 group-hover/menu:block group-focus-within/menu:block">
          <div className="space-y-1.5 overflow-hidden rounded-lg bg-body p-1.5 text-left shadow-lg ring-1 ring-dark/5">
            <button
              type="submit"
              name="scope"
              value="courses"
              onClick={() => setScope("courses")}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark ${
                scope === "courses"
                  ? "bg-dark text-white hover:bg-text-dark"
                  : "bg-light text-text-dark hover:bg-border"
              }`}
            >
              Search Courses
            </button>
            <button
              type="submit"
              name="scope"
              value="creators"
              onClick={() => setScope("creators")}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark ${
                scope === "creators"
                  ? "bg-dark text-white hover:bg-text-dark"
                  : "bg-light text-text-dark hover:bg-border"
              }`}
            >
              Search Creators
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSearchSubmit;
