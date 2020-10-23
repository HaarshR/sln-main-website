import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DepartmentPageComponent } from './department-page/department-page.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent, DepartmentPageComponent],
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent, LandingComponent],
  imports: [
    BrowserModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
