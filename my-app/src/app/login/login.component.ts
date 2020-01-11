import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi } from "../RestApi/RestApi";
import { CookieService } from 'ngx-cookie-service';


 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@NgModule({
  providers: [RestApi]
})
export class LoginComponent implements OnInit {
  
  checkLogin = false
  
  constructor( 
    private router: Router,
    private restApi:RestApi,
    private cookie: CookieService) {
    
   }
 
  ngOnInit() {
  }
  
  

  loginUser(event)
  {
    event.preventDefault()
    const target = event.target
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value

   
    this.restApi.checkBenutzer(email, password)
    .subscribe(res => {
      console.log(res);
      
      if (res.Email!=null) {
        this.checkLogin = true
        
        this.cookie.set("email", res.Email)
            this.cookie.set("password", password)
            // Getting cookie
            alert("User " + res.Email + " hat sich angemeldet")
        


      }

      else {
                 
        console.log('null!')
        this.checkLogin = false
        alert("Inkorrekte Credentials")
      }

    });
     

    //console.log(email, password)

    
  }
 
}