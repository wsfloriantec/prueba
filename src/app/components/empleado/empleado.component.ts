import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';


import { EmpleadoService } from '../../services/empleado/empleado.service';
import { RequerimientoService } from '../../services/requerimiento/requerimiento.service';
import { DisciplinaService } from '../../services/disciplina/disciplina.service';
import { PerfilService } from '../../services/perfil/perfil.service';
import { PerfilfaseService } from '../../services/perfilfase/perfilfase.service';
import { ProcesoRequerimientoService } from '../../services/procesoRequerimiento/proceso-requerimiento.service';

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
  procesoReque: any = '';

  requerimientos: any[] = [];//se guardan los requerimientos del analista registrado
  analistaG: any[] = [];//Lista para los analistas generales fase 1
  //fase 2
  disciplinas: any[] = [];//Lista para guardar las disciplinas que se eligen en la fase 2
  perfiles: any[] = [];//Lista para guardar los perfiles de las disciplinas de la fase 2
  perfilesFase: any[] = [];//Lista para crear cada fase de procesosRequerimiento


  idseleccionAG: string = ''; // Aquí guardaremos la opción seleccionada del analista general fase 1
  correo: string = '';//Empleado registrado actualmente
  requeSelec: number = -1;//Se usa para mostrar la información del requerimiento
  discSelec: string = '';//Se usa para buscar los perfiles relacionados con esa disciplina y posteriormente crear procesoRequerimiento
  perfilSelec: string = '';//Se usa para crear procesoRequerimiento
  cantProcesos: number = 0;//se usar para tener el ultimo id de procesoRequerimiento
  textoIntro: string = '';//Se usa para extraer la información de la convocatoria como de la invitación

  visibleLogin: boolean = true;
  visibleEmp: boolean = false;

  constructor(
    private datePipe: DatePipe,
    private EmpleadoService: EmpleadoService,
    private RequerimientoServise: RequerimientoService,
    private DisciplinaService: DisciplinaService,
    private PerfilService: PerfilService,
    private PerfilfaseService: PerfilfaseService,
    private ProcesoRequerimientoService: ProcesoRequerimientoService
  ) { };


  //metodos get
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
          } else {
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
          this.getDisciplinas();
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

  getDisciplinas() {
    this.DisciplinaService.getDisciplinas()
      .subscribe(
        (data: any[]) => {
          this.disciplinas = data
        },
        (err) => {
          console.log(err)
        }
      )
  }

  getPerfiles() {
    this.PerfilService.getPerfiles(this.discSelec)
      .subscribe(
        (data: any[]) => {
          this.perfiles = data
        },
        (err) => {
          this.perfiles = []
        }
      )
  }

  getPerfilesFase() {
    if (this.procesoReque === '') {
      var perfil = this.perfilSelec
    }
    else {
      var perfil = String(this.procesoReque.IDPERFIL)
    }
    this.PerfilfaseService.getPerfilFase(perfil)
      .subscribe(
        (data: any[]) => {
          this.perfilesFase = data
        },
        (err) => {
          console.log(err)
        }
      )
  }

  async getProcesoRequerimiento(requeSelec: number) {
    try {
      const data: any = await this.ProcesoRequerimientoService.getProcesoRequerimiento(this.empleado.CODEMPLEADO, requeSelec).toPromise();
      if (data.length > 0) {
        if(this.textoIntro != ''){
          const bodyProceso = {
            "consproceso": data[0].CONSPROCESO,
            "consecreque": data[0].CONSECREQUE,
            "codempleado": data[0].CODEMPLEADO,
            "idfase": data[0].IDFASE,
            "idperfil": data[0].IDPERFIL,
            "convocatoria": this.procesoReque.CONVOCATORIA,
          }
          this.ProcesoRequerimientoService.updateProcesoConvocatoria(bodyProceso).subscribe();
          data[0].CONVOCATORIA = this.procesoReque.CONVOCATORIA;
        }
        this.procesoReque = data[0];
      }
    } catch (error) {
      this.procesoReque = '';
    }
  }

  async getCantProcesos() {
    try {
      const data: any = await this.ProcesoRequerimientoService.getCantProcesos().toPromise();
      this.cantProcesos = data[0].CONS;
    } catch (error) {
      console.error(error);
    }
  }



  //funciones asignar datos -variables -base de datos
  async requerimientoSeleccionado(i: number) {
    let seleccion = this.requerimientos[i].CONSECREQUE;
    await this.getProcesoRequerimiento(seleccion);
    this.getPerfilesFase();
    this.requeSelec = i;

  }

  //fase 2
  setproceso() {
    this.getCantProcesos();
    this.getPerfilesFase();
  }

  //funciones actualizar información base de datos
  enviarCorreo() {
    const idReq = this.requerimientos[this.requeSelec].CONSECREQUE;
    if (this.idseleccionAG == '') {
      alert("Ha habido un error al enviar el corre, seleccione todos los campos");
    }
    else {
      this.RequerimientoServise.putIdAnalista(idReq, this.empleado.CODEMPLEADO, this.idseleccionAG)
        .subscribe(
          res => {
            alert("Se ha enviado de forma correcta el correo");
            this.requerimientoAc();
          },
          err => alert("Ha habido un error al enviar el corre, seleccione todos los campos")
        );
    }
  }

  async actualizarConvocatoria() {
    let fecha_inicio = this.requerimientos[this.requeSelec].FECHAREQUE.split('T')[0];
    const currentDate = new Date();
    const fecha_fin = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    const bodyProceso = {
      "consproceso": this.procesoReque.CONSPROCESO,
      "consecreque": this.procesoReque.CONSECREQUE,
      "codempleado": this.procesoReque.CODEMPLEADO,
      "idfase": this.procesoReque.IDFASE,
      "idperfil": this.procesoReque.IDPERFIL,
      "fechaIn": fecha_inicio,
      "fechaFn": fecha_fin,
      "convocatoria": this.textoIntro,
    }
    this.procesoReque.CONVOCATORIA = this.textoIntro;
    this.ProcesoRequerimientoService.updateProcesoFechaIn(bodyProceso).subscribe();
    this.ProcesoRequerimientoService.updateProcesoFechaFn(bodyProceso).subscribe();
    this.ProcesoRequerimientoService.updateProcesoConvocatoria(bodyProceso).subscribe();

    await this.getProcesoRequerimiento(this.requerimientos[this.requeSelec].CONSECREQUE);
  }

  //funciones para crear
  async generarProceso() {
    let fecha_inicio;
    let fecha_fin;
    for (const item of this.perfilesFase) {
      await this.getCantProcesos();
      if (item.IDFASE == 1 || item.IDFASE == 2) {
        fecha_inicio = this.requerimientos[this.requeSelec].FECHAREQUE.split('T')[0];
        const currentDate = new Date();
        fecha_fin = this.datePipe.transform(currentDate, 'yyyy-MM-dd')
      } else {
        fecha_inicio = null;
        fecha_fin = null;
      }
      const bodyProceso = {
        "consproceso": Number(this.cantProcesos) + 1,
        "consecreque": this.requerimientos[this.requeSelec].CONSECREQUE,
        "codempleado": this.empleado.CODEMPLEADO,
        "idfase": item.IDFASE,
        "idperfil": item.IDPERFIL,
        "fechaIn": fecha_inicio,
        "fechaFn": fecha_fin,
        "convocatoria": null,
        "invitacion": null
      }
      if (this.perfilSelec == '') {
        alert("Ha habido un error al crear los procesos del requerimiento, verifique los campos")
        break;
      }
      else {

        this.ProcesoRequerimientoService.createProceso(bodyProceso)
          .subscribe()
      }
    }
    alert("Se ha creado de forma correcta los procesos del requerimiento");
    await this.getProcesoRequerimiento(this.requerimientos[this.requeSelec].CONSECREQUE);
  }
}
