import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private api = environment.apiUrl + '/cars';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.api);
  }

  getByBrand(brandId: number) {
    return this.http.get<any[]>(this.api + '/brand/' + brandId);
  }
}
