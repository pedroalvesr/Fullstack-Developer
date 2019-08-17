import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PaginasComponent } from './paginas.component';

const routes: Routes = [
  {
    path: '', component: PaginasComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      // { path: '**', component: DashboardComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginasRoutingModule { }
