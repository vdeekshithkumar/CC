import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { NavigationEnd, Router,ActivatedRoute } from '@angular/router';
import { SignInService } from '../sign-in/sign-in.service';
import { filter } from 'rxjs';
import { SessionService } from '../session.service';
import { findIndex } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { PostAdComponent } from '../my-advertisement/post-ad/post-ad.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { RegisterComponent } from '../home-template/register/register.component';
import { MyAdService } from '../my-advertisement/my-ad.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../app.component.css']
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
  filteredUsers: any;
  alluser_list: any;
  searchTerm: string = '';
  showDropdown: boolean = false;
  company_list: any;
  currentUser: any;
  profileForm!: FormGroup;
  user_id:any;
  public showDiv = false;
  user_data:any;
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  companyId: any;
  userId:any;
  UserPList: any[]=[];
  adscount: any;
  approvedadscount:any;
  //for the employees table 
  currentPage = 1;
  itemsPerPage = 4;
  paginatedUsers: any[] = []; 
  userDesignation: any;
  
  isAddUserDisabled: boolean= false;
  isAddInventoryDisabled:boolean = false;
  isUploadcontractsDisabled:boolean = false;
  isEditcompanyDisabled:boolean = false;
  isEditEmployeeDisabled: boolean = false;
  isDeleteEmployeeDisabled: boolean=false;
  //for pagination
  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }
 
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
    
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  getCompanyId() {
    return this.company_id;
  }
  constructor(private dialog:MatDialog,private sessionService: SessionService, private router: Router, private profileService: ProfileService,private activatedRoute: ActivatedRoute,private myadservice:MyAdService) { }
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
      
        console.log("count is are "+this.adscount[1]);
      
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
  debugger

  this.profileService.getallUser(this.companyId).subscribe(
    data => {
      this.alluser_list = data;
 
      this.filterUsers();
      console.log("employee list fetched: ", this.alluser_list);
    },
    error => {
      console.log("employee loading error:" + error);
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
        this.first_name = data.first_name
        console.log(this.first_name)
        this.last_name = data.last_name
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
    this.sessionService.getUserDesignation().subscribe(
      (userDesignation: string) => {
        this.userDesignation = userDesignation;
        console.log('User des is :', this.userDesignation);
      },
      (error: any) => {
        console.error('Error retrieving user des:', error);
      }
    );
    this.myadservice.getPermissions(this.userId).subscribe(
      (permissions: any[]) => {
        this.UserPList = permissions;
        this.isAddUserDisabled = !(this.UserPList.includes(10) || this.userDesignation ==='admin');
        this.isAddInventoryDisabled = !(this.UserPList.includes(16) || this.userDesignation ==='admin');
        this.isUploadcontractsDisabled =!(this.UserPList.includes(18) || this.userDesignation ==='admin');
        this.isEditcompanyDisabled =!(this.UserPList.includes(18) || this.userDesignation ==='admin');
        this.isEditEmployeeDisabled = !(this.UserPList.includes(14) || this.userDesignation ==='admin');
        this.isDeleteEmployeeDisabled = !(this.UserPList.includes(12) || this.userDesignation ==='admin');
       console.log("User permissions",this.UserPList);
      },
      (error: any) => {
        console.log(error);
        alert("error")
      }
    );
   
  }
  DisplayPostForm(){
    this.dialog.open(AddEmployeeComponent,{
         data:{
          isEdit:false,
        ContinueDraft:0,
        Approve:0
      }
    })
   }
  
   getUserByID(user_id: number) {
    debugger
    this.profileService.getUserDetails(user_id).subscribe(
      (data: any) => {
        this.user_data = data;
        console.log("User data fetched:", this.user_data);
  
        const dialogRef = this.dialog.open(AddEmployeeComponent, {
          data: {
            user_id: user_id,
            isEdit:true,
            user_data: this.user_data, // Pass the user_data object
          
          }
        });
  console.log("from profile to add employee"+this.first_name);
        dialogRef.afterClosed().subscribe(result => {
          // Handle the dialog close event if needed
          console.log("Dialog closed with result:", result);
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  filterUsers() {
    if (!this.searchTerm) {
      // If search term is empty, show all users
      this.filteredUsers = this.alluser_list;
    } else {
      // Filter users based on search term
      const filteredArray = this.alluser_list.filter((user: any) =>
        (user.first_name.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (user.last_name.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );

      // Update the filteredUsers array with the filtered results
      this.filteredUsers = filteredArray;
    }

    // Reset current page to 1 when filtering
    this.currentPage = 1;

    // Apply pagination on the filtered array
    this.paginateUsers();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.paginateUsers();
  }

  paginateUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }
  
 
  
  deleteUserById(userId: number) {
    debugger
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
  clearSearch() {
    this.searchTerm = '';
  }
  hideClearButton() {
    const clearButton = document.getElementById("clearButton");
    if (clearButton) {
      clearButton.style.display = "none";
    }
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
    
  showClearButton() {
    const clearButton = document.getElementById("clearButton");
    if (clearButton) {
      clearButton.style.display = "inline-block";
    }
  }
  onSubmit() {
    (company_id: number) => {
      // this.profileService.subscribe(data=>{
      //   this.profileForm.patchValue(data);
      // })
    }
  }



  

  capitalizeFirstLetter(text: string): string {
    if (!text) return text;
  
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  

}
