import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { OlympicService } from 'src/app/services/olympic.service';
import Chart from 'chart.js/auto';
import { ChartService } from 'src/app/services/chart.service';
import { Participation } from 'src/app/models/participation';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppChart } from 'src/app/models/chart-factory';
import { Indicator } from 'src/app/models/indicator';
import { HeaderComponent } from 'src/app/header/header.component';
@Component({
  selector: 'app-olympic-game',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './olympic-game.component.html',
  styleUrls: ['./olympic-game.component.scss']
})
export class OlympicGameComponent implements OnInit {
  constructor(private olympicService: OlympicService, private chartService: ChartService, private router: Router) {}
  
  Countries!: Country[];
  public totalEntries: number = 0;
  public countries: Country[] = [];
  public countryNames: string[] | undefined = [];
  public pieChart: AppChart | undefined;
  public numberOfCountries: number = 0;
  public numberOfJOs: number = 0;
  public medals : number[][] = [];
  public sumOfAllMedalsYears : number[] = [];
  public errorMessage: string = '';
  title : string = "Medals per Country";
  indicators: Indicator[] = [];
  
  ngOnInit(): void {    
      this.olympicService.getParticipatingCountries().subscribe({
    next: (data: Country[]): void => {

      this.countries = data;

      this.numberOfCountries =
        this.olympicService.getNumberOfCountries(data);

      this.countryNames =
        this.olympicService.getCountryNames(data);

      this.numberOfJOs =
        this.olympicService.getNumberOfJOs(data);

      this.sumOfAllMedalsYears =
        this.olympicService.getSumOfAllMedalsYears(data);

      this.pieChart = this.chartService.getPieChart(
        this.countryNames ?? [],
        this.sumOfAllMedalsYears
      );

      this.indicators = [
        { label: 'Number of countries', value: this.numberOfCountries },
        { label: 'Number of JOs', value: this.numberOfJOs }
      ];

    },
    error: (error: HttpErrorResponse): void => {
      void this.router.navigate(['/not-found']);
      }
    });
  }    
}

