import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css'],
})
export class ModalImagenComponent {
  public imagenSubir: File | null = null;
  public imgTemp: string | ArrayBuffer | null = null;
  constructor(
    public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService
  ) {}

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) {
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };

    return reader.readAsDataURL(file);
  }

  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir!, tipo, id)
      .then((img) => {
        Swal.fire('Guardado', 'Imagen actualizada correctamente', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      })
      .catch((err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}
