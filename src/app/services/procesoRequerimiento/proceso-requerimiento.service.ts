import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoRequerimientoService {

  URI = 'http://localhost:4000/procesoRequerimientoG';
  URICAN = 'http://localhost:4000/procesoRequerimiento';
  URIFEI = 'http://localhost:4000/procesoRequerimientoIn';
  URIFEN = 'http://localhost:4000/procesoRequerimientoFn';
  URICOV = 'http://localhost:4000/procesoRequerimientoCv';
  URIINV = 'http://localhost:4000/procesoRequerimientoIv';

  constructor(private http: HttpClient) { }

  getCantProcesos(): Observable<any> {
    return this.http.get<any>(this.URICAN);
  }

  getProcesoRequerimiento(codempleado: string, consecreque: number): Observable<any> {
    const body = {
      codempleado: codempleado,
      consecreque: consecreque
    };
    return this.http.post<any>(this.URI, body)
  }

  createProceso(bod: any): Observable<any> {
    const body = {
      consproceso: bod.consproceso,
      consecreque: bod.consecreque,
      codempleado: bod.codempleado,
      idfase: bod.idfase,
      idperfil: bod.idperfil,
      fechaIn: bod.fechaIn,
      fechaFn: bod.fechaFn,
      convocatoria: bod.convocatoria,
      invitacion: bod.invitacion
    }

    return this.http.post<any>(this.URICAN, body)
  }

  updateProcesoFechaIn(bod: any): Observable<any>{
    const body = {
      consproceso: bod.consproceso,
      consecreque: bod.consecreque,
      codempleado: bod.codempleado,
      idfase: bod.idfase,
      idperfil: bod.idperfil,
      fechaIn: bod.fechaIn
    }

    return this.http.put<any>(this.URIFEI,body)
  }

  updateProcesoFechaFn(bod: any): Observable<any>{
    const body = {
      consproceso: bod.consproceso,
      consecreque: bod.consecreque,
      codempleado: bod.codempleado,
      idfase: bod.idfase,
      idperfil: bod.idperfil,
      fechaFn: bod.fechaFn
    }
    return this.http.put<any>(this.URIFEN,body)
  }

  updateProcesoConvocatoria(bod: any): Observable<any>{
    const body = {
      consproceso: bod.consproceso,
      consecreque: bod.consecreque,
      codempleado: bod.codempleado,
      idfase: bod.idfase,
      idperfil: bod.idperfil,
      convocatoria: bod.convocatoria
    }
    return this.http.put<any>(this.URICOV,body)
  }

  updateProcesoInvitacion(bod: any): Observable<any>{
    const body = {
      consproceso: bod.consproceso,
      consecreque: bod.consecreque,
      codempleado: bod.codempleado,
      idfase: bod.idfase,
      idperfil: bod.idperfil,
      invitacion: bod.invitacion
    }

    return this.http.put<any>(this.URIINV,body)
  }
}
