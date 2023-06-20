import { MyAdService } from './my-ad.service';

import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../session.service';
import { PostAdComponent } from './post-ad/post-ad.component';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { NegotiationListComponent } from '../negotiation-list/negotiation-list.component';

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
  itemsPerPage: number = 6;
currentPage: number = 1;

  userId: any;
ActiveadsCount:any;
DraftadsCount:any;
PendingadsCount:any;
  title!: any;
  port_name="";
  C_Type="";

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
 contracts: any;
 adId:any;

 negotiationCounts: { [adId: number]: number } = {}; 
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
  CurrentPageBtn: number=1;
  adscount: any[] = [];
  x: any;
  PList: any[]=[];
  userDesignation: any;

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

  
     
     this.myadservice.getAdsCount(this.companyId).subscribe(
      (count: any[]) => {
        this.adscount = count;
      
        console.log("count is are "+this.adscount);
      
      },
      (error: any) => {
        console.log(error);
        alert("error")
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
    /// for permission
    this.sessionService.getUserDesignation().subscribe(
      (userDesignation: string) => {
        this.userDesignation = userDesignation;
        console.log('User ID is :', userDesignation);
      },
      (error: any) => {
        console.error('Error retrieving user des:', error);
      }
    );

    
    this.myadservice.getPermissions(this.userId).subscribe(
      (permissions: any[]) => {
        this.PList = permissions;
        this.isButtonDisabled = !(this.PList.includes(2) || this.userDesignation ==='admin');
        
        console.log("permissions are//////////////////////// "+this.PList);
      
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
 

AdsCount(){
  this.myadservice.getAdsCount(this.companyId).subscribe(
    (count: any[]) => {
      this.adscount = count;
    
      console.log("count is are "+this.adscount);
    
    },
    (error: any) => {
      console.log(error);
      alert("error")
    }
  );
}

   DisplayPostForm(){
    
    // this.ContinueDraft=0;
    this.dialog.open(PostAdComponent,{
     
      
  
      data:{
        ContinueDraft:0,
        Approve:0
      }
      

    })
   
   }
   DisplayDraftForm(adId: number){
    this.dialog.open(PostAdComponent,{
    
      data:{
        ContinueDraft:1 ,  
        adId:adId
      }
    

    })

  
    console.log("ad id from funcion is"+adId);


   }


   get totalPages(): number {
    return Math.ceil(this.ads.length / 6);
  }
  prevPage() {

    if (this.currentPage > 1) {
      this.currentPage--;
    }
    
     }
     nextPage() {
      if (this.currentPage < Math.ceil(this.ads.length / this.itemsPerPage)) {
        this.currentPage++;
      }
    
     }
     backPage(){
      this.router.navigate(['forecast-map']);
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
      this.AdsCount();
      this.onPendingActive();
      // this.onPendingActive();
      
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
  // Object to store negotiation counts

  getNegotiationCount(adId: number): number {
   
    if (this.negotiationCounts.hasOwnProperty(adId)) {
      // If the count for this adId has already been fetched, use the stored value
      this.negotiationcount = this.negotiationCounts[adId];
      return this.negotiationcount;
    } else {
      // Fetch the count asynchronously
      this.myadservice.getNegotiationCount(adId).subscribe(
        data => {
          this.negotiationCounts[adId] = data; // Store the count for this adId
          console.log("The count of negotiations for adId " + adId + " is " + data);
          this.negotiationcount = data; 
          if(this.negotiationcount>0){
            this.x=1;
            return this.negotiationcount;
          }
          else{
            this.x=0;

          }
          // Update the negotiationCount variable
        },
        error => {
          console.log(error);
          return 0;
        }
      );
    }
    return this.negotiationcount;
  }
  

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
this.currentPage=1;
this.viewAds();

}

onPendingActive(){
this.pendingActive = true;
this.Active=false;
this.draftActive = false;
this.operation = 'Pending';
this.currentPage=1;
this.viewAds();
}

onDraftsActive()
{

this.pendingActive = false;
this.draftActive = true;
this.Active=false;
this.operation = 'Draft';
this.currentPage=1;
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

   OpenNegotiations(ad_id: number) {
    this.dialog.open(NegotiationListComponent, {
      width: '70%',
    
      data: {
        ad_id: ad_id,
        testpassing:3443,
      }
    });
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
    this.myadservice.deleteAd(id)
      .subscribe(
        (        data: any) => {
          console.log(data);
          if(this.operation === 'Draft')
          {
            this.AdsCount();
            this.onDraftsActive();
          }
          else if(this.operation === 'Pending')
          {
            this.AdsCount();
            this.onPendingActive();
          }
          else{
            this.AdsCount();
            this.onViewActive();
          }
         
        },
        (        error: any) => console.log(error));
  }
}
/////////////////////////////////////////////




  


   
  

  
    