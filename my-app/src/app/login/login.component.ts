import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi } from "../RestApi/RestApi";
import { CookieService } from 'ngx-cookie-service';
import { Benutzer } from '../Models/Benutzer';
import { delay } from 'rxjs/operators';


 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


@NgModule({
  providers: [RestApi]
})


export class LoginComponent implements OnInit {

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}
  checkLogin = false
  
  constructor( 
    private router: Router,
    private restApi: RestApi,
    private cookie: CookieService) {
    
   }
 
  ngOnInit() {
  }
  
  

  async loginUser(event)
  {
    event.preventDefault()
    const target = event.target
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value
    //const delay = ms => new Promise(res => setTimeout(res, ms));
    
    
    //this.cookie.set("email", "ssss")
    //this.cookie.set("password", "12345")
    
      //your task after delay.
 
    this.restApi.checkBenutzer(email, password)
    .subscribe(res => {
      console.log(res)
      console.log("warten")
      this.delay(3000).then(any=>{
      var neu = res.BenutzerId
      console.log("erwarteter wert: " + neu)
      console.log(email)

  
      
      

      if (neu != 0) {
       

        console.log("übereinstimmung")
        this.checkLogin = true
        
        this.cookie.set("email", email)
        this.cookie.set("password", password)
            // Getting cookie
        alert("User " + res.Email + " hat sich angemeldet")
        
      }

      else {
                 
        console.log('null!')
        this.checkLogin = false
       // alert("Inkorrekte Credentials")
      }
    });
    });
  
     

    //console.log(email, password)

    
  }
 
}