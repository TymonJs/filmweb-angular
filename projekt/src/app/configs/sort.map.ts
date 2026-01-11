import { FilmResponse, Sort } from "../interfaces/film.interface";

export const SORT_MAP = new Map<Sort, (a: FilmResponse, b: FilmResponse) => number>([
  ["A-Z", (a, b) => a.title.localeCompare(b.title)],
  ["Z-A", (a, b) => b.title.localeCompare(a.title)],
  ["Oldest", (a, b) => a.releaseDate.localeCompare(b.releaseDate)],
  ["Latest", (a, b) => b.releaseDate.localeCompare(a.releaseDate)],
  ["Shortest", (a, b) => a.length - b.length],
  ["Longest", (a, b) => b.length - a.length],
]);