import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SaveIncomeComponent } from 'src/app/pages/save-income/save-income.component';
import { SaveExpenseComponent } from 'src/app/pages/save-expense/save-expense.component';
import { ApproveIncomesComponent } from './../../pages/approve-incomes/approve-incomes.component';
import { ApproveExpensesComponent } from 'src/app/pages/approve-expenses/approve-expenses.component';
import { MonthlyExpensesComponent } from 'src/app/pages/monthly-expenses/monthly-expenses.component';
import { MonthlyIncomesComponent } from 'src/app/pages/monthly-incomes/monthly-incomes.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    SaveIncomeComponent,
    SaveExpenseComponent,
    ApproveIncomesComponent,
    ApproveExpensesComponent,
    MonthlyExpensesComponent,
    MonthlyIncomesComponent
  ]
})

export class AdminLayoutModule {}
