import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RestaurentData } from './resturant-dash/restaurent.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private apiURL = 'http://localhost:3000/posts';

  constructor(private _http: HttpClient) {}

  // Add Restaurant
  postRestaurent(data: RestaurentData): Observable<RestaurentData> {
    return this._http.post<RestaurentData>(this.apiURL, data);
  }

  // Get All Restaurants
  getRestaurent(): Observable<RestaurentData[]> {
    return this._http.get<RestaurentData[]>(this.apiURL);
  }

  // Delete Restaurant
  deleteRestaurant(id: number): Observable<any> {
    return this._http.delete(`${this.apiURL}/${id}`);
  }

  // Update Restaurant
  updateRestaurant(id: number, data: RestaurentData): Observable<RestaurentData> {
    return this._http.put<RestaurentData>(`${this.apiURL}/${id}`, data);
  }
}
