import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequerimientoService {

  URI = 'http://localhost:4000/requerimientos';
  URIAG = 'http://localhost:4000/requerimientosag';

  constructor(private http: HttpClient) { }

  getRequerimientos(): Observable<any[]> {
    return this.http.get<any[]>(this.URI);
  }

  getRequerimientosAG(codeEmp: string): Observable<any[]> {
    const params = { codeEmp: codeEmp };
    console.log(params);
    return this.http.post<any[]>(this.URIAG, params);
  }

  putIdAnalistaClient(consecreque:number ,idAnalistaC:string): Observable<any>{
    const body = {
      consecreque: consecreque,
      emp_codempleadoac: idAnalistaC
    };
    return this.http.put(this.URI, body);
  }
}
