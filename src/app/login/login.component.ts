import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginServices } from './services.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public token:any ='';

  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]),
  });

  hidePassword = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  constructor(private router: Router, private snackBar: MatSnackBar,private Loginservices:LoginServices) { }

  get username() {
    return this.profileForm.get('username');
    
  }

  get password() {
    return this.profileForm.get('password');
  }
  

  async login() {
    console.log(this.username?.value);
    console.log(this.password?.value);
    
    
    if (!this.username?.value) {
      this.snackBar.open('Enter UserName', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      return;
    } else if (!this.password?.value) {
      this.snackBar.open('Enter Password', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      return;
    }

    try {
      const response = await this.Loginservices.LoginCredential(this.username.value, this.password.value);
      localStorage.setItem('token', response.token);
      localStorage.setItem('username',this.username.value);
      this.router.navigateByUrl('/home');
    } catch (error) {
      this.snackBar.open('Invalid User Name or Password', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

}

export function createPasswordStrengthValidator(): ValidatorFn {
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
    return !passwordValid ? { passwordStrength: true } : null;
  }
}
