export const createSlug = (str: string) => str
  .toLowerCase()
  .replace(/[^\w\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .trim();
