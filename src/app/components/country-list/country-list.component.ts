import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { OlympicService } from 'src/app/services/olympic.service';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss'
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  constructor(private olympicService: OlympicService) { }
  ngOnInit(): void {
    this.olympicService.getCountries().subscribe(
      (countries: Country[]) => {
        this.countries = countries;
      }
);
  }
}
