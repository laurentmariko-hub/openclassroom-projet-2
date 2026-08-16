import { Component, OnInit } from '@angular/core';
import { CountryComponent } from 'src/app/pages/country/country.component';
import { Country } from 'src/app/models/country';
import { OlympicService } from 'src/app/services/olympic.service';
import { CountryListComponent } from '../country-list/country-list.component';
import Chart from 'chart.js/auto';
import { ChartService } from 'src/app/services/chart.service';
import { Participation } from 'src/app/models/participation';

@Component({
  selector: 'app-olympic-game',
  standalone: true,
  imports: [CountryComponent, CountryListComponent],
  templateUrl: './olympic-game.component.html',
  styleUrls: ['./olympic-game.component.scss']
})
export class OlympicGameComponent implements OnInit {
  constructor(private olympicService: OlympicService, private chartService: ChartService) {}
  
  Countries!: Country[];
  public titlePage: string = "";
  public totalEntries: number = 0;
  public countries: Country[] = [];
  public countryNames: string[] = [];
  public pieChart: Chart<any, any, any> | undefined;
  public numberOfCountries: number = 0;
  public numberOfJOs: number = 0;
  public medals : number[][] = [];
  ngOnInit(): void {
  this.olympicService
    .getParticipatingCountries().subscribe(data => {
      this.countries = data;
      this.numberOfCountries = data.length;
      this.countryNames = data.map(
        country => country.name
      );
      this.numberOfJOs = Array.from(new Set(data.map((i: Country) => i.participations.map((f: Participation) => f.year)).flat())).length
      this.medals = data.map((i: Country) => i.participations.map((i: Participation) => (i.medalsCount)));
      console.log("CountryNames: " + this.countryNames);
      console.log("Medals: " + this.medals);
      const sumOfAllMedalsYears : number[] = this.medals.map((medal:number[]) => medal.reduce((acc: number, i: number) => acc + i, 0));
      console.log("sumOfAllMedalsYear:" + sumOfAllMedalsYears);
      this.pieChart = this.chartService.getPieChart(this.countryNames, sumOfAllMedalsYears);
    });
  }
}
