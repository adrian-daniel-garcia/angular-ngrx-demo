import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Movie {
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url = 'http://localhost:3000/api/cart';

  constructor(
    private httpClient: HttpClient
  ) { }

  getList(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url);
  }

  addMovie(movie: Movie) {
    return this.httpClient.post<any>(this.url, { id: movie.id, movie });
  }

  removeMovie(movieId: string) {
    return this.httpClient.delete<any>(this.url + '?id=' + movieId);
  }
}
