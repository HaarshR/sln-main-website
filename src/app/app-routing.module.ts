import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

// Components
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { JoinusPageComponent } from './joinus-page/joinus-page.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AuthGuard } from './admin/admin-login/auth.guard';
import { DepartmentPageComponent } from './department-page/department-page.component';
import { ExecutiveMemberPageComponent } from './joinus-page/executive-member-page/executive-member-page.component';
import { RegularMemberPageComponent } from './joinus-page/regular-member-page/regular-member-page.component';
import { DepartmentComponent } from './department-page/department/department.component';
import { AdminSendmailComponent } from './admin/admin-members/admin-sendmail/admin-sendmail.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'about-us', component: AboutPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'departments', component: DepartmentPageComponent },
  { path: 'departments/d', component: DepartmentComponent },
  { path: 'events', component: EventsPageComponent },
  { path: 'join-us', component: JoinusPageComponent },
  { path: 'join-us/executive', component: ExecutiveMemberPageComponent },
  { path: 'join-us/regular', component: RegularMemberPageComponent },
  {
    path: 'admin',
    component: AdminLoginComponent,
  },
  {
    path: 'admin/home',
    component: AdminHomepageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/sendMail',
    component: AdminSendmailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  providers: [AuthGuard],
})
export class AppRoutingModule {
  // constructor(private router: Router) {
  //   this.router.errorHandler = (error: any) => {
  //     this.router.navigate(['']); // or redirect to default route
  //   };
  // }
}
