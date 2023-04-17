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
export class ProfileComponent implements OnInit {
  public company_id?: number;
  public name?: string;
  domain_address?: string;
  licence_id?: number;
  rating?: number;
  address?: string;
  company_logo?: string
  company_location?: string
  country?: string

  company_list: any;
  showDiv = false;
  currentUser: any;
  profileForm!: FormGroup;

  fname?: string
  lname?: string
  email?: string
  phone?: string
  companyId: any;
  getCompanyId() {
    return this.company_id;
  }


  constructor(private sessionService: SessionService, private router: Router, private profileService: ProfileService) { }


  ngOnInit(): void {

    this.sessionService.getCurrentUser().subscribe(user => {
      // if (user.id==null && user.token==null) {  // use this once token is used for a user
      if (user.user_id == null) {
        // if user session is null, redirect to login page
        this.router.navigate(['/sign-in']);
      }
      else {
        this.currentUser = user;
        console.log('From session ' + this.currentUser.email + '  id here ' + this.currentUser.user_id)
      }
      // store the user session information in a property

    });


    this.sessionService.getCompanyId().subscribe(

      (companyId: number) => {

        this.companyId = companyId;

        console.log('company ID is :', companyId);

      },

      (error: any) => {

        console.error('Error retrieving company ID:', error);

      }

    );

    this.profileService.getCompanyById(this.companyId).subscribe(

       data => {

          // Handle the data returned by the HTTP GET request

          this.company_id=data.company_id,

          this.name=data.name,

          this.licence_id=data.licence_id,

          this.domain_address=data.domain_address,

          this.company_logo=data.company_logo,

          this.company_location=data.company_location,

          this.country=data.country,

          this.rating=data.rating,

          this.address=data.address

          console.log(data)

      },

      error => {

          // Handle any errors that occur

          console.warn("oninit error"+error);

      }
);
    this.profileService.getUserDetails(this.currentUser.user_id).subscribe(
      data => {
        debugger
        // Handle the data returned by the HTTP GET request
        this.fname = data.fname
        this.lname = data.lname
        this.email = data.email
        this.company_id = data.company_id
        this.phone = data.phone_no
      },
      error => {
        // Handle any errors that occur
        console.warn("oninit error" + error);
      }
    );
   

    
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
  onSubmit() {
    (company_id: number) => {
      // this.profileService.subscribe(data=>{
      //   this.profileForm.patchValue(data);
      // })
    }
  }

   
  

}