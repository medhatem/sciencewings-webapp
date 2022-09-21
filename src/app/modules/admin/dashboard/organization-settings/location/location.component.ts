import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'organization-settings-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @Input() settings: any;

  constructor() {}

  ngOnInit(): void {
    console.log('settings == ', this.settings);
  }
}
