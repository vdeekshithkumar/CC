import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../session.service';
import { NegotiationsService } from './negotiations.service';

export interface Negotiation {
  negotiation_id: number;
  user_id: number;
  ad_id: number;
  price: number;
  negotiation_type: string;
  container_type: string;
  quantity: number;
  status: string;
  company_id: number;
  contract_id: any;
  date_created: Date;
  expiry_date: Date;
  updated_by: number;
}

@Component({
  selector: 'app-negotiations',
  templateUrl: './negotiations.component.html',
  styleUrls: ['./negotiations.component.css']
})
export class NegotiationsComponent implements OnInit {
  public isButtonDisabled: boolean = false;
  companyId: any;
  NButtonDisabled: boolean = false;
  itemsPerPage: number = 3;
  currentPage: number = 1;
  userId: any;
  adId: any;
  x:number=0;
  filteredNlist: any[] = [];
  company_list_by_companyId: any[] = [];
  alluser_list: any[] = [];
  ads_list: any[] = [];
  userNames: { [userId: number]: string } = {};
  userLNames: { [userId: number]: string } = {};
  userNo: { [userId: number]: string } = {};
  AdsArrivalPort: { [ad_id: number]: string } = {};
  AdsDeparturePort: { [ad_id: number]: string } = {};
  AdscompanyNames: { [ad_id: number]: string } = {};
  AdscompanyLogos: { [ad_id: number]: string } = {};
  AdscompanyDomain: { [ad_id: number]: string } = {};
  AdscompanyRating: { [ad_id: number]: string } = {};
  AdscompanyAddress: { [ad_id: number]: string } = {};
  companyNames: { [companyId: number]: string } = {};
  companyLogos: { [companyId: number]: string } = {};
  companyDomain: { [companyId: number]: string } = {};
  companyRating: { [companyId: number]: string } = {};
  companyAddress: { [companyId: number]: string } = {};
  testpassing: any;
  companyName: any;
  PList: any[] = [];
  negotiations: Negotiation[] = [];
  date_created: any;
  elementRef: any;
  AdscompanyId: any;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private negotiationservice: NegotiationsService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.fetchAdvertisements();
    await this.fetchCompanyId();
    await this.fetchOtherCompanies();
    await this.fetchUserId();
    await this.fetchPermissions();
    await this.fetchNegotiations();
  }

  async fetchAdvertisements(): Promise<void> {
    try {
      const data: any = await this.negotiationservice.getAdvertisement(this.companyId).toPromise();
      this.ads_list = data;
      console.log("Other ads by company ID is fetched:", this.ads_list);

      // Populate the company names object
      this.ads_list.forEach((ad: any) => {
        this.AdscompanyNames[ad.ad_id] = ad.company_id;
        this.AdsArrivalPort[ad.ad_id] = ad.port_of_arrival;
        this.AdsDeparturePort[ad.ad_id] = ad.port_of_departure;
      });
    } catch (error) {
      console.log("Error loading company details:", error);
    }
  }

  async fetchCompanyId(): Promise<void> {
    try {
      this.companyId = await this.sessionService.getCompanyId().toPromise();
      this.companyName = this.companyName;
      console.log('Company ID is:', this.companyId);
    } catch (error) {
      console.error('Error retrieving company ID:', error);
    }
  }

  async fetchOtherCompanies(): Promise<void> {
    try {
      const data: any = await this.negotiationservice.getotherCompany(this.companyId).toPromise();
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
    } catch (error) {
      console.log("Error loading company details:", error);
    }
  }

  async fetchUserId(): Promise<void> {
    try {
      this.userId = await this.sessionService.getUserId().toPromise();
      console.log('User ID is:', this.userId);
    } catch (error) {
      console.error('Error retrieving user ID:', error);
    }
  }

  async fetchPermissions(): Promise<void> {
    try {
      const permissions: any[] = await this.negotiationservice.getPermissions(this.userId).toPromise();
      this.PList = permissions;
      this.isButtonDisabled = !this.PList.includes(2);
    } catch (error) {
      console.log(error);
      alert("error");
    }
  }

  async fetchNegotiations(): Promise<void> {
    try {
      const data: Negotiation[] = await this.negotiationservice.getNegotiationsByCId(this.companyId).toPromise();
      this.negotiations = data;
      this.filteredNlist = this.negotiations.filter((negotiation) => {
        return this.ads_list.find((ad) => ad.ad_id === negotiation.ad_id);
      });
      console.log("Filtered negotiations:", this.filteredNlist);
      console.log("All negotiations:", this.negotiations);
    } catch (error) {
      console.log(error);
    }

    this.negotiationservice.getallUser(this.companyId).subscribe(
      (data: any) => {
        this.alluser_list = data;
        console.log("Other users by company ID is fetched:", this.alluser_list);
  
        // Populate the user names object
        this.alluser_list.forEach((user: any) => {
          this.userNames[user.user_id] = user.fname;
          this.userLNames[user.user_id] = user.lname;
          this.userNo[user.user_id] = user.phone_no;
         
  
        });
      },
      (error: any) => {
        console.log("Error loading company details:", error);
      }
    );
  }


  

  
onCancel() {
    
  window.location.reload()
}


get totalPages(): number {
  return Math.ceil(this.filteredNlist.length / 3);
}
prevPage() {

  if (this.currentPage > 1) {
    this.currentPage--;
  }
  
   }
   nextPage() {
    if (this.currentPage < Math.ceil(this.filteredNlist.length / this.itemsPerPage)) {
      this.currentPage++;
    }
  
   }
   backPage(){
    this.router.navigate(['forecast-map']);
   }

   getCompanyName(adId: number): string {
    debugger
     this.AdscompanyId = this.AdscompanyNames[adId];
   
    return this.companyNames[this.AdscompanyId] || 'Unknown Company';
  }
  getCompanylogo(adId: number): string {
    debugger
     this.AdscompanyId = this.AdscompanyNames[adId];
   
    return this.companyLogos[this.AdscompanyId] || 'Unknown Company';
  }
  getCompanyrating(adId: number): string {
    debugger
     this.AdscompanyId = this.AdscompanyNames[adId];
   
    return this.companyRating[this.AdscompanyId] || 'Unknown Company';
  }
  getCompanydomain(adId: number): string {
    debugger
     this.AdscompanyId = this.AdscompanyNames[adId];
   
    return this.companyDomain[this.AdscompanyId] || 'Unknown Company';
  }
  getCompanyaddress(adId: number): string {
    debugger
     this.AdscompanyId = this.AdscompanyNames[adId];
   
    return this.companyAddress[this.AdscompanyId] || 'Unknown Company';
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






  


   
  

  
    




