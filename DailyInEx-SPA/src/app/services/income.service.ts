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

  getMonthlyIncomes(userId: number, model, page?, itemsPerPage?) {
    const paginatedResult: PaginatedResult<Income[]> = new PaginatedResult<Income[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    params = params.append('month', model.month);
    params = params.append('year', model.year);
    return this.http.get<Income[]>(this.baseUrl + 'users/' + userId + '/incomes/monthly', {observe: 'response', params})
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
