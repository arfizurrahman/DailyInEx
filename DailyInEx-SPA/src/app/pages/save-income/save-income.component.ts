import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Income } from '../../models/income';
import { Router } from '@angular/router';
import { IncomeService } from 'src/app/services/income.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { toDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-save-income',
  templateUrl: './save-income.component.html',
  styleUrls: ['./save-income.component.scss']
})
export class SaveIncomeComponent implements OnInit {
  saveIncomeForm: FormGroup;
  income: Income;

  constructor(private alertify: AlertifyService,
              private incomeService: IncomeService,
              private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.createSaveIncomeForm();
    this.setPaymentTypeValidators();
  }

  setPaymentTypeValidators() {
    const checkNoControl = this.saveIncomeForm.get('checkNo');
    const bankNameControl = this.saveIncomeForm.get('bankName');

    this.saveIncomeForm.get('paymentType').valueChanges
      .subscribe(paymentType => {

        if (paymentType === 'cash') {
          checkNoControl.setValidators(null);
          bankNameControl.setValidators(null);
        }

        if (paymentType === 'check') {
          checkNoControl.setValidators([Validators.required]);
          bankNameControl.setValidators([Validators.required]);
        }

        checkNoControl.updateValueAndValidity();
        bankNameControl.updateValueAndValidity();
      });
  }

  createSaveIncomeForm() {
    this.saveIncomeForm = this.fb.group({
      amount: [null, Validators.required],
      paymentType: ['cash'],
      checkNo: [null],
      bankName: [null],
      particular: ['', Validators.required],
      date: [null, Validators.required]
    });
  }

  saveIncome() {
    if (this.saveIncomeForm.valid) {
      this.income = Object.assign({}, this.saveIncomeForm.value);
      this.income.isCash = this.saveIncomeForm.get('paymentType').value === 'cash' ? true : false;
      this.income.isCheck = this.saveIncomeForm.get('paymentType').value === 'check' ? true : false;
      this.income.date = this.income.date['year'] + '-' + this.income.date['month'] + '-' + this.income.date['day'];
      this.incomeService.saveIncome(this.authService.decodedToken.nameid, this.income).subscribe(() => {
        this.alertify.success('Income info saved successfully');
      }, error => {
        this.alertify.error(error);
      }, () => {
          this.router.navigate(['/dashboard']);
      });
    }
  }
}
