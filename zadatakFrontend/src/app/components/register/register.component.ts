import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
        public form: FormGroup = new FormGroup({});

        constructor(private formBuilder: FormBuilder,
                    private router: Router,
                    private authService: AuthService
      ) { }

        ngOnInit() {
            this.form = this.formBuilder.group({
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            email: [null, Validators.required],
            phone: [null, Validators.required],
            password: [null, Validators.required],
            confirmPassword: [null, Validators.required],
        });
      }

      public register(form: FormGroup) {
       this.authService.register(form).subscribe( (res: any) => {
        this.router.navigate(['']);
       });
      }
}
