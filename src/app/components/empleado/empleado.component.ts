import { Component, OnInit } from '@angular/core';

import { EmpleadoService } from '../../services/empleado/empleado.service';
import { RequerimientoService } from '../../services/requerimiento/requerimiento.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {

  empleado: any = {
    CODEMPLEADO: '',
    NOMEMPLEADO: '',
    APELLEMPLEADO: '',
    FECHAINGRE: '',
    CORREO: '',
    IDTIPOCARGO: 0
  };
  requerimientos: any[] = [];
  analistaG: any[] = [];
  idseleccionAG: string = ''; // Aquí guardaremos la opción seleccionada
  correo: string = '';
  requeSelec: number = -1;
  visibleLogin: boolean = true;
  visibleEmp: boolean = false;

  constructor(private EmpleadoService: EmpleadoService, private RequerimientoServise: RequerimientoService) { };

  empleadoCargo() {
    this.EmpleadoService.getEmpleado(this.correo)
      .subscribe(
        (data: any) => {
          this.empleado = data[0];
          this.visibleLogin = false;
          this.visibleEmp = true;
          if (this.empleado.IDTIPOCARGO == 'ACL') {
            this.requerimientoAc();
            this.getAnalistaG();
          }else{
            this.requerimientoAg(this.empleado.CODEMPLEADO);
          }
        },
        err => console.log(err)
      )
  };

  requerimientoAc() {
    this.RequerimientoServise.getRequerimientos()
      .subscribe(
        (data: any[]) => {
          this.requerimientos = data;
          console.log(this.requerimientos);
        },
        (err) => {
          console.log(err)
        }
      )
  }
  requerimientoAg(id: string) {
    this.RequerimientoServise.getRequerimientosAG(id)
      .subscribe(
        (data: any[]) => {
          this.requerimientos = data;
          console.log(this.requerimientos);
        },
        (err) => {
          console.log(err)
        }
      )
  }

  getAnalistaG() {
    this.EmpleadoService.getEmpleadoAG()
      .subscribe(
        (data: any[]) => {
          this.analistaG = data;
        },
        (err) => {
          console.log(err)
        }
      )
  }

  requerimientoSeleccionado(selectec: number) {
    this.requeSelec = selectec;

  }

  enviarCorreo() {
    console.log(this.idseleccionAG)
    const idReq = this.requerimientos[this.requeSelec].CONSECREQUE;
    this.RequerimientoServise.putIdAnalistaClient(idReq, this.empleado.CODEMPLEADO);
  }
}
