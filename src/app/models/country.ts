import { Participation } from './participation';

export class Country {
  constructor(
    public name: string,
    public participations: Participation[],
  ) {}
  public getTotalEntries(): number {
    return this.participations.length;
  } 

  public getTotalMedals(): number {
    return this.participations.reduce((
      accumulator: number, participation: Participation) => accumulator + participation.medalsCount, 
      0
    );
  }

  public getTotalAthletes(): number {
    return this.participations.reduce((
        accumulator: number, participation: Participation) => accumulator + participation.athleteCount, 
        0
    );
  }

  public getParticipationByYear(year: number): Participation | undefined {
    return this.participations.find((participation) => participation.year === year);
  }
  
}
