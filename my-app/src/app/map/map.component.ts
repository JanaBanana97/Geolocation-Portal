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
  hausnr: string;
  plz: number;
  ort: string;
  beschreibung: string;
  typ: string;
  zeiten: string;
  kosten: string;
  newOertlichkeit: Oertlichkeiten;
  newParkplatz: Parkplaetze;
  newSchule: Schulen;
  newGesundheit: Gesundheit;
  newPolitik: Politik;
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
  objects = [];

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
     this.newOertlichkeit = new Oertlichkeiten();
     //this.newOertlichkeit.longitude = $event.coord.lng;
     //this.newOertlichkeit.latitude = $event.coord.lat;
     this.newOertlichkeit.longitude = this.currLng;
     this.newOertlichkeit.latitude = this.currLat;
     this.newOertlichkeit.strasse = this.strasse;
     this.newOertlichkeit.hausnummer = this.hausnr;
     this.newOertlichkeit.bezeichnung = this.bezeichnung;
     this.newOertlichkeit.postleitzahl = this.plz;
     this.newOertlichkeit.ort = this.ort;
     //this.newOertlichkeit.oertlichkeitenId = this.oertlichkeiten[this.oertlichkeiten.length-1].oertlichkeitenId + 1;

     if (this.selectedKat.kategorienId == 1) {
       this.newOertlichkeit.kategorienId = 1;
       this.newParkplatz = new Parkplaetze();
       this.newParkplatz.parkplaetzeId = 0;
       this.newParkplatz.beschreibung = this.beschreibung;
       this.newParkplatz.oeffnungszeiten = this.zeiten;
       this.newParkplatz.kosten = this.kosten;
       //this.newParkplatz.oertlichkeitenId = this.newOertlichkeit.oertlichkeitenId;
       this.newParkplatz.oertlichkeit = this.newOertlichkeit;
       this.addParkplatz(this.newParkplatz);
     }
     if (this.selectedKat.kategorienId == 2) {
      this.newOertlichkeit.kategorienId = 2;
      this.newSchule = new Schulen();
      this.newSchule.schulenId = 0;
      this.newSchule.beschreibung = this.beschreibung;
      this.newSchule.typ = this.typ;
      //this.newSchule.oertlichkeitenId = this.newOertlichkeit.oertlichkeitenId;
      this.newSchule.oertlichkeit = this.newOertlichkeit;
      this.addSchule(this.newSchule);
    }
    if (this.selectedKat.kategorienId == 3) {
      this.newOertlichkeit.kategorienId = 3;
      this.newGesundheit = new Gesundheit();
      this.newGesundheit.gesundheitId = 0;
      this.newGesundheit.beschreibung = this.beschreibung;
      this.newGesundheit.typ = this.typ;
      //this.newGesundheit.oertlichkeitenId = this.newOertlichkeit.oertlichkeitenId;
      this.newGesundheit.oertlichkeit = this.newOertlichkeit;
      this.addGesundheit(this.newGesundheit);
    }
    if (this.selectedKat.kategorienId == 4) {
      this.newOertlichkeit.kategorienId = 4;
      this.newPolitik = new Politik();
      this.newPolitik.politikId = 0;
      this.newPolitik.beschreibung = this.beschreibung;
      this.newPolitik.typ = this.typ;
      //this.newPolitik.oertlichkeitenId = this.newOertlichkeit.oertlichkeitenId;
      this.newPolitik.oertlichkeit = this.newOertlichkeit;
      this.addPolitik(this.newPolitik);
    }
  }  

  addParkplatz(p: Parkplaetze) {
    this.restApi.postParken(p)
    .subscribe( res => {
      console.log("Value: ", res)
      if (res != null ) {
        Swal.fire('Speichern fehlgeschlagen');
      }
    });
  }
  addSchule(s: Schulen) {
    this.restApi.postSchule(s)
    .subscribe( res => {
      console.log("Value: ", res)
      if (res != null ) {
        Swal.fire('Speichern fehlgeschlagen');
      }
    });
  }
  addGesundheit(g: Gesundheit) {
    this.restApi.postGesundheit(g)
    .subscribe( res => {
      console.log("Value: ", res)
      if (res != null ) {
        Swal.fire('Speichern fehlgeschlagen');
      }
    });
  }
  addPolitik(p : Politik) {
    this.restApi.postPolitik(p)
    .subscribe( res => {
      console.log("Value: ", res)
      if (res != null ) {
        Swal.fire('Speichern fehlgeschlagen');
      }
    });
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
  styleFunc(feature) {
    return ({
    clickable: false,
    fillColor: feature.getProperty('green'),
    strokeWeight: 1
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
    var GeoJsonObject = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  9.143843650817871,
                  49.34947849542076
                ],
                [
                  9.14186954498291,
                  49.350652672070105
                ],
                [
                  9.137835502624512,
                  49.34931075361165
                ],
                [
                  9.14238452911377,
                  49.34645905534977
                ],
                [
                  9.145731925964355,
                  49.34791288296037
                ],
                [
                  9.143843650817871,
                  49.34947849542076
                ]
              ]
            ]
          }
        }
      ]
    }
    var coordinates = GeoJsonObject.features[1].geometry.coordinates;
    console.log(coordinates);
    
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


