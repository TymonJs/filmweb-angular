import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film, FilmResponse, Filter } from '../interfaces/film.interface';
import { environment } from '../../environments/environment.development';
import { SORT_CONFIG } from '../configs/sort.config';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private httpClient = inject(HttpClient);

  public getFilms(filter?: Filter): Observable<FilmResponse[]> {
    const url = `${environment.serverUrl}/films`;

    if (!filter) {
      return this.httpClient.get<FilmResponse[]>(url);
    }

    const { query, collectionId, includeUnreleased, sort } = filter;
    let params = new HttpParams();

    if (query) {
      params = params.set("title_like", query);
    }

    if (collectionId) {
      params = params.set("collectionId", collectionId);
    }

    if (includeUnreleased === false) {
      const today = new Date().toISOString().split("T")[0];
      params = params.set("releaseDate_lte", today);
    }

    if (sort) {
      const { sort: sortField, order } = SORT_CONFIG[sort];
      params = params.set("_sort", sortField);
      if (order) {
        params = params.set("_order", order);
      }
    }

    return this.httpClient.get<FilmResponse[]>(url, { params });
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
