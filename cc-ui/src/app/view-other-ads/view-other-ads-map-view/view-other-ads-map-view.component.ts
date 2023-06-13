import { Component, Input, OnInit } from '@angular/core';
import { ForecastingService } from 'src/app/forecasting/forecasting.service';

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

  port: Port[] = [];

  @Input() selectedDeparturePort: any;
  @Input() selectedArrivalPort: any;
  mapId: string = '2b03aff8b2fb72a3'; // Replace with your Map ID
  ports: any[] = [];
  map: google.maps.Map | undefined;
  directionsService: google.maps.DirectionsService | undefined;
  directionsRenderer!: google.maps.DirectionsRenderer;
  markers: google.maps.Marker[] = [];
  stepDisplay: google.maps.InfoWindow | undefined;
  latitude: any;
  longitude: any;
  arrivalLat: any;
  arrivalLng: any;
  departureLat: any;
  departureLng: any;

 

  constructor(private forecastService: ForecastingService) {}

 

  ngOnInit(): void {
    this.getAllPorts();
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
            const { latitude, longitude } = departurePort.port_name;
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
            const { latitude, longitude } = arrivalPort.port_name;
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
    debugger;
    const mapOptions: google.maps.MapOptions = {
      mapId: this.mapId,

      center: this.getMapCenter(),
      zoom: 3,
    };

    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );

    this.markPortsOnMap();
  }

 

  

  getMapCenter(): google.maps.LatLngLiteral {
    debugger
    if (this.selectedDeparturePort && this.selectedArrivalPort) {
      const centerLat = (this.departureLat + this.arrivalLat) / 2;
      const centerLng = (this.departureLng + this.arrivalLng) / 2;

      return {
        lat: centerLat,
        lng: centerLng
      };
    }

    // Return a default center if either the departure or arrival location is not available
    return {
      lat: 0,
      lng: 0
    };
  }








  markPortsOnMap() {
    this.clearMarkers();
    const bounds = new google.maps.LatLngBounds();

    if (this.selectedDeparturePort && this.departureLat && this.departureLng && this.selectedArrivalPort && this.arrivalLat && this.arrivalLng && this.map) {
      const departureLatLng = new google.maps.LatLng(this.departureLat, this.departureLng);
      const arrivalLatLng = new google.maps.LatLng(this.arrivalLat, this.arrivalLng);

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
      bounds.extend(departureMarker.getPosition()!);
      bounds.extend(arrivalMarker.getPosition()!);

      const polyline = new google.maps.Polyline({
        path: [departureLatLng, arrivalLatLng],
        geodesic: true,
        strokeColor: 'red',
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });

      polyline.setMap(this.map);

      this.map.fitBounds(bounds);
    }
  }


 

  clearMarkers() {
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.markers = [];
  }

 

  onDeparturePortSelected(port: any) {
    this.selectedDeparturePort = port;
    this.markPortsOnMap();
  }

 

  onArrivalPortSelected(port: any) {
    this.selectedArrivalPort = port;
    this.markPortsOnMap();
  }
}