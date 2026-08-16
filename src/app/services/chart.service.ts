import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ChartFactory } from '../models/chart-factory';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor(private router: Router) {}
  public getLineChart(labels: string[], data: number[]): Chart {
    return ChartFactory.build(labels, data, 'lineChart', this.router);
  }

  public getPieChart(labels: string[], data: number[]): Chart {
    console.log("getPieChart data:");
    console.log(labels);
    console.log(data);
    return ChartFactory.build(labels, data, 'pieChart', this.router);
  }
}