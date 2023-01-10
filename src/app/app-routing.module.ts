import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MirasComponent } from './components/miras/miras.component';

const routes: Routes = [{ path: 'miras', component: MirasComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
