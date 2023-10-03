import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faCaretRight,
  faCaretLeft,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const maxButtons = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    buttons.push(
      <button
        key="first"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={currentPage === 1 ? "disabled-button" : ""}
      >
        <FontAwesomeIcon icon={faBackwardStep} />
      </button>
    );

    buttons.push(
      <button
        key="previous"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={currentPage === 1 ? "disabled-button" : ""}
      >
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
    );

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? "disabled-button" : ""}
        aria-label="Next Page"
      >
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
    );

    buttons.push(
      <button
        key="last"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? "disabled-button" : ""}
      >
        <FontAwesomeIcon icon={faForwardStep} />
      </button>
    );

    return buttons;
  };

  return <div className="pagination">{renderPaginationButtons()}</div>;
}

export default Pagination;
