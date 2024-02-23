export interface Faktura {
    id: number;
    broj: number;
    datum: Date;
    partner: string;
    iznosBezPdv: number;
    postoRabata: number;
    rabat: number;
    iznosSaRabatomBezPdv: number;
    pdv: number;
    ukupno: number;
    stavkeFakture: StavkaFakture[];
  }
  
  export interface StavkaFakture {
    id: number;
    rbr: number;
    nazivArtikla: string;
    kolicina: number;
    cijena: number;
    iznosBezPdv: number;
    postoRabata: number;
    rabat: number;
    iznosSaRabatomBezPdv: number;
    pdv: number;
    ukupno: number;
  }