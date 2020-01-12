import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Oertlichkeiten } from '../Models/Oertlichkeiten';
import { Maengel } from '../Models/Meangel';
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
  oertlichkeiten: Oertlichkeiten[];
  maengel: Maengel[];
  markers = [];

  disabledParkplaetze: boolean = false;
  disabledOther : boolean = false;

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

    this.restApi.getMaengel()
      .subscribe(m => {
        this.maengel = m as Maengel[];
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
  }

  loadHealth(){
    this.markers = [];
    for (let marker of this.oertlichkeiten.entries()) {
      if (marker["1"].kategorienId == 3){
       this.markers.push({ lat: marker["1"].latitude, lng: marker["1"].longitude})
      }
    }
  }

  loadPolitics(){

  }

  loadParking(){
    this.markers = [];
    for (let marker of this.oertlichkeiten.entries()) {
      if (marker["1"].kategorienId == 1){
       this.markers.push({ lat: marker["1"].latitude, lng: marker["1"].longitude})
      }
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
  
  loadDefect(){
    this.markers = [];
    for (let marker of this.maengel.entries()) {
      this.markers.push({lat: marker["1"].latitude, lng: marker["1"].longitude})
    }
  } 
}
