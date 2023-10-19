import { Component, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';

// ...



import { ViewOtherAdsService } from './view-other-ads.service';
import { UploadInventoryservice } from '../upload-inventory/upload-inventory.service';
import { ForecastMapService } from '../forecasting/forecast-map/forecast-map.service';
import { ViewOtherAdsMapViewComponent } from './view-other-ads-map-view/view-other-ads-map-view.component';
import { SharedServiceService } from '../shared-service.service';
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
  container_type:string;
  container_size:number;
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
selectedcontainerSize: any;
selectedcontainertypetomap:any;
selectedcontainersizetomap:any;
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
selectedMainOption: string = ''; // To store the selected main option
  isMainDropdownOpen: boolean = false; // To control the visibility of the main dropdown
  selectedOptions: { [key: string]: string } = {
    type: '',
    view: '',
    size: ''
  };
  currentPage = 1; // Current page number
  adsPerPage = 4; // Number of ads to display per page
  mapView: any;
  selectedDeparturePort: any;
  adtype: any;
  showPopup = false;
  sizeSelected: any;
  selectedArrivalPort: any;
  size: any;
  selectedSize: any;
  showListView: boolean = true;
  containerTypeId: any;
  showNoResultsMessage: boolean=true;
  ad_type!: string;
  searchPortOfAd: any;
  displayedAds: Advertisement[] =[];
  matchedAds:  Advertisement[] =[];
  type_of_ad!: string;
  container_type_list:Containers[]=[];
  isMatched:boolean = false;
  originalAds: Advertisement[] =[];
  pageSize: any;
  selectedTypePortOfAd: any;
  selectedSizetomap: any;
  typetomap: any;
  ad_typetomap: any;
  selectedTypePortOfDep: any;
  isTypeDropdownOpen: boolean = false;
  selectedcontainerType: string = '';
  selectedTypePortOfArr: any;
  get totalPages(): number {
    return Math.ceil(this.ads.length / this.adsPerPage);
  }

  receivedportCode: any;
  receivedcontainerType: any;
  receivedcontainerSize: any;

  
  
  userId: any;
  getCompanyId() {
    return this.company_id;
  }
  constructor(private sessionService: SessionService,private route: ActivatedRoute, private location: Location, private renderer: Renderer2, private router: Router, private viewotherAds: ViewOtherAdsService, private uploadInventoryservice: UploadInventoryservice, private forecastService: ForecastMapService,private sharedService:SharedServiceService ) {

  }
  ngOnInit(): void {
    this.sharedService.values$.subscribe(values => {
      this.receivedportCode = values.portcode;
      this.receivedcontainerType = values.containertype;
      this.receivedcontainerSize = parseInt(values.containersize, 10);
      
    });
    console.log( "to check",this.receivedportCode)
    console.log( "to check", this.receivedcontainerType)
    console.log( "to check",this.receivedcontainerSize)
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
    this.route.queryParams.subscribe(params => {
      this.ad_type = params['type'] || 'container'; // Default to 'container'
    });

    this.route.queryParams.subscribe(params => {
      this.selectedMainOption = params['typee'];
    });

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
    this.searchAds();
 


    this.viewotherAds.getAllContainers().subscribe(
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
  // In your component.ts file
onSizeClick(size: any) {
  if (this.selectedcontainerSize === size) {
    this.selectedcontainerSize = null; // Unselect the option if it's already selected
  } else {
    this.selectedcontainerSize = size.capacity; // Otherwise, select the clicked option
  }
}

capitalizeFirstLetter(text: string): string {
  if (!text) return text;

  return text.charAt(0).toUpperCase() + text.slice(1);
}
togglePopup() {
  this.showPopup = !this.showPopup;
}



searchAds() {
  debugger;
  // Check if ad_type is defined
  if (this.ad_type && this.selectedMainOption) {
    const type_of_ads = []; // Array to store type_of_ad values

    // Determine type_of_ad based on selectedMainOption
    if (this.selectedMainOption === 'Trading') {
      type_of_ads.push('buy', 'sell',); // Add all types to the array
    } else if (this.selectedMainOption === 'Leasing') {
      type_of_ads.push('lease','swap','oneway'); // Add 'Lease' to the array
    }

    // Create an array to store the observables for each type_of_ad request
    const observables = type_of_ads.map(type_of_ad =>
      this.viewotherAds.getAdvertisementbytypeofad(this.ad_type, type_of_ad, this.companyId)
    );

    // Use forkJoin to make parallel requests for all type_of_ad values
    forkJoin(observables).subscribe(
      (responses: any[]) => {
        // responses is an array containing the responses for each type_of_ad
        const allAds = ([] as Advertisement[]).concat(...responses); // Combine all responses into a single array
        console.log('All Ads:', allAds);

        // Store the combined advertisements in the component property
        this.ads = allAds;
        this.originalAds = this.ads;
        this.currentPage = 1;

        console.log("Combined Ads:", this.ads);
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
    toggleDropdown(section: string) {
  if (section === 'type') {
    this.isTypeDropdownOpen = !this.isTypeDropdownOpen;
  }
}
toggleMainDropdown() {
  this.isMainDropdownOpen = !this.isMainDropdownOpen;
}

selectMainOption(option: string) {
  this.selectedMainOption = option;
  this.isMainDropdownOpen = false; // Close the main dropdown when a main option is selected
}

selectSubOption(subOption: string) {
  // Handle the selection of sub-options based on the selected main option
  // For example, you can update a variable or perform any other action here
  console.log(`Selected ${this.selectedMainOption} sub-option: ${subOption}`);
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

  onTypeSelected(){
    console.log("for check",this.selectedcontainerType)
  }
  updateSearchPortOfAd() {
    this.searchPortOfAd = this.port_of_ad;
  }
  searchContainerAdvertisements() {
    debugger;
    const searchType = this.type.toLowerCase();
    const searchPortOfAd = this.port_of_ad;
    const searchPortOfDep = this.port_of_departure;
    const searchPortOfArr = this.port_of_arrival;
    const selectedContainerType = this.selectedcontainerType;
    const selectedContainerSize = this.selectedcontainerSize;
    if (searchType === 'oneway') {
      this.searchSpaceAdvertisements();
  }
    if (this.selectedOptions['view'] !== 'MAP') {
      const matchedAds = [];
  debugger
      // Check if selectedContainerType is 'oneway' and call searchSpaceAdvertisements() method
      

        for (const ad of this.originalAds) {
            let isMatched = false;

            if (ad.ad_type === 'container') {
              let isMatched = false;
          
              if (searchType === 'oneway') {
                  // Check only Port of Departure and Port of Arrival
                  if (ad.port_of_departure === searchPortOfDep && ad.port_of_arrival === searchPortOfArr) {
                      isMatched = true;
                  }
              } else {
                  // Check only Port of Ad
                  if (ad.port_of_ad === searchPortOfAd) {
                      isMatched = true;
                  }
              }
          
              if (isMatched) {
                  const matchedAd = { ...ad };
                  matchedAds.push(matchedAd);
              }
            }}
          

        if (matchedAds.length > 0) {
            this.ads = matchedAds;
            this.currentPage = 1;
        } else {
            // No matched ads found
            this.ads = [];
            this.currentPage = 1;
        }
    }

    if (this.selectedOptions['view'] === 'MAP') {
        this.showMapView = true;

        // Set the selected values
        this.ad_typetomap = this.ad_type;
        this.typetomap = this.type.toLowerCase();
        this.selectedTypePortOfAd = searchPortOfAd;
        this.selectedTypePortOfDep =searchPortOfDep;
        this.selectedTypePortOfArr=searchPortOfArr;
        this.selectedcontainertypetomap = selectedContainerType;
        this.selectedcontainersizetomap = selectedContainerSize;

        // Call markPortOfAdOnMap() in the mapViewComponent to update the location markers on the map
        if (this.mapViewComponent) {
          if (this.ad_typetomap === 'oneway') {
              this.mapViewComponent.markPortOfDepArrOnMap(); // Call markPortOfDepArrOnMap() if ad_typetomap is 'oneway'
          } else {
              this.mapViewComponent.markPortOfAdOnMap(); // Call markPortOfAdOnMap() for other cases
          }
      }
  } else {
      this.showMapView = false;
  }

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
    const searchcontainertype = this.selectedcontainerType;
    const searchcontainersize = this.selectedcontainerSize;

    if (this.selectedOptions['view'] === 'MAP') {
        this.showMapView = true;

        // Set the selected values
        this.ad_typetomap = this.ad_type;
        this.typetomap = this.type.toLowerCase();
        this.selectedTypePortOfDep = searchPortOfDep;
        this.selectedTypePortOfArr = searchPortOfArr;
        this.selectedcontainertypetomap = searchcontainertype;
        this.selectedcontainersizetomap = searchcontainersize;

        // Call markPortOfAdOnMap() in the mapViewComponent to update the location markers on the map
        if (this.mapViewComponent) {
          this.selectedTypePortOfDep = searchPortOfDep;
          this.selectedTypePortOfArr = searchPortOfArr;
            this.mapViewComponent.markPortOfDepArrOnMap();
        }
    } else {
        if (searchType && searchPortOfDep && searchPortOfArr && searchcontainertype && searchcontainersize) {
            const matchedAds = [];

            for (const ad of this.originalAds) { // Loop over originalAds instead of ads
                let isMatched = false;

                if (ad.ad_type === 'space' && ad.type_of_ad === searchType && ad.port_of_departure === searchPortOfDep && ad.port_of_arrival === searchPortOfArr && ad.container_type === searchcontainertype && ad.container_size === searchcontainersize) {
                    isMatched = true;
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
        } else {
            // No search criteria provided, reset ads to the original list
            this.ads = [...this.originalAds];
            this.currentPage = 1;
        }
    }

    // Calculate the updated total number of pages based on the filtered ads
    this.totalPages;
}

  
  
  
  
  
  
  
  
  
  
  
  
  
  

  backPage() {
    this.router.navigate(['forecast-map']);
  }


  checkNegotiation(company_id: number, ad_id: number): boolean {
    let x = false;
  
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
   
    this.NButtonDisabled = this.checkNegotiation(this.companyId, ad_id);

  }

  
  
  
  
  
  
  
  


  onDeparturePortSelected(port: Port) {
   
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
    this.mapViewComponent.markPortOfAdOnMap();
    this.displayAllAdvertisements();



    // Reload the ViewOtherAdsComponent

  }

  displayAllAdvertisements() {
    debugger
    this.showMapView = false;
    this.selectedView = 'MAP'; // Reset the selected view to 'MAP'
    // this.viewotherAds.getAdvertisement(this.ad_type,this.companyId).subscribe(
    //   (data: Advertisement[]) => {
    //     this.ads = data;
    //   },
    //   error => console.log(error)
    // );
    debugger
    this.viewotherAds.getAdvertisementbytypeofad(this.ad_type,this.type_of_ad,this.companyId).subscribe(
      (data: Advertisement[]) => {
        this.ads = data;
        console.log("type_of_ad"+data)
      },
      error => console.log(error)
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
}  
