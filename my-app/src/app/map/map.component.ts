import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Oertlichkeiten } from '../Models/Oertlichkeiten';
import { Kategorien } from '../Models/Kategorien';
import { Gesundheit } from '../Models/Gesundheit';
import { Parkplaetze } from '../Models/Parkplaetze';
import { Schulen } from '../Models/Schulen';
import { Maengel } from '../Models/Meangel';
import { RestApi } from '../RestApi/RestApi';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Politik } from '../Models/Politik';

import { AgmDirectionModule } from 'agm-direction';
import { style } from '@angular/animations';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { FormArrayName } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  mapType = 'roadmap';
  latitude = 49.3527796;
  longitude = 9.1455235;
  zoom: number;
  private geoCoder;
  private placeSearch;
  autocomplete;

  @ViewChild('search', {static:false})
  public searchElementRef: ElementRef;

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

  selectedMarker: Oertlichkeiten;
  selectedKat: Kategorien;

  infos = [];

  markers = [];
  objects = [];

  disabledParkplaetze: boolean = false;
  disabledOther : boolean = false;

  file: File;
  uploadedFile: any[] = [];
  
  geoJsonObject: any;
  dir: any;
  currLocRouteLat: number;
  currLocRouteLng: number;

  clickable: true;
    fillColor: any;
    strokeColor: "FF0000";
    strokeWeight: 1;
    cat: any;

  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };
  feature: any;

 
  constructor( public restApi:RestApi, private route: ActivatedRoute, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone ) { }q

    ngOnInit(): void {
      this.oertlichkeiten = []
      this.restApi.getOertlichkeiten()
        .subscribe(o => {
          console.log(o);
          this.oertlichkeiten = o as Oertlichkeiten[];
        });
        
      this.restApi.getKategorien()
        .subscribe(k => {
          this.kategorien = k as Kategorien[];
        });

      this.restApi.getMaengel()
        .subscribe(m => {
          this.maengel = m as Maengel[];
          for (let marker of this.maengel.entries()) {
            this.markers.push({id: marker["1"].maengelID, lat: marker["1"].latitude, lng: marker["1"].longitude, 
            url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'})
          }
      });
      this.loadAll();

      if (navigator)
      {
      navigator.geolocation.getCurrentPosition( pos => {
          this.currLocRouteLng = +pos.coords.longitude;
          this.currLocRouteLat = +pos.coords.latitude;
        });
      }
      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        this.geoCoder = new google.maps.Geocoder;
  
        this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"]
        });

        this. autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
  
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              
              return;
            }
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;

            this.showMarker(event)

          });
        });
      });
    }

    showMarker($event){
      console.log($event.coords.lat);
      console.log($event.coords.lng);
    }

      // Get Current Location Coordinates
      private setCurrentLocation() {
        if ('geolocation' in navigator) { 
          navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.zoom = 8;
          });
        }
      }
     
      getAddress(latitude, longitude) {
        this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
          console.log(results);
          console.log(status);
          if (status === 'OK') {
            if (results[0]) {
              this.zoom = 12;
              this.address = results[0].formatted_address;
              console.log(this.address);
              this.strasse = results[0].address_components[1].long_name;
              this.hausnr = results[0].address_components[0].long_name;
        
              this.plz = results[0].address_components[7].long_name;
              this.ort = results[0].address_components[2].long_name;
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
     
        });
      }

  setLocation($event){
    if (navigator){
      navigator.geolocation.getCurrentPosition( pos => {
        this.currLng = +pos.coords.longitude;
        this.currLat = +pos.coords.latitude;
      });
      this.getAddress(this.currLat, this.currLng);
    }
  }

  openMaengelMelder($event){
    this.displayMangel = true;
  } 
  
  placeMarker(lat: number, lng: number){
    this.currLng = lng;
    this.currLat = lat;
    this.getAddress(lat, lng);
    this.display = true;
  }

  selectMarker(katId: number, id: number) {
    this.infos = [];
    for (let marker of this.oertlichkeiten.entries()) {
      if (marker["1"].oertlichkeitenId == id){
      this.infos.push({ 
          oertlichkeitenId: marker["1"].oertlichkeitenId,
          strasse: marker["1"].strasse,
          hausnummer: marker["1"].hausnummer,
          postleitzahl: marker["1"].postleitzahl,
          ort: marker["1"].ort,
          lat: marker["1"].latitude, 
          lng: marker["1"].longitude,
          kategorienId: marker["1"].kategorienId,        
        })
        this.selectedMarker = marker["1"];
      }
    }

    

    switch(katId) { 
      case 1: { 
        this.infos=[];
        this.restApi.getParkplaetze()
          .subscribe( p => {
            this.parken = p as Parkplaetze[];
            for (let marker of this.parken.entries()) {
              if (marker["1"].oertlichkeitenId == id){
              this.infos.push({ 
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
        this.infos=[];
        this.restApi.getSchulen()
          .subscribe( p => {
            this.schulen = p as Schulen[];
            for (let marker of this.schulen.entries()) {
              if (marker["1"].oertlichkeitenId == id){
              this.infos.push({ 
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
        this.infos=[];
        this.restApi.getGesundheit()
          .subscribe( p => {
            this.gesundheit = p as Gesundheit[];
            for (let marker of this.gesundheit.entries()) {
              if (marker["1"].oertlichkeitenId == id){
              this.infos.push({ 
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
        this.infos=[];
        this.restApi.getPolitik()
          .subscribe( p => {
            this.politik = p as Politik[];
            for (let marker of this.politik.entries()) {
              if (marker["1"].oertlichkeitenId == id){
              this.infos.push({ 
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
        this.infos = [];
        for (let marker of this.maengel.entries()) {
          if (marker["1"].maengelID == id){
          this.infos.push({ 
              mangelId: marker["1"].maengelID,
              beschreibung: marker["1"].beschreibung,
              lat: marker["1"].latitude, 
              lng: marker["1"].longitude,
              status: marker["1"].status,        
            })
          }
          break; 
        } 
      } 
    }
  }

  save(){
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
    //this.geoJsonObject = null;
    this.latitude = 49.3527796;
    this.longitude = 9.1455235;
    this.markers = [];

    
  }

  loadSchools() {
    this.geoJsonObject = null;
    this.latitude = 49.3527796;
    this.longitude = 9.1455235;
    this.markers = [];
    for (let marker of this.oertlichkeiten.entries()) {
      if (marker["1"].kategorienId == 2){
       this.markers.push({ id: marker["1"].oertlichkeitenId, lat: marker["1"].latitude, lng: marker["1"].longitude, 
       katId: marker["1"].kategorienId, url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'})
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
    this.latitude = 49.3527796;
    this.longitude = 9.1455235;
    this.markers = [];
    for (let marker of this.oertlichkeiten.entries()) {
      if (marker["1"].kategorienId == 3){
       this.markers.push({ id: marker["1"].oertlichkeitenId, lat: marker["1"].latitude, lng: marker["1"].longitude,
       katId: marker["1"].kategorienId, url: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'})
      }
    }
    this.restApi.getGesundheit()
      .subscribe( g => {
        this.gesundheit = g as Gesundheit[];
      });
      this.currentSelectedMarkers = "Health";
  }
  styleFunc(feature, event) {
    console.log(feature.getProperty('cat'));
    
    return ({
      
    clickable: true,
    fillColor: feature.getProperty('color'),
    strokeColor: "FF0000",
    strokeWeight: 1,
    cat: feature.getProperty('cat')
    
    })
    
  }
  
  clicked(clickEvent: any): void {
    console.log('Click Event Detected');
        

        console.log(clickEvent.feature.getId());
        clickEvent.feature.forEachProperty(p =>{
          console.log(p);
        });
        console.log(clickEvent.feature.getProperty("cat"));
        console.log(clickEvent.feature.getProperty("color"));



    if(clickEvent.feature.getProperty("cat") === 'bauplatz'){
      Swal.fire({
        icon: 'info',
        html:
          'Weitere Informationen zu Bauplätzen entnehmen Sie bitte dem ' +
          '<a href="https://www.mosbach.de/Bauen_Wohnen-p-2161.html">Bürgerportal</a> ',  
        
        focusConfirm: true,
        
      })
    }
    else if(clickEvent.feature.getProperty("cat") === 'zone1'){
      Swal.fire({
        icon: 'info',
        html:
          'Weitere Informationen zu den Wahlen entnehmen Sie bitte dem ' +
          '<a href="https://www.kommunalwahl-bw.de/uploads/tx_flexslider/VRS_Sitzverteilung_01.png">Bürgerportal</a> ',  
        
        focusConfirm: true,
        
      })

    }
    else if(clickEvent.feature.getProperty("cat") === 'zone2'){
      Swal.fire({
        icon: 'info',
        imageUrl: 'https://www.rnz.de/cms_media/module_img/802/401109_1_org_KW_Mosbach_2.jpg',
        html:
          'Weitere Informationen zu den Wahlen entnehmen Sie bitte dem ' +
          '<a href="https://wahlen.iteos.de/AGS225058/bilder/empty.gif">Bürgerportal</a> ',  
        
        focusConfirm: true,
        
      })

    }
    else{
      Swal.fire({
        icon: 'info',
        imageUrl: 'https://www.rnz.de/cms_media/module_img/800/400111_1_org_KW_Kreistagswahl_NOK_Sitzverteilung.jpg',
        html:
          'Weitere Informationen zu den Wahlen entnehmen Sie bitte dem ' +
          '<a href="https://www.mosbach.de/Wahlen.html">Bürgerportal</a> ',   
        focusConfirm: true,
        
      })
    }
 
  }
  loadBauplaetze(){
    this.latitude = 49.3527796;
    this.longitude = 9.1455235;
    this.markers = [];
    
    
      //this.geoJson;
    this.geoJsonObject ={
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "color": "#F26666",
            "cat": "bauplatz",
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  9.15783405303955,
                  49.358018593272206
                ],
                [
                  9.157297611236572,
                  49.35750147731251
                ],
                [
                  9.156181812286377,
                  49.356341440651214
                ],
                [
                  9.155452251434326,
                  49.35460832285959
                ],
                [
                  9.156696796417236,
                  49.35369980929853
                ],
                [
                  9.157876968383789,
                  49.353448217960896
                ],
                [
                  9.158434867858887,
                  49.35328048968759
                ],
                [
                  9.159078598022461,
                  49.35291707646668
                ],
                [
                  9.161374568939209,
                  49.35361594566232
                ],
                [
                  9.160623550415039,
                  49.35403526241361
                ],
                [
                  9.1605806350708,
                  49.35472013875353
                ],
                [
                  9.16036605834961,
                  49.355474889388965
                ],
                [
                  9.161181449890135,
                  49.35666289933394
                ],
                [
                  9.160923957824707,
                  49.35748750113005
                ],
                [
                  9.15987253189087,
                  49.358060521354965
                ],
                [
                  9.158906936645508,
                  49.35832606504904
                ],
                [
                  9.15860652923584,
                  49.35842389657491
                ],
                [
                  9.15783405303955,
                  49.358018593272206
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "color": "#C5FA8C",
            "cat": "bauplatz",
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  9.15560245513916,
                  49.35013547866613
                ],
                [
                  9.15530204772949,
                  49.34978602058529
                ],
                [
                  9.155344963073729,
                  49.349352689117545
                ],
                [
                  9.155409336090088,
                  49.34875161011731
                ],
                [
                  9.155945777893066,
                  49.34868171673371
                ],
                [
                  9.157147407531738,
                  49.34858386582981
                ],
                [
                  9.15761947631836,
                  49.34841612097037
                ],
                [
                  9.158391952514648,
                  49.34837418466615
                ],
                [
                  9.159035682678223,
                  49.348472035987086
                ],
                [
                  9.159808158874512,
                  49.34854192966857
                ],
                [
                  9.160430431365967,
                  49.34876558878213
                ],
                [
                  9.160881042480469,
                  49.34884946068756
                ],
                [
                  9.161825180053711,
                  49.3489612896724
                ],
                [
                  9.162704944610596,
                  49.34901720406952
                ],
                [
                  9.16332721710205,
                  49.349101075545974
                ],
                [
                  9.163262844085693,
                  49.349436560022085
                ],
                [
                  9.162983894348145,
                  49.34975806383159
                ],
                [
                  9.162425994873047,
                  49.349855912400045
                ],
                [
                  9.161481857299805,
                  49.34989784744125
                ],
                [
                  9.159743785858153,
                  49.34988386909815
                ],
                [
                  9.159057140350342,
                  49.34999569573167
                ],
                [
                  9.158048629760742,
                  49.35014945693771
                ],
                [
                  9.156653881072998,
                  49.35031719588712
                ],
                [
                  9.155817031860352,
                  49.350219348236145
                ],
                [
                  9.15560245513916,
                  49.35013547866613
                ]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "color": "#F4A224",
            "cat": "bauplatz",
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  9.148832559585571,
                  49.348108587242585
                ],
                [
                  9.148521423339842,
                  49.347898904053274
                ],
                [
                  9.148306846618652,
                  49.34772416737953
                ],
                [
                  9.147952795028687,
                  49.34752147206047
                ],
                [
                  9.147523641586304,
                  49.347353723578706
                ],
                [
                  9.147008657455444,
                  49.34719995363467
                ],
                [
                  9.14660096168518,
                  49.34704618321001
                ],
                [
                  9.146804809570312,
                  49.34678057861727
                ],
                [
                  9.146922826766968,
                  49.3467106824335
                ],
                [
                  9.147319793701172,
                  49.346794557842124
                ],
                [
                  9.147652387619019,
                  49.34691338109288
                ],
                [
                  9.14786696434021,
                  49.34688542270674
                ],
                [
                  9.148145914077759,
                  49.34678756823019
                ],
                [
                  9.14837121963501,
                  49.34678057861727
                ],
                [
                  9.14861798286438,
                  49.34678057861727
                ],
                [
                  9.148929119110107,
                  49.346843485097786
                ],
                [
                  9.149068593978882,
                  49.346955318642294
                ],
                [
                  9.149090051651001,
                  49.3471020997837
                ],
                [
                  9.149197340011597,
                  49.347283828209164
                ],
                [
                  9.149315357208252,
                  49.34743060837052
                ],
                [
                  9.149540662765503,
                  49.34760534608687
                ],
                [
                  9.149733781814575,
                  49.347626314571144
                ],
                [
                  9.149765968322754,
                  49.34768223048546
                ],
                [
                  9.149733781814575,
                  49.3478429883852
                ],
                [
                  9.149690866470337,
                  49.347961809103886
                ],
                [
                  9.149680137634277,
                  49.34807364010642
                ],
                [
                  9.14960503578186,
                  49.348171492025095
                ],
                [
                  9.149293899536133,
                  49.34822041791147
                ],
                [
                  9.148982763290405,
                  49.348171492025095
                ],
                [
                  9.148832559585571,
                  49.348108587242585
                ]
              ]
            ]
          }
        }
      ]
    };
  }

  loadPolitics(){
    this.latitude = 49.3527796;
    this.longitude = 9.1455235;
    this.markers = [];
    for (let marker of this.oertlichkeiten.entries()) {
      if (marker["1"].kategorienId == 4){
       this.markers.push({ id: marker["1"].oertlichkeitenId, lat: marker["1"].latitude, lng: marker["1"].longitude, 
       katId: marker["1"].kategorienId, url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'})
      }
    }
    this.restApi.getPolitik()
      .subscribe( g => {
        this.politik = g as Politik[];
      });
      //this.geoJson;
    this.geoJsonObject = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "color": "#F4A224",
            "cat": "zone1",
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
            "cat": "zone1",
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
            "cat": "zone2",
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
            "cat": "zone3",
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
            "cat": "zone4",
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
            "cat": "politik",
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
            "cat": "politik",
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
    this.latitude = 49.3527796;
    this.longitude = 9.1455235;
    this.geoJsonObject = null;
    this.markers = [];
    for (let marker of this.oertlichkeiten.entries()) {
      if (marker["1"].kategorienId == 1){
       this.markers.push({ id: marker["1"].oertlichkeitenId, lat: marker["1"].latitude, lng: marker["1"].longitude, 
       katId: marker["1"].kategorienId, url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'})
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
    this.latitude = 49.3527796;
    this.longitude = 9.1455235;
    this.geoJsonObject = null;
    this.markers = [];
    for (let marker of this.maengel.entries()) {
      this.markers.push({id: marker["1"].maengelID, lat: marker["1"].latitude, lng: marker["1"].longitude,
      url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'})
    }
  } 

  saveMangel() {
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

 getDirection($event) {

  if (this.selectedMarker != null) { 
  this.dir = {
    origin: { lat: this.currLocRouteLat, lng: this.currLocRouteLng },
    destination: {lat: this.selectedMarker.latitude, lng: this.selectedMarker.longitude }
  } 
}

//   else {
//     Swal.fire('Wählen Sie zuerst eine Marker aus.');
//   }
//   // this.origin = 'Taipei Main Station';
//   // this.destination = 'Taiwan Presidential Office';
//   }
// }
}}
