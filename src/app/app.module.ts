import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DepartmentPageComponent } from './department-page/department-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DepartmentCardComponent } from './department-page/department-card/department-card.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';

import { SortByPipe } from './sorting.pipe';
import { JoinusPageComponent } from './joinus-page/joinus-page.component';
import { ServiceCardComponent } from './landing-page/service-card/service-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DepartmentPageComponent,
    LandingPageComponent,
    DepartmentCardComponent,
    AboutPageComponent,
    AdminHomepageComponent,
    AdminBlogComponent,
    SortByPipe,
    JoinusPageComponent,
    ServiceCardComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
