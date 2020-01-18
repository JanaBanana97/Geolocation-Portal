import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Oertlichkeiten } from "../Models/Oertlichkeiten";
import { Kategorien } from '../Models/Kategorien';
import { Schulen } from "../Models/Schulen";
import { Gesundheit } from "../Models/Gesundheit";
import { Politik } from "../Models/Politik";
import { Parkplaetze } from "../Models/Parkplaetze";
import { Maengel } from "../Models/Meangel";
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';

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
  oertlichkeiten: Oertlichkeiten[];
  kategorien: Kategorien[];
  schulen: Schulen[];
  gesundheit: Gesundheit[];
  politik: Politik[];
  parken: Parkplaetze[];
  maengel: Maengel[];
  colsOer: any[];
  colsCat: any[];
  colsSch: any[];
  colsHel: any[];
  colsPol: any[];
  colsPar: any[];
  colsDef: any[];
  displayImg: boolean = true;
  displayAll: boolean = false;
  displayCategory: boolean = false;
  displaySchool: boolean = false;
  displayHealth: boolean = false;
  displayPolitic: boolean = false;
  displayParking: boolean = false;
  displayDefect: boolean = false;
 
  constructor(  private route: ActivatedRoute, private restApi:RestApi ) { }
  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Ihre Liste:',
    useBom: true,
    noDownload: false,
    headers: ["oertlichkeitenId", "bezeichnung", "longitude", "latitude", "strasse", "hausnummer", "plz", "ort", "kategorienID"]
  };

  ngOnInit() {   
    this.oertlichkeiten = null;
    this.kategorien = null;
    this.schulen = null;
    this.gesundheit = null;
    this.politik = null;
    this.parken = null;
    this.maengel = null;
    this.colsOer = null;
    this.colsCat = null;
    this.colsSch = null;
    this.colsHel = null;
    this.colsPol = null;
    this.colsPar = null;
    this.colsDef = null;
    this.displayImg = false;
    this.displayAll = false;
    this.displayCategory = false;
    this.displaySchool = false;
    this.displayHealth = false;
    this.displayPolitic = false;
    this.displayParking = false;
    this.displayDefect = false;
  }

  loadOertlichkeiten(){
    this.ngOnInit();    
    this.displayAll=true;
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
  }

  saveOrt(dt: Table){
    // this.restApi.putOrt(this.oertlichkeiten)
    // .subscribe ( o => {
    //   console.log('Data updated.')
    //   dt.reset;
    // });
  }

  downloadOertlichkeiten(event){
    this.ngOnInit();    
    this.displayAll=true;
    this.restApi.getOertlichkeiten()
      .subscribe(o => {
        console.log(o);
        this.oertlichkeiten = o as Oertlichkeiten[];
        new  AngularCsv(this.oertlichkeiten, "Alle Örtlichkeiten", this.csvOptions);
      });
      
  }

  loadCategory(){
    this.ngOnInit();
    this.displayCategory = true;
    this.restApi.getKategorien()
      .subscribe(k => {
        console.log(k);
        this.kategorien = k as Kategorien[];
      });
    this.colsCat = [
      { field: 'kategorienId', header: 'ID', width: '9em' },
      { field: 'bezeichnung', header: 'Bezeichnung', width: '9em' },
    ]
  }

  downloadCategory(event){
    this.ngOnInit();    
    this.displayAll=true;
    this.restApi.getKategorien()
      .subscribe(o => {
        console.log(o);
        this.kategorien = o as Kategorien[];
        new  AngularCsv(this.kategorien, "Alle Kategorien", this.csvOptions);
      });
      
  }

  saveCategory(dt: Table){
    this.restApi.putKategorien(this.kategorien)
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
  downloadSchool(event){
    this.ngOnInit();
    this.displaySchool = true;
    this.restApi.getSchulen()
      .subscribe(s => {
        console.log(s);
        this.schulen = s as Schulen[];
        new  AngularCsv(this.schulen, "Alle Schulen", this.csvOptions);
      });
      
  }

  saveSchool(dt: Table){
    this.restApi.putSchulen(this.schulen)
      .subscribe ( s => {
        console.log('Data updated.')
        dt.reset;
      });
  }

  loadHealth(){
    this.ngOnInit();
    this.displayHealth = true;
    this.restApi.getGesundheit()
      .subscribe(g => {
        console.log(g);
        this.gesundheit = g as Gesundheit[];
      });
    this.colsHel = [
      { field: 'gesundheitId', header: 'ID', width: '9em' },
      { field: 'typ', header: 'Typ', width: '9em' },
      { field: 'beschreibung', header: 'Beschreibung', width: '9em' },
      { field: 'oertlichkeitenId', header: 'ÖrtlichkeitID', width: '9em' },
    ]
  }

  downloadHealth(event){
    this.ngOnInit();
    this.displaySchool = true;
    this.restApi.getGesundheit()
      .subscribe(s => {
        console.log(s);
        this.gesundheit = s as Gesundheit[];
        new  AngularCsv(this.gesundheit, "Alle Krankenhäuser", this.csvOptions);
      });
      
  }

  saveGesundheit(dt: Table){
    this.restApi.putGesundheit(this.gesundheit)
      .subscribe ( s => {
        console.log('Data updated.')
        dt.reset;
      });
  }

  loadPolitics(){
    this.ngOnInit();
    this.displayPolitic = true;
    this.restApi.getPolitik()
      .subscribe(g => {
        console.log(g);
        this.politik = g as Politik[];
      });
    this.colsPol = [
      { field: 'politikId', header: 'PolitikID', width: '9em' },
      { field: 'typ', header: 'Typ', width: '9em' },
      { field: 'beschreibung', header: 'Beschreibung', width: '9em' },
      { field: 'oertlichkeitenId', header: 'ÖrtlichkeitID', width: '9em' },
    ]
  }

  savePolitic(dt: Table){
    this.restApi.putPolitik(this.politik)
      .subscribe ( s => {
        console.log('Data updated.')
        dt.reset;
      });
  }

  downloadPolitics(event){
    new  AngularCsv(this.politik, "Politik", this.csvOptions);  
  }

  loadParking(){
    this.ngOnInit();
    this.displayParking = true;
    this.restApi.getParkplaetze()
      .subscribe(p => {
        console.log(p);
        this.parken = p as Parkplaetze[];
      });
    this.colsPar = [
      { field: 'parkplaetzeId', header: 'ID', width: '9em' },
      { field: 'oeffnungszeiten', header: 'Öffnungszeiten', width: '9em' },
      { field: 'kosten', header: 'Kosten', width: '9em' },
      { field: 'beschreibung', header: 'Beschreibung', width: '9em' },
      { field: 'oertlichkeitenId', header: 'ÖrtlichkeitID', width: '9em' },
    ]
  }

  downloadParking(event){
    this.ngOnInit();
    this.displaySchool = true;
    this.restApi.getParkplaetze()
      .subscribe(s => {
        console.log(s);
        this.parken = s as Parkplaetze[];
        new  AngularCsv(this.parken, "Alle Parkplätze", this.csvOptions);
      });
    }

  savePark(dt: Table){
    this.restApi.putParken(this.parken)
      .subscribe ( s => {
        console.log('Data updated.')
        dt.reset;
      });
  }

  loadDefect(){
    this.ngOnInit();
    this.displayDefect = true;
    this.restApi.getMaengel()
      .subscribe(m => {
        console.log(m);
        this.maengel = m as Maengel[];
      });
    this.colsDef = [
      { field: 'maengelID', header: 'ID', width: '9em' },
      { field: 'beschreibung', header: 'Beschreibung', width: '9em' },
      { field: 'latitude', header: 'Lat', width: '9em' },
      { field: 'longitude', header: 'Long', width: '9em' },
      { field: 'status', header: 'Status', width: '9em' },
    ]
  }

  saveMangel(dt: Table){
    this.restApi.putMaengel(this.maengel)
      .subscribe ( s => {
        console.log('Data updated.')
        dt.reset;
      });
  }

  
}
