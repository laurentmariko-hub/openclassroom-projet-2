import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Chart } from 'chart.js';
import { Country } from 'src/app/models/country';
import { Participation } from 'src/app/models/participation';
import { ChartService } from 'src/app/services/chart.service';
import { OlympicService } from 'src/app/services/olympic.service';

@Component({
  selector: 'app-single-country',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './single-country.component.html',
  styleUrl: './single-country.component.scss'
})
export class SingleCountryComponent implements OnInit {

  country?: Country;
  totalEntries?: number;
  totalMedals?: number;
  totalAthletes?: number;
  titlePage?: string = "";
  lineChart: Chart<any, any, any> | undefined = undefined;
  constructor(
    private olympicService: OlympicService,
    private chartService: ChartService,
    private route: ActivatedRoute
  ) { }

ngOnInit(): void {
  const countryName: string = this.route.snapshot.params['name'];

  if (countryName) {
    this.olympicService
      .getCountryByName(countryName)
      .subscribe((country) => {

        this.country = country;

        this.totalEntries = country
          ? country.getTotalEntries()
          : 0;

        this.totalMedals = country
          ? country.getTotalMedals()
          : 0;

        this.totalAthletes = country
          ? country.getTotalAthletes()
          : 0;
        this.titlePage = country ? "Pays: " + country.name: "Non défini";
        
        const years = country?.participations.map((i: Participation) => i.year.toString()) ?? [];
        const medals = country?.participations.map((i: Participation) => i.medalsCount) ?? [];
        this.lineChart = this.chartService.getLineChart(
            years,
            medals
          );
    });
  }
}
}

