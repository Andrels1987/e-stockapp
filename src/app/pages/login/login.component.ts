import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @Output() userLogged = new EventEmitter();
  user: string = ""

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.user = window.localStorage.getItem("UserName")
    if (this.user) {
      this.router.navigate(['home'])
    }
  }
  login() {
    window.localStorage.setItem("UserName", "Andre Luis")
    this.router.navigate(['home'])

  }

  // getUser() {
  //   this.user = window.localStorage.getItem("UserName");
  //   this.userLogged.emit(this.user)
  // }
}
