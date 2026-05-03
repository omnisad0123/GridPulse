export default function PaginationControls({ currentPage, totalPages, onPageChange }) {
  const safeTotal = Math.max(totalPages || 1, 1);
  return (
    <div className="pagination">
      <button type="button" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>
        Previous
      </button>
      <span>
        Page {currentPage} of {safeTotal}
      </span>
      <button type="button" disabled={currentPage >= safeTotal} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </button>
    </div>
  );
}
