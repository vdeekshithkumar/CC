import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ForecastingService } from 'src/app/forecasting/forecasting.service';
import { Advertisement, ViewOtherAdsService } from '../view-other-ads.service';
export interface Port {
  port_id: number;
  company_id: number;
  port_name: string;
  latitutde: number;
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
  departureLat: number = 0;
departureLng: number = 0;
arrivalLat: number = 0;
arrivalLng: number = 0;

  port: Port[] = [];
 
  @Input() selectedDeparturePort: any;
  @Input() selectedArrivalPort: any;
  @Input() adtype: any;
  @Input() containerTypeId: any;
  ads: Advertisement[] = [];
  userOS:any;
  mapId: string = '2b03aff8b2fb72a3'; // Replace with your Map ID
  ports: any[] = [];
  map: google.maps.Map | undefined;
  directionsService: google.maps.DirectionsService | undefined;
  directionsRenderer!: google.maps.DirectionsRenderer;
  markers: google.maps.Marker[] = [];
  stepDisplay: google.maps.InfoWindow | undefined;
  latitude: any;
  longitude: any;
  polyline: google.maps.Polyline | null = null;
  company_id: any;
  ad: any;
 

  constructor(private forecastService: ForecastingService,private adsService:ViewOtherAdsService) {
    this.userOS = navigator.platform;
    
  }

  ngOnInit(): void {
    console.log("dh",this.userOS);
    this.getAllPorts();
    this.getAdvertisement();
  }
  getAdvertisement() {
    this.adsService.getAdvertisement(this.company_id).subscribe(
      (adsdata: Advertisement[]) => {
        this.ads = adsdata;
        console.log("From map view", this.ads);
        this.markPortsOnMap(); // Call markPortsOnMap() after retrieving the advertisements
      },
      (error: any) => {
        console.error('Error fetching advertisements:', error);
      }
    );
  }
  
  getAllPorts() {
    debugger;
    this.forecastService.getAllPorts().subscribe(
      (data: Port[]) => {
        this.ports = data;
        console.log(JSON.stringify(this.ports));
  
        if (this.selectedDeparturePort) {
          const departurePort = this.ports.find(port => port.port_name === this.selectedDeparturePort);
          console.log("departurePort: " + JSON.stringify(departurePort));
          if (departurePort) {
            const { latitude, longitude } = departurePort;
            console.log("Dfd"+departurePort.port_name);
            this.departureLat = departurePort.latitude;
            console.log("dfd"+this.departureLat)
            this.departureLng = departurePort.longitude;
          }
        }
  
        if (this.selectedArrivalPort) {
          const arrivalPort = this.ports.find(port => port.port_name === this.selectedArrivalPort);
          console.log("arrivalPort: " + JSON.stringify(arrivalPort));
          if (arrivalPort) {
            const { latitude, longitude } = arrivalPort;
            console.log("Dfd"+arrivalPort.port_name);
            this.arrivalLat = arrivalPort.latitude;
            this.arrivalLng = arrivalPort.longitude;
          }
        }
  
        this.loadMap();
      },
      (error: any) => {
        console.error('Error fetching port details:', error);
      }
    );
  }
  
  

  loadMap() {
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
  
    this.markPortsOnMap();
  }
  
  
  
  
  getMapCenter(): google.maps.LatLngLiteral | null {
    if (this.selectedDeparturePort && this.selectedArrivalPort && this.departureLat && this.departureLng && this.arrivalLat && this.arrivalLng) {
      const centerLat = (this.departureLat + this.arrivalLat) / 2;
      const centerLng = (this.departureLng + this.arrivalLng) / 2;
  
      return {
        lat: centerLat,
        lng: centerLng
      };
    }
  
    // Return null if either the departure or arrival location is not available
    return null;
  }
  
  
  
  
  
  
  
  markPortsOnMap() {
    this.clearMarkers();
  
    if (!this.map || !this.selectedDeparturePort || !this.selectedArrivalPort || !this.adtype) {
      return;
    }
  
    const departurePort = this.ports.find(port => port.port_name === this.selectedDeparturePort);
    const arrivalPort = this.ports.find(port => port.port_name === this.selectedArrivalPort);
  
    if (!departurePort || !arrivalPort) {
      return;
    }
    const matchingAds = [];
    for (const ad of this.ads) {
      if (
        ad.type_of_ad === this.adtype.toLowerCase() &&
        ad.port_of_departure === this.selectedDeparturePort.toLowerCase() &&
        ad.port_of_arrival === this.selectedArrivalPort.toLowerCase() &&
        ad.container_type_id === this.containerTypeId
      ) {
        matchingAds.push(ad);
      }
    }
    console.log('Matching Ads:', matchingAds);
    
    
  
   
  
    if (matchingAds.length === 0) {
      // No matching ads found, mark all locations on the map
      this.ports.forEach(port => {
        const latLng = new google.maps.LatLng(port.latitude, port.longitude);
  
        const marker = new google.maps.Marker({
          position: latLng,
          title: port.port_name,
          map: this.map,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
          },
        });
  
        this.markers.push(marker);
      });
  
      return;
    }
  
 

  
    // Matching ads found, mark only departure and arrival locations
    const departureLatLng = new google.maps.LatLng(departurePort.latitude, departurePort.longitude);
    const arrivalLatLng = new google.maps.LatLng(arrivalPort.latitude, arrivalPort.longitude);
  
    const departureMarker = new google.maps.Marker({
      position: departureLatLng,
      title: this.selectedDeparturePort,
      map: this.map,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      },
    });
  
    const arrivalMarker = new google.maps.Marker({
      position: arrivalLatLng,
      title: this.selectedArrivalPort,
      map: this.map,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      },
    });
  
    this.markers.push(departureMarker);
    this.markers.push(arrivalMarker);
  
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(departureMarker.getPosition()!);
    bounds.extend(arrivalMarker.getPosition()!);
    this.map.fitBounds(bounds);
  
    if (this.polyline) {
      this.polyline.setMap(null); // Remove the previous polyline if it exists
    }
  
    const polylineOptions = {
      path: [departureLatLng, arrivalLatLng],
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    };
  
    this.polyline = new google.maps.Polyline(polylineOptions);
    if (this.polyline) {
      this.polyline.setMap(this.map!);
    }
  }
  
  
  

   
  
  clearMarkers() {
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.markers = [];
  
    if (this.directionsRenderer) {
      this.directionsRenderer.setMap(null);
    }
  
    if (this.polyline) {
      this.polyline.setMap(null); // Clear the polyline if it exists
    }
    this.polyline = null; // Set the polyline to null
  }
  
  
  
 
  onDeparturePortSelected(port: any) {
    this.selectedDeparturePort = port;
   
    this.updateDepartureCoordinates();
   
    this.markPortsOnMap();
  }
  
  onArrivalPortSelected(port: any) {
    this.selectedArrivalPort = port;
    
    this.updateArrivalCoordinates();
    
    this.markPortsOnMap();
  }
  

  updateDepartureCoordinates() {
    
    const departurePort = this.ports.find(port => port.port_name === this.selectedDeparturePort);
    if (departurePort) {
      this.departureLat = departurePort.latitude;
      this.departureLng = departurePort.longitude;
    }
  }

  updateArrivalCoordinates() {
    const arrivalPort = this.ports.find(port => port.port_name === this.selectedArrivalPort);
    if (arrivalPort) {
      this.arrivalLat = arrivalPort.latitude;
      this.arrivalLng = arrivalPort.longitude;
    }
}
}