import { Component, OnInit } from '@angular/core';
import { Income } from 'src/app/models/income';
import { Pagination, PaginatedResult } from 'src/app/models/pagination';
import { AlertifyService } from 'src/app/services/alertify.service';
import { IncomeService } from 'src/app/services/income.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-monthly-incomes',
  templateUrl: './monthly-incomes.component.html',
  styleUrls: ['./monthly-incomes.component.scss']
})
export class MonthlyIncomesComponent implements OnInit {
  incomes: Income[] = [];
  pagination = new Pagination();
  pageNumber = 1;
  pageSize = 10;
  currentPage: any;
  model: any = { year: '', month: '' };

  constructor(private alertify: AlertifyService,
              private incomeService: IncomeService,
              private authService: AuthService ) { }

  ngOnInit() {
    this.pagination.currentPage = this.pageNumber;
    this.pagination.itemsPerPage = this.pageSize;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event;
    this.getMonthlyIncomes();
  }

  getMonthlyIncomes() {
    this.incomeService.getMonthlyIncomes(this.authService.decodedToken.nameid, this.model, this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe((res: PaginatedResult<Income[]>) => {
        this.incomes = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
}
