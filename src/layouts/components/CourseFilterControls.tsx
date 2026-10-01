"use client";

import { type ReactNode, useEffect, useId, useRef, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? label;

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const selectOption = (nextValue: string) => {
    setIsOpen(false);
    onChange(nextValue);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative w-fit max-w-full shrink-0 ${isOpen ? "z-20" : "z-10"}`}
    >
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        aria-label={`${label}: ${selectedLabel}`}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="btn-filter min-w-max"
      >
        {icon}
        <span>{selectedLabel}</span>
        <FaChevronDown
          className={`ml-1 text-[10px] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute top-full z-30 w-max max-w-[calc(100vw-2rem)] min-w-48 pt-2 ${isOpen ? "block" : "hidden"} ${
          align === "right" ? "left-0 lg:left-auto lg:right-0" : "left-0"
        }`}
      >
        <div
          id={menuId}
          className="max-h-[min(24rem,calc(100vh-8rem))] space-y-1.5 overflow-y-auto overscroll-contain rounded-lg bg-body p-1.5 text-left shadow-xl ring-1 ring-dark/10"
          role="menu"
          aria-label={label}
        >
          <button
            type="button"
            role="menuitemradio"
            aria-checked={!value}
            onClick={() => selectOption("")}
            className={`btn-menu-item ${!value ? "btn-menu-item-active" : ""}`}
          >
            {label}
          </button>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={value === option.value}
              onClick={() => selectOption(option.value)}
              className={`btn-menu-item ${value === option.value ? "btn-menu-item-active" : ""}`}
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
      className="relative z-20 mb-7 flex flex-col gap-4 overflow-visible lg:flex-row lg:items-center lg:justify-between"
    >
      {q && <input type="hidden" name="q" value={q} />}
      {scope && <input type="hidden" name="scope" value={scope} />}

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={resetFilters} className="btn-filter">
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
