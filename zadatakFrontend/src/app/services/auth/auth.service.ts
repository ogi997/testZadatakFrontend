import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import { FormGroup } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private PREFIX = "/Auth";
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  public register(form: FormGroup): any {
    console.log("AA",form.value);
    return this.http.post(environment.apiUrl+this.PREFIX+"/register", form.value, {
      headers: environment.headerOption
    }).pipe(
      catchError(
        (e: any) => {
          if (e.status === 409)
            this.snackBar.open("Email je vec zauzet.", undefined, {
          duration: 5000,
          });
          if (e.status === 201)
          this.snackBar.open("Uspjesno ste registrovani.", undefined, {
        duration: 5000});
          return throwError(() => e)
        }
      )
    );

  }

  public login(form: FormGroup): any {
    return this.http.post(environment.apiUrl+this.PREFIX+"/login", form.value, {
      headers: environment.headerOption
    }).pipe(
      catchError(
        (e: any) => {
          if (e.status === 404)
            this.snackBar.open("Korisnik sa datim email ne postoji.", undefined, {
              duration: 5000,
            });
            console.log(e);
          if(e.status === 400)
            this.snackBar.open("Pogresan unos.", undefined, {
          duration: 5000});
        return throwError(() => e);
        }
      )
    );
  }
}
