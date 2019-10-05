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
  generatePdf() {
    let profitsToWrite = [[
                  { text: 'Month', style: 'tableHeader', bold: true , alignment: 'center'},
                  { text: 'Income', style: 'tableHeader', bold: true , alignment: 'center'},
                  { text: 'Expense', style: 'tableHeader', bold: true , alignment: 'center'},
                  { text: 'Profit', style: 'tableHeader', bold: true , alignment: 'center'}
                  ]];
    let lastRow = [[
      { text: 'Total', style: '', bold: true, alignment: 'center'},
      { text: this.yearlyIncome.toString(), style: '', bold: true, alignment: 'center'},
      { text: this.yearlyExpense.toString(), style: '', bold: true, alignment: 'center'},
      { text: this.yearlyProfit.toString(), style: '', bold: true, alignment: 'center'}
      ]];
    const currentDate = this.datePipe.transform(new Date(), 'longDate');
    this.profits.forEach(element => {
      let row = [{ text: this.getMonthNameByNumber(element.month), style: '', bold: false , alignment: 'center'},
                { text: element.income.toString(), style: '', bold: false , alignment: 'center'},
                { text: element.expense.toString(), style: '', bold: false , alignment: 'center'},
                { text: element.totalProfit.toString(), style: '', bold: false , alignment: 'center'}];
      profitsToWrite.push(row);
    });

    const dd = {
      content: [
        {text: 'Nerd Castle Ltd.', style: 'header', alignment: 'center'},
        {text: 'Yearly Income Expense Report', style: 'subheader', alignment: 'center'},
        {
          text: [
            'For year ',
            { text: this.model.year + '', italics: true, bold: true }
          ],
          alignment: 'center'
        },
        '\n\n',
        {
          text: [
          {text: 'Date: ', bold: true}, currentDate + '\n\n'
        ]
       },
        {
            style: 'tableExample',
            table: {
              heights: 15,
              headerRows: 1,
              widths: [100, 120, 120, 120],
              body: profitsToWrite.concat(lastRow)
            }
          }
          // {
          //   text: [
          //     { text: 'Powered by ', italics: true},
          //   { text: 'DailyInEx.com', bold: true}
          //   ]
          // }
      ],
    footer: function(currentPage, pageCount) {
      return {
          columns: [
            {text: currentPage.toString() + ' of ' + pageCount, alignment: 'left'},
             {text: [
              { text: 'Powered by ', italics: true, alignment: 'right'},
              { text: 'DailyInEx.com', bold: true,  alignment: 'right'}
             ],
             alignment: 'right'
            }
          ],
          margin: [50, 10, 50, 10]
      };
    },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        subheader: {
          fontSize: 15,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          fontSize: 11,
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          color: 'black',
          fontSize: 12
        }
      },
      pageSize: 'A4',
      pageMargins: [ 50, 60, 50, 60 ]
    };

    this.pdfGeneratorService.pdfMake.createPdf( dd ).download('Yearly-Profit-Report-' + currentDate + '.pdf');
  }
}
