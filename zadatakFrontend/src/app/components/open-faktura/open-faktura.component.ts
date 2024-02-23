import { Component, OnInit } from '@angular/core';
import { FakturaService } from '../../services/faktura/faktura.service';
import { ActivatedRoute } from '@angular/router';
import { Faktura, StavkaFakture } from '../../models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StavkeFakturaService } from '../../services/stavkeFaktura/stavke-faktura.service';

@Component({
  selector: 'app-open-faktura',
  templateUrl: './open-faktura.component.html',
  styleUrl: './open-faktura.component.css'
})
export class OpenFakturaComponent implements OnInit {
  fakturaID: string | null = null;
  stavkaID: number|null = null;
  faktura: Faktura | undefined;
  form: FormGroup = new FormGroup({});
  update: boolean = false;

  public constructor(private fakturaService: FakturaService, 
                    private route: ActivatedRoute, 
                    private formBuilder: FormBuilder,
                    private stavkeFaktureService: StavkeFakturaService
              ){}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      rbr: [null, Validators.required],
      nazivArtikla: [null, Validators.required],
      kolicina: [null, Validators.required],
      cijena: [null, Validators.required],
      postoRabata: [null, Validators.required],

    });


    this.route.paramMap.subscribe(params => {
      this.fakturaID = params.get("id");
    });

    this.fakturaService.getFakturaById(this.fakturaID).subscribe((result) => {
      this.faktura = result;
    });
  }

  public dodajStavkuForme(form: FormGroup):any{
    let calcIznosBezPdv = form.value.kolicina*form.value.cijena;
    let calcRabat = calcIznosBezPdv*form.value.postoRabata;
    let calcIznosSaRabatomBezPdv = calcIznosBezPdv-calcRabat;
    let calcPdv = Number.parseFloat((Math.round(calcIznosSaRabatomBezPdv*0.17)).toFixed(2));
    let calcUkupno = calcIznosSaRabatomBezPdv+calcPdv;
    let dataToSend = {
      rbr: this.form.value.rbr,
      nazivArtikla: this.form.value.nazivArtikla,
      kolicina: this.form.value.kolicina,
      cijena: this.form.value.cijena,
      postoRabata: this.form.value.postoRabata,
      iznosBezPdv: calcIznosBezPdv,
      rabat: calcRabat,
      iznosSaRabatomBezPdv: calcIznosSaRabatomBezPdv,
      pdv: calcPdv,
      ukupno: calcUkupno
    };
    if (this.update) {
      this.stavkeFaktureService.putStavkaFakture(this.fakturaID,this.stavkaID, dataToSend).subscribe((result) =>{
        this.fakturaService.getFakturaById(this.fakturaID).subscribe((result) => this.faktura = result);
        this.form.reset();
      });
      this.update = false;
    } else {
      this.stavkeFaktureService.dodajStavkuFakture(this.fakturaID, dataToSend).subscribe((res) => {
        this.fakturaService.getFakturaById(this.fakturaID).subscribe((result) => this.faktura = result);
        this.form.reset();
      })
    }
  }

  public azurirajStavku(id: number):any {
    this.stavkeFaktureService.getStavkaFaktureById(id).subscribe((result) => {
      this.stavkaID = result.id;
      this.form = this.formBuilder.group({
        rbr: [result.rbr, Validators.required],
        nazivArtikla: [result.nazivArtikla, Validators.required],
        kolicina: [result.kolicina, Validators.required],
        cijena: [result.cijena, Validators.required],
        postoRabata: [result.postoRabata, Validators.required],
      });
      this.update = true;
    });
  }

  public deleteStavku(idStavke: number): any {
    this.stavkeFaktureService.delteStavakFakture(this.fakturaID, idStavke).subscribe((result) => {
      this.fakturaService.getFakturaById(this.fakturaID).subscribe((result) => this.faktura = result);
    })
  }
}
