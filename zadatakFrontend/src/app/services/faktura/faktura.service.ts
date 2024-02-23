import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faktura } from '../../models/models';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FakturaService {
  PREFIX = "/Fakture";
  constructor(private http: HttpClient) { }

  public getFakture(): Observable<Faktura[]> {
    return this.http.get<Faktura[]>(environment.apiUrl+this.PREFIX+"/all-fakture", {
      headers: environment.headerOption
    } );
  }

  public getFakturaById(id: string | null): Observable<Faktura>{
    return this.http.get<Faktura>(environment.apiUrl+this.PREFIX+"/faktura/"+id, {
      headers: environment.headerOption
    });
  }

public  addFaktura(faktura: any): Observable<Faktura> {
    return this.http.post<Faktura>(environment.apiUrl+this.PREFIX+"/nova-faktura", faktura);
  }

public  updateFaktura(id: number, faktura: Faktura): Observable<Faktura> {
    return this.http.put<Faktura>(environment.apiUrl+this.PREFIX+"/izmjena/"+id, faktura, {
      headers: environment.headerOption
    });
  }

 public deleteFaktura(id: number): Observable<void> {
    return this.http.delete<void>(environment.apiUrl+this.PREFIX+"/delete-faktura/"+id);
  }

}
