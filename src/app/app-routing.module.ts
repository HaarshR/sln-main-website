import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

// Components
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { EditDepartmentComponent } from './admin/admin-department/edit-department/edit-department.component';
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { JoinusPageComponent } from './joinus-page/joinus-page.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AuthGuard } from './admin/admin-login/auth.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'about-us', component: AboutPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'events', component: EventsPageComponent },
  { path: 'join-us', component: JoinusPageComponent },
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
    path: 'admin/home/editDepartment',
    component: EditDepartmentComponent,
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
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['']); // or redirect to default route
    };
  }
}
