import { Component,Inject } from '@angular/core';


import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../session.service';
import { NegotiationsService } from './negotiations.service';



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
  selector: 'app-negotiations',
  templateUrl: './negotiations.component.html',
  styleUrls: ['./negotiations.component.css']
})

export class NegotiationsComponent{
  public isButtonDisabled: boolean = false;
  companyId: any;
  itemsPerPage: number = 3;
currentPage: number = 1;
userId: any;
adId:any;
company_list_by_companyId: any[] = [];
alluser_list: any[] = [];
userNames: { [userId: number]: string } = {};
userNo: { [userId: number]: string } = {};
companyNames: { [companyId: number]: string } = {};
companyLogos: { [companyId: number]: string } = {};
companyDomain: { [companyId: number]: string } = {};
companyRating: { [companyId: number]: string } = {};
companyAddress: { [companyId: number]: string } = {};
testpassing:any;
  companyName: any;
  PList: any[] = [];
  negotiations: Negotiation[] = []
    

  date_created: any;
  elementRef: any;

  
constructor(private dialog:MatDialog, private route: ActivatedRoute,private sessionService: SessionService,private formBuilder: FormBuilder,private router:Router,private negotiationservice: NegotiationsService){
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
  this.viewNegotiations(this.companyId);


  this.negotiationservice.getotherCompany(this.companyId).subscribe(
    (data: any) => {
      this.company_list_by_companyId = data;
      console.log("Other company by company ID is fetched:", this.company_list_by_companyId);

      // Populate the company names object
      this.company_list_by_companyId.forEach((company: any) => {
        this.companyNames[company.company_id] = company.name;
        this.companyLogos[company.company_id] = company.company_logo;
        this.companyDomain[company.company_id] = company.domain_address;
        this.companyRating[company.company_id] = company.rating;
        this.companyAddress[company.company_id] = company.address;

      });
    },
    (error: any) => {
      console.log("Error loading company details:", error);
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

viewNegotiations(companyId:number){

  this.negotiationservice.getNegotiationsByCId(companyId).subscribe(
    (data: Negotiation[]) => {
      this.negotiations = data;
     
      console.log("this is view nego"+this.negotiations);
    },
    (  error: any) => console.log(error)
  );
  }    
onCancel() {
    
  window.location.reload()
}


get totalPages(): number {
  return Math.ceil(this.negotiations.length / 3);
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





}






  


   
  

  
    




