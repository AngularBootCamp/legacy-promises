import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { jsonRequestHeaders } from './httpUtils';

interface ISwapiStarShipResponse {
  results: Array<{ name: string }>;
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
  `
})
export class StarshipListComponent {
  starships: Array<{ name: string }> = [];
  // Note that index.html changed to include http

  constructor(http: HttpClient) {
    // If you are using HTTP in this trivial one-shot way, it is
    // reasonable to convert to a Promise, if you prefer:
    http
      .get<ISwapiStarShipResponse>(
        'https://swapi.co/api/starships/',
        { headers: jsonRequestHeaders }
      )
      .toPromise(Promise) // Caveat - no way to unsubcribe the Observable.
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
