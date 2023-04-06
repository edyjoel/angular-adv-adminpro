import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css'],
})
export class Grafica1Component {
  public labels1: string[] = ['Dato2', 'Dato3', 'Dato4'];

  public data1 = [350, 450, 100];
}
