import { Component, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';




import { ViewOtherAdsService } from './view-other-ads.service';
import { UploadInventoryservice } from '../upload-inventory/upload-inventory.service';
import { ForecastMapService } from '../forecasting/forecast-map/forecast-map.service';
import { ViewOtherAdsMapViewComponent } from './view-other-ads-map-view/view-other-ads-map-view.component';
export interface Port {
  port_id: number;
  company_id: number;
  port_name: string;
  latitutde: number;
  longitude: number;

}
export interface Containers {
  container_type_id: number;
  type: string;
  capacity: number;


}
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
  ad_type:string;
  port_of_ad:string;
}
@Component({
  selector: 'app-view-other-ads',
  templateUrl: './view-other-ads.component.html',
  styleUrls: ['./view-other-ads.component.css', '../app.component.css'],
  providers: [DatePipe]
})
export class ViewOtherAdsComponent  {
  
  @ViewChild(ViewOtherAdsMapViewComponent) mapViewComponent!: ViewOtherAdsMapViewComponent;
  isAdClicked: boolean = false;
  selectedView: string | undefined;

  showMapView: boolean = false;
  isLoading: any;
  selectedDeparturePorts: string[] = [];
  selectedArrivalPorts: string[] = [];
  alluser_list: any;
  noResultsMatched: boolean = false;
  public company_id?: number;
  public ad_id?: number;
  public name?: string;
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
  container_size: Containers[] = [];
  con_type: any[] = [];
  adv: Advertisement[] = [];
  pod: string[] = [];
  negotiation_list: any[] = [];
  negotiationCompany: { [negotiation_id: number]: string } = {};
  company_list_by_companyId: any[] = [];
  container_type_by_container: any[] = [];
  container_list: any[] = [];
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
  port_of_departure: any;
  port_of_ad:any;
  port_of_arrival: any;

  selectedOptions: { [key: string]: string } = {
    type: '',
    view: '',
    size: ''
  };
  currentPage = 1; // Current page number
  adsPerPage = 1; // Number of ads to display per page
  mapView: any;
  selectedDeparturePort: any;
  adtype: any;
  sizeSelected: any;
  selectedArrivalPort: any;
  size: any;
  selectedSize: any;
  showListView: boolean = true;
  containerTypeId: any;
  showNoResultsMessage: boolean=true;
  ad_type: string = 'container';
  searchPortOfAd: any;
  displayedAds: Advertisement[] =[];
  matchedAds:  Advertisement[] =[];
  type_of_ad: any;
  isMatched:boolean = false;
  originalAds: Advertisement[] =[];
  pageSize: any;
  get totalPages(): number {
    return Math.ceil(this.ads.length / this.adsPerPage);
  }


  
  
  userId: any;
  getCompanyId() {
    return this.company_id;
  }
  constructor(private sessionService: SessionService, private location: Location, private renderer: Renderer2, private router: Router, private viewotherAds: ViewOtherAdsService, private uploadInventoryservice: UploadInventoryservice, private forecastService: ForecastMapService) {

  }
  ngOnInit(): void {
    this.searchAds();
    if (this.selectedView === 'map') {
      this.showMapView = true;
    } else {
      this.showMapView = false;
    }
    this.selectedView = 'list';
    this.isLoading = true;
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

    this.viewotherAds.getAllContainers().subscribe(//for matching container size to container_type_id
      (condata: Containers[]) => {
        this.container_size = condata;


        console.log(JSON.stringify(this.container_size));

        // Map container names based on container_type_id
        this.container_size.forEach((container: Containers) => {
          switch (container.container_type_id) {
            case 1:
              container.type = 'R 1TEU';
              console.log('Container Type ID:', container.container_type_id, 'assigned to', container.type);
              break;
            case 2:
              container.type = 'NR 1TEU';
              console.log('Container Type ID:', container.container_type_id, 'assigned to', container.type);
              break;
            case 3:
              container.type = 'R 2TEU';
              console.log('Container Type ID:', container.container_type_id, 'assigned to', container.type);
              break;
            case 4:
              container.type = 'NR 2TEU';
              console.log('Container Type ID:', container.container_type_id, 'assigned to', container.type);
              break;
            default:
              container.type = 'Unknown';
              console.log('Unknown container_type_id:', container.container_type_id);
              break;
          }
        });

      }
    );

    this.viewotherAds.getAdvertisement(this.ad_type,this.companyId).subscribe(
      (data: Advertisement[]) => {
        this.ads = data;
        this.currentPage = 1;

        console.log("ads are these//////////////" + this.ads.length); // for testing purposes only
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



    this.isLoading = false;
  }
  searchAds() {
    // Check if ad_type is defined
    if (this.ad_type) {
      // Call the getAdvertisement method with the selected ad_type
      this.viewotherAds.getAdvertisement(this.ad_type, this.companyId).subscribe(
        (data: Advertisement[]) => {
          // Store the fetched advertisements in the component property
          console.log(data);
          this.ads = data;
          this.originalAds = this.ads;
          this.currentPage = 1;
          
          console.log("C or swap", this.ads);
        },
        error => {
          console.error('Error fetching advertisements:', error);
        }
      );
    }
  }
  
  
    adTypeChanged(type: string) {
      this.ad_type = type;
      this.searchAds();
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

      if (section === 'type') {
        this.type = this.selectedOptions[section] || '';
      } else if (section === 'view') {
        this.selectedView = this.selectedOptions[section] || '';

        // Update the logic to handle the map view display
        if (this.selectedView === 'map') {
          this.showMapView = true;
        } else {
          this.showMapView = false;
        }
      } else if (section === 'size') {
        this.selectedSize = this.selectedOptions[section] || '';

        // Print the container_type_id assigned to the selected size
        this.container_size.forEach((container: Containers) => {
          if (container.type === this.selectedSize) {
            console.log('Container Type ID:', container.container_type_id);
          }
        });
      }
    }
  }


  updateSearchPortOfAd() {
    this.searchPortOfAd = this.port_of_ad;
  }
  searchContainerAdvertisements() {
    debugger;
    const searchType = this.type.toLowerCase();
    const searchPortOfAd = this.port_of_ad;
    let selectedSize: string = this.selectedOptions['size'];
    console.log(selectedSize);
  
    if (searchType && searchPortOfAd && selectedSize) {
      const selectedContainerTypeId = this.container_size.find((container: Containers) => container.type === selectedSize)?.container_type_id;
  
      if (selectedContainerTypeId) {
        const matchedAds = [];
  
        for (const ad of this.originalAds) { // Loop over originalAds instead of ads
          let isMatched = false;
  
          // Check if ad_type matches
          if (ad.ad_type === 'container') {
            // Check if type_of_ad matches
            if (ad.type_of_ad === searchType) {
              // Check if port_of_ad matches
              if (ad.port_of_ad === searchPortOfAd) {
                // Check if container_type_id matches
                if (ad.container_type_id === selectedContainerTypeId) {
                  isMatched = true;
                }
              }
            }
          }
  
          if (isMatched) {
            const matchedAd = { ...ad };
            matchedAds.push(matchedAd);
          }
        }
  
        if (matchedAds.length > 0) {
          this.ads = matchedAds;
          this.currentPage = 1;
        } else {
          // No matched ads found
          this.ads = [];
          this.currentPage = 1;
        }
      }
  
      console.log("Matched Ads:", this.matchedAds);
      console.log("After filter:", this.ads);
    } else {
      // No search criteria provided, reset ads to the original list
      this.ads = [...this.originalAds];
      this.currentPage = 1;
    }
  
    console.log("Ads:", this.ads);
    // Calculate the updated total number of pages based on the filtered ads
    this.totalPages;
  }
  
  // Function to get the ads for the current page
  get currentAds(): Advertisement[] {
    const startIndex = (this.currentPage - 1) * this.adsPerPage;
    const endIndex = startIndex + this.adsPerPage;
    return this.ads.slice(startIndex, endIndex);
  }
  
  // Function to go to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    }
  }
  
  // Function to go to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1;
    }
  }
  
  
  
  
  
  
  
  searchSpaceAdvertisements() {
    debugger;
    const searchType = this.type.toLowerCase();
    const searchPortOfDep = this.port_of_departure;
    const searchPortOfArr = this.port_of_arrival;
    let selectedSize: string = this.selectedOptions['size'];
    console.log(selectedSize);
  
    if (searchType && searchPortOfDep && searchPortOfArr && selectedSize) {
      const selectedContainerTypeId = this.container_size.find((container: Containers) => container.type === selectedSize)?.container_type_id;
  
      if (selectedContainerTypeId) {
        const matchedAds = [];
  
        for (const ad of this.originalAds) { // Loop over originalAds instead of ads
          let isMatched = false;
  
          // Check if ad_type matches
          if (ad.ad_type === 'space') {
            // Check if type_of_ad matches
            if (ad.type_of_ad === searchType) {
              // Check if port_of_ad matches
              if (ad.port_of_departure === searchPortOfDep) {
                if (ad.port_of_arrival === searchPortOfArr) {
                // Check if container_type_id matches
                if (ad.container_type_id === selectedContainerTypeId) {
                  isMatched = true;
                }
              }
              }
            }
          }
  
          if (isMatched) {
            const matchedAd = { ...ad };
            matchedAds.push(matchedAd);
          }
        }
  
        if (matchedAds.length > 0) {
          this.ads = matchedAds;
          this.currentPage = 1;
        } else {
          // No matched ads found
          this.ads = [];
          this.currentPage = 1;
        }
      }
  
      console.log("Matched Ads:", this.matchedAds);
      console.log("After filter:", this.ads);
    } else {
      // No search criteria provided, reset ads to the original list
      this.ads = [...this.originalAds];
      this.currentPage = 1;
    }
  
    console.log("Ads:", this.ads);
    // Calculate the updated total number of pages based on the filtered ads
    this.totalPages;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  backPage() {
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
  StartNegotiation(ad_id: number) {
    this.viewotherAds.StartNegotiation(ad_id, this.companyId, this.userId)
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



  DisableStartNegoBtn(ad_id: number) {
    debugger
    this.NButtonDisabled = this.checkNegotiation(this.companyId, ad_id);

  }

  
  
  
  
  
  
  
  


  onDeparturePortSelected(port: Port) {
    debugger
    this.selectedDeparturePort = port.port_id;
    console.log("in view" + this.selectedDeparturePort)
    this.port_of_departure = port.port_id;
    console.log("from view", this.port_of_departure);
  }

  onArrivalPortSelected(port: Port) {
    this.selectedArrivalPort = port.port_id;
    this.port_of_arrival = port.port_id;
  }

  onAdClick() {
    this.isAdClicked = true;
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
  
  clearOptions(): void {
    this.selectedOptions = {};
    this.port_of_departure = '';
    this.port_of_arrival = '';
    this.showNoSelectionMessage = false;
    this.selectedDeparturePort = '';
    this.selectedArrivalPort = '';
    this.showMapView = false;
    window.location.reload();
    this.mapViewComponent.markPortsOnMap();
    this.displayAllAdvertisements();



    // Reload the ViewOtherAdsComponent

  }

  displayAllAdvertisements() {
    this.showMapView = false;
    this.selectedView = 'MAP'; // Reset the selected view to 'MAP'
    this.viewotherAds.getAdvertisement(this.ad_type,this.companyId).subscribe(
      (data: Advertisement[]) => {
        this.ads = data;
      },
      error => console.log(error)
    );
  }


}  
