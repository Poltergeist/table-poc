import * as React from "react";

import { Column, Table, AutoSizer, TableCellProps } from "react-virtualized";

export default ({
  list = []
}: {
  list: { name: string; location: string; time: number }[];
}): React.ReactNode => {
  return (
    <AutoSizer>
      {({ height, width }): React.ReactNode => {
        return (
          <Table
            width={width}
            height={height}
            headerHeight={20}
            rowHeight={30}
            rowCount={list.length}
            rowGetter={({ index }) => list[index]}
          >
            <Column dataKey="name" label="Name" width={0.33 * width} />
            <Column
              cellRenderer={cellRenderer}
              dataKey="location"
              label="Location"
              width={0.33 * width}
            />
            <Column
              cellRenderer={cellRenderer}
              dataKey="time"
              label="Time"
              width={0.33 * width}
            />
          </Table>
        );
      }}
    </AutoSizer>
  );
};

function cellRenderer({
  cellData,
  isScrolling
}: TableCellProps): React.ReactNode {
  if (isScrolling) {
    return "Scrolling";
  }
  return cellData;
}
