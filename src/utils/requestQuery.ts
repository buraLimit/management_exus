export interface QueryParams {
  _page?: number;
  _limit?: number;
  _search?: string;
}

export const createRequestQuery = (queries?: QueryParams): string => {
  if (!queries) {
    return '';
  }

  let query = '';

  Object.entries(queries).forEach(([option, value]) => {
    if (value) {
      if (option === 'search') {
        if ((value as string).length > 1) {
          query += `&${option}=${encodeURIComponent(value)}`;
        }
      } else {
        query += `&${option}=${value}`;
      }
    }
  });
  return query;
};
