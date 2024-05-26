import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { EmpleadoService } from './services/empleado/empleado.service';
import { RequerimientoService } from './services/requerimiento/requerimiento.service';
import { DisciplinaService } from './services/disciplina/disciplina.service';
import { PerfilService } from './services/perfil/perfil.service';
import { PerfilfaseService } from './services/perfilfase/perfilfase.service';
import { ProcesoRequerimientoService } from './services/procesoRequerimiento/proceso-requerimiento.service';


@NgModule({
  declarations: [
    AppComponent,
    EmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    EmpleadoService,
    RequerimientoService,
    DisciplinaService,
    PerfilService,
    PerfilfaseService,
    ProcesoRequerimientoService,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
