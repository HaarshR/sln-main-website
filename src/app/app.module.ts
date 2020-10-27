import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';

import { AppComponent } from './app.component';

// Main Website Component
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DepartmentPageComponent } from './department-page/department-page.component';
import { DepartmentCardComponent } from './department-page/department-card/department-card.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { JoinusPageComponent } from './joinus-page/joinus-page.component';
import { ServiceCardComponent } from './landing-page/service-card/service-card.component';
// Admin Components
import { SortByPipe } from './sorting.pipe';
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { AdminDepartmentComponent } from './admin/admin-department/admin-department.component';
import { AppRoutingModule } from './app-routing.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { EditDepartmentComponent } from './admin/admin-department/edit-department/edit-department.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';

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
    EventsPageComponent,
    BlogPageComponent,
    AdminDepartmentComponent,
    EditDepartmentComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    RichTextEditorModule,
    AppRoutingModule,
    ColorPickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
