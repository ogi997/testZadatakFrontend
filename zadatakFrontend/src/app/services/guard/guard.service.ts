import { Injectable } from '@angular/core';
import {StateService} from "../../globals/globals";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GuardService{

  userData: boolean | undefined;
  constructor(private stateService: StateService,
              private router: Router
  ) {

  }
  public canActivate() {
    this.userData = this.stateService.getUserData();

    if (this.userData !== undefined)
      return this.userData === true;
    else {
      this.router.navigate(['']);
      return false;
    }
  }

}
