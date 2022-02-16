export interface MetaInterface {
  current_page?: string;
  last_page?: number;
  per_page?: string;
  total: { hits: number; } | number;
}
