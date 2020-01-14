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
import { isPromise } from '@angular/compiler/src/util';


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

    putGesundheit(items: Gesundheit[]): Observable<Gesundheit[]>{
        let url = this.apiUrl + "/GesundheitService/updateGesundheit";
        return this.http.put<Gesundheit[]>(url, items);
    }

    postGesundheit(item: Gesundheit): Observable<Gesundheit>{
        let url = this.apiUrl + "/GesundheitService/addGesundheit";
        return this.http.post<Gesundheit>(url, item);
    }

    getKategorien(): Observable<Kategorien[]> {
        let url = this.apiUrl + "/KategorienService/getAllKategorien";
        return this.http.get<Kategorien[]>(url, httpOptionsGet);    
    }

    putKategorien(items: Kategorien[]): Observable<Kategorien[]>{
        let url = this.apiUrl + "/KategorienService/updateKategorie";
        return this.http.put<Kategorien[]>(url, items);
    }

    getMaengel(): Observable<Maengel[]> {
        let url = this.apiUrl + "/MaengelService/getAllMaengel";
        return this.http.get<Maengel[]>(url, httpOptionsGet);    
    }

    putMaengel(items: Maengel[]): Observable<Maengel[]>{
        let url = this.apiUrl + "/MaengelService/updateMangel";
        return this.http.put<Maengel[]>(url, items);
    }

    postMangel(item: Maengel): Observable<Maengel>{
        let url = this.apiUrl + "/MaengelService/addMangel";
        return this.http.post<Maengel>(url, item);
    }
    
    getOertlichkeiten(): Observable<Oertlichkeiten[]> {
        let url = this.apiUrl + "/OertlichkeitenService/getAllOertlichkeiten";
        //let url = this.apiUrl + "/location";
        return this.http.get<Oertlichkeiten[]>(url, httpOptionsGet); 
    }

    putOertlichkeiten(items: Oertlichkeiten[]): Observable<Oertlichkeiten[]>{
        let url = this.apiUrl + "/OertlichkeitenService/updateOertlichkeit";
        return this.http.put<Oertlichkeiten[]>(url, items);
    }

    postOertlichkeit(item: Oertlichkeiten): Observable<Oertlichkeiten>{
        let url = this.apiUrl + "/OertlichkeitenService/addOertlichkeit";
        return this.http.post<Oertlichkeiten>(url, item);
    }

    getParkplaetze(): Observable<Parkplaetze[]> {
        let url = this.apiUrl + "/ParkplaetzeService/getAllParkplaetze";
        return this.http.get<Parkplaetze[]>(url, httpOptionsGet); 
    }

    putParken(items: Parkplaetze[]): Observable<Parkplaetze[]>{
        let url = this.apiUrl + "/ParkplaetzeService/updateParkplatz";
        return this.http.put<Parkplaetze[]>(url, items);
    }

    postParken(item: Parkplaetze): Observable<Parkplaetze>{
        let url = this.apiUrl + "/ParkplaetzeService/addParkplatz";
        return this.http.post<Parkplaetze>(url, item);
    }

    getSchulen(): Observable<Schulen[]> {
        let url = this.apiUrl + "/SchulenService/getAllSchulen";
        return this.http.get<Schulen[]>(url, httpOptionsGet); 
    }

    putSchulen(items: Schulen[]): Observable<Schulen[]>{
        let url = this.apiUrl + "/SchulenService/updateSchule";
        return this.http.put<Schulen[]>(url, items);
    }

    postSchule(item: Schulen): Observable<Schulen>{
        let url = this.apiUrl + "/SchulenService/addSchule";
        return this.http.post<Schulen>(url, item);
    }

    checkBenutzer(email, password): Observable<Benutzer>{
        let url = this.apiUrl + "/BenutzerService/checkBenutzer?email=" + email + "&passwort=" + password + "";
        return this.http.get<Benutzer>(url, httpOptionsGet);   
    }
}