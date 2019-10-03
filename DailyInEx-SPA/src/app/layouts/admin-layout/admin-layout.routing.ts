import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { SaveIncomeComponent } from '../../pages/save-income/save-income.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { SaveExpenseComponent } from 'src/app/pages/save-expense/save-expense.component';
import { ApproveIncomesComponent } from 'src/app/pages/approve-incomes/approve-incomes.component';
import { IncomesResolver } from 'src/app/resolvers/incomes.resolver';
import { ApproveExpensesComponent } from 'src/app/pages/approve-expenses/approve-expenses.component';
import { ExpensesResolver } from 'src/app/resolvers/expenses.resolver';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MonthlyExpensesComponent } from 'src/app/pages/monthly-expenses/monthly-expenses.component';
import { MonthlyIncomesComponent } from 'src/app/pages/monthly-incomes/monthly-incomes.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'save-income', component: SaveIncomeComponent },
    { path: 'save-expense', component: SaveExpenseComponent },
    { path: 'monthly-expenses', component: MonthlyExpensesComponent },
    { path: 'monthly-incomes', component: MonthlyIncomesComponent },
    { path: 'approve-incomes',
        component: ApproveIncomesComponent,
        resolve: { incomes: IncomesResolver},
        data: { roles: ['Admin', 'Moderator']}
    },
    { path: 'approve-expenses', component: ApproveExpensesComponent,
        resolve: { expenses: ExpensesResolver}, data: { roles: ['Admin', 'Moderator']} }
];
