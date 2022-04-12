import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

declare let gapi: any;

@Component({
  selector: 'app-resource-setting-general-barcode',
  templateUrl: './resource-setting-general-barcode.component.html',
  styleUrls: ['./resource-setting-general-barcode.component.scss'],
})
export class ResourceSettingGeneralBarcodeComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  form: FormGroup;

  //   oauth2Client = new google.auth.OAuth2(
  //     '87124333664-2kp7q02a7omqkhvmtnc441sdnm3oqott.apps.googleusercontent.com',
  //     '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',
  //     'http://localhost:4200/settings-general',
  //   );

  calendarOptions: CalendarOptions = {
    plugins: [googleCalendarPlugin],
    googleCalendarApiKey: 'AIzaSyCQMtIWJ-qOy0J-EEv3EV0lcmcLqKESKH8',
    events: {
      googleCalendarId: 'merah.soheyb@gmail.com',
    },
    themeSystem: 'litera',
    selectable: true,
  };

  constructor() {}

  ngOnInit(): void {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: 'AIzaSyCQMtIWJ-qOy0J-EEv3EV0lcmcLqKESKH8',
        clientId: '87124333664-2kp7q02a7omqkhvmtnc441sdnm3oqott.apps.googleusercontent.com',
        clientSecret: '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',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar',
      });
      gapi.client.load('calendar', 'v3', () => {
        console.log('load calendar');
      });
    });
  }

  onSubmit() {
    const getEvents = this.calendarComponent.getApi().getEvents();
    const getEventSources = this.calendarComponent.getApi().getEventSources();
    console.log({ getEvents });
    console.log({ getEventSources });
  }

  async authToGoogle() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;

    console.log({ googleUser });
    console.log({ token });

    // const scopes = ['https://www.googleapis.com/auth/calendar'];
    // const url = this.oauth2Client.generateAuthUrl({
    //   scope: scopes,
    // });
    // console.log({ url });
  }

  calendarService() {
    // const calendar = google.calendar({
    //   version: 'v3',
    //   auth: this.oauth2Client,
    // });
    // console.log({ calendar });
  }
}
