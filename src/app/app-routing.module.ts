import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MirasComponent } from './components/miras/miras.component';
import { ProSettingsComponent } from './components/pro-settings/pro-settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/miras', pathMatch: 'full' },
  { path: 'miras', component: MirasComponent },
  { path: 'settings', component: ProSettingsComponent },
  // { path: 'settings?player=:id', component: ProSettingsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
