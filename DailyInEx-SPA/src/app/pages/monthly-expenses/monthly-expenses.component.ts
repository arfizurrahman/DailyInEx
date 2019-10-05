import { ExpenseService } from 'src/app/services/expense.service';
import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { Pagination, PaginatedResult } from 'src/app/models/pagination';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';
import { DatePipe } from '@angular/common';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-monthly-expenses',
  templateUrl: './monthly-expenses.component.html',
  styleUrls: ['./monthly-expenses.component.scss']
})
export class MonthlyExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  expensesForPdf: Expense[] = [];
  pagination = new Pagination();
  pageNumber = 1;
  pageSize = 10;
  currentPage: any;
  model: any = { year: '', month: '' };
  base64Image = '';
  showClicked = false;

  constructor(private alertify: AlertifyService,
              private expenseService: ExpenseService,
              private authService: AuthService ,
              private pdfGeneratorService: PdfGeneratorService,
              private datePipe: DatePipe) {
  }

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
        this.showClicked = true;
      }, error => {
        this.alertify.error(error);
      });
  }

  getMonthlyExpensesForPdf() {
      this.expenseService.getMonthlyExpensesForPdf(this.authService.decodedToken.nameid, this.model).subscribe((expensesForPdf) => {
        this.expensesForPdf = expensesForPdf;
        this.generatePdf();
      }, error => {
        this.alertify.error(error);
      });
  }

  generatePdf() {
    let expensesToWrite = [[{ text: 'SL', style: 'tableHeader', alignment: 'center'},
                  { text: 'Date', style: 'tableHeader', alignment: 'center'},
                  { text: 'Amount', style: 'tableHeader', alignment: 'center'},
                  { text: 'Cash/Check', style: 'tableHeader', alignment: 'center'},
                  { text: 'Particular', style: 'tableHeader', alignment: 'center'},
                  { text: 'Bank Details', style: 'tableHeader', alignment: 'center'}]];
    let count = 1;
    const currentDate = this.datePipe.transform(new Date(), 'longDate');
    this.expensesForPdf.forEach(element => {
      let checkDetails = element.isCheck ? 'Check No: ' + element.checkNo + ' - ' + element.bankName : 'N/A';
      let row = [{text: (count++).toString(), style: '', alignment: 'center'},
                { text: this.datePipe.transform(element.date, 'mediumDate'), style: '', alignment: 'center'},
                { text: element.amount.toString(), style: '', alignment: 'center'},
                { text: element.isCash ? 'Cash' : 'Check' , style: '', alignment: 'center'},
                { text: element.particular ? element.particular : 'N/A', style: '', alignment: 'center'},
                { text: checkDetails, style: '', alignment: 'center'}];
      expensesToWrite.push(row);
    });
    const imageUrl = 'assets/img/theme/nerd-castle-ltd.png';
    this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
      // console.log(base64data);
      // this is the image as dataUrl
      this.base64Image = base64data;
    });

    const dd = {
      content: [
        {text: 'Nerd Castle Ltd.', style: 'header', alignment: 'center'},
        {text: 'Monthly Expense Report', style: 'subheader', alignment: 'center'},
        {
          text: [
            'For ', {text: this.getMonthNameByNumber(this.model.month), italics: true, bold: true},
            { text: ', ' + this.model.year, italics: true, bold: true }
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
              widths: [15, 90, 70, 70, 90, 110],
              body: expensesToWrite
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

    this.pdfGeneratorService.pdfMake.createPdf( dd ).download('Monthly-Expense-Report-' + currentDate + '.pdf');
  }

  getBase64Image(img: HTMLImageElement) {
    // We create a HTML canvas object that will create a 2d image
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    // This will draw image
    ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    const dataURL = canvas.toDataURL('image/png');
    // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    return dataURL;
 }

 getMonthNameByNumber(monthNo: number) {
   const months = ['Janunary', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
   return months[monthNo - 1];
 }

 getBase64ImageFromURL(url: string) {
  return Observable.create((observer: Observer<string>) => {
    // create an image object
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
        observer.next(this.getBase64Image(img));
        observer.complete();
      };
        img.onerror = (err) => {
         observer.error(err);
      };
    } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
    }
  });
}
}
