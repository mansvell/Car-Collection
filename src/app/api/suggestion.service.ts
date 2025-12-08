import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/types/http';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  private api = environment.apiUrl + '/suggestions';

  constructor(private http: HttpClient) {}

  sendSuggestion(data: any) {
    return this.http.post(this.api, data);
  }

  getPending() {
    return this.http.get(this.api + '/pending');
  }
}
