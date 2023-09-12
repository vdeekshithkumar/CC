import { Component, ViewChild, ElementRef, ComponentFactoryResolver, ViewContainerRef, OnInit, ApplicationRef,AfterViewInit  } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ForecastMapService } from './forecast-map.service';
import { SessionService } from 'src/app/session.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { ForecastingTableService } from '../forecasting-table-view/forecasting-table-view.service';
@Component({
  selector: 'app-forecast-map',
  templateUrl: './forecast-map.component.html',
  styleUrls: ['./forecast-map.component.css']
})
export class ForecastMapComponent implements OnInit,AfterViewInit  {
  @ViewChild('mapElement') mapElement!: ElementRef;
  @ViewChild('port', { static: false }) portElement!: ElementRef;
  noPorts = false
  map: any
  port_name: string = ""; 
  port_list:any;
  companyId!: number
  totalSurplusPercentage: number = 0;
totalDeficitPercentage: number = 0;

  portData: any
  markers: google.maps.Marker[] = [];
  Einv: Inventory[] = [];
  selectedPort: any;
  constructor(private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef, private appRef: ApplicationRef
    , private forecastService: ForecastMapService, private sessionService: SessionService,private router:Router,private forecastingtableService:ForecastingTableService) {


  }
  
  ngOnInit(): void {
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {

        this.companyId = companyId;

      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );
    this.forecastingtableService.getAllPorts().subscribe(
      data => {   
        this.port_list = data;
        console.log("Port list fetched: ", this.port_list); 
      },
      error => {
        console.log("ports loading error:" +error);
      }
    );

  }
  options = ['Map', 'Table', 'Surplus Area','Deficit Area'];
  selectedOption = 0;
  selectOption(index: number) {
    this.selectedOption = index;
    if (this.options[index] === 'Table') {
      this.router.navigate(['/forecasting-table-view']);
    }
    if (this.options[index] === 'Map') {
      this.router.navigate(['/forecast-map']);
    }
    if (this.options[index] === 'Surplus Area')
    {
      this.viewSurplus()
    }
    if (this.options[index] === 'Deficit Area')
    {
      this.viewDeficit()
    }
  }
   surplusMarkers: google.maps.Marker[] = [];
 deficitMarkers: google.maps.Marker[] = [];
 ngAfterViewInit() {
  if (this.portElement) {
    // Access the selected value
    this.selectedPort = this.portElement.nativeElement.value;
    console.log("inside after", this.selectedPort);
  }
  this.markers = [];

  // Create an object to store totals for each port code
  const portCodeTotals: { [key: string]: { surplus: number, deficit: number } } = {};

  this.forecastService.getPortData(this.companyId).subscribe(data => {
    this.portData = data;
    if (this.portData && this.portData.length > 0) {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: { lat: +this.portData[0].latitude, lng: +this.portData[0].longitude },
        zoom: 3,
        mapId: '2b03aff8b2fb72a3'
      });
    } else {
      this.noPorts = true;
    }

    for (const port of this.portData) {
      // Calculate the total surplus and deficit for each port code
      if (!portCodeTotals[port.portCode]) {
        portCodeTotals[port.portCode] = { surplus: 0, deficit: 0 };
      }

      portCodeTotals[port.portCode].surplus += port.surplus;
      portCodeTotals[port.portCode].deficit += port.deficit;
    }

    // Iterate through the portData array again to calculate percentages and create markers
    for (const port of this.portData) {
      const total = portCodeTotals[port.portCode].surplus + portCodeTotals[port.portCode].deficit;
      const surplusPercentage = (portCodeTotals[port.portCode].surplus / total) * 100;
      const deficitPercentage = (portCodeTotals[port.portCode].deficit / total) * 100;

      // Determine the icon URL based on percentages
      let iconUrl: string;

      if (surplusPercentage > deficitPercentage) {
        iconUrl = "../assets/images/green-dot.png";
      } else if (deficitPercentage > surplusPercentage) {
        iconUrl = "../assets/images/red-dot.png";
      } else {
        // If surplus and deficit percentages are equal, you can set a default icon here.
        iconUrl = "../assets/images/default-dot.png";
      }

      // Create the marker with the specified icon
      const marker = this.createMarker(port, iconUrl);

      // ...
    }
    // Draw polylines between surplus and nearest deficit markers
    // this.drawPolylines(this.surplusMarkers, this.deficitMarkers);
  });
}


// Helper function to clear markers for a specific port
clearMarkersForPort(port: any) {
  this.surplusMarkers = this.surplusMarkers.filter(marker => {
    const position = marker.getPosition();
    if (position && position.lat() === port.latitude && position.lng() === port.longitude) {
      marker.setMap(null);
      return false; // Remove the marker from the surplusMarkers array
    }
    return true; // Keep other markers
  });

  this.deficitMarkers = this.deficitMarkers.filter(marker => {
    const position = marker.getPosition();
    if (position && position.lat() === port.latitude && position.lng() === port.longitude) {
      marker.setMap(null);
      return false; // Remove the marker from the deficitMarkers array
    }
    return true; // Keep other markers
  });
}

  

  
  createMarker(port: any, iconUrl: string): google.maps.Marker {
    
    const mapMarker = new google.maps.Marker({
      position: { lat: port.latitude, lng: port.longitude },
      map: this.map,
      icon: {
        url: iconUrl,
        scaledSize: new google.maps.Size(10, 10),
        anchor: new google.maps.Point(10 / 2, 10 / 2)
      },
      title: `${port.latitude}, ${port.longitude}`,
    });
    
    // Set the containertype property
    mapMarker.set('containertype', port.containertype);
    mapMarker.set('containersize', port.containersize);
    // Log the containertype value
    console.log(`Containertype set: ${port.containertype}`);
    console.log(`ContainerSize set: ${port.containersize}`);
    
    const infoWindow = new google.maps.InfoWindow();
    infoWindow.setPosition({ lat: port.latitude, lng: port.longitude });
  
    const factory = this.resolver.resolveComponentFactory(FormComponent);
    const componentRef = factory.create(this.viewContainerRef.injector);
    componentRef.instance.portCode = port.portCode;
    componentRef.instance.portId = port.portId;
    componentRef.instance.surplus = port.surplus;
    componentRef.instance.deficit = port.deficit;
    componentRef.instance.containertype=port.containertype;
    componentRef.instance.containersize=port.containersize
    this.appRef.attachView(componentRef.hostView);
    infoWindow.setContent(componentRef.location.nativeElement);
  
    mapMarker.addListener('click', () => {
      infoWindow.open(this.map, mapMarker);
    });
  
    this.markers.push(mapMarker);
    return mapMarker;
  }
  
  // drawPolylines(surplusMarkers: google.maps.Marker[], deficitMarkers: google.maps.Marker[]) {
  //   for (const deficitMarker of deficitMarkers) {
  //     const deficitMarkerPosition = deficitMarker.getPosition();
  //     if (deficitMarkerPosition) {
  //       let closestSurplusMarker: google.maps.Marker | null = null;
  //       let shortestDistance = Infinity;
  
  //       const deficitContainerType = deficitMarker.get('containertype'); // Get the containertype of the deficit marker
  //       const deficitContainerSize = deficitMarker.get('containersize'); // Get the containersize of the deficit marker
  //       console.log(`Deficit ContainerType: ${deficitContainerType}`);
  //       console.log(`Deficit ContainerSize: ${deficitContainerSize}`);
  //       for (const surplusMarker of surplusMarkers) {
  //         const surplusMarkerPosition = surplusMarker.getPosition();
  //         if (surplusMarkerPosition) {
  //           const distance = google.maps.geometry.spherical.computeDistanceBetween(surplusMarkerPosition, deficitMarkerPosition);
  
  //           // Check if both containertype and containersize match for both markers
  //           const surplusContainerType = surplusMarker.get('containertype'); // Get the containertype of the surplus marker
  //           const surplusContainerSize = surplusMarker.get('containersize'); // Get the containersize of the surplus marker
  //           console.log(`Surplus ContainerType: ${surplusContainerType}`);
  //           console.log(`Surplus ContainerSize: ${surplusContainerSize}`);
  //           if (distance < shortestDistance &&
  //               surplusContainerType === deficitContainerType &&
  //               surplusContainerSize === deficitContainerSize) {
  //             closestSurplusMarker = surplusMarker;
  //             shortestDistance = distance;
  //           }
  //         }
  //       }
  
  //       if (closestSurplusMarker) {
  //         const closestSurplusMarkerPosition = closestSurplusMarker.getPosition();
  //         if (closestSurplusMarkerPosition) {
  //           const lineCoordinates = [closestSurplusMarkerPosition, deficitMarkerPosition];
  //           const arrowSymbol: google.maps.Symbol = {
  //             path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  //             scale: 3,
  //             strokeWeight: 1,
  //             fillColor: '#2F54EB',
  //             fillOpacity: 1
  //           };
  
  //           const polylineOptions: google.maps.PolylineOptions = {
  //             path: lineCoordinates,
  //             geodesic: true,
  //             strokeColor: '#2F54EB',
  //             strokeOpacity: 1.0,
  //             strokeWeight: 2,
  //             icons: [{
  //               icon: arrowSymbol,
  //               offset: '100%'
  //             }]
  //           };
  
  //           const polyline = new google.maps.Polyline(polylineOptions);
  //           polyline.setMap(this.map);
  //         }
  //       }
  //     }
  //   }
  // }   
  
  
  onPortSelected(selectedPortName: string) {
    if (selectedPortName === '') {
      // If "Select your port" is chosen, reset the map to its original state
      this.map.setCenter({ lat: 0, lng: 0 }); // Set the center to your original coordinates
      this.map.setZoom(3); // Set the original zoom level
    } else {
      // Find the selected port based on port_name in your port_list
      const selectedPort = this.port_list.find((port: { port_name: string; }) => port.port_name === selectedPortName);
  
      if (selectedPort) {
        // Get the latitude and longitude of the selected port
        const latitude = +selectedPort.latitude;
        const longitude = +selectedPort.longitude;
  
        // Set the map's center to the selected port's location
        this.map.setCenter({ lat: latitude, lng: longitude });
  
        // You can also adjust the zoom level as needed
        this.map.setZoom(10); // Set the desired zoom level
      }
    }
  }
  
  
 
  viewSurplus(){
    this.markers = [];
      this.forecastService.getSurplus(this.companyId).subscribe(data => {
  
        this.portData = data;
        if (this.portData && this.portData.length > 0) {
          this.map = new google.maps.Map(this.mapElement.nativeElement, {
            center: { lat: +this.portData[0].latitude, lng: +this.portData[0].longitude },
            zoom: 3,
            mapId: '2b03aff8b2fb72a3'
          });
        } else {
          this.noPorts = true;
        }
  
        for (const port of this.portData) {
          if (port.surplus> port.deficit){
          let iconUrl = "../assets/images/green-dot.png";
          const mapMarker = new google.maps.Marker({
            position: { lat: port.latitude, lng: port.longitude },
            map: this.map,
            icon: {
              url: iconUrl,
              scaledSize: new google.maps.Size(10, 10),
              anchor: new google.maps.Point(10 / 2, 10 / 2)
            },
            title: "" + port.latitude + ", " + port.longitude,
          });
          const infoWindow = new google.maps.InfoWindow();
          infoWindow.setPosition({ lat: port.latitude, lng: port.longitude })
  
          const factory = this.resolver.resolveComponentFactory(FormComponent);
          const componentRef = factory.create(this.viewContainerRef.injector);
          componentRef.instance.portCode = port.portCode;
          componentRef.instance.portId = port.portId;
          componentRef.instance.surplus = port.surplus;
          componentRef.instance.deficit = port.deficit;
          componentRef.instance.containertype=port.containertype;
          componentRef.instance.containersize=port.containersize
          this.appRef.attachView(componentRef.hostView);
          infoWindow.setContent(componentRef.location.nativeElement);
  
          mapMarker.addListener('click', () => {
            infoWindow.open(this.map, mapMarker);
          });
          this.markers.push(mapMarker);
        }
        }
      })
  }
  getPortName(portId: number): string {
    const port = this.port_list.find((p: { port_id: number, port_name: string }) => p.port_id === portId);
    return port ? port.port_name : '';
}
  onExportClick(): void {
    this.forecastingtableService.getInventoryByIdCID(this.companyId).subscribe(
      (data: Inventory[]) => {
        this.Einv = data.map((item: Inventory) => {
          const portName = this.getPortName(item.port_id);
          return { ...item, port_name: portName };
        });
        console.log("This is Einv with port names:", this.Einv);
        this.onExport();
      },
      error => console.log(error)
    );
  }
  
 onExport(){
  const worksheetName = 'Inventory';
  const excelFileName = 'Inventory.xlsx';
  const header = ['Port Name','Container Type','Container Size','Available','Surplus','Deficit'];
  const data = this.Einv.map((iv) => [iv.port_name,iv.container_type,iv.container_size,iv.available,iv.surplus,iv.deficit]);

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([header, ...data]);
   const columnWidths = [
    { wch: 15 }, // Port Name width: 20
    { wch: 15 }, // Container Type width: 15
    
  ];

  // Apply column widths to worksheet
  worksheet['!cols'] = columnWidths;

  XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
  XLSX.writeFile(workbook, excelFileName);
}
  viewDeficit(){
    this.markers = []
    for (const marker of this.markers) {
      marker.setMap(null);
    }
    this.markers.length = 0;
    this.forecastService.getDeficit(this.companyId).subscribe(data => {

      this.portData = data;
      if (this.portData && this.portData.length > 0 && this.portData[0].latitude && this.portData[0].longitude) {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          center: { lat: +this.portData[0].latitude, lng: +this.portData[0].longitude },
          zoom: 3,
          mapId: '2b03aff8b2fb72a3'
        });
      } else {
        this.noPorts = true;
      }

      for (const port of this.portData) {
        if (port.deficit> port.surplus){
        let iconUrl = "../assets/images/red-dot.png";
        const mapMarker = new google.maps.Marker({
          position: { lat: port.latitude, lng: port.longitude },
          map: this.map,
          icon: {
            url: iconUrl,
            scaledSize: new google.maps.Size(10, 10),
            anchor: new google.maps.Point(10 / 2, 10 / 2)
          },
          title: "" + port.latitude + ", " + port.longitude,
        });
        const infoWindow = new google.maps.InfoWindow();
        infoWindow.setPosition({ lat: port.latitude, lng: port.longitude })

        const factory = this.resolver.resolveComponentFactory(FormComponent);
        const componentRef = factory.create(this.viewContainerRef.injector);
        componentRef.instance.portCode = port.portCode;
        componentRef.instance.portId = port.portId;
        componentRef.instance.surplus = port.surplus;
        componentRef.instance.deficit = port.deficit;
        componentRef.instance.containertype=port.containertype;
        componentRef.instance.containersize=port.containersize
        this.appRef.attachView(componentRef.hostView);
        infoWindow.setContent(componentRef.location.nativeElement);

        mapMarker.addListener('click', () => {
          infoWindow.open(this.map, mapMarker);
        });
        this.markers.push(mapMarker);
      }
      }
    })
}
// nextMarker() {
//   const currentCenter = this.map.getCenter();
//   const currentIndex = this.markers.findIndex(marker => marker.getPosition()?.equals(currentCenter));
//   const nextIndex = (currentIndex + 1) % this.markers.length;
//   const nextMarker = this.markers[nextIndex];
//   this.map.panTo(nextMarker.getPosition());
// }

// previousMarker() {
//   const currentCenter = this.map.getCenter();
//   const currentIndex = this.markers.findIndex(marker => marker.getPosition()?.equals(currentCenter));
//   const previousIndex = (currentIndex - 1 + this.markers.length) % this.markers.length;
//   const previousMarker = this.markers[previousIndex];
//   this.map.panTo(previousMarker.getPosition());
// }


}
interface Inventory {
  port_name:string;
  port_id: number;
  container_type: string;
  container_size: number;
  available: number;
  surplus: number;
  deficit: number;
  // Add other properties if necessary
}
  
