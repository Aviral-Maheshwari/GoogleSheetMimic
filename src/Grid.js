import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { evaluateFormula } from "./utils";
import Toolbar from "./toolbar";

const generateColumnNames = (cols) => {
  return Array.from({ length: cols }, (_, i) => String.fromCharCode(65 + i));
};

const Grid = () => {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [data, setData] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(""))
  );
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  const [columnWidths, setColumnWidths] = useState(
    Array.from({ length: cols }, () => 100)
  );
  const [formatting, setFormatting] = useState(
    Array.from({ length: rows }, () => Array(cols).fill({}))
  );
  const gridRef = useRef(null);
  const columnNames = generateColumnNames(cols);

  // Handle cell value change
  const handleCellChange = (row, col, value) => {
    const newData = [...data];
    newData[row][col] = value;

    // Re-evaluate all cells to update formula dependencies
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (newData[i][j].startsWith("=")) {
          try {
            newData[i][j] = evaluateFormula(newData[i][j], newData);
          } catch (error) {
            newData[i][j] = "ERROR";
          }
        }
      }
    }

    setData(newData);
  };

  // Handle column resizing
  useEffect(() => {
    if (!gridRef.current) return;

    const resizers = gridRef.current.querySelectorAll(".resizer");

    const handleMouseDown = (index) => (e) => {
      let startX = e.clientX;
      let startWidth = columnWidths[index];

      const handleMouseMove = (e) => {
        const newWidth = Math.max(50, startWidth + (e.clientX - startX));
        const newColumnWidths = [...columnWidths];
        newColumnWidths[index] = newWidth;
        setColumnWidths(newColumnWidths);
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    resizers.forEach((resizer, index) => {
      resizer.addEventListener("mousedown", handleMouseDown(index));
    });

    return () => {
      resizers.forEach((resizer, index) => {
        resizer.removeEventListener("mousedown", handleMouseDown(index));
      });
    };
  }, [columnWidths]);

  // Formatting handlers
  const handleBold = () => {
    const { row, col } = selectedCell;
    const newFormatting = [...formatting];
    newFormatting[row][col] = {
      ...newFormatting[row][col],
      fontWeight:
        newFormatting[row][col].fontWeight === "bold" ? "normal" : "bold",
    };
    setFormatting(newFormatting);
  };

  const handleItalic = () => {
    const { row, col } = selectedCell;
    const newFormatting = [...formatting];
    newFormatting[row][col] = {
      ...newFormatting[row][col],
      fontStyle:
        newFormatting[row][col].fontStyle === "italic" ? "normal" : "italic",
    };
    setFormatting(newFormatting);
  };

  const handleUnderline = () => {
    const { row, col } = selectedCell;
    const newFormatting = [...formatting];
    newFormatting[row][col] = {
      ...newFormatting[row][col],
      textDecoration:
        newFormatting[row][col].textDecoration === "underline"
          ? "none"
          : "underline",
    };
    setFormatting(newFormatting);
  };

  const handleInsertFunction = () => {
    alert("Insert Function button clicked");
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const { row, col } = selectedCell;
      switch (e.key) {
        case "ArrowUp":
          if (row > 0) setSelectedCell({ row: row - 1, col });
          break;
        case "ArrowDown":
          if (row < rows - 1) setSelectedCell({ row: row + 1, col });
          break;
        case "ArrowLeft":
          if (col > 0) setSelectedCell({ row, col: col - 1 });
          break;
        case "ArrowRight":
          if (col < cols - 1) setSelectedCell({ row, col: col + 1 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell, rows, cols]);

  return (
    <div>
      <Toolbar
        onBold={handleBold}
        onItalic={handleItalic}
        onUnderline={handleUnderline}
        onInsertFunction={handleInsertFunction}
      />
      <table ref={gridRef}>
        <thead>
          <tr>
            <th></th>
            {columnNames.map((name, colIndex) => (
              <th
                key={colIndex}
                style={{
                  width: `${columnWidths[colIndex]}px`,
                  position: "relative",
                }}
              >
                {name}
                <div className="resizer"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    width: `${columnWidths[colIndex]}px`,
                    fontWeight: formatting[rowIndex][colIndex].fontWeight,
                    fontStyle: formatting[rowIndex][colIndex].fontStyle,
                    textDecoration:
                      formatting[rowIndex][colIndex].textDecoration,
                  }}
                  className={
                    rowIndex === selectedCell.row &&
                    colIndex === selectedCell.col
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    setSelectedCell({ row: rowIndex, col: colIndex })
                  }
                >
                  <input
                    value={cell}
                    onChange={(e) =>
                      handleCellChange(rowIndex, colIndex, e.target.value)
                    }
                    onFocus={() =>
                      setSelectedCell({ row: rowIndex, col: colIndex })
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
