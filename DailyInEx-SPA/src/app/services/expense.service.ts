import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Expense } from '../models/expense';
import { PaginatedResult } from '../models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  saveExpense(userId: number, expense: Expense) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/expenses', expense);
  }

  getMonthlyExpenses(userId: number, model, page?, itemsPerPage?) {
    const paginatedResult: PaginatedResult<Expense[]> = new PaginatedResult<Expense[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    params = params.append('month', model.month);
    params = params.append('year', model.year);
    return this.http.get<Expense[]>(this.baseUrl + 'users/' + userId + '/expenses/monthly', {observe: 'response', params})
      .pipe(
        map( response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }
}
