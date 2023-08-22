import type { ParsedUrlQuery } from 'querystring';

export default function validateDate(query: ParsedUrlQuery): Date | null {
  const { id } = query;
  if (id === undefined) return null;
  const date = new Date(id[0]);
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return null;
  }
  return date;
}
