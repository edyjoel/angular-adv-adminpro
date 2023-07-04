import { Component, OnDestroy, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from 'src/app/models/medico.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs: Subscription = new Subscription();
  public medicosTemp: Medico[] = [];

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.medicos = medicos;
      this.cargando = false;
      this.medicosTemp = medicos;
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.medicos = this.medicosTemp;
      return;
    }
    this.busquedasService.buscar('medicos', termino).subscribe((resp) => {
      this.medicos = resp;
    });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Está a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id || '').subscribe((resp) => {
          Swal.fire('Borrado', medico.nombre, 'success');
          this.cargarMedicos();
        });
      }
    });
  }
}
