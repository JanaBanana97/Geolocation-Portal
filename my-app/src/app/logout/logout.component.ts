import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { swalProviderToken } from '@sweetalert2/ngx-sweetalert2/lib/di';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  ngOnInit() {
  }

  logout(event){
    
    if(this.cookie.check('email') == true){
      this.cookie.delete('email');
      Swal.fire('sucess', 'See you soon ', 'success');
    }
    else{
      Swal.fire('Logout failed', 'Sie müssen eingeloggt sein, um sich ausloggen zu können', 'error');
    }
  }

}
