import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi } from "../RestApi/RestApi";


 
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
    private restApi:RestApi) {
    
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
      
      if (res.Email==null) {
        console.log('null!')
        this.checkLogin = false
      }

      else {
        this.checkLogin = true
      }

    });
     

    console.log(email, password)

    
  }
 
}