import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ForecastingService } from 'src/app/forecasting/forecasting.service';
import { Advertisement, ViewOtherAdsService } from '../view-other-ads.service';

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
  @Input() selectedSizetomap: any;
  @Input() selectedTypePortOfDep: any;
  @Input() selectedTypePortOfArr: any;
  ads: Advertisement[] = [];
  userOS: any;
  mapId: string = '2b03aff8b2fb72a3'; // Replace with your Map ID
  ports: Port[] = [];
  map: google.maps.Map | undefined;
  markers: google.maps.Marker[] = [];
  polyline: google.maps.Polyline | null = null;
  companyID: any;
  ad_type: any;

  constructor(private forecastService: ForecastingService, private adsService: ViewOtherAdsService) {
    this.userOS = navigator.platform;
    
  }

  ngOnInit(): void {
    this.loadMap();
    console.log("dh", this.userOS);
    this.getAllPorts();
   
  }

  ngOnChanges(): void {
    this.getAdvertisement(); // Call getAdvertisement() whenever the inputs change
    this.loadMap();
    console.log("'selectedTypePortOfAd:'",this.selectedTypePortOfAd);
  }
  
  getAdvertisement() {
    debugger
    this.adsService.getAdvertisement(this.ad_typetomap, this.companyID).subscribe(
      (adsdata: Advertisement[]) => {
        this.ads = adsdata;
        console.log("From map view", this.ads);
        this.markPortOfAdOnMap(); // Call markPortOfAdOnMap() after retrieving the advertisements
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
  
        this.loadMap(); // Move the loadMap() call here
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
      zoom: 10,
    };
  
    this.map = new google.maps.Map(
      this.mapContainer.nativeElement,
      mapOptions
    );
  
    console.log('map:', this.map);
  
    if (this.ad_typetomap === 'container' && this.selectedTypePortOfAd) {
      this.markPortOfAdOnMap();
    } else if (this.ad_typetomap === 'space') {
      this.markPortOfDepArrOnMap();
    }
  }
  
  
  getMapCenter(): google.maps.LatLngLiteral | null {
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
    this.clearMarkers();
  
    if (!this.map || !this.selectedTypePortOfAd || !this.selectedSizetomap) {
      return;
    }
  
    const bounds = new google.maps.LatLngBounds();
  
    const portOfAd = this.ports.find(port => port.port_name === this.selectedTypePortOfAd);
  
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
  
    // Fit the map to the bounds
    this.map.fitBounds(bounds);
  
    // Adjust the zoom level if specified
   
  }
  
  
  
  markPortOfDepArrOnMap(): void {
    if (!this.map || !this.selectedTypePortOfDep || !this.selectedTypePortOfArr || !this.selectedSizetomap) {
      return;
    }
  
    const bounds = new google.maps.LatLngBounds();
    const polylineCoordinates: google.maps.LatLng[] = [];
  
    // Clear existing markers and polyline
    this.clearMarkers();
    if (this.polyline) {
      this.polyline.setMap(null);
      this.polyline = null;
    }
  
    // Mark port of departure
    const depPort = this.ports.find(port => port.port_name === this.selectedTypePortOfDep);
    const arrPort = this.ports.find(port => port.port_name === this.selectedTypePortOfArr);
  
    if (depPort && arrPort) {
      const depLatLng = new google.maps.LatLng(depPort.latitude, depPort.longitude);
      const arrLatLng = new google.maps.LatLng(arrPort.latitude, arrPort.longitude);
  
      const depMarker = new google.maps.Marker({
        position: depLatLng,
        title: depPort.port_name,
        map: this.map,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }
      });
  
      const arrMarker = new google.maps.Marker({
        position: arrLatLng,
        title: arrPort.port_name,
        map: this.map,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }
      });
  
      this.markers.push(depMarker);
      this.markers.push(arrMarker);
  
      bounds.extend(depMarker.getPosition() as google.maps.LatLng);
      bounds.extend(arrMarker.getPosition() as google.maps.LatLng);
      polylineCoordinates.push(depLatLng);
      polylineCoordinates.push(arrLatLng);
  
      // Create polyline
      this.polyline = new google.maps.Polyline({
        path: polylineCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: this.map
      });
  
      // Fit the map to the bounds
      this.map.fitBounds(bounds);
  
      // Adjust the zoom level if specified
      if (this.selectedSizetomap) {
        this.map.setZoom(this.selectedSizetomap);
      }
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
