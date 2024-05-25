import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  URI = 'http://localhost:4000/empleados'
  URIAG = 'http://localhost:4000/empleadosAG'

  constructor(private http: HttpClient) { }

  getEmpleado(correo: string): Observable<any> {
    const params = { correo: correo };
    return this.http.post<any>(this.URI, params);
  }

  getEmpleadoAG(): Observable<any[]>{
    return this.http.get<any[]>(this.URIAG);
  }
}
