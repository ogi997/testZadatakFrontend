import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faktura, StavkaFakture } from '../../models/models';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StavkeFakturaService {
  PREFIX="/StavkaFakture";
  constructor(private http: HttpClient) { }


  public dodajStavkuFakture(id: string | null, data: any): Observable<StavkaFakture> {
    return this.http.post<StavkaFakture>(environment.apiUrl+this.PREFIX+"/nova-stavkaFaktura/"+id, data, {
      headers: environment.headerOption
    });
  }

  public getStavkaFaktureById(id: number): Observable<StavkaFakture> {
    return this.http.get<StavkaFakture>(environment.apiUrl+this.PREFIX+"/stavkaFaktura/"+id, {
      headers: environment.headerOption
    });
  }

  public putStavkaFakture(idFakture:string|null, idStavke: number|null, data: any): Observable<StavkaFakture>{
    return this.http.put<StavkaFakture>(environment.apiUrl+this.PREFIX+"/izmjena/"+idFakture+"/"+idStavke, data, {
      headers: environment.headerOption
    })
  }

  public delteStavakFakture(idFakture: string|null, idStavke: number|null): Observable<StavkaFakture> {
    return this.http.delete<StavkaFakture>(environment.apiUrl+this.PREFIX+"/delete-stavkaFaktura/"+idFakture+"/"+idStavke, {
      headers: environment.headerOption
    })
  }
}
