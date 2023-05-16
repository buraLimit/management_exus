export interface Pagination {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

export const initialPagination = {
  totalPages: 1,
  totalItems: 0,
  currentPage: 1,
  itemsPerPage: 5
};
