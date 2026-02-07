import { Component,Inject, Input } from '@angular/core';


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
    styleUrls: ['./negotiation-list.component.css'],
    standalone: false
})
export class NegotiationListComponent{
  
  public isButtonDisabled: boolean = false;
  companyId: any;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  userId: any;
  adId: any;
  company_list_by_companyId: any[] = [];
  alluser_list: any[] = [];
  ads_list: any[] = [];
  AdsArrivalPort: { [ad_id: number]: string } = {};
  AdsDeparturePort: { [ad_id: number]: string } = {};
  AdsAdsPort: { [ad_id: number]: string } = {};

userNames: { [userId: number]: string } = {};
userLNames: { [userId: number]: string } = {};
userNo: { [userId: number]: string } = {};
companyNames: { [companyId: number]: string } = {};

companyLicenceId: { [companyId: number]: string } = {};
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
  userDesignation: any;
  negad_type:any;
  
constructor(@Inject(MAT_DIALOG_DATA)public data:any,private dialog:MatDialog, private route: ActivatedRoute,private sessionService: SessionService,private formBuilder: FormBuilder,private router:Router,private negotiationservice: NegotiationListService){
}

ngOnInit(): void {
  this.negad_type = this.data.ad_type;
  console.log("ad_type passed"+this.data.ad_type);
  console.log("ad_type in neg"+this.negad_type);
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

    this.negotiationservice.getAdvertisement(this.companyId, "Active", this.data.ad_type).subscribe(
      (data: any) => {
        debugger
        this.ads_list = data;
        console.log("Other ads by company ID is fetched:", this.ads_list);

      // Populate the company names object
      this.ads_list.forEach((ad: any) => {
        this.AdsArrivalPort[ad.ad_id] = ad.port_of_arrival;
        this.AdsDeparturePort[ad.ad_id] = ad.port_of_departure;
        this.AdsAdsPort[ad.ad_id] = ad.port_of_ad;
     
    

      });
    },
    (error: any) => {
      console.log("Error loading company details:", error);
    }
  );









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
          this.companyLicenceId[company.company_id] = company.licence_id;

        });
      },
      (error: any) => {
        console.log("Error loading company details:", error);
      }
    );


    this.negotiationservice.getallUser(this.companyId).subscribe(
      (data: any) => {
        this.alluser_list = data;
        console.log("Other users by company ID is fetched:", this.alluser_list);

        // Populate the user names object
        this.alluser_list.forEach((user: any) => {
          this.userNames[user.user_id] = user.first_name;
          this.userLNames[user.user_id] = user.last_name;
          this.userNo[user.user_id] = user.phone_no;


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

    this.sessionService.getUserDesignation().subscribe(
      (userDesignation: string) => {
        this.userDesignation = userDesignation;
        console.log('User ID is :', userDesignation);
      },
      (error: any) => {
        console.error('Error retrieving user des:', error);
      }
    );

    /////permission for negotiation

    this.negotiationservice.getPermissions(this.userId).subscribe(
      (permissions: any[]) => {
        this.PList = permissions;
        this.isButtonDisabled = !(this.PList.includes(4) || this.userDesignation === 'admin');


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
    return Math.ceil(this.negotiations.length / this.itemsPerPage);
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
  backPage() {
    this.router.navigate(['forecast-map']);
  }



  viewNegotiations(ad_id: number) {

    this.negotiationservice.getNegotiationsById(ad_id).subscribe(
      (data: Negotiation[]) => {
        this.negotiations = data;

        console.log("this is view nego" + this.negotiations);
      },
      (error: any) => console.log(error)
    );
  }


  getDateOnly(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    const timestamp = newDate.getTime();
    const dateOnly = new Date(timestamp);
    const dateString = dateOnly.toLocaleDateString('en-GB');
    this.date_created = dateString.toString().slice(0, 10);
    return this.date_created;
  }

  deleteNegotiation(negotiation_id: number) {
    this.negotiationservice.deleteNegotiation(negotiation_id)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.router.navigateByUrl('/my-ad', { skipLocationChange: true });
          this.router.navigate(['/my-ad']);
          window.location.reload()
          // this.getAllInventory()
        },
        (error: any) => console.log(error));
  }

  AcceptNegotiation(negotiation_id: number) {
    this.negotiationservice.AcceptNegotiation(negotiation_id)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.router.navigateByUrl('/my-ad', { skipLocationChange: true });
          this.router.navigate(['/my-ad']);
          window.location.reload()
          // this.getAllInventory()
        },
        (error: any) => console.log(error));
  }


}
















