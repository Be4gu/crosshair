import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MirasComponent } from './components/miras/miras.component';
import { ProSettingsComponent } from './components/pro-settings/pro-settings.component';

const routes: Routes = [
  { path: 'miras', component: MirasComponent },
  { path: '', redirectTo: '/miras', pathMatch: 'full' },
  { path: 'settings', component: ProSettingsComponent },
  // { path: 'settings?player=:id', component: ProSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
