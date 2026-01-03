import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Collection, Film, FilmResponse, Filter } from '../interfaces/film.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private httpClient = inject(HttpClient);
  protected films$ = new Subject<FilmResponse>;

  getFilms(filter?: Filter): Observable<FilmResponse[]> {
    if (filter === undefined) return this.httpClient.get<FilmResponse[]>(`${environment.serverUrl}/films`);
    
    const { query, collectionId, includeUnreleased } = filter;
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

    return this.httpClient.get<FilmResponse[]>(
      `${environment.serverUrl}/films`,
      { params }
    );
  }

  addFilm(film: Omit<Film, "id">): Observable<FilmResponse> {
    return this.httpClient.post<FilmResponse>(`${environment.serverUrl}/films`, film);
  }

}
