import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/types/http';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private api = environment.apiUrl + '/favorites';

  constructor(private http: HttpClient) {}

  getUserFavorites(userId: number) {
    return this.http.get(this.api + '/' + userId);
  }

  add(userId: number, carId: number) {
    return this.http.post(this.api + '/' + userId + '/' + carId, {});
  }

  remove(userId: number, carId: number) {
    return this.http.delete(this.api + '/' + userId + '/' + carId);
  }
}
