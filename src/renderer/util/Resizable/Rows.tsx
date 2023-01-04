import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Rows.scss';
import { useMount } from 'react-use';
import { MoreHorizontal } from 'react-feather';

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
      if (isDragging) {
        console.log(e.movementY);
        resize(e.movementY);
      }
    },
    [isDragging, resize]
  );
  useEffect(() => {
    window.addEventListener('mousemove', mouseMoveListener);
    return () => window.removeEventListener('mousemove', mouseMoveListener);
  }, [mouseMoveListener]);

  return (
    <div role="slider" className="Handle">
      <MoreHorizontal
        onMouseDown={() => {
          setIsDragging(true);
        }}
      />
    </div>
  );
};

const ResizableRows: React.FC<{
  minWidths?: (number | undefined)[];
  initialWidths: (totalWidth: number) => number[];
  children: React.ReactNode[];
}> = ({ minWidths = [], initialWidths, children }) => {
  const [tableHeight, setTableHeight] = useState(0);
  const ref = useRef<HTMLTableElement>(null);
  const [rowWidths, setRowWidths] = useState<number[]>([]);
  const resizeListener = useCallback(() => {
    setTableHeight(ref.current!.clientHeight);
    setRowWidths((rowWidths) =>
      rowWidths.map(
        (width) => width * (ref.current!.clientHeight / tableHeight)
      )
    );
  }, [tableHeight, setTableHeight, setRowWidths]);
  useMount(() => {
    setTableHeight(ref.current!.clientHeight);
    setRowWidths(initialWidths(ref.current!.clientHeight));
  });
  useEffect(() => {
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, [resizeListener]);

  const resizeRow = useCallback(
    (idx: number, delta: number) => {
      setRowWidths((rowWidths) =>
        rowWidths.map((row, ridx) => {
          if (ridx === idx)
            return Math.max(
              minWidths[ridx] ?? 0,
              Math.min(
                row + delta,
                tableHeight -
                  children
                    .filter((_, cidx) => cidx !== idx)
                    .map((_, cidx) => minWidths[cidx] ?? 0)
                    .reduce((a, b) => a + b ?? 0, 0)
              )
            );
          if (ridx === idx + 1)
            return Math.max(
              minWidths[ridx] ?? 0,
              Math.min(
                row - delta,
                tableHeight -
                  children
                    .filter((_, cidx) => cidx !== idx)
                    .map((_, cidx) => minWidths[cidx] ?? 0)
                    .reduce((a, b) => a + b ?? 0, 0)
              )
            );
          return row;
        })
      );
    },
    [setRowWidths, rowWidths, tableHeight, minWidths, children]
  );

  return (
    <div className="ResizableRows" ref={ref}>
      <table>
        <tbody>
          {children.map((child, idx) => (
            <React.Fragment key={idx}>
              <tr>
                <td height={rowWidths[idx]}>
                  <div
                    className="ChildWrapper"
                    style={{
                      minHeight: minWidths[idx] ?? 0,
                    }}
                  >
                    <div className="ChildBox">{child}</div>
                  </div>
                </td>
              </tr>
              {idx !== children.length - 1 ? (
                <tr>
                  <td height={0}>
                    <Handle
                      resize={useCallback(
                        (delta: number) => resizeRow(idx, delta),
                        [resizeRow]
                      )}
                    />
                  </td>
                </tr>
              ) : null}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResizableRows;
