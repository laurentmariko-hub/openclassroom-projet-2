import { Injectable, OnInit } from '@angular/core';
import { Country } from '../models/country';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  countries: Country[] = [];
  numberOfCountries: number = 0;
  countryNames: string[] = [];
 
  constructor(private http: HttpClient) { 
    console.log (`OlympicService constructeur appelé`);
  }

  public getParticipatingCountries(): Observable<Country[]> {
    return this.http.get<any[]>(this.olympicUrl).pipe(
      map((data: any[]) =>
        data.map(
          item => new Country(
            item.country,
            item.participations
          )
        )
      )
    );
  }

  public getCountries(): Observable<Country[]> {
    return this.getParticipatingCountries();
  }

  public getNumberOfCountries(): Observable<number> {
    return this.getParticipatingCountries().pipe(
      map((countries: Country[]) => {
        console.log(`this.getCountries: Nombre de pays : ${countries.length}`);
        return countries.length;
      })
    );
  }

  public getCountryByName(name: string): Observable<Country | undefined> {
    console.log(`Recherche du pays : ${name}`);
    return this.getParticipatingCountries().pipe(
      map((countries: Country[]) => countries.find((country) => country.name === name))
    );
  }

  public getTotalJOs(): Observable<number> {
    return this.getParticipatingCountries().pipe(
      map((countries: Country[]) => {
        const total = countries.reduce((accumulator: number, country: Country) => accumulator + country.getTotalEntries(), 0);
        console.log(`Nombre total de JO : ${total}`);
        return total;
      })
    );
  }

  public getSumOfAllMedalsYears(): Observable<number> {
    return this.getParticipatingCountries().pipe(
      map((countries: Country[]) =>
        countries.reduce((accumulator: number, country: Country) => accumulator + country.getTotalMedals(), 0)
      )
    );
  }

  public getTitlePage(): string {
    return "Medals per Country";
  }
}
