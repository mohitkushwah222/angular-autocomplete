import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-autocomplete';
  list = [
    {
      key: 'india',
      value: 'India'
    },
    {
      key: 'united states',
      value: 'United States'
    },
    {
      key: 'britain',
      value: 'Britain'
    },
    {
      key: 'nepal',
      value: 'Nepal'
    },
    {
      key: 'australia',
      value: 'Australia'
    },
  ];
  constructor() {
  }

  select(e) {
    console.log(e);
  }
}
