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
import { PostAdService } from './post-ad.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';


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
  ExcelData:any;
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
public isButtonDisabled: boolean = false;
Approve: any;



  constructor(@Inject(MAT_DIALOG_DATA)public data:any, private ref:MatDialogRef<PostAdComponent>,private postAdService: PostAdService,private router:Router,private sessionService: SessionService) {
  }

  addExcel(): void {
debugger
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
          const value = row[key].toString().toLowerCase().replace(/ /g, '_');
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
   this.adId=this.adId;

   console.log(this.Approve+"fghjht");
   

    
// console.log("proceed value is "+this.adId)
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
    this.file = file
    this.title = file.name
    this.fileName = file.name
    this.showFile = !this.showFile;
    await  setTimeout(() => {this.showFile = !this.showFile}, 3000);
  }

  async Draft(){
  
    this.operation="Draft";
    this.onPost();

  }
  async PostAd(){
    this.operation="PostAd";
    this.onPost();
  }

  
  async onPost() {
  
  if(this.operation=="PostAd"){
    if (this.from_date && this.expiry_date && this.type_of_ad && this.price && this.file && this.port_id && this.container_type_id && this.type_of_ad) {

    
      this.postAdService.uploadFile(this.file,this.from_date,this.expiry_date,this.type_of_ad,this.container_type_id,this.price,this.quantity,this.port_id, this.userId, this.companyId, this.contents,this.port_of_departure,this.port_of_arrival,this.free_days,this.per_diem,this.pickup_charges,this.operation).subscribe((response: any) => {
     
      
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

  else{

    if (this.port_id && this.container_type_id && this.file) {


      this.postAdService.uploadFile(this.file,this.from_date,this.expiry_date,this.type_of_ad,this.container_type_id,this.price,this.quantity,this.port_id, this.userId, this.companyId, this.contents,this.port_of_departure,this.port_of_arrival,this.free_days,this.per_diem,this.pickup_charges,this.operation).subscribe((response: any) => {
    
      
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

  continueDraft(ad_id: number){
    this.operation="Draft";
 
    this.Edit(ad_id);
    console.log("ad id id "+ ad_id)
  }
  DraftPosting(ad_id: number){
    this.operation="Pending";

    this.Edit(ad_id);
    console.log("ad id id "+ ad_id)
  }

  
  approve(ad_id: number){
    debugger

    this.operation="Approve";
    this.Edit(ad_id);
    console.log("ad id id "+ ad_id)
  }

  Edit(ad_id: number){
    if (this.port_id && this.container_type_id && this.file) {
    

      this.postAdService.updateAd(ad_id,this.file,this.from_date,this.expiry_date,this.type_of_ad,this.container_type_id,this.price,this.quantity,this.port_id, this.userId, this.companyId, this.contents,this.port_of_departure,this.port_of_arrival,this.free_days,this.per_diem,this.pickup_charges,this.operation).subscribe((response: any) => {
    
      
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

  
  options = ['Buy', 'Lease', 'Sell','Swap'];
 
   selectedOption = 0;
   selectOption(index: number) {
   this.selectedOption = index;
   this.type_of_ad = this.options[index];
   
}
  clear(){
    this.title= null
    this.description = null
  }
}






