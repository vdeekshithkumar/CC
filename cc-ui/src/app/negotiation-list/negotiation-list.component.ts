import { Component,Inject } from '@angular/core';


import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../session.service';
import { NegotiationListService } from './negotiation-list.service';


export interface Negotiation{
  negotiation_id: number;
  user_id:number;
  ad_id:number;
  price:number;
  negotiation_type:string;
  container_type:string;
  quantity: number;
  status: string;
  company_id:number;
  contract_id:any;
  date_created:Date;
  expiry_date:Date;
  updated_by:number;
}


@Component({
  selector: 'app-negotiation-list',
  templateUrl: './negotiation-list.component.html',
  styleUrls: ['./negotiation-list.component.css']
})
export class NegotiationListComponent{
  public isButtonDisabled: boolean = false;
  companyId: any;
  itemsPerPage: number = 5;
currentPage: number = 1;
userId: any;
adId:any;
testpassing:any;
  companyName: any;
  PList: any[] = [];
  negotiations: Negotiation[] = []
    

  date_created: any;
  elementRef: any;

  
constructor(@Inject(MAT_DIALOG_DATA)public data:any,private dialog:MatDialog, private route: ActivatedRoute,private sessionService: SessionService,private formBuilder: FormBuilder,private router:Router,private negotiationservice: NegotiationListService){
}

ngOnInit(): void {
console.log("data passed adid is"+this.data.ad_id);
console.log("data passed adid is"+this.data.testpassing);
  this.viewNegotiations(this.data.ad_id);

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

/////permission for negotiation

this.negotiationservice.getPermissions(this.userId).subscribe(
  (permissions: any[]) => {
    this.PList = permissions;
    this.isButtonDisabled = !this.PList.includes(2);

  
  },
  (error: any) => {
    console.log(error);
    alert("error")
  }
);
}


    
onCancel() {
    
  window.location.reload()
}


get totalPages(): number {
  return Math.ceil(this.negotiations.length / 5);
}
prevPage() {

  if (this.currentPage > 1) {
    this.currentPage--;
  }
  
   }
   nextPage() {
    if (this.currentPage < Math.ceil(this.negotiations.length / this.itemsPerPage)) {
      this.currentPage++;
    }
  
   }
   backPage(){
    this.router.navigate(['forecast-map']);
   }



viewNegotiations(ad_id:number){

this.negotiationservice.getNegotiationsById(ad_id).subscribe(
  (data: Negotiation[]) => {
    this.negotiations = data;
   
    console.log("this is view nego"+this.negotiations);
  },
  (  error: any) => console.log(error)
);
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
  this.date_created=dateString.toString().slice(0, 10);
  return this.date_created;
}

deleteNegotiation(negotiation_id: number) {
  this.negotiationservice.deleteNegotiation(negotiation_id)
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

AcceptNegotiation(negotiation_id: number) {
  this.negotiationservice.AcceptNegotiation(negotiation_id)
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





  


   
  

  
    




