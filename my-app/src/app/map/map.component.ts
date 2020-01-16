import { Component, OnInit } from '@angular/core';
import { Oertlichkeiten } from '../Models/Oertlichkeiten';
import { Kategorien } from '../Models/Kategorien';
import { Gesundheit } from '../Models/Gesundheit';
import { Parkplaetze } from '../Models/Parkplaetze';
import { Schulen } from '../Models/Schulen';
import { Maengel } from '../Models/Meangel';
import { RestApi } from '../RestApi/RestApi';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import { Politik } from '../Models/Politik';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  mapType = 'roadmap';
  latitude = 49.3527796;
  longitude = 9.1455235;

  oertlichkeiten: Oertlichkeiten[];
  kategorien: Kategorien[];
  gesundheit: Gesundheit[];
  parken: Parkplaetze[];
  schulen: Schulen[];
  politik: Politik[];
  maengel: Maengel[];

  currLat: number;
  currLng: number;
  bezeichnung: string;
  strasse: string;
  hausnr: number;
  plz: number;
  ort: string;
  beschreibung: string;
  typ: string;
  zeiten: string;
  kosten: string;
  mBeschreibung: string;
  status: string;

  selectedOrt: Oertlichkeiten;
  selectedGesundheit: Gesundheit;
  selectedParken: Parkplaetze;
  selectedSchule: Schulen;
  selectedMangel: Maengel;

  address: string;
  display: boolean = false;
  displayMangel: boolean = false;

  selectedMarker: Oertlichkeiten;
  selectedKat: Kategorien;

  markers = [];

  disabledParkplaetze: boolean = false;
  disabledOther : boolean = false;

  file: File;
  uploadedFile: any[] = [];

  constructor( public restApi:RestApi, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.oertlichkeiten = []
    this.restApi.getOertlichkeiten()
      .subscribe(o => {
        console.log(o);
        this.oertlichkeiten = o as Oertlichkeiten[];
          for (let marker of this.oertlichkeiten.entries()) {
            this.markers.push({ lat: marker["1"].latitude, lng: marker["1"].longitude})
          }
      });

    this.restApi.getKategorien()
      .subscribe(k => {
        this.kategorien = k as Kategorien[];
      });

    this.restApi.getMaengel()
      .subscribe(m => {
        this.maengel = m as Maengel[];
    });
    this.loadAll();
  }

  placeMarker(lat: number, lng: number){
    this.currLng = lng;
    this.currLat = lat;
    this.display = true;
  }

  setLocation($event){
    if (navigator)
    {
    navigator.geolocation.getCurrentPosition( pos => {
        this.currLng = +pos.coords.longitude;
        this.currLat = +pos.coords.latitude;
      });
    }
  }

  openMaengelMelder($event){
    this.displayMangel = true;
  }

  selectMarker(event) {
    this.selectedMarker = {
      oertlichkeitenId: event.id,
      bezeichnung: event.bezeichnung,
      latitude: event.latitude,
      longitude: event.longitude,
      strasse: event.strasse,
      hausnummer: event.hausnummer,
      postleitzahl: event.postleitzahl,
      ort: event.ort,
      kategorienId: event.kategorienId
    };
  }

  save($event){
     this.addMarker($event.coords.lat, $event.coords.lng);
  }  
  
  addMarker(lat: number, lng: number) {
    this.selectMarker(event);
    this.markers.push({ lat, lng });
    this.display = false;
  }

  loadAll(){
    this.markers = [];
    for (let marker of this.oertlichkeiten.entries()) {
      this.markers.push({ lat: marker["1"].latitude, lng: marker["1"].longitude})
    }
  }

  loadSchools() {
    this.markers = [];
    for (let marker of this.oertlichkeiten.entries()) {
      if (marker["1"].kategorienId == 2){
       this.markers.push({ lat: marker["1"].latitude, lng: marker["1"].longitude})
      }
    }
    this.restApi.getSchulen()
      .subscribe( s => {
        this.schulen = s as Schulen[];
      });
  }

  loadHealth(){
    this.markers = [];
    for (let marker of this.oertlichkeiten.entries()) {
      if (marker["1"].kategorienId == 3){
       this.markers.push({ lat: marker["1"].latitude, lng: marker["1"].longitude})
      }
    }
    this.restApi.getGesundheit()
      .subscribe( g => {
        this.gesundheit = g as Gesundheit[];
      });
  }

  loadPolitics(){
    this.markers = [];
    for (let marker of this.oertlichkeiten.entries()) {
      if (marker["1"].kategorienId == 4){
       this.markers.push({ lat: marker["1"].latitude, lng: marker["1"].longitude})
      }
    }
    this.restApi.getPolitik()
      .subscribe( g => {
        this.politik = g as Politik[];
      });
  }

  loadParking(){
    this.markers = [];
    for (let marker of this.oertlichkeiten.entries()) {
      if (marker["1"].kategorienId == 1){
       this.markers.push({ lat: marker["1"].latitude, lng: marker["1"].longitude})
      }
    }
    this.restApi.getParkplaetze()
      .subscribe( p => {
        this.parken = p as Parkplaetze[]
      });
  }

  changeCategory(){
    if (this.selectedKat.kategorienId != 1) {
      this.disabledParkplaetze = true;
      this.disabledOther = false;
    }
    else {
      this.disabledParkplaetze = false;
      this.disabledOther = true;
    }
  }
  
  loadDefect(){
    this.markers = [];
    for (let marker of this.maengel.entries()) {
      this.markers.push({lat: marker["1"].latitude, lng: marker["1"].longitude})
    }
  } 

  saveMangel(event) {
    console.log("Lat:" + this.currLat);
    console.log("Lng:" + this.currLng);
    var newMangel = new Maengel();
    //newMangel = this.selectedMangel;
    newMangel.latitude = this.currLat;
    newMangel.longitude = this.currLng;
    newMangel.beschreibung = this.mBeschreibung;
    newMangel.status = this.status;

    this.restApi.postMangel(newMangel)
      .subscribe( m => {
        console.log("Value: ", m)
        if (m) {
          this.displayMangel = false;
        }
        else Swal.fire('Speichern fehlgeschlagen');
      });

  }

  onSelectImage(evt: any) {
    this.uploadedFile = evt[0];
 }
}


