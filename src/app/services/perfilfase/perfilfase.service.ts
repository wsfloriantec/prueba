import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilfaseService {

  URI = 'http://localhost:4000/perfilfase'

  constructor(private http: HttpClient) { }

  getPerfilFase(idPerfil: string): Observable<any[]> {
    const body = { idPerfil: idPerfil };
    return this.http.post<any[]>(this.URI, body);
  }
}
