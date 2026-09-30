"use client";

import type { CourseFilters } from "@/lib/courseData";
import { humanize } from "@/lib/utils/textConverter";
import { useRef } from "react";
import {
  FaArrowDownWideShort,
  FaChartSimple,
  FaChevronDown,
  FaLayerGroup,
  FaSliders,
} from "react-icons/fa6";

const CourseFilterControls = ({
  filters,
  categories,
  levels,
}: {
  filters: CourseFilters;
  categories: string[];
  levels: string[];
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const applyFilters = () => formRef.current?.requestSubmit();

  return (
    <form
      ref={formRef}
      action="/courses"
      className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      {filters.q && <input type="hidden" name="q" value={filters.q} />}
      {filters.scope && (
        <input type="hidden" name="scope" value={filters.scope} />
      )}
      <div className="flex flex-wrap gap-3">
        <button type="submit" className="course-filter hover:border-secondary">
          <FaSliders /> Filter
        </button>
        <label className="course-filter relative pr-3">
          <FaChartSimple />
          <span className="sr-only">Level</span>
          <select
            name="level"
            defaultValue={filters.level ?? ""}
            onChange={applyFilters}
            className="cursor-pointer appearance-none border-0 bg-transparent bg-none! pr-6 outline-none"
          >
            <option value="">Level</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {humanize(level)}
              </option>
            ))}
          </select>
          <FaChevronDown className="pointer-events-none absolute right-3 text-[10px]" />
        </label>
        <label className="course-filter relative pr-3">
          <FaLayerGroup />
          <span className="sr-only">Category</span>
          <select
            name="category"
            defaultValue={filters.category ?? ""}
            onChange={applyFilters}
            className="cursor-pointer appearance-none border-0 bg-transparent bg-none! pr-6 outline-none"
          >
            <option value="">Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {humanize(category)}
              </option>
            ))}
          </select>
          <FaChevronDown className="pointer-events-none absolute right-3 text-[10px]" />
        </label>
      </div>

      <label className="course-filter relative self-start pr-3 lg:self-auto">
        <FaArrowDownWideShort />
        <span className="sr-only">Sort courses</span>
        <select
          name="sort"
          defaultValue={filters.sort ?? "relevant"}
          onChange={applyFilters}
          className="cursor-pointer appearance-none border-0 bg-transparent bg-none! pr-6 outline-none"
        >
          <option value="relevant">Most relevant</option>
          <option value="popular">Most popular</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
        </select>
        <FaChevronDown className="pointer-events-none absolute right-3 text-[10px]" />
      </label>
    </form>
  );
};

export default CourseFilterControls;
