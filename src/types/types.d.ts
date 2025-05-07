/** @format */

export interface CommonProps {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export interface pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  length?: number;
}
