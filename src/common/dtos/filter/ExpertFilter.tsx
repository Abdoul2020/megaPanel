export type ExpertFilterDto = {
  page?: number;
  size?: number;
  sort?: string;
  sort_by?: string;
  query_text?: string;
  count?: boolean;
  city?: string;
  operating_type?: number;
  branch?: string;
};
