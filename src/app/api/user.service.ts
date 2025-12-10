import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(this.api + '/register', data);
  }

  login(data: any) {
    return this.http.post(this.api + '/login', data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  saveUserId(id: number) {
    localStorage.setItem('userId', id.toString());
  }
  getUserId(): number | null {
    const v = localStorage.getItem('userId');
    return v ? Number(v) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');//Angular peut maintenant vérifier si l’utilisateur est connecté
  }
}
