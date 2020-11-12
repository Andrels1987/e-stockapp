import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
user: string = ""
  constructor(public logged: LoginComponent) { 
    this.user =  window.localStorage.getItem("UserName");
  }

  ngOnInit(): void {
    
    
  }

}
