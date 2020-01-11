import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oertlichkeiten } from "../Models/Oertlichkeiten";
import { RestApi } from "../RestApi/RestApi";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

@NgModule({
  providers: [RestApi]
})
export class DataComponent implements OnInit {

  oertlichkeiten: Oertlichkeiten[];
  items: Oertlichkeiten[];
  cols: any[];
  private _opened: boolean = false;
 
  constructor(  private route: ActivatedRoute, private restApi:RestApi ) { }

  ngOnInit() {
    this.restApi.getOertlichkeiten()
      .subscribe(res => {
        console.log(res);
        this.items = res;
      });

    this.cols = [
      { field: 'oertlichkeitenId', header: 'ID', width: '9em' },
      { field: 'bezeichnung', header: 'Bezeichnung', width: '9em' },
      { field: 'longitude', header: 'Long', width: '9em' },
      { field: 'latitude', header: 'Lat', width: '9em' },
      { field: 'strasse', header: 'Straße', width: '9em' },
      { field: 'hausnummer', header: 'Hausnr', width: '9em' },
      { field: 'postleitzahl', header: 'PLZ', width: '9em' },
      { field: 'ort', header: 'Ort', width: '9em' },
      { field: 'kategorienId', header: 'Kategorie', width: '9em' },

    ]  
  }
  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
