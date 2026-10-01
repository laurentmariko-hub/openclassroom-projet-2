import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { chartType } from './chart-type';


  export type AppChart =
  | Chart<'line', number[], string>
  | Chart<'pie', number[], string>;

export class ChartFactory {
  constructor() {}


  public static build(labels: string[], data: number[], chartType: chartType, router: Router): AppChart {
    if(chartType === 'lineChart') {
    console.log(
      'Canvas:',
      document.getElementById('lineChart')
    );
      return ChartFactory.buildChartLineChart(labels, data);
    } else if(chartType === 'pieChart') {
      return ChartFactory.buildPieChart(data, labels, router);
    } else {
      throw new Error(`Unsupported chart type: ${chartType}`);
    }
  }
private static buildChartLineChart(
  years: string[],
  medals: number[]
): Chart<"line", number[], string> {

  return new Chart("countryChart", {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: "medals",
          data: medals,
          backgroundColor: '#0b868f'
        }
      ]
    },
    options: {
      aspectRatio: 2.5
    }
  });
}

  private static buildPieChart(sumOfAllMedalsYears: number[], countries: string[], router: Router) : AppChart {
    var pieChart = new Chart<"pie", number[], string>("DashboardPieChart", {
      type: 'pie',
      data: {
        labels: countries,
        datasets: [{
          label: 'Medals',
          data: sumOfAllMedalsYears,
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5,
        onClick: (e) => {
          if (e.native) {
            const points = pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
            if (points.length) {
              const firstPoint = points[0];
              const countryName = pieChart.data.labels ? pieChart.data.labels[firstPoint.index] : '';
              router.navigate(['country', countryName]);
            }
          }
        }
      }
    });
    return pieChart;
  }
}
