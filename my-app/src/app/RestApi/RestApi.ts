import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
// Models
import { Benutzer } from "../Models/Benutzer";
import { Gesundheit } from "../Models/Gesundheit";
import { Kategorien } from "../Models/Kategorien";
import { Oertlichkeiten } from "../Models/Oertlichkeiten";
import { Parkplaetze } from "../Models/Parkplaetze";
import { Politik } from "../Models/Politik";
import { Schulen } from "../Models/Schulen";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const httpOptionsGet = {
    headers: new HttpHeaders({
        'Accept': 'text/json',
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
        this.apiUrl = "https://localhost:44383/api"
    }

    getBenutzer(): Observable<Benutzer[]> {
        let url = this.apiUrl + "/user";
        return this.http.get<Benutzer[]>(url, httpOptionsGet);
    }

    //getGesundheit(): Observable<Gesundheit[]> {
    //    let url = this.apiUrl + "/GesundheitService/getAllGesundheit";
    //    return this.http.get<Gesundheit[]>(url, httpOptionsGet);
    //}

    getKategorien(): Observable<Kategorien[]> {
        let url = this.apiUrl + "/category";
        return this.http.get<Kategorien[]>(url, httpOptionsGet);
    }

    getOertlichkeiten(): Observable<Oertlichkeiten[]> {
        let url = this.apiUrl + "/location";
        return this.http.get<Oertlichkeiten[]>(url, httpOptionsGet);
    }
}