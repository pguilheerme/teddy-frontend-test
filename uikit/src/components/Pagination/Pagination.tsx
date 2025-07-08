import "./pagination.style.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const MAX_VISIBLE_PAGES = 5;
  const ELLIPSIS = "...";

  const generatePages = () => {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const leftBound = Math.max(2, currentPage - 1);
    const rightBound = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1);

    if (leftBound > 2) {
      pages.push(ELLIPSIS);
    }

    for (let i = leftBound; i <= rightBound; i++) {
      pages.push(i);
    }

    if (rightBound < totalPages - 1) {
      pages.push(ELLIPSIS);
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="pagination-container">
      {pages.map((page, index) =>
        page === ELLIPSIS ? (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">
            {ELLIPSIS}
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            className={`pagination-button ${
              currentPage === page ? "active" : ""
            }`}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
}
