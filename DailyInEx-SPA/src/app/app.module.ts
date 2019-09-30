import { ComponentsModule } from './components/components.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { ErrorInterceptorProvider } from './services/error.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthService } from './services/auth.service';
import { IncomeService } from './services/income.service';
import { IncomesResolver } from './resolvers/incomes.resolver';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
         tokenGetter: tokenGetter,
         whitelistedDomains: ['localhost:5000'],
         blacklistedRoutes: ['localhost:5000/api/auth']
      }
   })
  ],
  providers: [
    AuthService,
    IncomeService,
    ErrorInterceptorProvider,
    IncomesResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
