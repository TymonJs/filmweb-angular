import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

export const requestResolver: ResolveFn<Observable<any>> = (route, state) => {

  const httpClient = inject(HttpClient);

  return httpClient.get("http://localhost:3000/posts/1")
};
