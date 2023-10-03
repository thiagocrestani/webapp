import React from "react";
import "./styles.css";
import Pagination from "../Pagination";

function Table({ headers, data, showPagination }) {
  const tableData = data?.map((rowData) => {
    if (Array.isArray(rowData)) {
      return rowData;
    } else if (typeof rowData === "object") {
      return Object.values(rowData);
    }
    return [];
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            {headers?.map((header, index) => (
              <th key={index}>
                {header.name}
                {header.filterable && (
                  <div className="filter-input">
                    {header.type === "text" ? (
                      <input
                        type="text"
                        placeholder={`Filter by ${header.name}`}
                        value={header.value || ""}
                        onChange={(e) => {
                          if (showPagination) showPagination.setCurrentPage(1);
                          header.setValue(e.target.value);
                        }}
                      />
                    ) : header.type === "custom" ? (
                      header.input
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row?.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {showPagination && (
        <Pagination
          currentPage={showPagination.currentPage}
          totalPages={showPagination.totalPages}
          setCurrentPage={showPagination.setCurrentPage}
        />
      )}
    </>
  );
}

export default Table;
