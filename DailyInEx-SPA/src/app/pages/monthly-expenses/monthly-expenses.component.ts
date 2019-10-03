import { ExpenseService } from 'src/app/services/expense.service';
import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { Pagination, PaginatedResult } from 'src/app/models/pagination';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-monthly-expenses',
  templateUrl: './monthly-expenses.component.html',
  styleUrls: ['./monthly-expenses.component.scss']
})
export class MonthlyExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  pagination = new Pagination();
  pageNumber = 1;
  pageSize = 10;
  currentPage: any;
  model: any = { year: '', month: '' };

  constructor(private alertify: AlertifyService,
              private expenseService: ExpenseService,
              private authService: AuthService ) { }

  ngOnInit() {
    this.pagination.currentPage = this.pageNumber;
    this.pagination.itemsPerPage = this.pageSize;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event;
    this.getMonthlyExpenses();
  }

  getMonthlyExpenses() {
    this.expenseService.getMonthlyExpenses(this.authService.decodedToken.nameid, this.model, this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe((res: PaginatedResult<Expense[]>) => {
        this.expenses = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
}
