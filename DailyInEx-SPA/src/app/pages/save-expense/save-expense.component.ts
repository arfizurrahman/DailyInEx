import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Expense } from 'src/app/models/expense';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-save-expense',
  templateUrl: './save-expense.component.html',
  styleUrls: ['./save-expense.component.scss']
})
export class SaveExpenseComponent implements OnInit {
  saveExpenseForm: FormGroup;
  expense: Expense;

  constructor(private alertify: AlertifyService,
              private expenseService: ExpenseService,
              private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.createSaveExpenseForm();
    this.setPaymentTypeValidators();
  }

  setPaymentTypeValidators() {
    const checkNoControl = this.saveExpenseForm.get('checkNo');
    const bankNameControl = this.saveExpenseForm.get('bankName');

    this.saveExpenseForm.get('paymentType').valueChanges
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

  createSaveExpenseForm() {
    this.saveExpenseForm = this.fb.group({
      amount: [null, Validators.required],
      paymentType: ['cash'],
      checkNo: [null],
      bankName: [null],
      particular: ['', Validators.required],
      date: [null, Validators.required]
    });
  }

  saveExpense() {
    if (this.saveExpenseForm.valid) {
      this.expense = Object.assign({}, this.saveExpenseForm.value);
      this.expense.isCash = this.saveExpenseForm.get('paymentType').value === 'cash' ? true : false;
      this.expense.isCheck = this.saveExpenseForm.get('paymentType').value === 'check' ? true : false;
      this.expense.date = this.expense.date['year'] + '-' + this.expense.date['month'] + '-' + this.expense.date['day'];
      this.expenseService.saveExpense(this.authService.decodedToken.nameid, this.expense).subscribe(() => {
        this.alertify.success('Expense info saved successfully');
      }, error => {
        this.alertify.error(error);
      }, () => {
          this.router.navigate(['/monthly-expenses']);
      });
    }
  }
}
