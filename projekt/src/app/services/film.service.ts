import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Film, FilmResponse, Filter } from '../interfaces/film.interface';
import { environment } from '../../environments/environment.development';
import { SORT_MAP } from '../configs/sort.map';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private httpClient = inject(HttpClient);

  public getFilms(filter?: Filter): Observable<Film[]> {
    const url = `${environment.serverUrl}/films`;

    return this.httpClient.get<Film[]>(url).pipe(
      map((films) => filter ? this.applyFilter(films, filter) : films)
    );
  }

  private applyFilter(films: Film[], filter: Filter): Film[] {
    console.log("filter", filter);
    
    return films
      .filter((film) => this.matchesQuery(film, filter.query))
      .filter((film) => this.matchesCollection(film, filter.collectionId))
      .filter((film) => this.matchesRelease(film, filter.includeUnreleased))
      .sort((a, b) => {
        if (!filter.sort) return 0;
        
        return SORT_MAP.get(filter.sort)?.(a, b) ?? 0;
    });
  }

  private matchesQuery(film: Film, query?: string): boolean {
    return !query || film.title.toLowerCase().includes(query.toLowerCase());
  }

  private matchesCollection(film: Film, collectionId?: number): boolean {
    return !collectionId || film.collectionId === collectionId;
  }

  private matchesRelease(film: Film, includeUnreleased?: boolean): boolean {
    if (includeUnreleased !== false) return true;

    return film.releaseDate <= new Date().toISOString().split("T")[0];
  }

  public getFilm(id: number): Observable<FilmResponse>{
    return this.httpClient.get<FilmResponse>(`${environment.serverUrl}/films/${id}?_expand=collection`);
  }

  public addFilm(film: Omit<Film, "id">): Observable<FilmResponse> {
    return this.httpClient.post<FilmResponse>(`${environment.serverUrl}/films`, film);
  }

  public editFilm(id: number, film: Omit<Film, "id">): Observable<FilmResponse>{
    return this.httpClient.put<FilmResponse>(`${environment.serverUrl}/films/${id}`, film);
  }

  public removeFilm(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${environment.serverUrl}/films/${id}`);
  }

}
