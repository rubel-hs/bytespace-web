"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

type SearchScope = "courses" | "all";

const CourseSearchSubmit = ({
  defaultScope = "courses",
}: {
  defaultScope?: SearchScope;
}) => {
  const [scope, setScope] = useState<SearchScope>(defaultScope);

  return (
    <div className="flex h-14 overflow-hidden rounded-full bg-primary text-text-dark transition focus-within:ring-2 focus-within:ring-body hover:brightness-95">
      <button
        type="submit"
        className="min-w-28 grow px-6 text-center font-medium sm:min-w-32"
      >
        {scope === "all" ? "All" : "Courses"}
      </button>
      <label className="relative flex w-12 shrink-0 cursor-pointer items-center justify-center border-l border-text-dark/10">
        <span className="sr-only">Search scope</span>
        <select
          name="scope"
          value={scope}
          onChange={(event) => setScope(event.target.value as SearchScope)}
          className="absolute inset-0 size-full cursor-pointer appearance-none opacity-0"
          aria-label="Search scope"
        >
          <option value="courses">Courses</option>
          <option value="all">All</option>
        </select>
        <FaChevronDown className="pointer-events-none text-xs" />
      </label>
    </div>
  );
};

export default CourseSearchSubmit;
