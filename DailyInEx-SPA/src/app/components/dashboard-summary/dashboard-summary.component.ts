import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { IncomeService } from 'src/app/services/income.service';
import { ProfitService } from 'src/app/services/profit.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-summary',
  templateUrl: './dashboard-summary.component.html',
  styleUrls: ['./dashboard-summary.component.scss']
})
export class DashboardSummaryComponent implements OnInit {

  model: any = { year: '' };
  monthName: string;
  year = new Date().getFullYear();
  incomeOfCurrentMonth = 0;
  expenseOfCurrentMonth = 0;
  profitOfCurrentMonth = 0;
  profitOfCurrentYear = 0;

  constructor(private alertify: AlertifyService,
              private incomeService: IncomeService,
              private expenseService: ExpenseService,
              private profitService: ProfitService,
              private authService: AuthService,
              private datePipe: DatePipe) {
              }

  ngOnInit() {
    this.monthName = this.getMonthNameByNumber(new Date().getMonth() + 1);
    this.getYearlyProfits();
    this.getTotalExpenseOfCurrentMonth();
    this.getTotalIncomeOfCurrentMonth();
  }

  getMonthNameByNumber(monthNo: number) {
    const months = ['Janunary', 'February', 'March', 'April', 'May', 'June',
                 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNo - 1];
   }

   getTotalIncomeOfCurrentMonth() {
    this.incomeService.getTotalIncomeOfCurrentMonth(this.authService.decodedToken.nameid)
    .subscribe(income => {
      this.incomeOfCurrentMonth = income.amount;
      }, error => {
        this.alertify.error(error);
      });
  }

  getTotalExpenseOfCurrentMonth() {
    this.expenseService.getTotalExpenseOfCurrentMonth(this.authService.decodedToken.nameid)
    .subscribe(expense => {
      this.expenseOfCurrentMonth = expense.amount + 0;
      }, error => {
        this.alertify.error(error);
      });
  }

  getYearlyProfits() {
    this.model.year = new Date().getFullYear();
    this.profitService.getYearlyProfits(this.authService.decodedToken.nameid, this.model).subscribe((profits) => {
        profits.forEach(element => {
          this.profitOfCurrentYear += element.totalProfit;
        });
        this.profitOfCurrentMonth = profits.find(p => p.month === (new Date().getMonth() + 1)).totalProfit;
    }, error => {
      this.alertify.error('Something went wrong');
    });
  }
}
