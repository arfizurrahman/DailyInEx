import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';
import { Expense } from '../models/expense';

@Injectable()
export class ExpensesResolver implements Resolve<Expense[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private router: Router,
                private alertify: AlertifyService,
                private adminService: AdminService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Expense[]> {
        return this.adminService.getExpensesForApproval(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving pending expenses');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }


}
