import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/types/http';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private api = environment.apiUrl + '/cars';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.api);
  }

  getByBrand(brandId: number) {
    return this.http.get(this.api + '/brand/' + brandId);
  }
}
