import { Component, OnInit } from '@angular/core';
import { RestApi } from "../RestApi/RestApi";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  kategorieId: number;
  totalActivities: number
  totalDistance: number
  display: boolean = false;
  items: any[];
  public location: any[];

  constructor( private restApi:RestApi ) { }

  ngOnInit() {
  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  loadAll(){
    this.restApi.getOertlichkeiten()
      .subscribe(res => {
        console.log(res);
        this.items = res;
    });
    for (let location of this.items.entries()) {
      if (location["1"].kategorienid == 1){
        this.location.push(location["1"].longitude);
        this.location.push(location["1"].latitude);
      }
    }
  }

  loadSchools(){
    this.kategorieId = 2;
  }

  loadHealth(){
    this.kategorieId = 3;
  }

  loadPolitics(){
    this.kategorieId = 4;
  }

  loadEnvironment(){
    this.kategorieId = 1;
  }

  loadDefect(){
    this.kategorieId = 5;
  }

  openDialog($event){
    this.display = true;
  }

}
