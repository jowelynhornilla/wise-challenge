export interface Epoch {
  id: string;
  startBlock: number;
  endBlock: number;
  signalledTokens: bigint;
  stakeDeposited: bigint;
  totalQueryFees: bigint;
  taxedQueryFees: bigint;
  queryFeesCollected: bigint;
  curatorQueryFees: bigint;
  queryFeeRebates: bigint;
  totalRewards: bigint;
  totalIndexerRewards: bigint;
  totalDelegatorRewards: bigint;
}

export interface GetEpochesResponse {
  epoches: Array<Epoch>;
}

export interface GetEpochesVars {
  skip?: number;
  first?: number;
  orderBy?: string;
  orderDirection?: string;
  startBlock?: number;
}
