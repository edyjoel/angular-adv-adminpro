import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css'],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription = new Subscription();
  public hospitalesTemp: Hospital[] = [];

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales;
      this.cargando = false;
      this.hospitalesTemp = hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospital(hospital._id || '', hospital.nombre)
      .subscribe((resp) => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  borrarHospital(hospital: Hospital) {
    this.hospitalService
      .borrarHospital(hospital._id || '')
      .subscribe((resp) => {
        Swal.fire('Borrado', hospital.nombre, 'success');
        this.cargarHospitales();
      });
  }

  abrirSweetAlert() {
    Swal.fire({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((valor) => {
      if (!valor.value || valor.value.length === 0) {
        return;
      }
      this.hospitalService.crearHospitales(valor.value).subscribe((resp) => {
        Swal.fire('Creado', valor.value, 'success');
        this.cargarHospitales();
      });
    });
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id,
      hospital.img
    );
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.hospitales = this.hospitalesTemp;
      return;
    }
    this.busquedasService.buscar('hospitales', termino).subscribe((resp) => {
      this.hospitales = resp;
    });
  }
}
