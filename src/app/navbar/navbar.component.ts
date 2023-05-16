import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  dropdown = false;

  Getusername = localStorage.getItem('username');
  firstname  = this.Getusername?.split('.')[0];
  lastname = this.Getusername?.split('.')[1].split('@')[0];
  initials = this.firstname?.charAt(0).toUpperCase() ??'';

  constructor(private router: Router) {}

  openDropdown(){
    this.dropdown = !this.dropdown;
  }

  Signout() {
    localStorage.setItem('token', "");
    this.router.navigate(["/"]);
  }
  
}
