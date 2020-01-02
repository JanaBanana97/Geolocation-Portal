import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GMapModule } from 'primeng/gmap';
import { MatTabsModule } from '@angular/material/tabs';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'ng-sidebar';

import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { MapComponent } from './map/map.component';
import { DataComponent } from './data/data.component';
import { ActivityListComponent } from './activity-list/activity-list.component';

import { AgmCoreModule } from '@agm/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';


import { ActivityService } from './services/activity.service';
import { MapService } from './services/map.service';
import { appRoutes } from '../routes';


@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    MapComponent,
    DataComponent,
    ActivityListComponent,
    NavBarComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    GMapModule,
    MatTabsModule,
    TableModule,
    SidebarModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDwL3gnt_96YgFTDLp9mW8LpYGGEaZowC8'}),
      RouterModule.forRoot(appRoutes)    
  ],
  providers: [ActivityService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
