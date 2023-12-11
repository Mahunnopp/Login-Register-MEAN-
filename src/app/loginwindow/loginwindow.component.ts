import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-loginwindow',
  templateUrl: './loginwindow.component.html',
  styleUrl: './loginwindow.component.css'
})
export class LoginwindowComponent {
    Email: string="";
    Password :string="";

    constructor(private http: HttpClient,private router: Router){}

    
    login(){
    var route = this.router
    let bodydata = {
      "UserID" : this.Email,
      "Password": this.Password
    }

    async function run() {
      await alert("Back to login page in 2 second")
      await route.navigate([''])
    }

    this.http.post("http://localhost:3000/user/login",bodydata,{responseType:'text'}).subscribe((resultData: any)=>
      {
        var route = this.router
        function wait(text:string,ms:number) {
          setTimeout(()=>{
            alert(text)
          },ms)
        }
        function wait2(text:string,ms:any,callback:any) {
          setTimeout(()=>{
            alert(text)
            callback();//ใช้เป็น Function callback ตามปกติเมื่อทำงาน alert เสร็จ
          },ms)
        }
        
        console.log(resultData);
        if (resultData == "true"){ //หลังจากรับ resultData จาก Server แล้วมีค่า text = true
          alert("Welcome to my website")
          function second(n:number){ //ต้องการกี่วินาที
            return n*1000 //1000 ms = 1 วินาที
          }
          function minite(n:number){ //ต้องการกี่นาที
            return n*60000 //60000 ms = 1 นาที
          }
          async function run() { //ใช้ async เพื่อเรียงลำดับการเรียกใช้งาน
            await route.navigate(['/home'])
            await wait("Back to login page in 5 second",100)
            await wait2("Time Out!!",second(5),()=>{
              route.navigate(['']);
            })
          }
          run()//เรียก function run มาใช้
        }else if (resultData == "false"){//หลังจากรับ resultData จาก Server แล้วมีค่า text = false
          alert("Password Wrong!!")
        }else if (resultData == "null"){
          alert("Please enter your password.")
        }else{
          alert("UserID Wrong!!")
        }
      })
    }
    ngOnInit():void{}
}
