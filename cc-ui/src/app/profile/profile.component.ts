import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { NavigationEnd, Router,ActivatedRoute } from '@angular/router';
import { SignInService } from '../sign-in/sign-in.service';
import { filter } from 'rxjs';
import { SessionService } from '../session.service';
import { findIndex } from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public company_id?: number;
  usercount_list=null;
  public name?: string;
  domain_address?: string;
  licence_id?: number;
  rating?: number;
  address?: string;
  company_logo?: string
  company_location?: string
  country?: string
  alluser_list:any;
  searchTerm:any;
  company_list: any;
  currentUser: any;
  profileForm!: FormGroup;
  user_id:any;
  public showDiv = false;
  user_data:any;
  fname?: string
  lname?: string
  email?: string
  phone?: string
  companyId: any;
  userId:any;
  adscount: any;
  getCompanyId() {
    return this.company_id;
  }
  constructor(private sessionService: SessionService, private router: Router, private profileService: ProfileService,private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.sessionService.getUserId().subscribe(
        (userId: number) => {
        this.userId = userId;
         console.log('User ID is :', userId);
         },
         (error: any) => {
         console.error('Error retrieving user ID:', error);
        }
         );
         if (this.activatedRoute != null) {
          // Access the route parameters using the params property of the activatedRoute object
          const id = this.activatedRoute.snapshot.params['id'];
          console.log('ID:', id);
        }

        if (this.activatedRoute != null) {
          const id = this.activatedRoute.snapshot.params['id'];
          console.log('ID:', id);
        }

       
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
    this.profileService.getAdsCount(this.companyId).subscribe(
      (count: any[]) => {
        this.adscount = count;
      
        console.log("count is are "+this.adscount);
      
      },
      (error: any) => {
        console.log(error);
        alert("error")
      }
    );

    console.log('company ID is :', companyId);

   },

   (error: any) => {

    console.error('Error retrieving company ID:', error);

   }

  );

  this.profileService.getallUser(this.companyId).subscribe(
    data => {
      this.alluser_list = data;
      console.log("employee list fetched: ", this.alluser_list); 
     
    },
    error => {
      console.log("employee loading error:" +error);
    }
  );
  
  this.profileService.getallUserCount(this.companyId).subscribe(
    data => {
      this.usercount_list = data;
     
      console.log("employee Count: ", this.usercount_list); 
      
    },
    error => {
      console.log("employee loading error:" +error);
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
  getUserByID(user_id: number) {
    this.profileService.getUserDetails(user_id).subscribe(
      (data: any) => {
        this.user_data = data;
        console.log("User data fetched:", this.user_data);
  
        // Navigate to the add-employee page with user_id and edit flag in the state
        this.router.navigate(['/add-employee'], {
          state: {
            user_id: user_id,
            fname: this.user_data.fname,
            lname: this.user_data.lname,
            phone_no: this.user_data.phone_no,
            email: this.user_data.email,
            address: this.user_data.address,
            password: this.user_data.password,
            is_verified: this.user_data.is_verified,
            is_approved: this.user_data.is_approved,
            is_active: this.user_data.is_active,
            last_login: this.user_data.last_login,
            designation: this.user_data.designation,
            edit: true
          }
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  deleteUserById(userId: number) {
    this.profileService.deleteUserById(userId).subscribe(
      () => {
        console.log("Employee deleted successfully.");
  
        // Update the is_active property of the user being deleted
        const deletedUser = this.alluser_list.find((user: any) => user.user_id === userId);
        if (deletedUser) {
          deletedUser.is_active = 0;
        }
  
        // Remove the deleted user from the alluser_list array
        const index = this.alluser_list.findIndex((user: any) => user.user_id === userId);
        if (index !== -1) {
          this.alluser_list.splice(index, 1);
        }
  
        // Check if alluser_list is empty and reset it if necessary
        if (this.alluser_list.length === 0) {
          this.alluser_list = null; // or this.alluser_list = [];
        }
      },
      (error: any) => console.log(error)
    );
  }
  
  
  removeDeletedEmployeeFromFrontend(id: number) {
    const index = findIndex(this.alluser_list, { id: id });
    if (index !== -1) {
      this.alluser_list.splice(index, 1);
    }
  }
  
  onClick() {
    this.router.navigate(['/my-ad'], { queryParams: { value: 1 } });
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