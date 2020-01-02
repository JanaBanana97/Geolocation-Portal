import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { IActivity } from '../shared/activity.model';
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
  selectedMarker;
  markers = [
    // These are all just random coordinates from https://www.random.org/geographic-coordinates/
    { lat: 49.3504637, lng: 9.1602141, alpha: 1 },
    { lat: 49.3382232, lng: 9.122834, alpha: 1 },
    { lat: 49.3502419, lng: 9.1473992, alpha: 1 },
    { lat: 49.3499529, lng: 9.1450694, alpha: 1 },
    { lat: 49.348638, lng: 9.170692, alpha: 1 },
    { lat: 49.3498062, lng: 9.1087208, alpha: 1 }
  ];

  ngOnInit(){}

  addMarker(lat: number, lng: number) {
    this.markers.push({ lat, lng, alpha: 0.4 });
  }

  //max(coordType: 'lat' | 'lng'): number {
  //  return Math.max(...this.markers.map(marker => marker[coordType]));
  //}

  //min(coordType: 'lat' | 'lng'): number {
  //  return Math.min(...this.markers.map(marker => marker[coordType]));
  //}

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }



  
}
