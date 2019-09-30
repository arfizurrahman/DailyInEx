import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Income } from '../models/income';
import { IncomeService } from '../services/income.service';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';

@Injectable()
export class IncomesResolver implements Resolve<Income[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private incomeService: IncomeService, private router: Router,
                private alertify: AlertifyService,
                private adminService: AdminService,
                private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Income[]> {
        return this.adminService.getIncomesForApproval(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving pending incomes');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }


}
