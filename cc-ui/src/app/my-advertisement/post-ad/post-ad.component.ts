import { Component, OnInit,Input, Inject} from '@angular/core';
import { Select, initTE } from "tw-elements";
import { FormGroup } from '@angular/forms';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as XLSX from 'xlsx'
import { NavigationEnd, Router } from '@angular/router';

import { filter, map } from 'rxjs';
import { NumberSymbol } from '@angular/common';

import { SessionService } from 'src/app/session.service';
import { Advertisement, PostAdService } from './post-ad.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { ViewOtherAdsService } from 'src/app/view-other-ads/view-other-ads.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
export interface Containers {
  container_type_id: number;
  type: string;
  capacity: number;


}

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent implements OnInit{
  ContinueDraft:any;
  adId:any;
  contractForm!: FormGroup;
  description!: any;
  companyId: any;
  showModal=false;
  y:any=0;
  userId: any;
  ad_id:any;
  title!: any;
  port_name="";
  C_Type="";
  isLoading:any;
  ads: Advertisement[] = [];
  container_type_list:Containers[]=[];
  container_list:Containers[]=[];
  ExcelData:any;
  fileName?: string
  file?: File
  port_list:any;
  CType_list:any;
  statusMsg?:string
  showFile:boolean = false
  showform:boolean=true;
date_created:any;
type:any;
selectedContainer: {
  container_type_id: number;
  container_size_id: number;
} = { container_type_id: -1, container_size_id: -1 };
  from_date:any;
  expiry_date:any;
  type_of_ad:any;
  operation:any;
  container_type_id:any;
  container_type:any;
  price:any;
status:any;
quantity:any;
size:any;
port_id:any;
contents:any;
port_of_departure:any;
port_of_arrival:any;
free_days:any;
per_diem:any;
port_of_ad:any;
pickup_charges:any;
public isButtonDisabled: boolean = false;
Approve: any;



  constructor(@Inject(MAT_DIALOG_DATA)public data:any,private snackBar: MatSnackBar, private ref:MatDialogRef<PostAdComponent>,private postAdService: PostAdService,private router:Router,private sessionService: SessionService,private viewotherads:ViewOtherAdsService) {
  }

  addExcel(): void {

    if(this.y==1){
      this.postAdService.UploadExcelData(this.ExcelData,this.userId,this.companyId)
      .subscribe(
        response => {
          console.log('Excel data sent successfully:', response);
          this.y=0;
          window.location.reload()
        },
        error => {
          console.error('An error occurred while sending Excel data:', error);
        }
      );
    }
    else{
    alert("no suceed")
    }
}

OnSetY(){
this.y=1;
this.showModal=false;
console.log("this is excel d"+JSON.stringify(this.ExcelData))
this.addExcel();
}


onExcelRead(event: any) {
const file = event.target.files[0];
const fileType = file.type;
if (fileType !== "application/vnd.ms-excel" && fileType !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
alert("Please upload a valid Excel file");

return;
}

const fileReader = new FileReader();
fileReader.readAsBinaryString(file);
fileReader.onload = (e: ProgressEvent<FileReader>) => {
if (e.target && e.target.result) {
const binaryString = e.target.result;
    const workBook = XLSX.read(binaryString, { type: 'binary' });
    const sheetNames = workBook.SheetNames;
    if (sheetNames && sheetNames.length > 0) {
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
      this.ExcelData.forEach((row: any) => {
        const newRow: any = {};
        Object.keys(row).forEach((key: string) => {
          const newKey = key.toLowerCase().replace(/ /g, '_');
          const value = row[key].toString().toLowerCase();
          newRow[newKey] = value;
        });
        this.ExcelData[this.ExcelData.indexOf(row)] = newRow;
      });
      console.log("this is the list of excel"+this.ExcelData[0]);
    this.showModal=true;
    }
    else {

      alert("no sheets found")
      console.error('No sheets found in uploaded Excel file');
    }
        
} else {
alert("Uploaded file is empty");
console.error('Uploaded file is empty');
}
}
}

  

  ngOnInit(): void {
   
    this.isButtonDisabled = true;
   this.ContinueDraft=this.data.ContinueDraft; 
   this.Approve=this.data.Approve;
   this.adId=this.data.adId;
this.type=this.data.type;
   console.log(this.Approve+"fghjht");

   console.log("the adid for draft continue is"+this.adId);
   console.log("type is "+this.type)

    if(this.ContinueDraft==1)
    {
      this.postAdService.getAdById(this.adId).subscribe(
      (data: Advertisement[]) => {
        this.ads = data;
        console.log("this is view ads"+this.ads);
        this.quantity=this.ads[0].quantity;
        this.per_diem=this.ads[0].per_diem;
        this.pickup_charges=this.ads[0].ad_id;
        this.type_of_ad=this.ads[0].type_of_ad;
        this.container_type=this.ads[0].container_type;
        this.size=this.ads[0].container_size;
        this.price=this.ads[0].price;
        this.port_of_departure=this.ads[0].port_of_departure;
        this.from_date=this.getDateOnly(this.ads[0].from_date);
        this.port_id=this.ads[0].port_id;
        this.contents=this.ads[0].contents;
        this.port_of_departure=this.ads[0].port_of_departure;
        this.port_of_arrival=this.ads[0].port_of_arrival;
        this.free_days=this.ads[0].free_days;
        this.port_of_ad=this.ads[0].port_of_ad;
     
        this.expiry_date=this.getWeekDifference(this.ads[0].from_date,this.expiry_date);
       
      },
      (  error: any) => console.log(error)
      
    );
    }

    initTE({ Select });
    //get company id from session
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        console.log('company ID is :', companyId);
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );

    this.viewotherads.getAllContainers().subscribe(
      (condata: Containers[]) => {
        // Filter out duplicate values based on capacity
        const uniqueContainers = condata.filter((container, index, self) =>
          index === self.findIndex((c) => c.capacity === container.capacity)
        );
        const uniqueContainertypes = condata.filter((container, index, self) =>
        index === self.findIndex((c) => c.type === container.type)
      );
  
        this.container_list = uniqueContainers;
        this.container_type_list = uniqueContainertypes;
        console.log(JSON.stringify(this.container_list));
      }
    );
    //user id from session 
    this.sessionService.getUserId().subscribe(
      (userId: number) => {
        this.userId = userId;
        console.log('User ID is :', userId);
      },
      (error: any) => {
        console.error('Error retrieving user ID:', error);
      }
    );

    this.postAdService.getAllPorts().subscribe(
      (      data: any) => {
        this.port_list = data;
        console.log("Port list fetched: ", this.port_list); 
      },
      (      error: string) => {
        console.log("ports loading error:" +error);
      }
    );

    this.postAdService.getAllCTypes().subscribe(
      (      data: any) => {
       
        this.CType_list = data;
        console.log("c list fetched: ", this.CType_list); 
      },
      (      error: string) => {
        console.log("ports loading error:" +error);
      }
    );
  }
  

    async onChange($event: Event) {
      const target = $event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      this.file = file;
      this.title = file.name;
      this.fileName = file.name;
      this.showFile = !this.showFile;
      await setTimeout(() => {
        this.showFile = !this.showFile;
      }, 3000);
      const snackBarConfig: MatSnackBarConfig = {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['success-snackbar'],
      };
      const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(
        `${file.name} Successfully uploaded the file.`,
        'Close',
        snackBarConfig
      );
    }


  async Draft(){
  debugger
    this.operation="Draft";
    this.onPost();

  }
  async PostAd(){
    this.operation="PostAd";
    this.onPost();
    await setTimeout(() => {
      this.showFile = !this.showFile;
    }, 3000);
    const snackBarConfig: MatSnackBarConfig = {
      duration: 4000,
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    };
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(
      `Successfully Posted the Advertisement`,
      'Close',
      snackBarConfig
    );
  }

 getWeekDifference(from_date: Date, expiry_date: Date): number {
  const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
  const differenceInMilliseconds = expiry_date.getTime() - from_date.getTime();
  const differenceInWeeks = Math.floor(differenceInMilliseconds / millisecondsPerWeek);
  console.log("expiry date calculated is"+differenceInWeeks);
  return differenceInWeeks;
}
capitalizeFirstLetter(text: string): string {
  if (!text) return text;

  return text.charAt(0).toUpperCase() + text.slice(1);
}
  
  async onPost() {
    debugger
    this.isLoading=true;
  if(this.operation=="PostAd"){
    
    if (this.from_date && this.expiry_date && this.type_of_ad && this.price && this.file && this.container_type && this.size && this.type_of_ad) {

    debugger
      this.postAdService.uploadFile(this.file,this.from_date,this.expiry_date,this.type_of_ad,this.container_type,this.size,this.price,this.quantity,this.port_id, this.userId, this.companyId, this.contents,this.port_of_departure,this.port_of_arrival,this.free_days,this.per_diem,this.pickup_charges,this.operation,this.port_of_ad,this.type).subscribe((response: any) => {
     
        
        if (response.message === 'Success') {
          this.statusMsg = 'Success';
          setTimeout(()=> {this.statusMsg = ""},2000)
          this.clear()

          window.location.reload()
          this.isLoading=false;

        } else {
          this.statusMsg = 'Failed';
          console.log(response.status);
          this.isLoading=false;
        }
      });
    }
    else{
      alert("Please Fill the Mandatory Fields")
      this.isLoading=false;
    }
  }

  else{
    this.isLoading=true;
    if (this.container_type && this.file) {


      this.postAdService.uploadFile(this.file,this.from_date,this.expiry_date,this.type_of_ad,this.container_type,this.size,this.price,this.quantity,this.port_id, this.userId, this.companyId, this.contents,this.port_of_departure,this.port_of_arrival,this.free_days,this.per_diem,this.pickup_charges,this.operation,this.port_of_ad,this.type).subscribe((response: any) => {
    
      
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
     this.isLoading=false;
   }
   else{
     alert("Please Fill the Mandatory Fields")
     this.isLoading=false;
   }

  }
    
  }

  continueDraft(ad_id: number){
    this.operation="Draft";
 
    this.Edit(ad_id);
    console.log("ad id id "+ ad_id)
  }
  DraftPosting(ad_id: number){
    this.operation="PostAd";

    this.Edit(ad_id);
    console.log("ad id id "+ ad_id)
  }
  getDateOnly(date: Date): string {
    const newDate = new Date(date);
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
  
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear().toString().padStart(4, '0');
  
    this.from_date = `${year}-${month}-${day}`;
    console.log(this.from_date+"ordered date");
    return this.from_date;
  
  }
  
  
  
  
  approve(ad_id: number){
    debugger

    this.operation="Approve";
    this.Edit(ad_id);
    console.log("ad id id "+ ad_id)
  }

  Edit(ad_id: number){
    if(this.operation=="PostAd"){
      if (this.from_date && this.expiry_date && this.type_of_ad && this.price && this.file  && this.container_type_id && this.type_of_ad) 
      {

                  this.postAdService.updateAd(ad_id,this.file,this.from_date,this.expiry_date,this.type_of_ad,this.container_type,this.size,this.price,this.quantity,this.port_id, this.userId, this.companyId, this.contents,this.port_of_departure,this.port_of_arrival,this.free_days,this.per_diem,this.pickup_charges,this.operation,this.port_of_ad,this.type).subscribe((response: any) => {
                
                  
                  if (response.message === 'Success') {
                    this.statusMsg = 'Success';
                    setTimeout(()=> {this.statusMsg = ""},2000)
                    this.clear()
                    window.location.reload()
                  }
                   else {
                    this.statusMsg = 'Failed';
                    console.log(response.status) ;
                  }
                });
   }
   else{
     alert("Please Fill the Mandatory Fields")
     }

  }
  else{


    if (this.port_id && this.container_type_id && this.file) {
    

      this.postAdService.updateAd(ad_id,this.file,this.from_date,this.expiry_date,this.type_of_ad,this.container_type,this.size,this.price,this.quantity,this.port_id, this.userId, this.companyId, this.contents,this.port_of_departure,this.port_of_arrival,this.free_days,this.per_diem,this.pickup_charges,this.operation,this.port_of_ad,this.type).subscribe((response: any) => {
    
      
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
  }
  

  clear(){
    this.title= null
    this.description = null
  }
}
