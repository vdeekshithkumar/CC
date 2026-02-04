import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SessionService } from 'src/app/session.service';
import { CarrierServiceService } from '../carrier-service.service';
import { ActivatedRoute, Router } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-service-route',
  templateUrl: './service-route.component.html',
  styleUrls: ['./service-route.component.css']
})
export class ServiceRouteComponent implements OnInit {
  @ViewChild('mapElement') mapElement!: ElementRef;
  public company_id?: number;
  public port_id?: number;
  companyId: any;
  servicename: any;
  userId: any;
  seq_no?: number;
  latitude?: number;
  longitude?: number;
  port_code?: string;
  port_name?: string;
  service_name?: string;
  service_id?: number;
  selectedService: any;
  services: any[] = [];
  servicenames: any[] = [];
  companyName: any;
  selectedServiceName!: string;
  isLoading: boolean = false;
  getCompanyId() {
    return this.company_id;
  }
  map!: google.maps.Map;
  constructor(private sessionService: SessionService, private carrierservice: CarrierServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.map = new google.maps.Map(document.getElementById('map-container'), {
      zoom: 4,
      center: { lat: 22, lng: 22 },
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
    });

    this.route.params.subscribe((params: { [x: string]: any; }) => {
      const serviceName = params['serviceName'];
      this.getServiceDetails(serviceName);
    });

    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        this.companyName = this.companyName;
        console.log('company ID is :', companyId);
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
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
    this.route.params.subscribe(params => {
      const serviceName = params['serviceName'];
      this.isLoading = true;
      this.carrierservice.getCarrierServicesbySName(serviceName).subscribe(service => {
        this.isLoading = false;
        if (service) {
          this.addMarker(service);
        }
      }, error => {
        this.isLoading = false;
        console.warn("Error fetching service details", error);
      });
    });

    this.carrierservice.getCarrierServicesbyCId(this.companyId).subscribe(
      (data: any[]) => {
        for (let i = 0; i < data.length; i++) {
          const service = data[i];
          console.log("Carrier service", service);
          this.company_id = service.company_id;
          this.service_name = service.service_name;
          this.service_id = service.service_id;
          this.services = data;
        }
      },
      error => {
        console.warn("oninit error", error);
      }
    );
  }

  addMarker(service: any): void {
    if (service.length < 2) {
      console.warn('Not enough points to create a route.');
      return;
    }

    const polylinePath = [];
    let bounds = new google.maps.LatLngBounds();

    // Create markers and polyline path
    for (let i = 0; i < service.length; i++) {
      const serviceItem = service[i];
      let markerColor = '#FFA500'; // Red color for starting point
      if (i > 0) {
        markerColor = '#FFFF00'; // Yellow color for other points
      }

      if (
        serviceItem.port_name !== undefined &&
        serviceItem.latitude !== undefined &&
        serviceItem.longitude !== undefined
      ) {
        const marker = new google.maps.Marker({
          position: { lat: serviceItem.latitude, lng: serviceItem.longitude },
          map: this.map,
          title: serviceItem.port_name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: markerColor,
            fillOpacity: 1,
            strokeColor: '#000',
            strokeWeight: 1,
            scale: 5
          },
        });

        bounds.extend(marker.getPosition() as google.maps.LatLng);
        polylinePath.push(marker.getPosition() as google.maps.LatLng)

        // Add arrow icon between ports (except for the last port)
        if (i < service.length - 1) {
          const lineSymbol = {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 2,
            strokeColor: '#0000FF',
          };

          // Create a polyline between two consecutive markers
          const arrowLine = new google.maps.Polyline({
            path: [
              marker.getPosition() as google.maps.LatLng,
              new google.maps.LatLng(service[i + 1].latitude, service[i + 1].longitude)
            ],
            strokeColor: '#0000FF',
            strokeOpacity: 1.0,
            strokeWeight: 1,
            geodesic: true,
          });

          // Set the arrow symbol on the polyline
          arrowLine.setOptions({
            icons: [{
              icon: lineSymbol,
              offset: '100%'
            }]
          });

          // Add the polyline to the map
          arrowLine.setMap(this.map);
        }
      } else {
        console.warn('Port name, latitude, or longitude is undefined in a service object.');
      }
    }

    // Connect the last point to the first point to create a closed loop
    polylinePath.push(polylinePath[0]);
    const arrowSymbol = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      scale: 2,
      strokeColor: '#0000FF'
    };

    // Create a Polyline with arrows between the ports
    const polyline = new google.maps.Polyline({
      path: polylinePath, // Your array of LatLng points
      strokeColor: '#0000FF',
      strokeOpacity: 1.0,
      strokeWeight: 1,
      icons: [{
        icon: arrowSymbol,
        offset: '50%', // Adjust this value for spacing between arrows
        repeat: '80px' // Adjust this value for the distance between arrows
      }],
      geodesic: true,
      map: this.map, // Reference to your Google Map object
    });


    // Adjust map bounds to fit all markers
    this.map.fitBounds(bounds);
  }

  async getServiceDetails(serviceName: string) {
    try {
      const data: any[] = await this.carrierservice.getCarrierServicesbySName(serviceName).toPromise();
      this.selectedServiceName = serviceName;
      for (let i = 0; i < data.length; i++) {
        const service = data[i];
        console.log("Carrier service Name based data", service);
        this.service_id = service.service_id;
        this.port_id = service.port_id;
        this.port_code = service.port_code;
        this.port_name = service.port_name;
        this.seq_no = service.seq_no;
        this.latitude = service.latitude;
        this.longitude = service.longitude;
        this.services = data;

      }
    } catch (error) {
      console.warn("oninit error", error);
    }
  }


}
