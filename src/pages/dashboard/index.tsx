import React, { FC, useState } from "react";

import { useQuery } from "@apollo/client";
import { GET_EPOCHES } from "apollo";
import {
  Box,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { TableCell } from "@mui/material";
import { GetEpochesResponse, GetEpochesVars } from "types";
import {
  SortableTableLabel,
  SortableTableOrderDirection,
  TableSkeleton,
} from "components";
import { Search } from "@mui/icons-material";

export const Dashboard: FC = () => {
  const [offset, setOffset] = useState(0);

  //size of the page
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  //search
  const [startBlock, setStartBlock] = useState(0);
  const [orderBy, setOrderBy] = useState("startBlock");
  const [orderDirection, setOrderDirection] = useState(
    SortableTableOrderDirection.ASC
  );

  const epochesApi = useQuery<GetEpochesResponse, GetEpochesVars>(GET_EPOCHES, {
    variables: {
      skip: offset,
      first: limit,
      orderBy,
      orderDirection,
      startBlock,
    },
  });

  const handlePageChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setOffset(newPage * limit);
  };

  const handleRowsPerPageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(e.target.value, 10));
    setOffset(0);
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStartBlock(parseInt(e.target.value, 10));
  };

  const handleSort = (key: string) => {
    setOrderBy(key);
    setOrderDirection((prevState) =>
      prevState === SortableTableOrderDirection.ASC
        ? SortableTableOrderDirection.DESC
        : SortableTableOrderDirection.ASC
    );
  };

  const formatBigInt = (value: bigint) =>
    value ? Math.round(Number(BigInt(value) / BigInt(Math.pow(10, 18)))) : "";

  return (
    <>
      <Paper>
        <Box component="div" display="flex" justifyContent="flex-end">
          <InputBase
            placeholder="Search"
            type="number"
            onChange={handleSearchChange}
          />
          <Search sx={{ p: 2 }} />
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: "50vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <SortableTableLabel
                    id="id"
                    activeKey={orderBy}
                    orderDirection={orderDirection}
                    handleClick={handleSort}
                  >
                    Id
                  </SortableTableLabel>
                </TableCell>
                <TableCell>
                  <SortableTableLabel
                    id="startBlock"
                    activeKey={orderBy}
                    orderDirection={orderDirection}
                    handleClick={handleSort}
                  >
                    Start Block
                  </SortableTableLabel>
                </TableCell>
                <TableCell>
                  <SortableTableLabel
                    id="endBlock"
                    activeKey={orderBy}
                    orderDirection={orderDirection}
                    handleClick={handleSort}
                  >
                    End Block
                  </SortableTableLabel>
                </TableCell>
                <TableCell>
                  <SortableTableLabel
                    id="totalQueryFees"
                    activeKey={orderBy}
                    orderDirection={orderDirection}
                    handleClick={handleSort}
                  >
                    Total Query Fees
                  </SortableTableLabel>
                </TableCell>
                <TableCell>
                  <SortableTableLabel
                    id="totalRewards"
                    activeKey={orderBy}
                    orderDirection={orderDirection}
                    handleClick={handleSort}
                  >
                    Total Rewards
                  </SortableTableLabel>
                </TableCell>
                <TableCell>
                  <SortableTableLabel
                    id="totalIndexerRewards"
                    activeKey={orderBy}
                    orderDirection={orderDirection}
                    handleClick={handleSort}
                  >
                    Total Indexer Rewards
                  </SortableTableLabel>
                </TableCell>
                <TableCell>
                  <SortableTableLabel
                    id="totalDelegatorRewards"
                    activeKey={orderBy}
                    orderDirection={orderDirection}
                    handleClick={handleSort}
                  >
                    Total Delegator Rewards
                  </SortableTableLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {epochesApi?.loading && (
                <TableSkeleton rowCount={limit} columnCount={7} />
              )}
              {!epochesApi?.loading &&
                epochesApi?.data?.epoches?.map((epoch) => (
                  <TableRow key={epoch.id}>
                    <TableCell>{epoch.id}</TableCell>
                    <TableCell>{epoch.startBlock}</TableCell>
                    <TableCell>{epoch.endBlock}</TableCell>
                    <TableCell>{formatBigInt(epoch.totalQueryFees)}</TableCell>
                    <TableCell>{formatBigInt(epoch.totalRewards)}</TableCell>
                    <TableCell>
                      {formatBigInt(epoch.totalIndexerRewards)}
                    </TableCell>
                    <TableCell>
                      {formatBigInt(epoch.totalDelegatorRewards)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 25, 50]}
          component="div"
          count={-1}
          page={page}
          rowsPerPage={limit}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </>
  );
};
