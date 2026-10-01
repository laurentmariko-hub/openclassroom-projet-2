import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { AppChart, ChartFactory } from '../models/chart-factory';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor(private router: Router) {}
  public getLineChart(labels: string[], data: number[]): AppChart {
    return ChartFactory.build(labels, data, 'lineChart', this.router);
  }

  public getPieChart(labels: string[], data: number[]): AppChart {
    console.log("getPieChart data:");
    console.log(labels);
    console.log(data);
    return ChartFactory.build(labels, data, 'pieChart', this.router);
  }
}