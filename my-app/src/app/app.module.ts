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
import { DropdownModule } from 'primeng/dropdown';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToolbarModule } from 'primeng/toolbar';

import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { MapComponent } from './map/map.component';
import { DataComponent } from './data/data.component';

import { AgmCoreModule } from '@agm/core';

import { appRoutes } from '../routes';
import { RestApi } from './RestApi/RestApi';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { LogoutComponent } from './logout/logout.component';
import { AgmDirectionModule } from 'agm-direction';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    MapComponent,
    DataComponent,
    LoginComponent,
    LogoutComponent,
        
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmDirectionModule,
    HttpClientModule,
    [SweetAlert2Module.forRoot()],
    FormsModule,
    GMapModule,
    MatTabsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    FileUploadModule,
    InputTextModule,
    DropdownModule,
    PanelModule, 
    ToolbarModule,   
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyDwL3gnt_96YgFTDLp9mW8LpYGGEaZowC8',
      apiKey: 'AIzaSyDRhchsYWfmrP19D8vqm1hIWa_CwEeZcM4',
      libraries: ['geometry','places']}),
    RouterModule.forRoot([
      {path: 'data', component: DataComponent},
      {path: 'map', component: MapComponent},
      {path: 'landingpage', component: LandingpageComponent}
    ])    
  ],
  providers: [RestApi, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
