import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

/**
 * Service Admin : lit les chiffres du dashboard et la file de suggestions.
 * Le token est envoyé automatiquement via ton authInterceptor.
 */
@Injectable({ providedIn: 'root' })
export class AdminService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // KPI sources
  getCars() {
    return this.http.get<any[]>(`${this.base}/cars`);
  }

  getBrands() {
    return this.http.get<any[]>(`${this.base}/brands`);
  }

  getPendingSuggestions() {
    return this.http.get<any[]>(`${this.base}/suggestions/pending`);
  }

  acceptSuggestion(id: number) {
    return this.http.post(`${this.base}/suggestions/${id}/accept`, {});
  }

  rejectSuggestion(id: number) {
    return this.http.post(`${this.base}/suggestions/${id}/reject`, {});
  }
  getUserCount() {
    return this.http.get<number>(`${this.base}/admin/dashboard/users/count`);
  }

  getApprovedSuggestionsCount() {
    return this.http.get<number>(`${this.base}/admin/dashboard/suggestions/approved/count`);
  }

  getRejectedSuggestionsCount() {
    return this.http.get<number>(`${this.base}/admin/dashboard/suggestions/rejected/count`);
  }


  getDashboardStats() {
    return this.http.get<any>(`${this.base}/admin/dashboard/stats`);
  }

  getMostLikedCar() {
    return this.http.get<any>(`${this.base}/admin/dashboard/most-liked-car`);
  }

  getMostLikedCategory() {
    return this.http.get<any>(`${this.base}/admin/dashboard/top-category`);
  }
}
