import { Injectable } from '@angular/core';
import { Country } from '../models/country';
import { HttpClient} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Participation } from '../models/participation';
import { CountryInterface } from '../models/country-interface';

@Injectable({
  providedIn: 'root'
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  public countries: Country[] = [];
  numberOfCountries: number = 0;
  countryNames: string[] = [];
 
  constructor(private http: HttpClient) { 
  }

  public getParticipatingCountries(): Observable<Country[]> {
    return this.http.get<CountryInterface[]>(this.olympicUrl).pipe(
      map((data: CountryInterface[]) =>
        data.map(
          item => new Country(
            item.country,
            item.participations
          )
        )
      )
    );
  }

  public getNumberOfCountries(countries: Country[]): number {
  
        const total = countries.length;
        return total;
  }

  public getCountryNames(countries: Country[]): string[] | undefined {
        return countries.map((country: Country) => country.name);
  }

  public getCountryByName(name: string): Observable<Country | undefined> {
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
