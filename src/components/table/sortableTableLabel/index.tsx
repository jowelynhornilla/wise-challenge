import { FC } from "react";
import { TableSortLabel, Box } from "@mui/material";
import { SortableTableLabelProps } from "./types";
import { SortableTableOrderDirection } from "./constants";
import { visuallyHidden } from "@mui/utils";

export * from "./constants";

export const SortableTableLabel: FC<SortableTableLabelProps> = (props) => {
  const { id, activeKey, orderDirection, handleClick, children } = props;

  const isActive = activeKey === id;

  return (
    <TableSortLabel
      active={isActive}
      direction={isActive ? orderDirection : SortableTableOrderDirection.ASC}
      onClick={() => {
        if (handleClick) {
          handleClick(id);
        }
      }}
    >
      {children}
      {isActive && (
        <Box component="span" sx={visuallyHidden}>
          {orderDirection === SortableTableOrderDirection.DESC
            ? "sorted descending"
            : "sorted ascending"}
        </Box>
      )}
    </TableSortLabel>
  );
};
