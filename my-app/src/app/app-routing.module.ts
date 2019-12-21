import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingpageComponent } from './landingpage/landingpage.component';
import { MapComponent } from './map/map.component';
import { DataComponent } from './data/data.component';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'landingpage', component: LandingpageComponent },
    { path: 'map', component: MapComponent },
    { path: 'data', component: DataComponent },
    { path: '', redirectTo: 'landingpage', pathMatch: 'full' }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
