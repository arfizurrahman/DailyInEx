import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { SaveIncomeComponent } from '../../pages/save-income/save-income.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { SaveExpenseComponent } from 'src/app/pages/save-expense/save-expense.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'save-income',         component: SaveIncomeComponent },
    { path: 'save-expense',         component: SaveExpenseComponent },
];
