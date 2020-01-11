import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// Models
import { Benutzer } from "../Models/Benutzer";
import { Gesundheit } from "../Models/Gesundheit";
import { Kategorien } from "../Models/Kategorien";
import { Maengel } from '../Models/Meangel';
import { Oertlichkeiten } from "../Models/Oertlichkeiten";
import { Parkplaetze } from "../Models/Parkplaetze";
import { Politik } from "../Models/Politik";
import { Schulen } from "../Models/Schulen";
const httpOptionsGet = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        observe: 'response'
    }),
    params: new HttpParams(),
}
@Injectable({
    providedIn: 'root'
})
export class RestApi{
    apiUrl: string;
    
    constructor (private http: HttpClient) {
        this.apiUrl = "http://localhost:6098/rest"
        //this.apiUrl = "https://localhost:44383/api"

    }
    getBenutzer(): Observable<Benutzer[]> {
        let url = this.apiUrl + "/getAllBenutzer";
        return this.http.get<Benutzer[]>(url, httpOptionsGet);
    }

    getGesundheit(): Observable<Gesundheit[]> {
       let url = this.apiUrl + "/GesundheitService/getAllGesundheit";
       return this.http.get<Gesundheit[]>(url, httpOptionsGet);
    }

    getKategorien(): Observable<Kategorien[]> {
        let url = this.apiUrl + "/KategorienService/getAllKategorien";
        return this.http.get<Kategorien[]>(url, httpOptionsGet);    
    }

    getMaengel(): Observable<Maengel[]> {
        let url = this.apiUrl + "/MaengelService/getAllMaengel";
        return this.http.get<Maengel[]>(url, httpOptionsGet);    
    }
    
    getOertlichkeiten(): Observable<Oertlichkeiten[]> {
        let url = this.apiUrl + "/OertlichkeitenService/getAllOertlichkeiten";
        //let url = this.apiUrl + "/location";
        return this.http.get<Oertlichkeiten[]>(url, httpOptionsGet); 
    }

    getParkplaetze(): Observable<Parkplaetze[]> {
        let url = this.apiUrl + "/ParkplaetzeService/getAllParkplaetze";
        return this.http.get<Parkplaetze[]>(url, httpOptionsGet); 
    }

    getSchulen(): Observable<Schulen[]> {
        let url = this.apiUrl + "/SchulenService/getAllSchulen";
        return this.http.get<Schulen[]>(url, httpOptionsGet); 
    }

    putSchulen(items: Schulen[]): Observable<Schulen[]>{
        let url = this.apiUrl + "/SchulenService/updateSchule";
        return this.http.put<Schulen[]>(url, items);
    }

    checkBenutzer(email, password): Observable<Benutzer>
    {
        let url = this.apiUrl + "/BenutzerService/checkBenutzer?email=" + email + "&passwort=" + password + "";
        return this.http.get<Benutzer>(url, httpOptionsGet);
    }
}