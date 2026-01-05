import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

//Die Angular-Servicen kümmern sich um HTTP-Anfragen / API-Anrüfe (überall wiederverwendbar)
// Die verwendeten Routes hier gehören zum Backend (Controller) und NICHT die Routes von Angular

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = environment.apiUrl + '/users'; // la cest pour communiquer avec  le 'User'Controller

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(this.api + '/register', data);
  }

  //Angular schickt eine HTTP-Anfrage zum Backend (HttpClient)
  //http: //localhost:8080/api/users/login , { "email": "...", "password": "..." }
  login(data: any) {
    return this.http.post(this.api + '/login', data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  saveUserId(id: number) {
    localStorage.setItem('userId', String(id));
  }
  getUserId(): number | null {
    const v = localStorage.getItem('userId');
    if (!v) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && this.getUserId() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');//Angular peut maintenant vérifier si l’utilisateur est connecté
  }
}
