import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { jsonRequestHeaders } from './httpUtils';

interface ISwapiStarShipResponse {
  results: { name: string }[];
}

// This special jsonRequestHeaders setting is needed with Firefox,
// but Chrome does the right thing with or without it.

@Component({
  selector: 'app-root',
  template: `
    <h3>Starships</h3>
    <ul>
      <li *ngFor="let s of starships">{{ s.name }}</li>
    </ul>
  `,
  standalone: true,
  imports: [NgFor]
})
export class AppComponent {
  starships: { name: string }[] = [];
  // Note that index.html changed to include http

  constructor(http: HttpClient) {
    // If you are using HTTP in this trivial one-shot way, it is
    // reasonable to convert to a Promise, if you prefer:
    firstValueFrom(
      http.get<ISwapiStarShipResponse>(
        'https://swapi.dev/api/starships/',
        { headers: jsonRequestHeaders }
      )
    )
      .then((response: ISwapiStarShipResponse) => {
        console.log(response);
        // throw ('broke on purpose');
        return response;
      })
      .then(
        (response: ISwapiStarShipResponse) =>
          (this.starships = response.results)
      )
      .catch(console.error);
  }
}
