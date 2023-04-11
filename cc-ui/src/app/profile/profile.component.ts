import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { NavigationEnd, Router } from '@angular/router';
import { SignInService } from '../sign-in/sign-in.service';
import { filter } from 'rxjs';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit{
  company_id?: number;
  name?:string;
 domain_address?:string;
 licence_id?:number;
      rating?:number;
      address?:string;
      // company_logo?:string
      company_location?:string
      country?:string
      
  company_list :any;
  showDiv = false;
   currentUser: any;
   profileForm!:FormGroup;
   
  constructor(private sessionService: SessionService,private formBuilder: FormBuilder,private router:Router,private profileService:ProfileService,private signInService: SignInService) { }


  ngOnInit():void{

    this.profileService.getCompanyById(1).subscribe(
      data => {
          // Handle the data returned by the HTTP GET request
          // this.company_id=data.company_id,
          this.name=data.name,
          this.licence_id=data.licence_id,
          this.domain_address=data.domain_address,
          
          // this.company_logo=data.company_logo,
          this.company_location=data.company_location,
      this.country=data.country,
          this.rating=data.rating,
          this.address=data.address
      },
      error => {
          // Handle any errors that occur
          console.warn("oninit error"+error);
      }
  );

        this.sessionService.getCurrentUser().subscribe(user => {
      // if (user.id==null && user.token==null) {  // use this once token is used for a user
  if (user.user_id==null) {
    // if user session is null, redirect to login page
    this.router.navigate(['/sign-in']);
  }
  else{
    this.currentUser = user;
  console.log('From session '+this.currentUser.email+'  id here '+this.currentUser.user_id)

  }
  // store the user session information in a property
  
});
 //when navigate back to sign-in session ends
 this.router.events.pipe(
  filter(event => event instanceof NavigationEnd && event.url === '/sign-in')
).subscribe(() => {
  this.sessionService.clearSession();
});
  }
  logout(): void {
    // clear session data and redirect to login page
    this.sessionService.clearSession();
  }
  onSubmit (){
    (company_id:number)=>{
       // this.profileService.subscribe(data=>{
       //   this.profileForm.patchValue(data);
       // })
     }
}
 
}

  
  
    