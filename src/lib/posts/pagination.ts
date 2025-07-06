export const pagination = (parsedPage: number, limit: number, totalPosts: number) : {
  page: number,
  limit: number,
  offset: number,
  lastPage: number,
} => {
  const lastPage = Math.ceil(totalPosts / (limit > 0 ? limit : 1));
  const page = parsedPage > 1 ? parsedPage > lastPage ? lastPage : parsedPage : 1;
  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    offset,
    lastPage,
  }
}
