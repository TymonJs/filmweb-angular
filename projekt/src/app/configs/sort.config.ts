import { Sort } from "../interfaces/film.interface";

export const SORT_CONFIG: Record<Sort, { sort: string; order?: string }> = {
  "A-Z": { sort: "title" },
  "Z-A": { sort: "title", order: "desc" },
  "Oldest": { sort: "releaseDate" },
  "Latest": { sort: "releaseDate", order: "desc" },
  "Shortest": { sort: "length" },
  "Longest": { sort: "length", order: "desc" },
};
