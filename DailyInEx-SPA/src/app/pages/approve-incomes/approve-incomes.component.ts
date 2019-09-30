import { Component, OnInit } from '@angular/core';
import { Income } from 'src/app/models/income';
import { Pagination, PaginatedResult } from 'src/app/models/pagination';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-approve-incomes',
  templateUrl: './approve-incomes.component.html',
  styleUrls: ['./approve-incomes.component.scss']
})
export class ApproveIncomesComponent implements OnInit {
  incomes: Income[];
  pagination: Pagination;
  incomesToApprove: number[] = [];

  constructor(private alertify: AlertifyService,
              private adminService: AdminService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.incomes = data['incomes'].result;
      this.pagination = data['incomes'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event;
    this.getIncomesForApproval();
  }

  getIncomesForApproval() {
    this.adminService.getIncomesForApproval(this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe((res: PaginatedResult<Income[]>) => {
        this.incomes = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  addToApprovalCollection(id: number) {
    if (this.incomesToApprove.includes(id)) {
      this.incomesToApprove.splice(this.incomesToApprove.indexOf(id), 1);
    } else {
      this.incomesToApprove.push(id);
    }
    console.log(this.incomesToApprove);
  }

  approveSelectedIncomes() {
    if (this.incomesToApprove.length === 0) {
      this.alertify.error('Please select income(s) to approve');
      return;
    }
    if (this.incomesToApprove.length > 0) {
      console.log(this.incomesToApprove);
    }
  }

  approveAllIncomes() {
    this.alertify.confirm('Are you sure you want to approve all incomes', () => {
      console.log('Yes');
    });
  }

}
