import { Component, OnInit } from '@angular/core';
import { StateService } from '../../globals/globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userData: boolean | undefined;
  public constructor(private stateService: StateService,
                     private router: Router
                     ) {
  }
    ngOnInit(): void {
      //global variable
      this.userData = this.stateService.getUserData();
      this.stateService.userDataChanged.subscribe((value) => {
        this.userData = value;
      });
    }
  
    public logout() {
    this.stateService.setUserData(false);
    sessionStorage.removeItem("token");
    this.router.navigate(['/']);
    }

}
