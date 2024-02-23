import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { StateService } from '../../globals/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  userData: boolean | undefined;
  public constructor(private formBuilder: FormBuilder,
    private stateService: StateService,
    private authService: AuthService,
    private route: Router
    ) {
}

  ngOnInit(): void {
    // forma
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });

      //global variable
      this.userData = this.stateService.getUserData();
      this.stateService.userDataChanged.subscribe((value) => {
        this.userData = value;
      });

  }

  public login(form: FormGroup) {
    this.authService.login(form).subscribe((res: any) => {
      sessionStorage.setItem("token", res);
      this.stateService.setUserData(true);
      this.route.navigate(['']);
    })
  }

}
