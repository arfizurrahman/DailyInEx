import { Profit } from './../../models/profit';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';
import { DatePipe } from '@angular/common';
import { ProfitService } from 'src/app/services/profit.service';

@Component({
  selector: 'app-yearly-profit',
  templateUrl: './yearly-profit.component.html',
  styleUrls: ['./yearly-profit.component.scss']
})
export class YearlyProfitComponent implements OnInit {
  profits: Profit[] = [];
  model: any = { year: '' };
  showClicked = false;
  yearlyIncome = 0;
  yearlyExpense = 0;
  yearlyProfit = 0;

  constructor(private alertify: AlertifyService,
              private profitService: ProfitService,
              private authService: AuthService ,
              private pdfGeneratorService: PdfGeneratorService,
              private datePipe: DatePipe) {}

  ngOnInit() {
    console.log(this.authService.decodedToken.nameid);
  }

  getYearlyProfits() {
    this.profitService.getYearlyProfits(this.authService.decodedToken.nameid, this.model).subscribe((profits) => {
      this.profits = profits;
      this.profits.forEach(element => {
        element.monthName = this.getMonthNameByNumber(element.month);
        this.yearlyIncome += element.income;
        this.yearlyExpense += element.expense;
        this.yearlyProfit += element.totalProfit;
      });
      this.showClicked = true;
    }, error => {
      this.alertify.error('Something went wrong');
    });
  }

  getMonthNameByNumber(monthNo: number) {
    const months = ['Janunary', 'February', 'March', 'April', 'May', 'June',
                 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNo - 1];
  }
}
