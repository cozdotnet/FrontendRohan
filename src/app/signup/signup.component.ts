import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupService } from './service.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signupForm!: FormGroup;

  public credentials: any;

  index: number = 0;
  myForm: any;
  passwordControl: any;

  Cancel() {
    this.signupForm.reset();
    this.router.navigateByUrl('/batches-programs');
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar, private signupService: SignupService) { }

  ngOnInit() {
    // Define form group
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      newPassword: ['', Validators.compose([Validators.required, this.createPasswordStrengthValidator()])],
      confirmNewPassword: ['', Validators.required]
    }, {
      validator: this.matchingPasswords('newPassword', 'confirmNewPassword')
    });
  }

  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('newPassword');
  }


  onSubmit() {
    if (this.signupForm.invalid) {
      this.snackBar.open('Invalid Credentials', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      return;
    }


    this.signupService.AddUser(this.username?.value, this.password?.value).subscribe(() => {
      this.snackBar.open('user added successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.signupForm.reset();
    },
      (error) => {
        console.error(error);
        this.snackBar.open('Error updating password', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    );
  }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
      return (group: FormGroup) => {
        const password = group.controls[passwordKey];
        const confirmPassword = group.controls[confirmPasswordKey];
        if (password.value !== confirmPassword.value && confirmPassword.dirty) {
          confirmPassword.setErrors({ passwordMismatch: true });
          this.snackBar.open('Passwords do not match.', 'Close', { duration: 3000 });
        } else {
          confirmPassword.setErrors(null);
        }
      };
    }

    hideNewPassword = true;
    hideConfirmNewPassword = true;

    togglePasswordVisibility(field: string) {
      switch (field) {
        case 'newPassword':
          this.hideNewPassword = !this.hideNewPassword;
          break;
        case 'confirmNewPassword':
          this.hideConfirmNewPassword = !this.hideConfirmNewPassword;
          break;
      }
    }

    createPasswordStrengthValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) {
          return null;
        }
        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNumeric = /[0-9]+/.test(value);
        const hasSpecial = /[^a-zA-Z0-9]+/.test(value);
        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
        if (!passwordValid) {
          return { passwordStrength: true };
        }
        return null;
      }
    }
  }

