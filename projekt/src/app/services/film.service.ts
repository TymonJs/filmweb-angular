import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film, FilmResponse, Filter } from '../interfaces/film.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private httpClient = inject(HttpClient);

  getFilms(filter?: Filter): Observable<FilmResponse[]> {
    if (filter === undefined) return this.httpClient.get<FilmResponse[]>(`${environment.serverUrl}/films`);
    
    const { query, collectionId, includeUnreleased, sort } = filter;

    const today = new Date().toISOString().split('T')[0];
    let params = new HttpParams();

    if (query) {
      params = params.set('title_like', query); 
    }
    if (collectionId) {
      params = params.set('collectionId', collectionId);
    }
    if (includeUnreleased === false) {
      params = params.set('releaseDate_lte', today);
    }
    switch (sort){
      case "A-Z":
        params = params.set("_sort", "title");
        break;
      case "Z-A":
        params = params.set("_sort", "title");
        params = params.set("_order", "desc");
        break;
      case "Oldest":
        params = params.set("_sort", "releaseDate");
        break;
      case "Latest":
        params = params.set("_sort", "releaseDate");
        params = params.set("_order", "desc");
        break;
      case "Shortest":
        params = params.set("_sort", "length");
        break;
      case "Longest":
        params = params.set("_sort", "length");
        params = params.set("_order", "desc");
        break;
    }

    return this.httpClient.get<FilmResponse[]>(
      `${environment.serverUrl}/films`,
      { params }
    );
  }

  getFilm(id: number): Observable<FilmResponse>{
    return this.httpClient.get<FilmResponse>(`${environment.serverUrl}/films/${id}?_expand=collection`);
  }

  addFilm(film: Omit<Film, "id">): Observable<FilmResponse> {
    return this.httpClient.post<FilmResponse>(`${environment.serverUrl}/films`, film);
  }

  editFilm(id: number, film: Omit<Film, "id">): Observable<FilmResponse>{
    return this.httpClient.put<FilmResponse>(`${environment.serverUrl}/films/${id}`, film);
  }

  removeFilm(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${environment.serverUrl}/films/${id}`);
  }

}
