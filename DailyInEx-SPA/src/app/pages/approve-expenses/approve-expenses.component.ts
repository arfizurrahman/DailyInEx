import { AuthService } from './../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Expense } from 'src/app/models/expense';
import { PaginatedResult, Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-approve-expenses',
  templateUrl: './approve-expenses.component.html',
  styleUrls: ['./approve-expenses.component.scss']
})
export class ApproveExpensesComponent implements OnInit {

  expenses: Expense[];
  pagination: Pagination;
  expenseIds: number[] = [];

  constructor(private alertify: AlertifyService,
              private adminService: AdminService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.expenses = data['expenses'].result;
      this.pagination = data['expenses'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event;
    this.getExpensesForApproval();
  }

  getExpensesForApproval() {
    this.adminService.getExpensesForApproval(this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe((res: PaginatedResult<Expense[]>) => {
        this.expenses = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  addToApprovalCollection(id: number) {
    if (this.expenseIds.includes(id)) {
      this.expenseIds.splice(this.expenseIds.indexOf(id), 1);
    } else {
      this.expenseIds.push(id);
    }
    console.log(this.expenseIds);
  }

  approveSelectedExpenses() {
    if (this.expenseIds.length === 0) {
      this.alertify.error('Please select expense(s) to approve');
      return;
    }
    if (this.expenseIds.length > 0) {
      this.adminService.approveSelectedExpenses(this.expenseIds).subscribe(() => {
        this.expenseIds.forEach(element => {
          this.expenses.splice(this.expenses.findIndex(i => i.id === element), 1);
        });
        this.getExpensesForApproval();
        this.alertify.success("Expense(s) approved successfully");
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  approveAllExpenses() {
    this.alertify.confirm('Are you sure you want to approve all expenses?', () => {
      this.adminService.approveAllExpenses().subscribe(() => {
        this.expenseIds = [];
        this.getExpensesForApproval();
        this.alertify.success("Expenses approved successfully");
      }, error => {
        this.alertify.error(error);
      });
    });
  }

}
