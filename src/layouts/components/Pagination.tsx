import Link from "next/link";

const Pagination = ({
  section,
  currentPage,
  totalPages,
  query,
}: {
  section: string;
  currentPage: number;
  totalPages: number;
  query?: Record<string, string>;
}) => {
  const indexPageLink = currentPage === 2;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  const pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }

  const withQuery = (pathname: string) => {
    const search = new URLSearchParams(query).toString();
    return `${pathname}${search ? `?${search}` : ""}`;
  };

  const arrowClassName =
    "flex size-10 items-center justify-center rounded-full border border-border text-text-dark transition-colors hover:border-text-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-dark";

  const disabledArrowClassName =
    "flex size-10 items-center justify-center rounded-full border border-border text-text-light";

  return (
    <>
      {totalPages > 1 && (
        <nav
          className="flex items-center justify-center gap-4"
          aria-label="Pagination"
        >
          {/* previous */}
          {hasPrevPage ? (
            <Link
              href={withQuery(
                indexPageLink
                  ? `${section ? "/" + section : "/"}`
                  : `${section ? "/" + section : ""}/page/${currentPage - 1}`,
              )}
              className={arrowClassName}
              aria-label="Previous page"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-5"
              >
                <path d="m12 15-5-5 5-5" />
              </svg>
            </Link>
          ) : (
            <span
              className={disabledArrowClassName}
              aria-label="Previous page unavailable"
              aria-disabled="true"
            >
              <span className="sr-only">Previous</span>
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-5"
              >
                <path d="m12 15-5-5 5-5" />
              </svg>
            </span>
          )}

          {/* page index */}
          {pageList.map((pagination, i) =>
            pagination === currentPage ? (
              <span
                key={pagination}
                aria-current="page"
                className="min-w-2 text-center text-sm font-semibold text-text-dark"
              >
                {pagination}
              </span>
            ) : (
              <Link
                key={pagination}
                href={withQuery(
                  i === 0
                    ? `${section ? "/" + section : "/"}`
                    : `${section ? "/" + section : ""}/page/${pagination}`,
                )}
                aria-label={`Go to page ${pagination}`}
                className="min-w-2 text-center text-sm text-text-light transition-colors hover:text-text-dark focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-dark"
              >
                {pagination}
              </Link>
            ),
          )}

          {/* next page */}
          {hasNextPage ? (
            <Link
              href={withQuery(
                `${section ? "/" + section : ""}/page/${currentPage + 1}`,
              )}
              className={arrowClassName}
              aria-label="Next page"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-5"
              >
                <path d="m8 5 5 5-5 5" />
              </svg>
            </Link>
          ) : (
            <span
              className={disabledArrowClassName}
              aria-label="Next page unavailable"
              aria-disabled="true"
            >
              <span className="sr-only">Next</span>
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-5"
              >
                <path d="m8 5 5 5-5 5" />
              </svg>
            </span>
          )}
        </nav>
      )}
    </>
  );
};

export default Pagination;
