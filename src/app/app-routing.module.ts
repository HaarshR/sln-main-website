import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { JoinusPageComponent } from './joinus-page/joinus-page.component';

// Components
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'about-us', component: AboutPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'events', component: EventsPageComponent },
  { path: 'join-us', component: JoinusPageComponent },
  { path: 'admin', component: AdminHomepageComponent },
  // {
  //   path: 'adminHome',
  //   canActivate: [AuthGuard],
  //   component: AdminHomepageComponent,
  // },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  // providers: [AuthGuard],
})
export class AppRoutingModule {}
