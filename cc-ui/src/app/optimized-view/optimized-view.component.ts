import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../session.service';
import { ForecastingTableService } from '../forecasting/forecasting-table-view/forecasting-table-view.service';
import * as XLSX from 'xlsx';
import { SharedServiceService } from '../shared-service.service';
import { distinctUntilChanged, filter, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { Subject, Subscription, combineLatest, forkJoin, of } from 'rxjs';
import { CarrierServiceService } from '../carrier-service/carrier-service.service';

@Component({
  selector: 'app-optimized-view',
  templateUrl: './optimized-view.component.html',
  styleUrls: ['./optimized-view.component.css']
})
export class OptimizedViewComponent implements OnInit, AfterViewInit {
  @ViewChild('mapElement', { static: true }) mapElement: ElementRef | undefined;
  map: google.maps.Map | undefined;
  hasFinalServiceData: boolean = false;
  port_list: any[] = [];
  companyId!: number;
  Einv: Inventory[] = [];
  receivedportCode: any;
  receivedcontainerType: any;
  receivedcontainerSize: any;
  inventory_list_by_companyId: Inventory[] = [];
  filteredInventoryList: Inventory[] = [];
  portCodeReceived = false;
  containerTypeReceived = false;
  containerSizeReceived = false;
  service_name?: any;
  public company_id?: number;
  service_id?:number;
  services: any[] = [];
  loading = true;
  router: any;
  public carrierServices: any[] = [];
  latlong:any[]=[];
  private unsubscribe$: Subject<void> = new Subject<void>();
  portCode: any;
  deficit_services: any[] | undefined;
  private latitudeSubscription: Subscription | undefined;
  private longitudeSubscription: Subscription | undefined;
  private latitude: any;
  private longitude: any;
  matchedService:any[] = [];
  filteredInventoryData: Inventory[] = [];
  portseq_no: any;
  final_service: { [serviceId: string]: any[]; } | undefined;
  finalServiceData: { [serviceId: string]: any; } | undefined;
  portdata: {
    port_name: string | null | undefined; latitude: number; longitude: number; 
}[] | undefined;
  constructor(
    private sessionService: SessionService,
    private forecastingtableService: ForecastingTableService,
    private sharedService: SharedServiceService,
    private carrierservice:CarrierServiceService
  ) {}

 

  ngOnInit(): void {
  

   
   
   
  
    this.loadInitialData();
    let latitudeReceived = false;
    let longitudeReceived = false;
    let initMapCalled = false;
    
    this.latitudeSubscription = this.sharedService.PortLatitude$.subscribe((latitude: number) => {
      // Handle latitude updates here
      this.latitude = latitude;
      latitudeReceived = true;
    
      // Check if both latitude and longitude have been received
      if (latitudeReceived && longitudeReceived && !initMapCalled) {
        this.initMap();
        initMapCalled = true;
      }
    });
    
    this.longitudeSubscription = this.sharedService.PortLongitude$.subscribe((longitude: number) => {
      // Handle longitude updates here
      this.longitude = longitude;
      longitudeReceived = true;
    
      // Check if both latitude and longitude have been received
      if (latitudeReceived && longitudeReceived && !initMapCalled) {
        this.initMap();
        initMapCalled = true;
      }
    });
    
    
  
    
   
    combineLatest([
      this.sharedService.selected_port,
      this.sharedService.selectedContainerType$,
      this.sharedService.selectedContainerSize$,
    ])
    .pipe(
      filter(([portCode, containerType, containerSize]) => 
        portCode !== undefined && containerType !== undefined && containerSize !== undefined
      )
    )
    .subscribe(([portCode, containerType, containerSize]) => {
      // Assign the values
      debugger
      this.receivedportCode = portCode;
      this.receivedcontainerType = containerType;
      this.receivedcontainerSize = containerSize;
    
      this.portCodeReceived = true;
      this.containerTypeReceived = true;
      this.containerSizeReceived = true;
    
      // Check if all values are received before calling filterData
      if (
        this.portCodeReceived &&
        this.containerTypeReceived &&
        this.containerSizeReceived
      ) {
        this.filterData(this.receivedportCode, this.receivedcontainerType, this.receivedcontainerSize);
      }
    });

    
   
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    if (this.latitudeSubscription) {
      this.latitudeSubscription.unsubscribe();
    }

    if (this.longitudeSubscription) {
      this.longitudeSubscription.unsubscribe();
    }
  }

  private loadInitialData(): void {
    this.sessionService.getCompanyId()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (companyId: number) => {
          this.companyId = companyId;
          this.loadPortList(); // Load port list after getting company ID
        },
        (error: any) => {
          console.error('Error retrieving company ID:', error);
        }
      );
  }

  public loadPortList(): void {
    this.forecastingtableService.getAllPorts().subscribe(
      (data: any) => {
        this.port_list = data;
        console.log("PortData", this.port_list);
        this.loadInventoryData(); // Load inventory data after getting port list
      },
      (error: any) => {
        console.error('Error retrieving port list:', error);
      }
    );
  }

  private loadInventoryData(): void {
    this.forecastingtableService.getInventoryByIdCID(this.companyId).subscribe(
      (data: Inventory[]) => {
        this.inventory_list_by_companyId = data;
        console.log('Inventory list by company id is fetched:', this.inventory_list_by_companyId);
        this.filteredInventoryList = this.inventory_list_by_companyId;

        
        this.filterData(this.receivedportCode, this.receivedcontainerType, this.receivedcontainerSize);
      },
      (error: any) => {
        console.log('Inventory loading error:', error);
      }
    );
  }
  
  async filterData(receivedportCode: string, receivedcontainerType: string, receivedcontainerSize: string): Promise<void> {

    console.log("inside filter data",this.companyId);
    console.log('Searching for Port Code:', receivedportCode);
    
    this.forecastingtableService.getAllPorts().subscribe(
      (data: any) => {
        this.port_list = data;
        console.log("PortData",this.port_list)
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );
    // Use Array.find() to find the matching port_id
    const matchedPort = this.port_list.find((port: any) => port.port_code === receivedportCode);
  
    if (matchedPort) {
        const matchedPortId = matchedPort.port_id;
        console.log('Matched Port ID:', matchedPortId);
        // Filter the inventory data based on the matchedPortId
        this.forecastingtableService.getInventoryByIdCID(this.companyId).subscribe(
          (data: Inventory[]) => {
            this.inventory_list_by_companyId = data;
            console.log('inv list by company id is fetched:', this.inventory_list_by_companyId);
            
            this.filteredInventoryList = this.inventory_list_by_companyId;
          },
          (error: any) => {
            console.log('inv loading error:', error);
          }
        );
        const filteredport = this.inventory_list_by_companyId.filter((inventory: Inventory) => {
            return inventory.port_id != matchedPortId;
        });

        console.log('Filtered Inventory:', filteredport);
        const filteredInventoryByContainerType = filteredport.filter((inventory: Inventory) => {
            return inventory.container_type === receivedcontainerType;
        });

        console.log('Filtered Inventory by Container Type:', filteredInventoryByContainerType);
        const containerSizeInt = parseInt(receivedcontainerSize, 10);
        const filteredInventoryByContainerSize = filteredInventoryByContainerType.filter((inventory: Inventory) => {
            return parseInt(inventory.container_size, 10) === containerSizeInt;
        });

        console.log('Filtered Inventory by Container Size:', filteredInventoryByContainerSize);

        // Filter inventory data where surplus is greater than deficit
        const filteredInventoryWithSurplus = filteredInventoryByContainerSize.filter((inventory: Inventory) => {
            const surplus = inventory.surplus;
            const deficit = inventory.deficit;
            return surplus > deficit; 
        });
this.filteredInventoryData = filteredInventoryWithSurplus;
        console.log('Filtered Inventory with Surplus > Deficit:', filteredInventoryWithSurplus);

    } else {
        console.log('No matching port found.');
    }
  await this.getDeficitServices(receivedportCode);
}




// Inside your component class
async getDeficitServices(portCode: string) {
  // First, fetch the port_seq_no asynchronously
  try {
    this.portseq_no = await this.carrierservice.getPortSeqNo(portCode).toPromise();
    console.log('Received data from the service:', this.portseq_no);
  } catch (error) {
    console.error('Error:', error);
    this.loading = false;
    throw error;
  }

  // Now, proceed with loading and processing the services
  this.loading = true;

  try {
    const response: any = await this.carrierservice.getServicesforDeficit(this.companyId, portCode).toPromise();
    console.log('Response received from the service:', response);

    this.loading = false;

    const groupedData: { [serviceId: string]: GroupedServiceData } = {};

    for (const item of this.filteredInventoryData) {
      const portIdToMatch = item.port_id;

      for (const serviceId in response) {
        if (response.hasOwnProperty(serviceId)) {
          const serviceData = response[serviceId];
          for (const portSequence of serviceData.portSequences) {
            if (portSequence.port_id === portIdToMatch) {
              if (!groupedData[serviceId]) {
                groupedData[serviceId] = {
                  serviceName: serviceData.serviceName,
                  portSequences: [],
                };
              }
              groupedData[serviceId].portSequences.push(portSequence);
            }
          }
        }
      }
    }

    for (const serviceId in groupedData) {
      if (groupedData.hasOwnProperty(serviceId)) {
        groupedData[serviceId].portSequences.sort((a, b) => b.seq_no - a.seq_no);
      }
    }

    // Log the grouped data
    console.log('Grouped data by service ID:', groupedData);

    // Create a new object to store the first nearest port_seqno data for each service_id
    const firstNearestData: { [serviceId: string]: { serviceName: string, portSequences: any[] } } = {};
    for (const serviceId in groupedData) {
      if (groupedData.hasOwnProperty(serviceId)) {
        const serviceData = groupedData[serviceId];
        let nearestItem = null;
        let nearestDiff = Number.MAX_VALUE;

        for (const item of serviceData.portSequences) {
          const diff = Math.abs(item.seq_no - this.portseq_no);
          if (diff < nearestDiff) {
            nearestDiff = diff;
            nearestItem = item;
          }
        }

        firstNearestData[serviceId] = {
          serviceName: serviceData.serviceName,
          portSequences: nearestItem ? [nearestItem] : [],
        };
      }
    }

    // Log the first nearest data
    console.log('First nearest data by service ID:', firstNearestData);
    this.finalServiceData = firstNearestData;
    await this.getlatitudelongitude( this.finalServiceData);
    console.log('For html',  this.finalServiceData);
    this.hasFinalServiceData = Object.keys(firstNearestData).length > 0;
  } catch (error) {
    console.error('An error occurred:', error);
    this.loading = false;
    throw error;
  }
}
getFinalServiceDataKeys() {
  return Object.keys(this.finalServiceData || {});
}
async getlatitudelongitude(finalServiceData: { [serviceId: string]: any }): Promise<void> {
  // Create a new array to store port data
  const portCoordinates: { latitude: number, longitude: number, port_name: string }[] = [];

  // Iterate through each item in finalServiceData
  for (const serviceId in finalServiceData) {
    if (finalServiceData.hasOwnProperty(serviceId)) {
      const serviceData = finalServiceData[serviceId];

      // Iterate through portSequences in serviceData
      for (const portSequence of serviceData.portSequences) {
        const portIdToMatch = portSequence.port_id;

        // Find the matching port in this.port_list based on port_id
        const matchingPort = this.port_list.find((port: any) => port.port_id === portIdToMatch);

        // If a matching port is found, extract latitude, longitude, and port_name
        if (matchingPort) {
          const latitude = matchingPort.latitude;
          const longitude = matchingPort.longitude;
          const port_name = matchingPort.port_name;

          // Store latitude, longitude, and port_name in the new array
          portCoordinates.push({ latitude, longitude, port_name });
        }
      }
    }
  }

  // Now portCoordinates contains the latitude, longitude, and port_name data for matching ports
  console.log('Port Coordinates:', portCoordinates);
  this.portdata = portCoordinates;
  this.afterinitmap();
}


afterinitmap() {
  console.log("to inside initmap check", this.latlong);

  // Check if the mapElement exists and if both latitude and longitude are defined
  if (this.mapElement && this.latitude !== undefined && this.longitude !== undefined) {
    const mapElement = this.mapElement.nativeElement;
    const mapOptions: google.maps.MapOptions = {
      center: { lat: this.latitude, lng: this.longitude },
      zoom: 3,
      mapId: '2b03aff8b2fb72a3'
    };

    this.map = new google.maps.Map(mapElement, mapOptions);

    // Add a red marker at the specified latitude and longitude
    const redMarker = new google.maps.Marker({
      position: { lat: this.latitude, lng: this.longitude },
      map: this.map,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new google.maps.Size(30, 30)
      },
      title: this.receivedportCode
    });

    // Check if this.portdata is defined
    if (this.portdata) {
      // Iterate through each data in this.portdata and add a green marker for each
      for (const data of this.portdata) {
        const greenMarker = new google.maps.Marker({
          position: { lat: data.latitude, lng: data.longitude },
          map: this.map,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            scaledSize: new google.maps.Size(30, 30)
          },
          title: data.port_name
        });

        // Create a polyline from the green marker to the red marker
        const polyline = new google.maps.Polyline({
          path: [
            { lat: data.latitude, lng: data.longitude },
            { lat: this.latitude, lng: this.longitude }
          ],
          geodesic: true,
          strokeColor: '#00FF00', // Green color
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        // Set the polyline on the map
        polyline.setMap(this.map);
      }
    }
  }
}











ngAfterViewInit() {
    this.initMap();
}
initMap() {
  console.log("to inside initmap check", this.latlong);

  // Check if the mapElement exists and if both latitude and longitude are defined
  if (this.mapElement && this.latitude !== undefined && this.longitude !== undefined) {
    const mapElement = this.mapElement.nativeElement;
    const mapOptions: google.maps.MapOptions = {
      center: { lat: this.latitude, lng: this.longitude },
      zoom: 3,
      mapId: '2b03aff8b2fb72a3'
    };

    this.map = new google.maps.Map(mapElement, mapOptions);

    // Add a red marker at the specified latitude and longitude
    const redMarker = new google.maps.Marker({
      position: { lat: this.latitude, lng: this.longitude },
      map: this.map,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new google.maps.Size(30, 30)
      },
      title: this.receivedportCode
    });

   
  }
}


  onPortSelected(selectedPortName: string) {
    if (selectedPortName === 'Select Port') {
      window.location.reload();

      if (this.map) {
        this.map.setCenter({ lat: 0, lng: 0 });
        this.map.setZoom(3);
      }
    } else {
      const selectedPort = this.port_list.find((port: { port_name: string; }) => port.port_name === selectedPortName);

      if (selectedPort && this.map) {
        const latitude = +selectedPort.latitude;
        const longitude = +selectedPort.longitude;

        this.map.setCenter({ lat: latitude, lng: longitude });
        this.map.setZoom(10);
      }
    }
  }
  searchAds() {
    if (this.receivedportCode && this.receivedcontainerType && this.receivedcontainerSize) {
      // Set all values in the SharedService using a single function call
      this.sharedService.setValues({
        portCode: this.receivedportCode,
        containerType: this.receivedcontainerType,
        containerSize: this.receivedcontainerSize,
      });
  
      // Navigate to the view-other-ads component
      this.router.navigate(['/view-other-ads']);
    }
  }
  onExport() {
    const worksheetName = 'Inventory';
    const excelFileName = 'Inventory.xlsx';
    const header = ['Port Name', 'Container Type', 'Container Size', 'Available', 'Surplus', 'Deficit'];
    const data = this.Einv.map((iv) => [iv.port_name, iv.container_type, iv.container_size, iv.available, iv.surplus, iv.deficit]);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([header, ...data]);
    const columnWidths = [
      { wch: 15 },
      { wch: 15 },
    ];

    worksheet['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
    XLSX.writeFile(workbook, excelFileName);
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
        this.onExport();
      },
      (error: any) => console.error(error)
    );
  }
}

interface Inventory {
  port_name: string;
  port_id: number;
  container_type: string;
  container_size: any;
  available: number;
  surplus: number;
  deficit: number;
} 

interface GroupedServiceData {
  serviceName: string;
  portSequences: any[]; 
  
}
