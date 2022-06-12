import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  resources = [
    {
      name: 'string1',
      description: 'string1',
      resourceType: 'string1',
      resourceClass: 'string1',
      timezone: 'string1  ',
      organization: 1,
      user: 1,
    },
    {
      name: 'string2',
      description: 'string2',
      resourceType: 'string2',
      resourceClass: 'string2',
      timezone: 'string2',
      organization: 2,
      user: 2,
    },
  ];

  searchInputControl: FormControl = new FormControl();

  constructor() {}

  ngOnInit(): void {}
}
