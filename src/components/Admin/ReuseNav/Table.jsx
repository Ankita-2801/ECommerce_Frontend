// src/components/reusable/Table.jsx
import React from "react";

const Table = ({ columns, data, actions, selectedId, onRowClick }) => {
  return (
    <div
      // FIX 1: Added 'md:overflow-hidden'. On mobile, overflow is visible so it expands fully.
      // FIX 2: Removed strict 'overflow-hidden' from base class.
      className="bg-gray-50 md:bg-white md:rounded-3xl md:shadow-2xl md:border border-gray-100 transition-colors duration-300 md:overflow-hidden"
    >
      {/* Scroll container */}
      <div
        // This ensures mobile has auto height (scrolls with page) and desktop has fixed scrollable area.
        className="w-full md:max-h-[70vh] md:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        <table className="min-w-full border-collapse md:divide-y md:divide-gray-100 block md:table">
          
          {/* Header - Hidden on Mobile, Sticky on Desktop */}
          <thead className="hidden md:table-header-group bg-gray-50 sticky top-0 z-10 shadow-sm">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50"
                >
                  {column.header}
                </th>
              ))}
              {actions && (
                <th
                  scope="col"
                  className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right bg-gray-50"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="block md:table-row-group md:bg-white md:divide-y md:divide-gray-100">
            {data.length > 0 ? (
              data.map((row, rowIndex) => {
                const rowId = row._id || row.id;
                const isSelected = selectedId === rowId;

                return (
                  <tr
                    key={rowIndex}
                    id={`row-${rowId}`}
                    onClick={() => onRowClick && onRowClick(rowId)}
                    className={`
                      block md:table-row 
                      mb-4 md:mb-0 
                      rounded-xl md:rounded-none 
                      bg-white shadow-sm md:shadow-none 
                      border border-gray-200 md:border-none
                      cursor-pointer transition-colors duration-200
                      mx-0 md:mx-0
                      ${isSelected ? "bg-amber-50 ring-2 ring-amber-400 md:ring-0 md:bg-amber-100" : "hover:bg-gray-50 md:hover:bg-gray-100"}
                    `}
                  >
                    {columns.map((column, colIndex) => {
                      let cellContent;

                      if (column.cell) {
                        cellContent = column.cell(row);
                      } else {
                        const value = row[column.accessor];
                        if (
                          value === null ||
                          value === undefined ||
                          typeof value === "object"
                        ) {
                          cellContent = "-"; 
                        } else {
                          cellContent = value;
                        }
                      }

                      return (
                        <td
                          key={colIndex}
                          className="
                            flex justify-between items-center md:table-cell 
                            px-4 py-3 md:px-6 md:py-4 
                            border-b md:border-none last:border-none border-gray-100
                            whitespace-normal md:whitespace-nowrap 
                            text-sm font-medium text-gray-900
                          "
                          data-label={column.header}
                        >
                          {/* Mobile Label */}
                          <span className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wider mr-2 min-w-[30%]">
                            {column.header}
                          </span>
                          
                          {/* Cell Content */}
                          <div className="text-right md:text-left break-words w-full md:w-auto">
                            {cellContent}
                          </div>
                        </td>
                      );
                    })}

                    {/* Actions Column */}
                    {actions && (
                      <td className="
                        flex justify-between items-center md:table-cell 
                        px-4 py-3 md:px-6 md:py-4 
                        bg-gray-50 md:bg-transparent
                        rounded-b-xl md:rounded-none
                        whitespace-nowrap text-right text-sm
                      ">
                        <span className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wider mr-auto">
                          Actions
                        </span>
                        {actions(row)}
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr className="block md:table-row">
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="block md:table-cell text-center py-8 text-gray-500"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;