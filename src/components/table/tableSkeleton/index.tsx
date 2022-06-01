import { FC } from "react";
import { Skeleton, TableCell, TableRow } from "@mui/material";
import { TableSkeletonProps } from "./types";

export const TableSkeleton: FC<TableSkeletonProps> = (props) => {
  const { rowCount, columnCount } = props;

  return (
    <>
      {Array(rowCount)
        .fill({})
        .map((row) => (
          <TableRow>
            {Array(columnCount)
              .fill({})
              .map((col) => (
                <TableCell>
                  <Skeleton />
                </TableCell>
              ))}
          </TableRow>
        ))}
    </>
  );
};
