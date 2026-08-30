import { Injectable, OnInit } from '@angular/core';
import { Country } from '../models/country';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Participation } from '../models/participation';

@Injectable({
  providedIn: 'root'
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  public countries: Country[] = [];
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

  public getNumberOfCountries_bup(): Observable<number> {
    return this.getParticipatingCountries().pipe(
      map((countries: Country[]) => {
        const total = countries.length;
        console.log(`Nombre total de JO : ${total}`);
        return total;
      })
    );
  }

  public getNumberOfCountries(countries: Country[]): number {
  
        const total = countries.length;
        console.log(`Nombre total de JO : ${total}`);
        return total;
  }

  public getCountryNames(countries: Country[]): string[] | undefined {
        console.log(`this.getCountries: Nombre de pays : ${countries.length}`);
        return countries.map((country: Country) => country.name);
  }

  public getCountryByName(name: string): Observable<Country | undefined> {
    console.log(`Recherche du pays : ${name}`);
    return this.getParticipatingCountries().pipe(
      map((countries: Country[]) => {
        var countriesTemp : Country[];
        var country : Country | undefined;
        countriesTemp = countries.filter((country: Country) => country.name === name);
        country = countriesTemp.length ===1 ? countriesTemp[0] : undefined;
        return country;
      }));
  }

  public getTotalJOs(countries: Country[]): number {
        const total = countries.reduce((accumulator: number, country: Country) => accumulator + country.getTotalEntries(), 0);
        console.log(`Nombre total de JO : ${total}`);
        return total;
  }

  public getSumOfAllMedalsYears(countries: Country[]): number []  {
        return countries.map((country_ : Country) => country_.
        participations.map((p: Participation) => p.medalsCount)).
        map((medal:number[]) => medal.reduce((acc : number, i: number) => acc + i, 0))
  }

  public getNumberOfJOs(countries: Country[]) : number {
        return countries.map((c : Country) => c.participations.map((p: Participation) => p.year)).flat().length
  }
  public getTitlePage(): string {
    return "Medals per Country";
  }

}
