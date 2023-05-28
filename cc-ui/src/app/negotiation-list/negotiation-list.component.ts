import { Component } from '@angular/core';


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
export class NegotiationListComponent {
  public isButtonDisabled: boolean = false;
  companyId: any;
  itemsPerPage: number = 6;
currentPage: number = 1;
userId: any;
adId:any;
testpassing:any;
  companyName: any;
  PList: any[] = [];
  negotiations: Negotiation[] = [
    {
      negotiation_id: 1,
      user_id: 101,
      ad_id: 201,
      price: 1000.00,
      negotiation_type: 'buy',
      container_type: 'refrigerated',
      quantity: 100,
      status: 'active',
      company_id: 1,
      contract_id: null,
      date_created: new Date('2023-05-01'),
      expiry_date: new Date('2023-06-01'),
      updated_by: 101
    },
    {
      negotiation_id: 2,
      user_id: 102,
      ad_id: 202,
      price: 2000.00,
      negotiation_type: 'sell',
      container_type: 'dry',
      quantity: 50,
      status: 'active',
      company_id: 2,
      contract_id: null,
      date_created: new Date('2023-05-02'),
      expiry_date: new Date('2023-06-02'),
      updated_by: 102
    },
    {
      negotiation_id: 3,
      user_id: 103,
      ad_id: 203,
      price: 1500.00,
      negotiation_type: 'buy',
      container_type: 'refrigerated',
      quantity: 200,
      status: 'active',
      company_id: 3,
      contract_id: 301,
      date_created: new Date('2023-05-03'),
      expiry_date: new Date('2023-06-03'),
      updated_by: 103
    },
    {
      negotiation_id: 1,
      user_id: 101,
      ad_id: 201,
      price: 1000.00,
      negotiation_type: 'buy',
      container_type: 'refrigerated',
      quantity: 100,
      status: 'active',
      company_id: 1,
      contract_id: null,
      date_created: new Date('2023-05-01'),
      expiry_date: new Date('2023-06-01'),
      updated_by: 101
    },
    {
      negotiation_id: 2,
      user_id: 102,
      ad_id: 202,
      price: 2000.00,
      negotiation_type: 'sell',
      container_type: 'dry',
      quantity: 50,
      status: 'active',
      company_id: 2,
      contract_id: null,
      date_created: new Date('2023-05-02'),
      expiry_date: new Date('2023-06-02'),
      updated_by: 102
    },
    {
      negotiation_id: 3,
      user_id: 103,
      ad_id: 203,
      price: 1500.00,
      negotiation_type: 'buy',
      container_type: 'refrigerated',
      quantity: 200,
      status: 'active',
      company_id: 3,
      contract_id: 301,
      date_created: new Date('2023-05-03'),
      expiry_date: new Date('2023-06-03'),
      updated_by: 103
    },
    {
      negotiation_id: 1,
      user_id: 101,
      ad_id: 201,
      price: 1000.00,
      negotiation_type: 'buy',
      container_type: 'refrigerated',
      quantity: 100,
      status: 'active',
      company_id: 1,
      contract_id: null,
      date_created: new Date('2023-05-01'),
      expiry_date: new Date('2023-06-01'),
      updated_by: 101
    },
    {
      negotiation_id: 2,
      user_id: 102,
      ad_id: 202,
      price: 2000.00,
      negotiation_type: 'sell',
      container_type: 'dry',
      quantity: 50,
      status: 'active',
      company_id: 2,
      contract_id: null,
      date_created: new Date('2023-05-02'),
      expiry_date: new Date('2023-06-02'),
      updated_by: 102
    },
    {
      negotiation_id: 3,
      user_id: 103,
      ad_id: 203,
      price: 1500.00,
      negotiation_type: 'buy',
      container_type: 'refrigerated',
      quantity: 200,
      status: 'active',
      company_id: 3,
      contract_id: 301,
      date_created: new Date('2023-05-03'),
      expiry_date: new Date('2023-06-03'),
      updated_by: 103
    }
  ];
  date_created: any;
  elementRef: any;

  
constructor(private dialog:MatDialog, private route: ActivatedRoute,private sessionService: SessionService,private formBuilder: FormBuilder,private router:Router,private negotiationservice: NegotiationListService){
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
console.log("testiiiiiiiiiiiiiiiiiii"+this.testpassing);

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
  return Math.ceil(this.negotiations.length / 6);
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
}





  


   
  

  
    




