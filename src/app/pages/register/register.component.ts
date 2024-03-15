import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private as: AuthService, private router: Router) { }
  submit(un: any, email: any, password: any, form: any) {
    console.log(email.value, password.value);
    
    // Extract relevant properties from the 'un' object
    const userData = {
      username: un.value,
      // Add other properties if needed
    };
  
    localStorage.setItem('data', JSON.stringify(userData));
  
    if (email.control && email.control.value.trim() == '' && password.control && password.control.value.trim() == '') {
      alert("please fill the form");
    } else {
      this.as.signup(email.control.value, password.control.value)
        .then((val) => {
          console.log(val);
          this.router.navigate(['/login']);
        })
        .catch((err) => console.log(err));
    }
  }
  
}