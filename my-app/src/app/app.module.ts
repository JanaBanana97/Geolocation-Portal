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
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { MapComponent } from './map/map.component';
import { DataComponent } from './data/data.component';

import { AgmCoreModule } from '@agm/core';

import { appRoutes } from '../routes';
import { RestApi } from './RestApi/RestApi';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    MapComponent,
    DataComponent,
        
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
    ButtonModule,
    DialogModule,
    FileUploadModule,
    InputTextModule,
    PanelModule,    
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDwL3gnt_96YgFTDLp9mW8LpYGGEaZowC8'}),
    RouterModule.forRoot([
      {path: 'data', component: DataComponent},
      {path: 'map', component: MapComponent},
      {path: 'landingpage', component: LandingpageComponent}
    ])    
  ],
  providers: [RestApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
