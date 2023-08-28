import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {CharService} from "./char.service";

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor( private sharedService: CharService) {
    //  Console.log("variable"+ this.validate.isvalidate);
  }
  canActivate(
    route: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sharedService.myVariable?true:true;
  }

}
