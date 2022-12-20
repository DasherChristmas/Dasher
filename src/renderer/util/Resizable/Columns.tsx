import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Columns.scss';
import { useMount } from 'react-use';
import { MoreVertical } from 'react-feather';

const Handle: React.FC<{
  resize: (delta: number) => void;
}> = ({ resize }) => {
  const [isDragging, setIsDragging] = useState(false);
  const mouseUpListener = useCallback(
    () => setIsDragging(false),
    [setIsDragging]
  );
  useEffect(() => {
    window.addEventListener('mouseup', mouseUpListener);
    return () => window.removeEventListener('mouseup', mouseUpListener);
  }, [mouseUpListener]);
  const mouseMoveListener = useCallback(
    (e: MouseEvent) => {
      if (isDragging) resize(e.movementX);
    },
    [isDragging, resize]
  );
  useEffect(() => {
    window.addEventListener('mousemove', mouseMoveListener);
    return () => window.removeEventListener('mousemove', mouseMoveListener);
  }, [mouseMoveListener]);

  return (
    <div role="slider" className="Handle">
      <MoreVertical
        onMouseDown={() => {
          setIsDragging(true);
        }}
      />
    </div>
  );
};

const ResizableColumns: React.FC<{
  minWidths?: (number | undefined)[];
  initialWidths: (totalWidth: number) => number[];
  children: React.ReactNode[];
}> = ({ minWidths = [], initialWidths, children }) => {
  const [tableWidth, setTableWidth] = useState(0);
  const ref = useRef<HTMLTableElement>(null);
  const [colWidths, setColumnWidths] = useState<number[]>([]);
  const resizeListener = useCallback(() => {
    setTableWidth(ref.current!.clientWidth);
    setColumnWidths((columnWidths) =>
      columnWidths.map(
        (width) => width * (ref.current!.clientWidth / tableWidth)
      )
    );
  }, [tableWidth, setTableWidth, setColumnWidths]);
  useMount(() => {
    setTableWidth(ref.current!.clientWidth);
    setColumnWidths(initialWidths(ref.current!.clientWidth));
  });
  useEffect(() => {
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, [resizeListener]);

  const resizeColumn = useCallback(
    (idx: number, delta: number) => {
      setColumnWidths((columnWidths) =>
        columnWidths.map((col, cidx) => {
          if (cidx === idx)
            return Math.max(
              minWidths[cidx] ?? 0,
              Math.min(
                col + delta,
                tableWidth -
                  children
                    .filter((_, cidx) => cidx !== idx)
                    .map((_, cidx) => minWidths[cidx] ?? 0)
                    .reduce((a, b) => a + b ?? 0, 0)
              )
            );
          if (cidx === idx + 1)
            return Math.max(
              minWidths[cidx] ?? 0,
              Math.min(
                col - delta,
                tableWidth -
                  children
                    .filter((_, cidx) => cidx !== idx)
                    .map((_, cidx) => minWidths[cidx] ?? 0)
                    .reduce((a, b) => a + b ?? 0, 0)
              )
            );
          return col;
        })
      );
    },
    [setColumnWidths, colWidths, tableWidth, minWidths, children]
  );

  return (
    <table className="ResizableColumns" ref={ref}>
      <tbody>
        <tr>
          {children.map((child, idx) => (
            <React.Fragment key={idx}>
              <td
                width={colWidths[idx]}
                style={{
                  minWidth: minWidths[idx] ?? 0,
                }}
              >
                <div className="ChildWrapper">
                  <div className="ChildBox">{child}</div>
                </div>
              </td>
              {idx !== children.length - 1 ? (
                <td>
                  <Handle
                    resize={useCallback(
                      (delta: number) => resizeColumn(idx, delta),
                      [resizeColumn]
                    )}
                  />
                </td>
              ) : null}
            </React.Fragment>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default ResizableColumns;
