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
  port_of_arrival: any;

  selectedOptions: { [key: string]: string } = {
    type: '',
    view: '',
    size: ''
  };
  currentPage = 1; // Current page number
  adsPerPage = 3; // Number of ads to display per page
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
  ad_type: any;
  get totalPages(): number {
    return Math.ceil(this.ads.length / this.adsPerPage);
  }


  get currentAds(): Advertisement[] {
    const startIndex = (this.currentPage - 1) * this.adsPerPage;
    const endIndex = startIndex + this.adsPerPage;
    return this.ads.slice(startIndex, endIndex);
  }



  // Function to go to the previous page
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

  userId: any;
  getCompanyId() {
    return this.company_id;
  }
  constructor(private sessionService: SessionService, private location: Location, private renderer: Renderer2, private router: Router, private viewotherAds: ViewOtherAdsService, private uploadInventoryservice: UploadInventoryservice, private forecastService: ForecastMapService) {

  }
  ngOnInit(): void {
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
  searchAdvertisements() {
    if (!this.type || !this.port_of_departure || !this.port_of_arrival || !this.selectedView || !this.selectedSize) {
      this.showNoSelectionMessage = true;
      this.showMapView = false;
      this.showListView = true; // Show the list view component
      return;
    }
  
    this.showNoSelectionMessage = false;
  
    if (this.selectedView === 'MAP') {
      // Render the map view component
      this.showMapView = true;
      this.showListView = false; // Hide the list view component
      this.adtype = this.type;
      console.log("From list to map", this.adtype);
      this.selectedDeparturePort = this.port_of_departure;
      this.selectedArrivalPort = this.port_of_arrival;
      this.container_size.forEach((container: Containers) => {
        if (container.type === this.selectedSize) {
          console.log('Container Type ID:', container.container_type_id);
          this.containerTypeId = container.container_type_id; // Assign the container_type_id to the component property
        }
      });
      console.log("from list to map con_type_id", this.containerTypeId);
      // Call markPortsOnMap() of the map view component
      if (this.mapViewComponent) {
        this.mapViewComponent.clearMarkers();
        this.mapViewComponent.markPortsOnMap();
        setTimeout(() => {
          this.mapViewComponent.markPortsOnMap();
        }, 0);
      }
    } else {
      // Render the list view component
      this.showMapView = false;
      this.showListView = true; // Show the list view component
      this.noResultsMatched = false;
      const selectedType = this.type;
      const selectedDeparture = this.port_of_departure;
      const selectedArrival = this.port_of_arrival;
  
      this.viewotherAds.getAdvertisement(this.ad_type,this.companyId).subscribe(
        (data: Advertisement[]) => {
          let filteredAds = data;
  
          if (selectedDeparture && selectedArrival) {
            filteredAds = filteredAds.filter(ad => {
              let isTypeMatch = ad.type_of_ad.toLowerCase().trim() === selectedType.toLowerCase().trim();
              let isPortMatch = ad.port_of_departure === selectedDeparture && ad.port_of_arrival === selectedArrival;
              return isTypeMatch && isPortMatch;
            });
          }
  
          // Filter and display the advertisements based on the selected size and its corresponding container_type_id
          if (this.selectedSize) {
            const selectedContainerTypeId = this.container_size.find((container: Containers) => container.type === this.selectedSize)?.container_type_id;
            if (selectedContainerTypeId) {
              filteredAds = filteredAds.filter(ad => ad.container_type_id === selectedContainerTypeId);
            }
          }
  
          if (filteredAds.length > 0) {
            // Matching advertisements found, update map view
            this.showNoResultsMessage = false;
            this.ads = filteredAds;
  
            // Update map view with filtered locations
            if (this.mapViewComponent) {
              this.mapViewComponent.clearMarkers();
              this.mapViewComponent.updateMarkers(filteredAds);
            }
          } else {
            // No matching advertisements found, display all locations
            this.showNoResultsMessage = true;
            this.ads = data;
  
            // Update map view with all locations
            if (this.mapViewComponent) {
              this.mapViewComponent.clearMarkers();
              this.mapViewComponent.updateMarkers(data);
            }
          }
  
          // Log the filtered advertisements
          console.log('Filtered Advertisements:', this.ads);
        },
        error => console.log(error)
      );
    }
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
