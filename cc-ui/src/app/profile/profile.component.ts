import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { NavigationEnd, Router,ActivatedRoute } from '@angular/router';
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
  getUserByID(user_id:number) {

    this.profileService.getUserDetails(user_id)
    .subscribe(
      (           data:any)=> {debugger
        this.user_data = data;
        console.log("User data fetcged"+this.user_data);
        
       
      },
      (          error:any) => console.log(error)
    );
    this.router.navigate(['/add-employee'], { queryParams: { edit: true } });
  }
  deleteUserById(id: number) {
  
    this.profileService.deleteUserById(id)
      .subscribe(
        (        data: any) => {
          console.log(data);
           this.router.navigateByUrl('/profile', { skipLocationChange: true });
          this.router.navigate(['/profile']);
           window.location.reload()
          // this.getAllInventory()
        },
        (        error: any) => console.log(error));
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