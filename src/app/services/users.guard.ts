import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {
  constructor(public router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let userEmail = window.localStorage.getItem("UserName");
      if(userEmail){
        return true
      }else{
        this.router.navigate(['login'])
        return false;
      }
  }
  
}
