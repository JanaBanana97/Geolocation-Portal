import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Oertlichkeiten } from '../Models/Oertlichkeiten';
import { RestApi } from '../RestApi/RestApi';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  latitude = 49.3527796;
  longitude = 9.1455235;
  mapType = 'roadmap';
  address: string;
  private geoCoder;
  selectedMarker;
  display: boolean = false;
  displayMangel: boolean = false;
  items: Oertlichkeiten[];

  location = location

  markers = [];

  disabledParkplaetze: boolean = false;
  disabledOther : boolean = false;

  constructor( public restApi:RestApi, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.items = []
    this.restApi.getOertlichkeiten()
      .subscribe(res => {
        this.items = res as Oertlichkeiten[];
        for (let marker of this.items.entries()) {
          if (marker["1"].kategorienId == 1){
           this.markers.push({ lat: marker["1"].latitude, lng: marker["1"].longitude})
          }
        }
      });
     
  }
  

  placeMarker($event){
    this.display = true;
  }

  openMaengelMelder($event){
    this.displayMangel = true;
  }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
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
    this.display = true;

    // this.restApi.getOertlichkeiten()
    //   .subscribe(res => {
    //     console.log(res);
    //     this.items = res as Oertlichkeiten[];
    //   });

    for (let marker of this.items.entries()) {
          this.markers.push({ lat: marker["1"].latitude, lng: marker["1"].longitude})
    }
  }

  changeCategory(value){
    if (value != "Parkplätze") {
      this.disabledParkplaetze = true;
      this.disabledOther = false;
    }
    else {
      this.disabledParkplaetze = false;
      this.disabledOther = true;
    }
  }
  
}
