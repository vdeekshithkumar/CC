import { Component } from '@angular/core';
import { MyAdService } from './my-ad.service';


import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../session.service';



export interface Advertisement {
  ad_id: number;
  date_created: Date;
  from_date: Date;
  expiry_date: Date;
  type_of_ad: string;
  container_type_id: number;
  price: number;
  status: string;
  quantity: number;
  port_id: number;
  company_id: number;
  posted_by: number;
  contents: string;
  file: string;
  port_of_departure: string;
  port_of_arrival: string;
  free_days: number;
  per_diem: number;
  pickup_charges: number;
}

@Component({
  selector: 'app-my-advertisement',
  templateUrl: './my-advertisement.component.html',
  styleUrls: ['./my-advertisement.component.css']
})
export class MyAdvertisementComponent {
  

  
  contractForm!: FormGroup;
  description!: any;
  companyId: any;
  
  userId: any;

  title!: any;
  port_name="";
  C_Type="";

  fileName?: string
  file?: File
  port_list:any;
  CType_list:any;
  statusMsg?:string
  showFile:boolean = false
  showform:boolean=true;
date_created:any;
  from_date:any;
  expiry_date:any;
  type_of_ad:any;
  operation:any;
  container_type_id:any;
  price:any;
status:any;
quantity:any;
port_id:any;
contents:any;
port_of_departure:any;
port_of_arrival:any;
free_days:any;
per_diem:any;
pickup_charges:any;
 ContinueDraft:any;
 Approve:any;
 adId:any;

 time:number = 10;
 alluser_list:any;
   public company_id?: number;
   public ad_id?: number;
   public name?: string;
   domain_address?: string;
   licence_id?: number;
   rating?: number;
   address?: string;
   fname?: string
  //  company_logo?: string
   company_location?: string
   country?: string
   
     profileForm!: FormGroup;
     activeAdsClicked = false;
     pendingAdsClicked = false;
   ads: Advertisement[] = [];

   advertisements: any;
   http: any;
  getCompanyId() {
     return this.company_id;
   }
 

  companyName:any;
  company_logo:any;
  currentUser: any;
  licenceId:any;
  showDiv = false;
  data: any;
  public isButtonDisabled: boolean = false;

  PList: any[] = [];

  constructor(private sessionService: SessionService,private formBuilder: FormBuilder,private router:Router,private myadservice: MyAdService){
  }

  
  ngOnInit(): void {
   
   
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        this.companyName=this.companyName;
        console.log('company ID is :', companyId);
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );
    this.sessionService.getUserId().subscribe(
      (userId: number) => {
        this.userId = userId;
        console.log('User ID is :', userId);
      },
      (error: any) => {
        console.error('Error retrieving user ID:', error);
      }
    );
    
    this.myadservice.getPermissions(this.userId).subscribe(
      (permissions: any[]) => {
        this.PList = permissions;
        this.isButtonDisabled = !this.PList.includes(2);
        console.log("permissions are "+this.PList);
      
      },
      (error: any) => {
        console.log(error);
        alert("error")
      }
    );

    this.myadservice.getCompanyById(this.companyId).subscribe(
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
  
     
   }
   
     
  onCancel() {
    // this.editprofileForm.reset()
    window.location.reload()
}
  
//   async onEdit(){
//     debugger;
 
    
  
//     const response = await this.myadservice.updatecompany(this.companyId,this.myadForm.value).toPromise();
//     console.log('edit'+response)
//     await this.router.navigateByUrl('profile',{skipLocationChange:true});
//     await this.router.navigate(['profile']);
//     await window.location.reload();
//  }

   DisplayPostForm(){
    this.showDiv = !this.showDiv;
    this.ContinueDraft=0;
   }
   DisplayDraftForm(adId: number){
    this.showDiv = !this.showDiv;
    this.ContinueDraft=1;
    this.adId=adId;

   }
   DisplayApproveForm(adId: number){
    this.showDiv = !this.showDiv;
    this.Approve=1;
    this.adId=adId;

   }

  


  
  


viewAds(){
  debugger
this.myadservice.getAdsById(this.companyId, this.operation).subscribe(
  (data: Advertisement[]) => {
    this.ads = data;
    console.log(this.ads); // for testing purposes only
  },
  error => console.log(error)
);
}
onViewActive(){
this.operation = 'Active';
this.viewAds();
}
onPendingActive(){
this.operation = 'Pending';
this.viewAds();
}
onDraftsActive(){
this.operation = 'Drafts';
this.viewAds();
}

























   edit(adId: number){
    this.adId=adId;
    if (this.port_id && this.container_type_id && this.file) {


      this.myadservice.updateAd(adId,this.file,this.from_date,this.expiry_date,this.type_of_ad,this.container_type_id,this.price,this.quantity,this.port_id, this.userId, this.companyId, this.contents,this.port_of_departure,this.port_of_arrival,this.free_days,this.per_diem,this.pickup_charges,this.operation).subscribe((response: any) => {
    
      
       if (response.message === 'Success') {
         this.statusMsg = 'Success';
         setTimeout(()=> {this.statusMsg = ""},2000)
         this.clear()
         window.location.reload()
       } else {
         this.statusMsg = 'Failed';
         console.log(response.status) ;
       }
     });
   }
   else{
     alert("Please Fill the Mandatory Fields")
   }

   }
  onExportClick() {

    console.log("Button clicked");
    alert("button clicked")
  }
  clear(){
    this.title= null
    this.description = null
  }
}
/////////////////////////////////////////////




  


   
  

  
    
