import { Component, OnInit } from '@angular/core';
import { Faktura } from '../models/models';
import { FakturaService } from '../services/faktura/faktura.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fakture',
  templateUrl: './fakture.component.html',
  styleUrl: './fakture.component.css'
})
export class FaktureComponent implements OnInit {

  fakture: Faktura[] | undefined;
  form: FormGroup = new FormGroup({});
  update:boolean = false;
  updateFaktura: Faktura|undefined;
  constructor(private fakturaService: FakturaService, private router: Router, private formBuilder: FormBuilder){

  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      broj: [null, Validators.required],
      datum: [null, Validators.required],
      partner: [null, Validators.required]
    });
    this.ucitajFakture();
  }
  public ucitajFakture() {
    this.fakturaService.getFakture().subscribe((res) => {
      this.fakture = res;
  });
  }

  public azurirajFakturu(id: number) {
    this.fakturaService.getFakturaById(id.toString()).subscribe((result) => {
      this.updateFaktura = result;
      this.form = this.formBuilder.group({
        broj: [result.broj, Validators.required],
        datum: [result.datum, Validators.required],
        partner: [result.partner, Validators.required]
      });
      this.update = true;
    });
  }

  public dodajFakturu(form: FormGroup) {
    console.log(form.value);
    let dataToSend = {
      broj: form.value.broj,
      datum: form.value.datum,
      partner: form.value.partner,
      iznosBezPdv: 0,
      postoRabata: 0,
      rabat: 0,
      iznosSaRabatomBezPdv: 0,
      pdv: 0,
      ukupno: 0,
      stavkeFakture: []
    }

    if(this.update) {
      if (this.updateFaktura != undefined) {
        this.updateFaktura.broj = form.value.broj;
        this.updateFaktura.datum = form.value.datum;
        this.updateFaktura.partner = form.value.partner;

        console.log(this.updateFaktura);
        this.fakturaService.updateFaktura(this.updateFaktura.id, this.updateFaktura).subscribe((result) => {
          this.fakturaService.getFakture().subscribe((result) => {
            this.fakture = result;
          })
        })
        this.form.reset();
        this.update = false;
      }
    } else {
      this.fakturaService.addFaktura(dataToSend).subscribe((result) => {
        this.ucitajFakture();
        this.form.reset();
      });
    }
  }

  public otvoriFakturu(id: number):void {
    this.router.navigate(['/faktura/'+id]);
  }

  public obrisiFakturu(id: number):void {
    this.fakturaService.deleteFaktura(id).subscribe((res) => {
      this.ucitajFakture();
    });
  }
}
