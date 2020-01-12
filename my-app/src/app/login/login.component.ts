import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi } from "../RestApi/RestApi";
import { CookieService } from 'ngx-cookie-service';
import { Benutzer } from '../Models/Benutzer';
import Swal from 'sweetalert2';
 
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
  
  constructor( private router: Router, private restApi:RestApi, private cookie: CookieService) {}
 
  ngOnInit() {
  }

  async loginUser(event)
  {
    event.preventDefault()
    const target = event.target
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value

    this.restApi.checkBenutzer(email, password)
    .subscribe(res => {
     // console.log(res)
     // console.log(res.email)
     // console.log(email)
     // var test = (email === res.email)

     // console.log(test)

      if (email==res.email) {
        console.log("übereinstimmung")
        this.checkLogin = true
        
        this.cookie.set("email", res.email)
       
            Swal.fire('Login succeeded', 'welcome: ' + res.email, 'success'); 
      }

      else {           
        //console.log('null!')
        this.checkLogin = false
        Swal.fire('Login failed', 'wrong credentials', 'error');
      }
    });

    
  }
}