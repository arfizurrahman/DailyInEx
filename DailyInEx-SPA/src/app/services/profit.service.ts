import { Profit } from './../models/profit';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfitService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getYearlyProfits(userId: number, model) {
    return this.http.get<Profit[]>(this.baseUrl + 'users/' + userId + '/profits?year=' + model.year);
  }
}
