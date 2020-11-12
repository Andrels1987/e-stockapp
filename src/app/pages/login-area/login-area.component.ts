import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-area',
  templateUrl: './login-area.component.html',
  styleUrls: ['./login-area.component.scss']
})
export class LoginAreaComponent implements OnInit {
user: string = ""
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.user = window.localStorage.getItem("UserName")
  }

  logout(){
    window.localStorage.clear()
    this.user = ""
    this.router.navigate(['login'])
  }

}
