import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { PaginasComponent } from './paginas.component';
import { PaginasRoutingModule } from './paginas-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    PaginasComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    PaginasRoutingModule
  ]
})
export class PaginasModule { }
