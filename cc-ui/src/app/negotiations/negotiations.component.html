import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../session.service';
import { NegotiationsService } from './negotiations.service';
import { MessagingService } from '../messaging/messaging.service';
import { conversation } from '../DTO/conversation';
import { Observable, map, catchError, of } from 'rxjs';
import { SharedServiceService } from '../shared-service.service';

 

export interface Negotiation {
  [x: string]: any;
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
  conversations: conversation[] = [];
  companyId: any;
  
selectedNegotiation: any;
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
  AdsType: { [ad_id: number]: string } = {};
  AdsDeparturePort: { [ad_id: number]: string } = {};
  AdsPortofAd: { [ad_id: number]: string } = {};
  AdscompanyNames: { [ad_id: number]: string } = {};
  Negotiatorcompanynames:{[companyId:number]:string }={};
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
  NegcompanyId:any;

  ad_type: string='container';
  negad_type!: string;
  conversationID!:number
  negotiation_id!:number;
 negCount:any;
  selectedConversationIndex:any=null;
  selectedConversation:any;
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private negotiationservice: NegotiationsService,
    private messageService: MessagingService,
   
  ) {}

 

  async ngOnInit(): Promise<void> {
    
    await this.fetchAdvertisements();
    await this.fetchCompanyId();
    await this.fetchOtherCompanies();
    await this.fetchUserId();
    await this.fetchPermissions();
    await this.fetchNegotiations('selectedAdType');
    this.route.paramMap.subscribe((params) => {
      const adType = params.get('ad_type') ?? 'container'; 
      this.fetchNegotiations(adType);
    });
        this.sessionService.getCompanyId().subscribe({
          next: (companyId: number) => {
            this.companyId = companyId;
            this.companyName = this.companyName;
          },
          error: (error: any) => {
            console.error('Error retrieving company ID:', error);
          }
        });
    this.messageService.getMessges(this.conversationID).subscribe({
      next: (data: any[]) => {
        this.conversations = data;
      },
      error: (error: any) => {
        console.error('Error retrieving conversations:', error);
      }
    });
    
  }

 

  async fetchAdvertisements(): Promise<void> {
    try {
      const data: any = await this.negotiationservice.getAdvertisementbytype(this.ad_type, this.companyId).toPromise();
      this.ads_list = data;
      console.log("Ads by company ID and ad_type:", this.ads_list);
      // Populate the company names object and other properties
      this.ads_list.forEach((ad: any) => {
        this.AdscompanyNames[ad.ad_id] = ad.company_id;
        this.AdsArrivalPort[ad.ad_id] = ad.port_of_arrival;
        this.AdsDeparturePort[ad.ad_id] = ad.port_of_departure;
        this.AdsType[ad.ad_id] = ad.ad_type;
        this.AdsPortofAd[ad.ad_id] = ad.port_of_ad;
        this.Negotiatorcompanynames[ad.company_id] = ad.company_id;
      });
    } catch (error) {
      console.log("Error loading advertisements:", error);
    }
  }

  updateAdType(selectedAdType: string) {
    this.ad_type = selectedAdType;
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

 
  async fetchNegotiations(selectedAdType: string): Promise<void> {
    try {
      this.updateAdType(selectedAdType); // Call the updateAdType method here
      
      debugger;
      const data: Negotiation[] = await this.negotiationservice.getNegotiationsByCId(this.companyId).toPromise();
      this.negotiations = data;
      console.log("This is ads_list", this.ads_list);
      debugger;
  
      // Filter negotiations based on the selected ad_type
      this.filteredNlist = this.negotiations.filter((negotiation) => {
        const ad = this.ads_list.find((ad) => ad.ad_id === negotiation.ad_id && ad.ad_type === selectedAdType);
        return !!ad; // Include the negotiation if a matching ad with the selected ad_type is found
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
          this.userNames[user.user_id] = user.first_name;
          this.userLNames[user.user_id] = user.last_name;
          this.userNo[user.user_id] = user.phone_no;


        });
      },
      (error: any) => {
        console.log("Error loading company details:", error);
      }
    );
debugger
    this.negotiationservice.getnegotiationcount(this.companyId).subscribe(
      (count: number[]) => {
        this.negCount = count;
       
        console.log('Ads count:', this.negCount[0]);
      
      },
      (error: any) => {
        console.log(error);
        alert('Error occurred');
      }
    );

  }

onCancel() {

  window.location.reload()
}

// navigateToMessaging(convo: any): void {
//   if (convo.status === 'accepted') {
//     const negotiationId = convo.negotiation_id;
//     this.router.navigate(['/messaging'], { queryParams: { negotiationId: negotiationId } });
//   }
// }


get totalPages(): number {
  return Math.ceil(this.filteredNlist.length /this.itemsPerPage);
}
prevPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

// Function to go to the next page
nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}
// createConversation(conversation: any) {
//   debugger
//   const companyId = conversation.company_id;
//   const companyName = this.getCompanyName(conversation.ad_id);
//   const adcompanyId=this.getCompanyID(conversation.ad_id);
//   const newConversation = {
//     company_id: companyId,
//     company_name: companyName,
//     user_id: conversation.user_id,
//     user_name: this.getUserName(conversation.user_id),
//     negotiation_id:conversation.negotiation_id,
//     AdscompanyId:adcompanyId,
//     is_active:1
//   };

//   this.messageService.createConversation(newConversation).subscribe(
//     (response) => {
//       console.log(newConversation)
//       console.log('Conversation created:', response);
//       this.router.navigate(['/messaging']); 
//     },
//     (error) => {
//       console.error('Error creating conversation:', error);
//     }
//   );
// }
createConversation(conversation: any) {
  debugger
  const companyId = conversation.company_id;
  const negcompanName=this.getNegCompanyName(conversation.company_id)
  const companyName = this.getCompanyName(conversation.ad_id);
  const adcompanyId = this.getCompanyID(conversation.ad_id);
  const companylogo=this.getCompanylogo(conversation.ad_id);
  const negcompanyLogo=this.getNegCompanyLogo(conversation.company_id)
  const newConversation = {
    company_id: companyId,
    negotiator_company_name:negcompanName,
    negotiator_company_logo:negcompanyLogo,
    company_name: companyName,
    user_id: conversation.user_id,
    first_name: this.getUserName(conversation.user_id),
    negotiation_id: conversation.negotiation_id,
    AdscompanyId: adcompanyId,
    is_active: 1, // Set the is_active field to 1
    company_logo:companylogo

  };

  this.checkConversationExists(newConversation).then((conversationExists) => {
    if (conversationExists) {
      this.router.navigate(['/messaging']);
    } else {
      this.messageService.createConversation(newConversation).subscribe(
        (response) => {
          console.log('Conversation created:', response);
          this.selectedConversation = conversation;
          this.router.navigate(['/messaging']);
        
          this.selectedConversationIndex = this.conversations.findIndex((convo) => convo === conversation);
        },
        (error) => {
          console.error('Error creating conversation:', error);
        }
      );
    }
  });
}


async checkConversationExists(newConversation: any): Promise<boolean> {
  try {
    const existingConversations = await this.messageService.getconversationbynegid(newConversation.negotiation_id).toPromise();
    const conversationExists = existingConversations?.some(
      (conversation: any) =>
        conversation.user_id === newConversation.user_id &&
        conversation.negotiation_id === newConversation.negotiation_id
    );
    return conversationExists || false;
  } catch (error) {
    console.error('Error fetching existing conversations:', error);
    return false;
  }
}

getCompanyNameByCompanyId(companyId: number): Observable<string> {
  // Assuming you have a service method to retrieve the company details by ID
  return this.sessionService.getCompanyId().pipe(
    map((company) => company.name),
    catchError((error) => {
      console.error('Error fetching company name:', error);
      return of('Unknown Company');
    })
  );
}


   backPage(){
    this.router.navigate(['forecast-map']);
   }

   getUserName(userId: number): string {
    return this.userNames[userId] || 'Unknown User';
  }
  getNegCompanyName(companyID: number): string {
    debugger
     this.NegcompanyId = this.Negotiatorcompanynames[companyID];
     
    return this.companyNames[this.NegcompanyId] || 'Unknown Company';
  }
  getNegCompanyLogo(companyID: number): string {
    debugger
     this.NegcompanyId = this.Negotiatorcompanynames[companyID];
    
    return this.companyLogos[this.NegcompanyId] || 'Unknown Company';
  }
   getCompanyName(adId: number): string {
     this.AdscompanyId = this.AdscompanyNames[adId];
     console.log('this is ad c'+this.companyNames[this.AdscompanyId])
    return this.companyNames[this.AdscompanyId] || 'Unknown Company';
  }
  getCompanyID(adId: number): number {
    const adcompanyId = this.AdscompanyNames[adId];
    if (typeof adcompanyId === 'number') {
      return adcompanyId;
    }
    return 0; // Default value for unknown company ID
  }
  
  getCompanylogo(adId: number): string {

     this.AdscompanyId = this.AdscompanyNames[adId];

    return this.companyLogos[this.AdscompanyId] || 'Unknown Company';
  }
  getCompanyrating(adId: number): string {

     this.AdscompanyId = this.AdscompanyNames[adId];

    return this.companyRating[this.AdscompanyId] || 'Unknown Company';
  }
  getCompanydomain(adId: number): string {

     this.AdscompanyId = this.AdscompanyNames[adId];

    return this.companyDomain[this.AdscompanyId] || 'Unknown Company';
  }
  getCompanyaddress(adId: number): string {

     this.AdscompanyId = this.AdscompanyNames[adId];

    return this.companyAddress[this.AdscompanyId] || 'Unknown Company';
  }
  navigateToMessaging(negotiationId: number, adId: number): void {
    if (this.selectedNegotiation && this.selectedNegotiation.status === 'accepted') {
      this.router.navigate(['/messaging'], { queryParams: { negotiationId: negotiationId, adId: adId } });
    }
  }
  // navigateToMessaging(negotiation: any): void {
  //   if (negotiation.status === 'accepted') {
  //     const negotiation_id = negotiation.negotiation_id;
  //     const adId = negotiation.ad_id;
  //     this.router.navigate(['/messaging'], { queryParams: { negotiation_id: negotiation_id, adId: adId } });
  //   }
  // }
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

