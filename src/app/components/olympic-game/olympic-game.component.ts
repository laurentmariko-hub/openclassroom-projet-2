import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { OlympicService } from 'src/app/services/olympic.service';
import Chart from 'chart.js/auto';
import { ChartService } from 'src/app/services/chart.service';
import { Participation } from 'src/app/models/participation';

@Component({
  selector: 'app-olympic-game',
  standalone: true,
  imports: [],
  templateUrl: './olympic-game.component.html',
  styleUrls: ['./olympic-game.component.scss']
})
export class OlympicGameComponent implements OnInit {
  constructor(private olympicService: OlympicService, private chartService: ChartService) {}
  
  Countries!: Country[];
  public titlePage: string = "Medals per Country";
  public totalEntries: number = 0;
  public countries: Country[] = [];
  public countryNames: string[] | undefined = [];
  public pieChart: Chart<any, any, any> | undefined;
  public numberOfCountries: number = 0;
  public numberOfJOs: number = 0;
  public medals : number[][] = [];
  public sumOfAllMedalsYears : number[] = [];
  ngOnInit(): void {
    this.olympicService
      .getParticipatingCountries().subscribe(data => {
        this.countries = data;
      });
    
    this.olympicService
        .getParticipatingCountries()
        .subscribe(data => {
      this.countries = data;
      this.numberOfCountries = this.olympicService.getNumberOfCountries(data)
      this.countryNames = this.olympicService.getCountryNames(data);
      this.numberOfJOs = this.olympicService.getNumberOfJOs(data);
      this.sumOfAllMedalsYears = this.olympicService.getSumOfAllMedalsYears(data);
      this.pieChart = this.chartService.getPieChart(
            this.countryNames ?? [],
            this.sumOfAllMedalsYears
          );
    });     
         
  }
}
