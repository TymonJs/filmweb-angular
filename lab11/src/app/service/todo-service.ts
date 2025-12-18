import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoDto } from '../dto/todo.interface';
import { environment } from '../../environments/environment.development';
import { PageResponse } from '../dto/page.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private ID = "/todo"
  private perPage = 2;

  constructor(private httpClient: HttpClient) {}

  getById(id: string): Observable<TodoDto> {
    return this.httpClient.get<TodoDto>(environment.serverUrl + this.ID + `/${id}`);
  }

  getAll(): Observable<TodoDto[]> {
    return this.httpClient.get<TodoDto[]>(environment.serverUrl + this.ID)
  }

  getPage(page: number): Observable<PageResponse<TodoDto>> {
    return this.httpClient.get<PageResponse<TodoDto>>(`${environment.serverUrl}${this.ID}?_page=${page}&_per_page=${this.perPage}`)
  }

  remove(id: string): Observable<string>{
    return this.httpClient.delete(environment.serverUrl + this.ID + `/${id}`, {
      responseType: "text"
    })
  }
  add(todo: Omit<TodoDto,"id">): Observable<TodoDto>{

    return this.httpClient.post<TodoDto>(environment.serverUrl + this.ID, todo)
  }

  edit(todo: TodoDto): Observable<string>{
    return this.httpClient.patch(environment.serverUrl + this.ID + `/${todo.id}`,
      todo,
      {responseType: "text"}
    )
  }

}
