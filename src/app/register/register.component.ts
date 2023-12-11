import { Component, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  Email: string="";
  Password :string="";
  Firstname :string="";
  Lastname :string="";

  constructor(private http: HttpClient){}
  
  submitForm(){
    var databody = {
      "UserID": this.Email,
      "Password": this.Password,
      "Firstname": this.Firstname,
      "Lastname": this.Lastname
    }
   
      this.http.post("http://localhost:3000/user/register",databody,{responseType:'text'}).subscribe((resultData: any)=>
      {
        if(resultData == 'False'){
          alert("User ID has already used!")
        }else{
          alert("Create account success!")
        }
      })
      
    
  }
  ngOnInit():void{}
}
