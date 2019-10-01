import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PaginatedResult } from '../models/pagination';
import { Income } from '../models/income';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  getIncomesForApproval(page?, itemsPerPage?) {
    const paginatedResult: PaginatedResult<Income[]> = new PaginatedResult<Income[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Income[]>(this.baseUrl + 'admin/pendingIncomes', {observe: 'response', params})
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

  approveSelectedIncomes(incomeIds: {}) {
    return this.http.post(this.baseUrl + 'admin/approveIncomes', {incomeIds});
  }

  approveAllIncomes() {
    return this.http.post(this.baseUrl + 'admin/approveIncomes', {approveAll: true});
  }
}