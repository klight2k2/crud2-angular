import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleguardGuard implements CanActivate {
  constructor(private sessionStorage: TokenStorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token= this.sessionStorage.getUser();
      const userId:string=route.params['id'];
     console.log('this is id',userId);
     console.log('this is token',token);
     console.log('you only access to your profile');
     if(token.isAdmin || userId===token.userId) {
       return true;

     }
     return false;
  }
  
}
