"use client";

import { type ReactNode, useRef, useState } from "react";
import {
  FaArrowDownWideShort,
  FaArrowRotateLeft,
  FaChartSimple,
  FaChevronDown,
  FaLayerGroup,
} from "react-icons/fa6";

type FilterOption = {
  label: string;
  value: string;
};

const FilterDropdown = ({
  name,
  label,
  value,
  options,
  icon,
  align = "left",
  onChange,
}: {
  name: string;
  label: string;
  value: string;
  options: FilterOption[];
  icon: ReactNode;
  align?: "left" | "right";
  onChange: (value: string) => void;
}) => {
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? label;

  return (
    <div className="group/menu relative z-20 shrink-0">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        aria-label={`${label}: ${selectedLabel}`}
        aria-haspopup="menu"
        className="course-filter min-w-max cursor-pointer focus-visible:outline-none"
      >
        {icon}
        <span>{selectedLabel}</span>
        <FaChevronDown className="ml-1 text-[10px] transition-transform group-hover/menu:rotate-180" />
      </button>

      <div
        className={`absolute top-full hidden min-w-48 pt-2 group-hover/menu:block group-focus-within/menu:block ${
          align === "right" ? "right-0" : "left-0"
        }`}
      >
        <div
          className="space-y-1.5 overflow-hidden rounded-lg bg-body p-1.5 text-left shadow-lg ring-1 ring-dark/5"
          role="menu"
          aria-label={label}
        >
          <button
            type="button"
            role="menuitemradio"
            aria-checked={!value}
            onClick={() => onChange("")}
            className={`block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark ${
              !value
                ? "bg-dark text-white hover:bg-text-dark"
                : "bg-light text-text-dark hover:bg-border"
            }`}
          >
            {label}
          </button>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={value === option.value}
              onClick={() => onChange(option.value)}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark ${
                value === option.value
                  ? "bg-dark text-white hover:bg-text-dark"
                  : "bg-light text-text-dark hover:bg-border"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const CourseFilterControls = ({
  q,
  scope,
  defaultLevel = "",
  defaultCategory = "",
  defaultSort = "",
  levels,
  categories,
}: {
  q?: string;
  scope?: "courses" | "creators";
  defaultLevel?: string;
  defaultCategory?: string;
  defaultSort?: string;
  levels: FilterOption[];
  categories: FilterOption[];
}) => {
  const [level, setLevel] = useState(defaultLevel);
  const [category, setCategory] = useState(defaultCategory);
  const [sort, setSort] = useState(defaultSort);
  const formRef = useRef<HTMLFormElement>(null);

  const applyFilter = (
    name: "level" | "category" | "sort",
    value: string,
    setValue: (value: string) => void,
  ) => {
    setValue(value);

    const field = formRef.current?.elements.namedItem(name);
    if (field instanceof HTMLInputElement) field.value = value;
    formRef.current?.requestSubmit();
  };

  const resetFilters = () => {
    setLevel("");
    setCategory("");
    setSort("");

    ["level", "category", "sort"].forEach((name) => {
      const field = formRef.current?.elements.namedItem(name);
      if (field instanceof HTMLInputElement) field.value = "";
    });
    formRef.current?.requestSubmit();
  };

  return (
    <form
      ref={formRef}
      action="/courses"
      className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      {q && <input type="hidden" name="q" value={q} />}
      {scope && <input type="hidden" name="scope" value={scope} />}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={resetFilters}
          className="course-filter cursor-pointer focus-visible:outline-none"
        >
          <FaArrowRotateLeft /> Reset
        </button>
        <FilterDropdown
          name="level"
          label="Level"
          value={level}
          options={levels}
          icon={<FaChartSimple />}
          onChange={(value) => applyFilter("level", value, setLevel)}
        />
        <FilterDropdown
          name="category"
          label="Category"
          value={category}
          options={categories}
          icon={<FaLayerGroup />}
          onChange={(value) => applyFilter("category", value, setCategory)}
        />
      </div>

      <FilterDropdown
        name="sort"
        label="Most relevant"
        value={sort}
        options={[
          { label: "Most popular", value: "popular" },
          { label: "Price: low to high", value: "price-low" },
          { label: "Price: high to low", value: "price-high" },
        ]}
        icon={<FaArrowDownWideShort />}
        align="right"
        onChange={(value) => applyFilter("sort", value, setSort)}
      />
    </form>
  );
};

export default CourseFilterControls;
