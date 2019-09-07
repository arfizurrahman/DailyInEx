import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  model: any = {};

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login() {
    console.log(this.model.email);
    this.authService.login(this.model).subscribe(next =>  {
     this.alertify.success('Loggged in successfully');
    }, error => {
      this.alertify.error(error.error);
    }, () => {
      this.router.navigate(['/dashboard']);
    });
  }

  loggedIn() {
     return this.authService.loggedIn();
  }

}
