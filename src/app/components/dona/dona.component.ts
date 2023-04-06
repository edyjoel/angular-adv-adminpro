import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css'],
})
export class DonaComponent implements OnChanges {
  ngOnChanges() {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,

      datasets: [
        {
          data: this.datos,
        },
      ],
    };
  }

  @Input() titulo: string = 'Sin título';

  // Doughnut
  @Input('labels') doughnutChartLabels: string[] = [
    'Label 1',
    'Label 2',
    'Label 3',
  ];

  @Input('data') datos: number[] = [350, 450, 100];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: this.datos }],
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  // public chartClicked({
  //   event,
  //   active,
  // }: {
  //   event: ChartEvent;
  //   active: {}[];
  // }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({
  //   event,
  //   active,
  // }: {
  //   event: ChartEvent;
  //   active: {}[];
  // }): void {
  //   console.log(event, active);
  // }
}
