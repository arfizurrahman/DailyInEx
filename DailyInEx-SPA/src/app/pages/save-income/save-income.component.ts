import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Income } from './../../models/Income';
import { Router } from '@angular/router';
import { IncomeService } from 'src/app/services/income.service';
import { AlertifyService } from 'src/app/services/alertify.service';

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
    ) { }

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
      amount: ['', Validators.required],
      paymentType: ['cash'],
      checkNo: [''],
      bankName: [''],
      particular: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  saveIncome() {
    if (this.saveIncomeForm.valid) {
      this.income = Object.assign({}, this.saveIncomeForm.value);
      // this.incomeService.saveIncome(this.user).income(() => {
      // this.alertify.success('Income info saved successfully');
      console.log(this.income);
    // }, error => {
    //   console.log(error);
    // }, () => {
    //     this.router.navigate(['/dashboard']);
    // });
    }
  }
}
