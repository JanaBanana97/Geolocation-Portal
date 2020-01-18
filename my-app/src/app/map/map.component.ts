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
// import { google } from '@agm/core/services/google-maps-types';


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

  currentSelectedMarkers: string;
  selectedOrt: Oertlichkeiten;
  selectedGesundheit: Gesundheit;
  selectedParken: Parkplaetze;
  selectedSchule: Schulen;
  selectedPolitik: Politik;
  selectedMangel: Maengel;

  address: string;
  display: boolean = false;
  displayMangel: boolean = false;

  selectedMarker = [];
  selectedKat: Kategorien;

  markers = [];
  objects = [];

  disabledParkplaetze: boolean = false;
  disabledOther : boolean = false;

  file: File;
  uploadedFile: any[] = [];

  geoJsonObject: any;

  constructor( public restApi:RestApi, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.oertlichkeiten = []
    this.restApi.getOertlichkeiten()
      .subscribe(o => {
        console.log(o);
        this.oertlichkeiten = o as Oertlichkeiten[];
          for (let marker of this.oertlichkeiten.entries()) {
            this.markers.push({ id: marker["1"].oertlichkeitenId, lat: marker["1"].latitude, lng: marker["1"].longitude, katId: marker["1"].kategorienId})
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
  
  placeMarker(lat: number, lng: number){
    this.currLng = lng;
    this.currLat = lat;
    this.display = true;
  }

  selectMarker(katId: number, id: number) {
    this.selectedMarker = [];
    for (let marker of this.oertlichkeiten.entries()) {
      if (marker["1"].oertlichkeitenId == id){
      this.selectedMarker.push({ 
          oertlichkeitenId: marker["1"].oertlichkeitenId,
          strasse: marker["1"].strasse,
          hausnummer: marker["1"].hausnummer,
          postleitzahl: marker["1"].postleitzahl,
          ort: marker["1"].ort,
          lat: marker["1"].latitude, 
          lng: marker["1"].longitude,
          kategorienId: marker["1"].kategorienId,        
        })
      }
    }

    switch(katId) { 
      case 1: { 
        this.selectedMarker=[];
        this.restApi.getParkplaetze()
          .subscribe( p => {
            this.parken = p as Parkplaetze[];
            for (let marker of this.parken.entries()) {
              if (marker["1"].oertlichkeitenId == id){
              this.selectedMarker.push({ 
                  parkplaetzeId: marker["1"].parkplaetzeId,
                  oeffnungszeiten: marker["1"].oeffnungszeiten,
                  kosten: marker["1"].kosten,
                  beschreibung: marker["1"].beschreibung,
                  oertlichkeitenId: marker["1"].oertlichkeitenId,
                  bezeichnung: marker["1"].oertlichkeit.bezeichnung,
                  lng: marker["1"].oertlichkeit.longitude,
                  lat: marker["1"].oertlichkeit.latitude,
                  strasse: marker["1"].oertlichkeit.strasse,
                  hausnummer: marker["1"].oertlichkeit.hausnummer,
                  plz: marker["1"].oertlichkeit.postleitzahl,
                  ort: marker["1"].oertlichkeit.ort,
                })
              }
            }
         });          
         break; 
      } 
      case 2: { 
        this.selectedMarker=[];
        this.restApi.getSchulen()
          .subscribe( p => {
            this.schulen = p as Schulen[];
            for (let marker of this.schulen.entries()) {
              if (marker["1"].oertlichkeitenId == id){
              this.selectedMarker.push({ 
                  schulenId: marker["1"].schulenId,
                  oeffnungszeiten: marker["1"].typ,
                  beschreibung: marker["1"].beschreibung,
                  oertlichkeitenId: marker["1"].oertlichkeitenId,
                  bezeichnung: marker["1"].oertlichkeit.bezeichnung,
                  lng: marker["1"].oertlichkeit.longitude,
                  lat: marker["1"].oertlichkeit.latitude,
                  strasse: marker["1"].oertlichkeit.strasse,
                  hausnummer: marker["1"].oertlichkeit.hausnummer,
                  plz: marker["1"].oertlichkeit.postleitzahl,
                  ort: marker["1"].oertlichkeit.ort,
                })
              }
            }
         });
         break;
      } 
      case 3: { 
        this.selectedMarker=[];
        this.restApi.getGesundheit()
          .subscribe( p => {
            this.gesundheit = p as Gesundheit[];
            for (let marker of this.gesundheit.entries()) {
              if (marker["1"].oertlichkeitenId == id){
              this.selectedMarker.push({ 
                  gesundheitId: marker["1"].gesundheitId,
                  typ: marker["1"].typ,
                  beschreibung: marker["1"].beschreibung,
                  oertlichkeitenId: marker["1"].oertlichkeitenId,
                  bezeichnung: marker["1"].oertlichkeit.bezeichnung,
                  lng: marker["1"].oertlichkeit.longitude,
                  lat: marker["1"].oertlichkeit.latitude,
                  strasse: marker["1"].oertlichkeit.strasse,
                  hausnummer: marker["1"].oertlichkeit.hausnummer,
                  plz: marker["1"].oertlichkeit.postleitzahl,
                  ort: marker["1"].oertlichkeit.ort,
                })
              }
            }
         });
        break;
     } 
      case 4: { 
        this.selectedMarker=[];
        this.restApi.getPolitik()
          .subscribe( p => {
            this.politik = p as Politik[];
            for (let marker of this.politik.entries()) {
              if (marker["1"].oertlichkeitenId == id){
              this.selectedMarker.push({ 
                  politikId: marker["1"].politikId,
                  typ: marker["1"].typ,
                  beschreibung: marker["1"].beschreibung,
                  oertlichkeitenId: marker["1"].oertlichkeitenId,
                  bezeichnung: marker["1"].oertlichkeit.bezeichnung,
                  lng: marker["1"].oertlichkeit.longitude,
                  lat: marker["1"].oertlichkeit.latitude,
                  strasse: marker["1"].oertlichkeit.strasse,
                  hausnummer: marker["1"].oertlichkeit.hausnummer,
                  plz: marker["1"].oertlichkeit.postleitzahl,
                  ort: marker["1"].oertlichkeit.ort,
                })
              }
            }
         });
        break;
      } 
      default: { 
        for (let marker of this.oertlichkeiten.entries()) {
          if (marker["1"].oertlichkeitenId == id){
          this.selectedMarker.push({ 
              oertlichkeitenId: marker["1"].oertlichkeitenId,
              strasse: marker["1"].strasse,
              hausnummer: marker["1"].hausnummer,
              postleitzahl: marker["1"].postleitzahl,
              ort: marker["1"].ort,
              lat: marker["1"].latitude, 
              lng: marker["1"].longitude,
              kategorienId: marker["1"].kategorienId,        
            })
          }
          break; 
        } 
      } 
    }
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

  loadAll(){
    this.geoJsonObject = null;
    this.markers = [];
    for (let marker of this.oertlichkeiten.entries()) {
      this.markers.push({ lat: marker["1"].latitude, lng: marker["1"].longitude})
    }
  }

  loadSchools() {
    this.geoJsonObject = null;
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
      this.currentSelectedMarkers = "Schools";
  }

  loadHealth(){
    this.geoJsonObject = null;
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
      this.currentSelectedMarkers = "Health";
  }
  styleFunc(feature) {
    return ({
    clickable: true,
    fillColor: "#FF0000",
    strokeColor: "FF0000",
    strokeWeight: 0
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
    this.geoJsonObject = {
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
    //var coordinates = this.geoJsonObject.features[1].geometry.coordinates;
    //console.log(coordinates);
    
    }
  

  loadParking(){
    this.geoJsonObject = null;
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
    this.geoJsonObject = null;
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

// function initAutocomplete() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -33.8688, lng: 151.2195},
//     zoom: 13,
//     mapTypeId: 'roadmap'
//   });

//   // Create the search box and link it to the UI element.
//   var input = document.getElementById('pac-input');
//   var searchBox = new google.maps.places.SearchBox(input);
//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//   // Bias the SearchBox results towards current map's viewport.
//   map.addListener('bounds_changed', function() {
//     searchBox.setBounds(map.getBounds());
//   });

//   var markers = [];
//   // Listen for the event fired when the user selects a prediction and retrieve
//   // more details for that place.
//   searchBox.addListener('places_changed', function() {
//     var places = searchBox.getPlaces();

//     if (places.length == 0) {
//       return;
//     }

//     // Clear out the old markers.
//     markers.forEach(function(marker) {
//       marker.setMap(null);
//     });
//     markers = [];

//     // For each place, get the icon, name and location.
//     var bounds = new google.maps.LatLngBounds();
//     places.forEach(function(place) {
//       if (!place.geometry) {
//         console.log("Returned place contains no geometry");
//         return;
//       }
//       var icon = {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25)
//       };

//       // Create a marker for each place.
//       markers.push(new google.maps.Marker({
//         map: map,
//         icon: icon,
//         title: place.name,
//         position: place.geometry.location
//       }));

//       if (place.geometry.viewport) {
//         // Only geocodes have viewport.
//         bounds.union(place.geometry.viewport);
//       } else {
//         bounds.extend(place.geometry.location);
//       }
//     });
//     map.fitBounds(bounds);
//   });
// } 


