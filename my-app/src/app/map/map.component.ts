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
<<<<<<< HEAD
import { AgmDirectionModule } from 'agm-direction';
=======
// import { google } from '@agm/core/services/google-maps-types';
>>>>>>> 6877bf030f8d128d5ff699db6645bb935c02e934


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
  public origin: any;
  public destination: any;

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

  geoJsonObject: any;

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
    
    this.selectedMarker=
     {
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
  }
  styleFunc(feature) {
    
    return ({
    clickable: true,
    fillColor: feature.getProperty('color'),
    strokeColor: "FF0000",
    strokeWeight: 1
    });
  }
  
  clicked(clickEvent) {


    Swal.fire('Hier könnten die Wahlergebnisse oder Vogelarten stehen');
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
          "properties": {
            "color": "#F4A224",
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  9.12663459777832,
                  49.347493514019895
                ],
                [
                  9.130797386169434,
                  49.34156605070885
                ],
                [
                  9.133586883544922,
                  49.34274041619706
                ],
                [
                  9.134187698364258,
                  49.343635152043596
                ],
                [
                  9.134187698364258,
                  49.34508906309549
                ],
                [
                  9.133887290954588,
                  49.34606763288385
                ],
                [
                  9.133286476135254,
                  49.346906391497846
                ],
                [
                  9.132513999938965,
                  49.347968798549005
                ],
                [
                  9.131441116333008,
                  49.348304290746306
                ],
                [
                  9.130024909973143,
                  49.34863978065587
                ],
                [
                  9.12865161895752,
                  49.34858386582981
                ],
                [
                  9.127492904663086,
                  49.34833224832616
                ],
                [
                  9.126548767089844,
                  49.348108587242585
                ],
                [
                  9.1261625289917,
                  49.3478849251422
                ],
                [
                  9.12663459777832,
                  49.347493514019895
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "color": "#E8E2DA",
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  9.127922058105469,
                  49.34738168169873
                ],
                [
                  9.131312370300293,
                  49.34274041619706
                ],
                [
                  9.132556915283203,
                  49.34324370711258
                ],
                [
                  9.133458137512207,
                  49.344110473844836
                ],
                [
                  9.133243560791016,
                  49.34550845253078
                ],
                [
                  9.132685661315918,
                  49.346682723932204
                ],
                [
                  9.132256507873535,
                  49.34732576544282
                ],
                [
                  9.131526947021484,
                  49.34760534608687
                ],
                [
                  9.130582809448242,
                  49.34774513581314
                ],
                [
                  9.129595756530762,
                  49.34777309371073
                ],
                [
                  9.128522872924805,
                  49.34763330406392
                ],
                [
                  9.128093719482422,
                  49.34740963980287
                ],
                [
                  9.127922058105469,
                  49.34738168169873
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "color": "#2FEBEE",
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  9.131999015808105,
                  49.349646236657904
                ],
                [
                  9.137020111083984,
                  49.344194353686056
                ],
                [
                  9.138650894165039,
                  49.3450611036727
                ],
                [
                  9.136676788330078,
                  49.3467106824335
                ],
                [
                  9.13839340209961,
                  49.34729780729104
                ],
                [
                  9.13989543914795,
                  49.34615150938869
                ],
                [
                  9.141697883605955,
                  49.346906391497846
                ],
                [
                  9.1371488571167,
                  49.351351573436894
                ],
                [
                  9.135303497314453,
                  49.35068062831545
                ],
                [
                  9.136333465576172,
                  49.34975806383159
                ],
                [
                  9.137277603149414,
                  49.34880752475272
                ],
                [
                  9.135603904724121,
                  49.347856967308154
                ],
                [
                  9.13362979888916,
                  49.3499537607739
                ],
                [
                  9.131999015808105,
                  49.349646236657904
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "color": "#F23F70",
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  9.13886547088623,
                  49.352050464874274
                ],
                [
                  9.14311408996582,
                  49.34732576544282
                ],
                [
                  9.144916534423828,
                  49.34816450260881
                ],
                [
                  9.145517349243164,
                  49.34875161011731
                ],
                [
                  9.146032333374023,
                  49.34953440923001
                ],
                [
                  9.145259857177734,
                  49.35034515232307
                ],
                [
                  9.144659042358398,
                  49.35056880323884
                ],
                [
                  9.143972396850586,
                  49.35054084692999
                ],
                [
                  9.142556190490723,
                  49.3499537607739
                ],
                [
                  9.143843650817871,
                  49.351127926079826
                ],
                [
                  9.143929481506348,
                  49.35196659842604
                ],
                [
                  9.143199920654297,
                  49.35255366056091
                ],
                [
                  9.141783714294434,
                  49.352721391312606
                ],
                [
                  9.140281677246094,
                  49.35266548112557
                ],
                [
                  9.13912296295166,
                  49.35235797396108
                ],
                [
                  9.13886547088623,
                  49.352050464874274
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "color": "#EFFE01",
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  9.143500328063979,
                  49.3534202632884
                ],
                [
                  9.148650169372559,
                  49.349925804115514
                ],
                [
                  9.150238037109375,
                  49.35054084692999
                ],
                [
                  9.148564338684094,
                  49.35255366056088
                ],
                [
                  9.149336814880371,
                  49.35294503142515
                ],
                [
                  9.151268005371094,
                  49.35101610202001
                ],
                [
                  9.152941703796387,
                  49.35126770579715
                ],
                [
                  9.150795936584485,
                  49.356159745683776
                ],
                [
                  9.149379730224624,
                  49.355824307057425
                ],
                [
                  9.14998054504396,
                  49.35378367279174
                ],
                [
                  9.147791862487805,
                  49.35520933030078
                ],
                [
                  9.146847724914563,
                  49.35484593133036
                ],
                [
                  9.147748947143555,
                  49.35244183974205
                ],
                [
                  9.146203994750977,
                  49.353168670520965
                ],
                [
                  9.144830703735352,
                  49.354007308074735
                ],
                [
                  9.143500328063979,
                  49.3534202632884
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "color": "#E8E2DA",
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  9.140067100524902,
                  49.351714998223514
                ],
                [
                  9.141311645507812,
                  49.350177413469
                ],
                [
                  9.142427444458008,
                  49.35070858454487
                ],
                [
                  9.14285659790039,
                  49.351183838014435
                ],
                [
                  9.14285659790039,
                  49.351714998223514
                ],
                [
                  9.142427444458008,
                  49.35213433117948
                ],
                [
                  9.141440391540527,
                  49.35224615269737
                ],
                [
                  9.140582084655762,
                  49.352050464874246
                ],
                [
                  9.140067100524902,
                  49.351714998223514
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "color": "#E8E2DA",
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  9.142084121704102,
                  49.34925483954818
                ],
                [
                  9.143157005310059,
                  49.3480247140741
                ],
                [
                  9.144144058227539,
                  49.348388163438194
                ],
                [
                  9.144830703735352,
                  49.34889139658667
                ],
                [
                  9.145174026489258,
                  49.34939462458769
                ],
                [
                  9.144916534423828,
                  49.349813977323116
                ],
                [
                  9.14435863494873,
                  49.35012150039054
                ],
                [
                  9.143414497375488,
                  49.349925804115514
                ],
                [
                  9.142642021179197,
                  49.349618279824746
                ],
                [
                  9.142084121704102,
                  49.34925483954818
                ]
              ]
            ]
          }
        }
      ]
    }}
    
  

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

 getDirection() {
  this.origin = { lat: 24.799448, lng: 120.979021 };
  this.destination = { lat: 24.799524, lng: 120.975017 };
 
  // this.origin = 'Taipei Main Station';
  // this.destination = 'Taiwan Presidential Office';
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


