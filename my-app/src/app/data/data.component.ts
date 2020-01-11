import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Oertlichkeiten } from "../Models/Oertlichkeiten";
import { Schulen } from "../Models/Schulen";
import { Gesundheit } from "../Models/Gesundheit";
import { Politik } from "../Models/Politik";
import { Parkplaetze } from "../Models/Parkplaetze";
import { Maengel } from "../Models/Meangel";

import { RestApi } from "../RestApi/RestApi";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

@NgModule({
  providers: [RestApi]
})
export class DataComponent implements OnInit {
  title: String;
  oertlichkeiten: Oertlichkeiten[];
  schulen: Schulen[];
  gesundheit: Gesundheit[];
  politik: Politik[];
  parken: Parkplaetze[];
  maengel: Maengel[];
  colsOer: any[];
  colsSch: any[];
  colsHel: any[];
  colsPol: any[];
  colsPar: any[];
  colsDef: any[];
  displayAll: boolean = false;
  displaySchool: boolean = false;
  displayHealth: boolean = false;
  displayPolitic: boolean = false;
  displayParking: boolean = false;
  displayDefect: boolean = false;
 
  constructor(  private route: ActivatedRoute, private restApi:RestApi ) { }

  ngOnInit() {   
    this.oertlichkeiten = null;
    this.schulen = null;
    this.gesundheit = null;
    this.politik = null;
    this.colsOer = null;
    this.colsSch = null;
    this.colsHel = null;
    this.displayAll = false;
    this.displaySchool = false;
    this.displayHealth = false;

  }

  loadOertlichkeiten(){
    this.ngOnInit();
    this.restApi.getOertlichkeiten()
      .subscribe(o => {
        console.log(o);
        this.oertlichkeiten = o as Oertlichkeiten[];
      });
    this.colsOer = [
      { field: 'oertlichkeitenId', header: 'ID', width: '9em' },
      { field: 'bezeichnung', header: 'Bezeichnung', width: '9em' },
      { field: 'longitude', header: 'Long', width: '9em' },
      { field: 'latitude', header: 'Lat', width: '9em' },
      { field: 'strasse', header: 'Straße', width: '9em' },
      { field: 'hausnummer', header: 'Hausnr', width: '9em' },
      { field: 'postleitzahl', header: 'PLZ', width: '9em' },
      { field: 'ort', header: 'Ort', width: '9em' },
      { field: 'kategorienId', header: 'Kategorie', width: '9em' },
    ]  
    this.displayAll=true;
  }

  save(dt: Table){
    this.restApi.putSchulen(this.schulen)
      .subscribe ( s => {
        console.log('Data updated.')
        dt.reset;
      });
  }

  loadSchools(){
    this.ngOnInit();
    this.displaySchool = true;
    this.restApi.getSchulen()
      .subscribe(s => {
        console.log(s);
        this.schulen = s as Schulen[];
      });
    this.colsSch = [
      { field: 'schulenId', header: 'ID', width: '9em' },
      { field: 'typ', header: 'Typ', width: '9em' },
      { field: 'beschreibung', header: 'Beschreibung', width: '9em' },
      { field: 'oertlichkeitenId', header: 'ÖrtlichkeitID', width: '9em' },
    ]
  }

  loadHealth(){

  }

  loadPolitics(){

  }

  loadParking(){

  }

  loadDefect(){

  }
}
