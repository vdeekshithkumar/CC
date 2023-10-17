import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ForecastingService } from 'src/app/forecasting/forecasting.service';
import { Advertisement, ViewOtherAdsService } from '../view-other-ads.service';
import { SessionService } from 'src/app/session.service';

export interface Port {
  port_id: number;
  company_id: number;
  port_name: string;
  latitude: number;
  longitude: number;
}

declare const google: any;

@Component({
  selector: 'app-view-other-ads-map-view',
  templateUrl: './view-other-ads-map-view.component.html',
  styleUrls: ['./view-other-ads-map-view.component.css']
})
export class ViewOtherAdsMapViewComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  @Input() ad_typetomap: any;
  @Input() typetomap: any;
  @Input() selectedTypePortOfAd: any;
  @Input() selectedTypePortOfDep: any;
  @Input() selectedTypePortOfArr: any;
  @Input()selectedcontainertypetomap:any;
  @Input()selectedcontainersizetomap:any;
  ads: Advertisement[] = [];
 
  companyId: any;
  mapId: string = '2b03aff8b2fb72a3'; 
  ports: Port[] = [];
  map: google.maps.Map | undefined;
  markers: google.maps.Marker[] = [];
  polyline: google.maps.Polyline | null = null;
  companyID: any;
  ad_type: any;

  constructor(private forecastService: ForecastingService,private sessionService: SessionService, private adsService: ViewOtherAdsService) {
  
    
  }

  ngOnInit(): void {
  
    this.getAllPorts();
   
   
  }
  ngAfterViewInit(): void {
    this.loadMap();
  }
  ngOnChanges(): void {
    // Update the map when inputs change
    if (this.map) {
      this.loadMap();
    }
    this.getAdvertisement();
    console.log("'selectedTypePortOfAd:'", this.selectedTypePortOfAd);
  }
  
  getAdvertisement() {
     this.sessionService.getCompanyId().subscribe(



      (companyId: number) => {



        this.companyId = companyId;



        console.log('company ID is :', companyId);



      },



      (error: any) => {




        console.error('Error retrieving company ID:', error);



      }



    );
    debugger
    this.adsService.getAdvertisement(this.ad_typetomap, this.companyId).subscribe(
      (adsdata: Advertisement[]) => {
        this.ads = adsdata;
        console.log("From map view", this.ads);
      },
      (error: any) => {
        console.error('Error fetching advertisements:', error);
      }
    );
  }
  
  
  getAllPorts() {
    this.forecastService.getAllPorts().subscribe(
      (data: Port[]) => {
        this.ports = data;
        console.log(JSON.stringify(this.ports));
  
        // Initialize the map here
        this.loadMap();
      },
      (error: any) => {
        console.error('Error fetching port details:', error);
      }
    );
  }
  
  
  loadMap() {
    debugger
    if (!this.mapContainer || !this.mapContainer.nativeElement) {
      return;
    }
  
    const mapOptions: google.maps.MapOptions = {
      mapId: this.mapId,
      center: this.getMapCenter(),
      zoom: 3,
    };
  
    this.map = new google.maps.Map(
      this.mapContainer.nativeElement,
      mapOptions
    );
  
  
  
    if (this.ad_typetomap === 'container') {
      this.markPortOfAdOnMap();
    } else if (this.ad_typetomap === 'space') {
      this.markPortOfDepArrOnMap();
    }
  }
  
  
  getMapCenter(): google.maps.LatLngLiteral | null {
    debugger
    if (this.selectedTypePortOfAd) {
      const portOfAd = this.ports.find(port => port.port_name === this.selectedTypePortOfAd);

      if (portOfAd) {
        return {
          lat: portOfAd.latitude,
          lng: portOfAd.longitude
        };
      }
    }

    return null;
  }
  markPortOfAdOnMap(): void {
    if (!this.map || !this.typetomap || !this.selectedTypePortOfAd || !this.selectedcontainertypetomap || !this.selectedcontainersizetomap) {
      return;
    }
  
    const bounds = new google.maps.LatLngBounds();
    const matchingAds = [];
  
    // Find ads with matching port_of_ad, container_type, and container_size
    for (const ad of this.ads) {
      if (
        ad.type_of_ad == this.typetomap&&
        ad.port_of_ad === this.selectedTypePortOfAd &&
        ad.container_type === this.selectedcontainertypetomap &&
        ad.container_size === this.selectedcontainersizetomap
      ) {
        matchingAds.push(ad);
      }
    }
  
    // Clear existing markers
    this.clearMarkers();
  
    // Mark ports of ads on the map
    for (const ad of matchingAds) {
      const portOfAd = this.ports.find(port => port.port_name === ad.port_of_ad);
  
      if (portOfAd) {
        const portLatLng = new google.maps.LatLng(portOfAd.latitude, portOfAd.longitude);
  
        const marker = new google.maps.Marker({
          position: portLatLng,
          title: portOfAd.port_name,
          map: this.map,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }
        });
  
        this.markers.push(marker);
        bounds.extend(marker.getPosition() as google.maps.LatLng);
      }
    }
  
    // Adjust the zoom level by explicitly specifying bounds
    const zoomLevel = 5; // You can adjust this value as needed
    const center = bounds.getCenter();
    const newBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(center.lat() - 1, center.lng() - 1),
      new google.maps.LatLng(center.lat() + 1, center.lng() + 1)
    );
  
    // Set the new bounds and zoom level
    this.map.fitBounds(newBounds);
  }
  
  
  
  
  
  
  
  
  
  
  
  markPortOfDepArrOnMap(): void {
    if (!this.map ||!this.typetomap|| !this.selectedTypePortOfDep || !this.selectedTypePortOfArr || !this.selectedcontainertypetomap || !this.selectedcontainersizetomap) {
      return;
    }
  
    const bounds = new google.maps.LatLngBounds();
    const matchingAds = [];
  
    // Find ads with matching port_of_departure, port_of_arrival, container_type, and container_size
    for (const ad of this.ads) {
      if (
        ad.type_of_ad === this.typetomap &&
        ad.port_of_departure === this.selectedTypePortOfDep &&
        ad.port_of_arrival === this.selectedTypePortOfArr &&
        ad.container_type === this.selectedcontainertypetomap &&
        ad.container_size === this.selectedcontainersizetomap
      ) {
        matchingAds.push(ad);
      }
    }
  
    // Clear existing markers and polylines
    this.clearMarkers();
    if (this.polyline) {
      this.polyline.setMap(null);
      this.polyline = null;
    }
  
    // Mark ports of ads on the map and draw polyline between them
    for (const ad of matchingAds) {
      const portOfDep = this.ports.find(port => port.port_name === ad.port_of_departure);
      const portOfArr = this.ports.find(port => port.port_name === ad.port_of_arrival);
  
      if (portOfDep && portOfArr) {
        const portDepLatLng = new google.maps.LatLng(portOfDep.latitude, portOfDep.longitude);
        const portArrLatLng = new google.maps.LatLng(portOfArr.latitude, portOfArr.longitude);
  
        // Create markers for both ports
        const portDepMarker = new google.maps.Marker({
          position: portDepLatLng,
          title: portOfDep.port_name,
          map: this.map,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }
        });
  
        const portArrMarker = new google.maps.Marker({
          position: portArrLatLng,
          title: portOfArr.port_name,
          map: this.map,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
          }
        });
  
        // Add the markers to the map
        this.markers.push(portDepMarker);
        this.markers.push(portArrMarker);
  
        // Extend bounds to include both port markers
        bounds.extend(portDepLatLng);
        bounds.extend(portArrLatLng);
  
        // Create a polyline between the ports
        const polylineOptions: google.maps.PolylineOptions = {
          path: [portDepLatLng, portArrLatLng],
          geodesic: true,
          strokeColor: '#FF0000', // You can change the color of the polyline here
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: this.map
        };
  
        this.polyline = new google.maps.Polyline(polylineOptions);
  
        // Add the polyline to the map
        this.polyline!.setMap(this.map);
      }
    }
  
    // Fit the map to the bounds
    this.map.fitBounds(bounds);
  
    // Check if the bounds contain only a single marker
    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
      // Set the zoom level directly to 3 if there is only one marker
      this.map.setZoom(3);
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  clearMarkers() {
    debugger
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null); // Remove the marker from the map
    }
    this.markers = []; // Clear the markers array
  }
  
}
