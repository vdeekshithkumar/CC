import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { DatePipe } from '@angular/common';

import { ViewOtherAdsService } from './view-other-ads.service';
import { UploadInventoryservice } from '../upload-inventory/upload-inventory.service';
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
  selector: 'app-view-other-ads',
  templateUrl: './view-other-ads.component.html',
  styleUrls: ['./view-other-ads.component.css'],
  providers: [DatePipe]
})
export class ViewOtherAdsComponent {
  
  selectedDeparturePorts: string[] = [];
  selectedArrivalPorts: string[] = [];
  alluser_list: any;
  noResultsMatched: boolean = false;
  public company_id?: number;
  public ad_id?: number;
  public name?: string;
  itemsPerPage: number = 3;
  currentPage: number = 1;
  domain_address?: string;
  licence_id?: number;
  rating?: number;
  address?: string;
  fname?: string
  isBuyHovered: boolean = false;
  company_logo?: string
  company_location?: string
  country?: string
  companyId: any;
  profileForm!: FormGroup;
  activeAdsClicked = false;
  pendingAdsClicked = false;
  ads: Advertisement[] = [];
  adv: Advertisement[] = [];
  pod: string[] = [];
  negotiation_list: any[] = [];
  negotiationCompany: { [negotiation_id: number]: string } = {};
  company_list_by_companyId: any[] = [];
  companyNames: { [companyId: number]: string } = {};
  companyLogos: { [companyId: number]: string } = {};
  companyDomain: { [companyId: number]: string } = {};
  companyRating: { [companyId: number]: string } = {};
  companyAddress: { [companyId: number]: string } = {};
  type: any;
  port_list: any;
  NButtonDisabled: boolean = false;
  showNoSelectionMessage: boolean = false;
  date_created: any;
  advertisements: any;
  http: any;
  port_of_departure: string | undefined;
  port_of_arrival: string | undefined;
  selectedOptions: { [key: string]: string } = {
    search: '',
    view: '',
    type: ''
  };
  userId: any;
  getCompanyId() {
    return this.company_id;
  }
  constructor(private sessionService: SessionService, private router: Router, private viewotherAds: ViewOtherAdsService, private uploadInventoryservice: UploadInventoryservice) { 
   
  }
  ngOnInit(): void {

    this.viewotherAds.getallnegotiation(this.companyId).subscribe(
      (data: any) => {
        this.negotiation_list = data;
        console.log("negotiation of companies fetched for diabling btn:", this.negotiation_list);
  
        // Populate the company names object
        this.negotiation_list.forEach((negotiation: any) => {
            this.negotiationCompany[negotiation.ad_id] = negotiation.company_id;
        });
      },
      (error: any) => {
        console.log("Error loading negotiationdetails:", error);
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
    this.sessionService.getCompanyId().subscribe(

      (companyId: number) => {

        this.companyId = companyId;

        console.log('company ID is :', companyId);

      },

      (error: any) => {


        console.error('Error retrieving company ID:', error);

      }

    );

    this.viewotherAds.getAdvertisement(this.companyId).subscribe(
      (data: Advertisement[]) => {
        this.ads = data;


        console.log("ads are these//////////////"+this.ads.length); // for testing purposes only
      },
      error => console.log(error)
    );

    this.uploadInventoryservice.getAllPorts().subscribe(
      data => {
        this.port_list = data;
        console.log("Port list fetched: ", this.port_list);
      },
      error => {
        console.log("ports loading error:" + error);
      }
    );
    this.viewotherAds.getotherCompany(this.companyId).subscribe(
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


  }
 
  toggleOption(section: string, option: string) {
    if (this.selectedOptions[section] === option) {
      // If the clicked option is already selected, deselect it
      this.selectedOptions = {
        ...this.selectedOptions,
        [section]: ''
      };
    } else {
      // Otherwise, select the clicked option
      this.selectedOptions = {
        ...this.selectedOptions,
        [section]: option
      };
    }
  }
  get totalPages(): number {
    return Math.ceil(this.ads.length / 3);
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
  checkNegotiation(company_id: number, ad_id: number): boolean {
    let x = false;
  debugger
    for (const negotiation of this.negotiation_list) {
      if (negotiation.ad_id === ad_id && negotiation.company_id === company_id) {
        x = true;
        break;
      }
    }
    return x;
  }
  StartNegotiation(ad_id:number){
    this.viewotherAds.StartNegotiation(ad_id,this.companyId,this.userId)
    .subscribe(
      response => {
        console.log('Negotiation started successfully.', response);
        window.location.reload()
        // Handle the response as needed
      },
      error => {
        console.error('Error starting negotiation.', error);
        // Handle the error as needed
      }
    );
  }

  DisableStartNegoBtn(ad_id:number){
  debugger
    this.NButtonDisabled = this.checkNegotiation(this.companyId, ad_id);
  
  }
 
  searchAdvertisements() {
    if (!this.type && !this.port_of_departure && !this.port_of_arrival) {
      this.showNoSelectionMessage = true;
      return;
    }
    this.showNoSelectionMessage = false;
    debugger;
    this.noResultsMatched = false;
    const selectedDeparture = this.port_of_departure;
    const selectedArrival = this.port_of_arrival;
    const selectedType = this.type;
    console.log('Selected Departure:', selectedDeparture);
    console.log('Selected Arrival:', selectedArrival);
    console.log('Selected Type:', selectedType);

    this.viewotherAds.getAdvertisement(this.companyId).subscribe(
      (data: Advertisement[]) => {
        this.ads = data.filter(ad => {
          let isTypeMatch = true;
          let isPortMatch = true;

          // Check if type matches the selected option
          if (selectedType) {
            isTypeMatch = ad.type_of_ad.toLowerCase() === selectedType.toLowerCase();
            console.log('Type Match:', isTypeMatch);
          }

          // Check if ports match the selected options
          if (selectedDeparture && selectedArrival) {
            isPortMatch =
              ad.port_of_departure === selectedDeparture &&
              ad.port_of_arrival === selectedArrival;
            console.log("dep", selectedDeparture)
            console.log('Port Match:', isPortMatch);
          }

          // Return true if both type and ports match, or if only type matches (ports are not selected)
          return isTypeMatch && isPortMatch;
        });
  
        // Log the matched advertisements
        console.log('Matched Advertisements:', this.ads);
      },
      error => console.log(error)
    );
  }

  setOptionBackground(option: string, isHovered: boolean): void {
    if (isHovered && this.type !== option) {
      // Set the background color to blue when hovered, if not selected
      document.querySelector('.search-container div.' + option)?.classList.add('hovered');
    } else {
      // Remove the background color when not hovered or when selected
      document.querySelector('.search-container div.' + option)?.classList.remove('hovered');
    }
  }
  togglePortSelection(port: string, type: 'departure' | 'arrival') {
    const selectedPorts = type === 'departure' ? this.selectedDeparturePorts : this.selectedArrivalPorts;
    const index = selectedPorts.indexOf(port);
    if (index > -1) {
      selectedPorts.splice(index, 1);
    } else {
      selectedPorts.push(port);
    }
  }
  isPortSelected(port: string, type: 'departure' | 'arrival') {
    const selectedPorts = type === 'departure' ? this.selectedDeparturePorts : this.selectedArrivalPorts;
    return selectedPorts.includes(port);
  }
  clearOptions() {
    this.selectedOptions = {};
    this.port_of_departure = '';
    this.port_of_arrival = '';
    this.showNoSelectionMessage = false;
    this.displayAllAdvertisements(); // Call a separate method to display all advertisements
  }
  displayAllAdvertisements() {
    this.viewotherAds.getAdvertisement(this.companyId).subscribe(
      (data: Advertisement[]) => {
        this.ads = data;
      },
      error => console.log(error)
    );
  } 

}  


