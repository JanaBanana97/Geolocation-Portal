import { Component, OnInit } from '@angular/core';
import { Oertlichkeiten } from "../Models/Oertlichkeiten";
import { RestApi } from "../RestApi/RestApi";



@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  oertlichkeiten: Oertlichkeiten[];
  cols: any[];
  private _opened: boolean = false;
 


  constructor( private restApi:RestApi ) { }

  ngOnInit() {
    this.restApi.getOertlichkeiten()
      .subscribe(o => {
        this.oertlichkeiten = o as Oertlichkeiten[];
      });

    this.cols = [
      { field: 'id', header: 'ID', width: '9em' },
      { field: 'bezeichnung', header: 'Bezeichnung', width: '9em' },
      { field: 'long', header: 'Long', width: '9em' },
      { field: 'lat', header: 'Lat', width: '9em' },
      { field: 'strasse', header: 'Straße', width: '9em' },
      { field: 'hausnr', header: 'Hausnr', width: '9em' },
      { field: 'plz', header: 'PLZ', width: '9em' },
      { field: 'ort', header: 'Ort', width: '9em' },
      { field: 'kategorie', header: 'Kategorie', width: '9em' },

    ]  
  }
  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
