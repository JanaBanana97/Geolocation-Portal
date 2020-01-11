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
  items: Oertlichkeiten[];

  location = location

  markers = [];

  constructor( public restApi:RestApi, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.items = []
    this.restApi.getOertlichkeiten()
      .subscribe(res => {
        this.items = res as Oertlichkeiten[];
      });
     for (let marker of this.items.entries()) {
       if (marker["1"].kategorienId == 1){
           this.markers.push({ lat: marker["1"].latitude, lng: marker["1"].longitude})
       }
     }
  }
  

  openDialog($event){
    this.display = true;
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

    // for (let marker of this.items.entries()) {
    //   if (marker["1"].kategorienId == 1){
    //       this.markers.push({ lat: marker["1"].latitude, lng: marker["1"].longitude})
    //   }
    // }
  }
  
}
