import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

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
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ExecutiveMemberPageComponent } from './joinus-page/executive-member-page/executive-member-page.component';
import { RegularMemberPageComponent } from './joinus-page/regular-member-page/regular-member-page.component';
import { EventsCardComponent } from './events-page/events-card/events-card.component';
import { BlogCardComponent } from './blog-page/blog-card/blog-card.component';
import { DepartmentComponent } from './department-page/department/department.component';
import { ViewBlogComponent } from './blog-page/view-blog/view-blog.component';
import { ViewEventComponent } from './events-page/view-event/view-event.component';
import { AdminEventComponent } from './admin/admin-event/admin-event.component';
import { AdminServiceComponent } from './admin/admin-service/admin-service.component';
import { AdminMembersComponent } from './admin/admin-members/admin-members.component';
import { AdminSendmailComponent } from './admin/admin-members/admin-sendmail/admin-sendmail.component';

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
    AdminLoginComponent,
    ExecutiveMemberPageComponent,
    RegularMemberPageComponent,
    EventsCardComponent,
    BlogCardComponent,
    DepartmentComponent,
    ViewBlogComponent,
    ViewEventComponent,
    AdminEventComponent,
    AdminServiceComponent,
    AdminMembersComponent,
    AdminSendmailComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    RichTextEditorModule,
    AppRoutingModule,
    NgbModule,
    ColorPickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
