
import { MyAdService } from './my-ad.service';

import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../session.service';
import { PostAdComponent } from './post-ad/post-ad.component';
import * as moment from 'moment';
import * as XLSX from 'xlsx';




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
  

  Approve:any;

  contractForm!: FormGroup;
  description!: any;
  companyId: any;
  
  userId: any;
ActiveadsCount:any;
DraftadsCount:any;
PendingadsCount:any;
  title!: any;
  port_name="";
  C_Type="";
explist:any;
approvalLink:any;
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
i:any;
pendingActive:any;
draftActive:any;
port_id:any;
contents:any;
port_of_departure:any;
port_of_arrival:any;
free_days:any;
per_diem:any;
pickup_charges:any;
 ContinueDraft:any;

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
   Eads: Advertisement[] = [];

   advertisements: any;
   http: any;
  Active: any;
  negotiationcount: any;
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

  constructor(private dialog:MatDialog, private route: ActivatedRoute,private sessionService: SessionService,private formBuilder: FormBuilder,private router:Router,private myadservice: MyAdService){
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const value = params['value'];
      this.approvalLink=value;
    });
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
    
    if(this.approvalLink==1){
      this.onPendingActive();
    }
    else{
      this.onViewActive();
    }
 
     
   }
   
     
  onCancel() {
    
    window.location.reload()
}
  
//   async onEdit(){
//     debugger;
 
public getNegotiationCount(adId:number):number {
  this.myadservice.getNegotiationCount(adId).subscribe(
   data => {
     this.negotiationcount = data;

   },
   error => {
    this.negotiationcount=error;
   }
 );
 return this.negotiationcount;
}
  

   DisplayPostForm(){
    
    // this.ContinueDraft=0;
    this.dialog.open(PostAdComponent,{
      width:'70%',
      height:'500px',
      data:{
        ContinueDraft:0,
      Approve:0
      }
      

    })
   
   }
   DisplayDraftForm(adId: number){
    this.dialog.open(PostAdComponent,{
      width:'70%',
      height:'500px',
      data:{
        ContinueDraft:1 ,  

        adId:adId
      }
    
      
      

    })

  
    console.log("ad id from funcion is"+adId);


   }
  //  DisplayApproveForm(adId: number){

  //   debugger
  //   this.dialog.open(PostAdComponent,{
  //     width:'70%',
  //     height:'500px',
  //     data:{
    
  //       Approve:1,
  //       adId:adId
  //     }
      
      
      

  //   })
  //   this.Edit(adId);

  //  }
  ApproveAd(ad_id:number){
    
    this.myadservice.updateAdStatus(ad_id).subscribe(() => {
      console.log('Ad status updated successfully');
      this.onPendingActive();
      
    });
  }
   approve(ad_id: number){

    this.operation="Approve";
    this.ApproveAd(ad_id);
    console.log("ad id id "+ ad_id)
  }
  getDateOnly(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    const timestamp = newDate.getTime();
    const dateOnly=new Date(timestamp);
    const dateString = dateOnly.toLocaleDateString('en-GB');
    this.expiry_date=dateString.toString().slice(0, 10);
    return this.expiry_date;
  }
  
  //for draft
  // Edit(ad_id: number){
  //   if (this.port_id && this.container_type_id && this.file) {
    

  //     this.myadservice.updateAd(ad_id,this.file,this.from_date,this.expiry_date,this.type_of_ad,this.container_type_id,this.price,this.quantity,this.port_id, this.userId, this.companyId, this.contents,this.port_of_departure,this.port_of_arrival,this.free_days,this.per_diem,this.pickup_charges,this.operation).subscribe((response: any) => {
    
      
  //      if (response.message === 'Success') {
  //        this.statusMsg = 'Success';
  //        setTimeout(()=> {this.statusMsg = ""},2000)
  //        this.clear()
  //        window.location.reload()
  //      } else {
  //        this.statusMsg = 'Failed';
  //        console.log(response.status) ;
  //      }
  //    });
  //  }
  //  else{
  //    alert("Please Fill the Mandatory Fields")
  //  }

  // }
  


viewAds(){

this.myadservice.getAdsById(this.companyId, this.operation).subscribe(
  (data: Advertisement[]) => {
    this.ads = data;
    if(this.operation=='Active'){
      this.ActiveadsCount=this.ads.length;
    }
    else if(this.operation=='Pending'){
      this.PendingadsCount=this.ads.length;
    }
    else{
      this.DraftadsCount=this.ads.length;
    }
    

   
    console.log("this is view ads"+this.ads);
  },
  error => console.log(error)
);
}



onViewActive(){
this.Active=true;
this.pendingActive = false;
this.draftActive = false;
this.operation = 'Active';
this.viewAds();
}

onPendingActive(){
this.pendingActive = true;
this.Active=false;
this.draftActive = false;
this.operation = 'Pending';
this.viewAds();
}
onDraftsActive(){
  this.pendingActive = false;
this.draftActive = true;
this.Active=false;
this.operation = 'Draft';
this.viewAds();
}

  
   onExport(){
const worksheetName = 'Advertisements';
      const excelFileName = 'advertisements.xlsx';
      const header = ['Date created','From date','Expiry date','Type of Ad','Container type id','Price', 'Status','Quantity','Port id','Contents','Port of Departure','Port of arrival','Free days','Per diem','Pickup Charges'];
      const data = this.Eads.map((ad) => [ad.date_created,ad.from_date,ad.expiry_date,ad.type_of_ad,ad.container_type_id,ad.price,ad.status,ad.quantity,ad.port_id,ad.contents,ad.port_of_departure,ad.port_of_arrival,ad.free_days,ad.per_diem,ad.pickup_charges]);
    
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet([header, ...data]);
    
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
      XLSX.writeFile(workbook, excelFileName);
   }


    onExportClick(): void {
       this.operation = 'Active';
      this.myadservice.getAdsById(this.companyId, this.operation).subscribe(
        (data: Advertisement[]) => {
          this.Eads = data;
          console.log(" this is e data"+ this.Eads);
          this.onExport();
        },
        error => console.log(error)
      );

      
    }
  
  clear(){
    this.title= null
    this.description = null
  }

  deleteAd(id: number) {
    debugger
    this.myadservice.deleteAd(id)
      .subscribe(
        (        data: any) => {
          console.log(data);
           this.router.navigateByUrl('/my-ad', { skipLocationChange: true });
          this.router.navigate(['/my-ad']);
           window.location.reload()
          // this.getAllInventory()
        },
        (        error: any) => console.log(error));
  }
}
/////////////////////////////////////////////




  


   
  

  
    
