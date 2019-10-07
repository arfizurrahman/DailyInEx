import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/save-income', title: 'Save Income',  icon: 'ni-money-coins text-green', class: '' },
    { path: '/save-expense', title: 'Save Expense',  icon: 'ni-money-coins text-red', class: '' },
    { path: '/monthly-incomes', title: 'View Monthly Incomes',  icon: 'fas fa-chart-bar text-yellow', class: '' },
    { path: '/monthly-expenses', title: 'View Monthly Expenses',  icon: 'fas fa-chart-bar text-primary', class: '' },
    { path: '/yearly-profit', title: 'Yearly Profit Report',  icon: 'ni-chart-pie-35 text-yellow', class: '' }
    // { path: '/approve-incomes', title: 'Approve Incomes',  icon: 'ni-check-bold text-green', class: '' },
    // { path: '/approve-expenses', title: 'Approve Expenses',  icon: 'ni-check-bold text-red', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }
}
