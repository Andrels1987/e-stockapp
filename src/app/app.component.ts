import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-stockapp';

  constructor(){
    let user = window.localStorage.getItem("UserName")
    console.log(user);
    
  }
}
