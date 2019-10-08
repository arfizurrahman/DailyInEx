import { AuthService } from './../../services/auth.service';
import { IncomeService } from './../../services/income.service';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/charts';
import { AlertifyService } from 'src/app/services/alertify.service';
import { DatePipe } from '@angular/common';
import { Pagination, PaginatedResult } from 'src/app/models/pagination';
import { Income } from 'src/app/models/income';
import { ExpenseService } from 'src/app/services/expense.service';
import { Expense } from 'src/app/models/expense';
import { ProfitService } from 'src/app/services/profit.service';
import { Profit } from 'src/app/models/profit';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  incomes: Income[] = [];
  expenses: Expense[] = [];
  profits: Profit[] = [];
  dataset: number[] = [];
  income: Income;
  model: any = { year: '' };
  itemCount = 5;
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
    this.getRecentIncomes();
    this.getRecentExpenses();
    this.monthName = this.getMonthNameByNumber(new Date().getMonth() + 1);
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    parseOptions(Chart, chartOptions());

    this.getYearlyProfits();
  }


  getYearlyProfits() {
    var chartOrders = document.getElementById('chart-orders');
    this.model.year = new Date().getFullYear();
    this.profitService.getYearlyProfits(this.authService.decodedToken.nameid, this.model).subscribe((profits) => {
      this.profits = profits;
      this.profits.forEach(element => {
        this.dataset.push(element.totalProfit);
        this.profitOfCurrentYear += element.totalProfit;
      });
      this.profitOfCurrentMonth = this.profits.find(p => p.month === (new Date().getMonth() + 1)).totalProfit;
      let dataRecentProfits = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Performance',
            data: this.dataset
          }
        ]
      };
  
      var ordersChart = new Chart(chartOrders, {
        type: 'bar',
        options: chartExample2.options,
        data: dataRecentProfits
      });

      var chartSales = document.getElementById('chart-sales');

      this.salesChart = new Chart(chartSales, {
        type: 'line',
        options: chartExample1.options,
        data: dataRecentProfits
      });

    }, error => {
      this.alertify.error('Something went wrong');
    });
  }

  getRecentIncomes() {
    this.incomeService.getRecentIncomes(this.authService.decodedToken.nameid, this.itemCount)
    .subscribe(incomes => {
        this.incomes = incomes;
      }, error => {
        this.alertify.error(error);
      });
  }

  getRecentExpenses() {
    this.expenseService.getRecentExpenses(this.authService.decodedToken.nameid, this.itemCount)
    .subscribe(expenses => {
        this.expenses = expenses;
      }, error => {
        this.alertify.error(error);
      });
  }

  getMonthNameByNumber(monthNo: number) {
    const months = ['Janunary', 'February', 'March', 'April', 'May', 'June',
                 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNo - 1];
   }
 
  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
