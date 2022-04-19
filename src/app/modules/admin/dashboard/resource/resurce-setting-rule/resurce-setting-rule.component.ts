import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { TIMEZONES, DAYS } from './timezones';

@Component({
  selector: 'app-resurce-setting-rule',
  templateUrl: './resurce-setting-rule.component.html',
  styleUrls: ['./resurce-setting-rule.component.scss'],
})
export class ResurceSettingRuleComponent implements OnInit {
  tzList = TIMEZONES.map((tz) => tz.name);
  filteredTZs: Observable<any[]>;
  freqList = [
    { title: 'Minutely', value: 'minutely' },
    { title: 'Hourly', value: 'hourly' },
    { title: 'Daily', value: 'daily' },
    { title: 'Weekly', value: 'weekly' },
    { title: 'Monthly', value: 'monthly' },
    { title: 'Yearly', value: 'yearly' },
  ];
  daysList = DAYS;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tz: '',
      freq: '',
      count: 0,
    });
    this.filteredTZs = this.form.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filterTZ(value)),
    );
  }

  onSubmit() {}

  private _filterTZ(value: any): string[] {
    const filterValue = value.tz?.toLowerCase();

    return this.tzList.filter((tz) => tz.toLowerCase().includes(filterValue));
  }
}
