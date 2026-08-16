export class Participation {
  public id: string;
  constructor(
    public year: number,
    public city: string,
    public athleteCount: number,
    public medalsCount: number
  ) {
    this.id = crypto.randomUUID().substring(0, 8);
  }
}
