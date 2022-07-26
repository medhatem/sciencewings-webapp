import { ApiService } from 'generated/services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LandingPageService {
  constructor(private _swaggerService: ApiService) {}
}
