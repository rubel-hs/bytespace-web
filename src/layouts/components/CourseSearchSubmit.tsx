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
        className="btn-search-submit"
      >
        {scope === "creators" ? "Creators" : "Courses"}
      </button>

      <div className="group/menu relative w-12 shrink-0">
        <button
          type="button"
          aria-label="Choose search type"
          className="btn-search-toggle"
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
              className={`btn-menu-item ${scope === "courses" ? "btn-menu-item-active" : ""}`}
            >
              Search Courses
            </button>
            <button
              type="submit"
              name="scope"
              value="creators"
              onClick={() => setScope("creators")}
              className={`btn-menu-item ${scope === "creators" ? "btn-menu-item-active" : ""}`}
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
