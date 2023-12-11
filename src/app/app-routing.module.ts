import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginwindowComponent } from './loginwindow/loginwindow.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', component: LoginwindowComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
 

}
