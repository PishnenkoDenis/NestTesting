export class Rental {
  constructor(
    public user_id: number,
    public car_id: number,
    public rental_start: string,
    public rental_end: string,
    public price: number,
  ) {}
}
