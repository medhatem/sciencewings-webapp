import { ReservationRo } from 'generated/models/reservation-ro';

export class Reservation implements ReservationRo {
  end: string;
  start: string;
  title: string;
  constructor(reservation: any) {
    const { end, start, title } = reservation || {};
    Object.assign(this, { end, start, title });
  }
}
