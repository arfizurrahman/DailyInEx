import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Income } from '../models/income';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PaginatedResult } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  saveIncome(userId: number, income: Income) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/incomes', income);
  }

}
