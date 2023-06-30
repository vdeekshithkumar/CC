import { Component, ViewChild, ElementRef, ComponentFactoryResolver, ViewContainerRef, OnInit, ApplicationRef } from '@angular/core';
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
export class ForecastMapComponent implements OnInit {
  @ViewChild('mapElement') mapElement!: ElementRef;
  noPorts = false
  map: any
  port_name="";
  port_list:any;
  companyId!: number
  portData: any
  markers: google.maps.Marker[] = [];
  Einv: Inventory[] = [];
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
  ngAfterViewInit() {
    this.markers = [];
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
        debugger
        console.log(port)
        let iconUrl = "../assets/images/yellow-dot.png";
        iconUrl = (port.surplus > port.deficit) ? "../assets/images/green-dot.png" : "../assets/images/red-dot.png";
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

        this.appRef.attachView(componentRef.hostView);
        infoWindow.setContent(componentRef.location.nativeElement);

        mapMarker.addListener('click', () => {
          infoWindow.open(this.map, mapMarker);
        });
        this.markers.push(mapMarker);
      }
    })

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
  