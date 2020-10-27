import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';

// Components
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
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
