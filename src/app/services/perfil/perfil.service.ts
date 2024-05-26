import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  URI = 'http://localhost:4000/perfil'

  constructor(private http: HttpClient) { }

  getPerfiles(idDisciplina: string): Observable<any[]> {
    const body = {disciplina: idDisciplina}
    return this.http.post<any[]>(this.URI, body)
  }
}
