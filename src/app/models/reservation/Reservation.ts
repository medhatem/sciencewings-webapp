import { ReservationRo } from 'generated/models/reservation-ro';

export class Reservation implements ReservationRo {
  id?: number;
  end: string;
  start: string;
  title: string;
  userId: number;

  constructor(reservation: any) {
    const { end, start, title, id, userId } = reservation || {};
    Object.assign(this, { end, start, title, id, userId });
  }
}
