import { SortableTableOrderDirection } from "./constants";

export interface SortableTableLabelProps {
  id: string;
  activeKey?: string;
  orderDirection: SortableTableOrderDirection;
  handleClick?: (key: string) => void;
  children?: React.ReactNode;
}
