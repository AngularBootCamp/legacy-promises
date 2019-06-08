import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StarshipListComponent } from './starshipList';

@NgModule({
  declarations: [StarshipListComponent],
  imports: [BrowserModule, HttpClientModule],
  bootstrap: [StarshipListComponent]
})
export class AppModule {}
