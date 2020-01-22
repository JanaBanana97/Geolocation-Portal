import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
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
    
    constructor (private http: HttpClient, private cookie: CookieService) {
        this.apiUrl = "http://localhost:6098/rest"
        //this.apiUrl = "https://localhost:44383/api"
    }
    
    getBenutzer(): Observable<Benutzer[]> {
        let url = this.apiUrl + "/getAllBenutzer";
        return this.http.get<Benutzer[]>(url, httpOptionsGet);
    }

    checkBenutzer(email, password): Observable<Benutzer>{
        let url = this.apiUrl + "/BenutzerService/checkBenutzer?email=" + email + "&passwort=" + password + "";
        return this.http.get<Benutzer>(url, httpOptionsGet);   
    }

    getGesundheit(): Observable<Gesundheit[]> {
       let url = this.apiUrl + "/GesundheitService/getAllGesundheit";
       return this.http.get<Gesundheit[]>(url, httpOptionsGet);
    }

    getGesundheitById(id: number): Observable<Gesundheit> {
        let url = this.apiUrl + "/GesundheitService/getGesundheit";
        return this.http.get<Gesundheit>(url, httpOptionsGet);
    }

    putGesundheit(items: Gesundheit[]): Observable<Gesundheit[]>{
        if (this.cookie.check('email') == true){
            let url = this.apiUrl + "/GesundheitService/updateGesundheit";
            Swal.fire('Wuhuuu', 'Datensatz erfolgreich angelegt', 'success');
            return this.http.put<Gesundheit[]>(url, items);
    }
        else{
            Swal.fire('Mission failed', 'Sie müssen eingelo ggt sein, um dies ausführen zu können', 'error');
        }
    }

    postGesundheit(item: Gesundheit): Observable<Gesundheit>{
        if (this.cookie.check('email') == true){
            let url = this.apiUrl + "/GesundheitService/addGesundheit";
            Swal.fire('Wuhuuu', 'Datensatz erfolgreich angelegt', 'success');
            return this.http.post<Gesundheit>(url, item);}
        else{
            Swal.fire('Mission failed', 'Sie müssen eingelo ggt sein, um dies ausführen zu können', 'error');
        }
    }

    getKategorien(): Observable<Kategorien[]> {
        let url = this.apiUrl + "/KategorienService/getAllKategorien";
        return this.http.get<Kategorien[]>(url, httpOptionsGet);    
    }

    putKategorien(items: Kategorien[]): Observable<Kategorien[]>{
        if (this.cookie.check('email') == true){
            let url = this.apiUrl + "/KategorienService/updateKategorie";
            Swal.fire('Wuhuuu', 'Datensatz erfolgreich angelegt', 'success');
            return this.http.put<Kategorien[]>(url, items);}
        else{
            Swal.fire('Mission failed', 'Sie müssen eingeloggt sein, um dies ausführen zu können', 'error');
        }
    }

    getMaengel(): Observable<Maengel[]> {
        let url = this.apiUrl + "/MaengelService/getAllMaengel";
        return this.http.get<Maengel[]>(url, httpOptionsGet);    
    }

    putMaengel(items: Maengel[]): Observable<Maengel[]>{
        if (this.cookie.check('email') == true){
        let url = this.apiUrl + "/MaengelService/updateMangel";
        Swal.fire('Wuhuuu', 'Datensatz erfolgreich angelegt', 'success');
        return this.http.put<Maengel[]>(url, items);}
        else{
            Swal.fire('Mission failed', 'Sie müssen eingeloggt sein, um dies ausführen zu können', 'error');
        }
    }

    postMangel(item: Maengel): Observable<Maengel>{  
        let url = this.apiUrl + "/MaengelService/addMangel";
        Swal.fire('Wuhuuu', 'Datensatz erfolgreich angelegt', 'success');
        return this.http.post<Maengel>(url, item);   
    }
    
    getOertlichkeiten(): Observable<Oertlichkeiten[]> {
        let url = this.apiUrl + "/OertlichkeitenService/getAllOertlichkeiten";
        //let url = this.apiUrl + "/location";
        return this.http.get<Oertlichkeiten[]>(url, httpOptionsGet); 
    }

    putOertlichkeiten(items: Oertlichkeiten[]): Observable<Oertlichkeiten[]>{
        if (this.cookie.check('email') == true){
            let url = this.apiUrl + "/OertlichkeitenService/updateOertlichkeit";
            Swal.fire('Wuhuuu', 'Datensatz erfolgreich angelegt', 'success');
            return this.http.put<Oertlichkeiten[]>(url, items);}
        else{
            Swal.fire('Mission failed', 'Sie müssen eingeloggt sein, um dies ausführen zu können', 'error');
        }
    }

    postOertlichkeit(item: Oertlichkeiten): Observable<Oertlichkeiten>{
        if (this.cookie.check('email') == true){
            let url = this.apiUrl + "/OertlichkeitenService/addOertlichkeit";
            Swal.fire('Wuhuuu', 'Datensatz erfolgreich angelegt', 'success');
            return this.http.post<Oertlichkeiten>(url, item);}
        else{
            Swal.fire('Mission failed', 'Sie müssen eingeloggt sein, um dies ausführen zu können', 'error');
        }
    }

    getParkplaetze(): Observable<Parkplaetze[]> {
        let url = this.apiUrl + "/ParkplaetzeService/getAllParkplaetze";
        return this.http.get<Parkplaetze[]>(url, httpOptionsGet); 
    }

    getParkplatzById(id: number): Observable<Parkplaetze> {
        let url = this.apiUrl + "/ParkplaetzeService/getParkplatz";
        return this.http.get<Parkplaetze>(url, httpOptionsGet); 
    }

    putParken(items: Parkplaetze[]): Observable<Parkplaetze[]>{
        if (this.cookie.check('email') == true){
            let url = this.apiUrl + "/ParkplaetzeService/updateParkplatz";
            Swal.fire('Wuhuuu', 'Datensatz erfolgreich angelegt', 'success');
            return this.http.put<Parkplaetze[]>(url, items);}
        else{
            Swal.fire('Mission failed', 'Sie müssen eingeloggt sein, um dies ausführen zu können', 'error');
        }
    }

    postParken(item: Parkplaetze): Observable<Parkplaetze>{
        if (this.cookie.check('email') == true){
            let url = this.apiUrl + "/ParkplaetzeService/addParkplatz";
            Swal.fire('Wuhuuu', 'Datensatz erfolgreich angelegt', 'success');
            return this.http.post<Parkplaetze>(url, item);}
        else{
            Swal.fire('Mission failed', 'Sie müssen eingeloggt sein, um dies ausführen zu können', 'error');
        }
    }

    getSchulen(): Observable<Schulen[]> {
        let url = this.apiUrl + "/SchulenService/getAllSchulen";
        return this.http.get<Schulen[]>(url, httpOptionsGet); 
    }

    getSchuleById(id: number): Observable<Schulen> {
        let url = this.apiUrl + "/SchulenService/getSchule";
        return this.http.get<Schulen>(url, httpOptionsGet); 
    }

    putSchulen(items: Schulen[]): Observable<Schulen[]>{
        if (this.cookie.check('email') == true){
            let url = this.apiUrl + "/SchulenService/updateSchule";
            Swal.fire('Wuhuuu', 'Datensatz erfolgreich angelegt', 'success');
            return this.http.put<Schulen[]>(url, items);}
        else{
            Swal.fire('Mission failed', 'Sie müssen eingeloggt sein, um dies ausführen zu können', 'error');
        }
    }

    postSchule(item: Schulen): Observable<Schulen>{
        console.log("postSchule aufgerufen: " + item);
        if (this.cookie.check('email') == true){
            let url = this.apiUrl + "/SchulenService/addSchule";
            Swal.fire('Wuhuuu', 'Datensatz erfolgreich angelegt', 'success');
            return this.http.post<Schulen>(url, item);}
        else{
            Swal.fire('Mission failed', 'Sie müssen eingeloggt sein, um dies ausführen zu können', 'error');
        }
    }

    getPolitik(): Observable<Politik[]>{
        let url = this.apiUrl + "/PolitikService/getAllPolitik";
        return this.http.get<Politik[]>(url, httpOptionsGet);
    }

    getPolitikById(id: number): Observable<Politik>{
        let url = this.apiUrl + "/PolitikService/getPolitik";
        return this.http.get<Politik>(url, httpOptionsGet);
    }


    putPolitik(items: Politik[]): Observable<Politik[]>{
        if (this.cookie.check('email') == true){
            let url = this.apiUrl + "/SchulenService/updateSchule";
            Swal.fire('Wuhuuu', 'Datensatz erfolgreich angelegt', 'success');
            return this.http.put<Politik[]>(url, items);}
        else{
            Swal.fire('Mission failed', 'Sie müssen eingeloggt sein, um dies ausführen zu können', 'error');
        }
    }


    postPolitik(item: Politik): Observable<Politik>{
        if (this.cookie.check('email') == true){
            let url = this.apiUrl + "/PolitikService/addPolitik";
            Swal.fire('Wuhuuu', 'Datensatz erfolgreich angelegt', 'success');
            return this.http.post<Politik>(url, item);}
        else{
            Swal.fire('Mission failed', 'Sie müssen eingeloggt sein, um dies ausführen zu können', 'error');
        }
    }    
}