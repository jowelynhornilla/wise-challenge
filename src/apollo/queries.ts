import { gql } from "@apollo/client";

export const GET_EPOCHES = gql`
  query GetEpoches(
    $skip: Int
    $first: Int
    $orderBy: String
    $orderDirection: String
    $startBlock: Int
  ) {
    epoches(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { startBlock_gte: $startBlock }
    ) {
      id
      startBlock
      endBlock
      totalQueryFees
      totalRewards
      totalIndexerRewards
      totalDelegatorRewards
    }
  }
`;
