import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../session.service';
import { ForecastingTableService } from '../forecasting/forecasting-table-view/forecasting-table-view.service';
import * as XLSX from 'xlsx';
import { SharedServiceService } from '../shared-service.service';
import { distinctUntilChanged, filter, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { Subject, Subscription, combineLatest, forkJoin, of, zip } from 'rxjs';
import { CarrierServiceService } from '../carrier-service/carrier-service.service';
import { values } from 'lodash';

@Component({
  selector: 'app-optimized-view',
  templateUrl: './optimized-view.component.html',
  styleUrls: ['./optimized-view.component.css']
})
export class OptimizedViewComponent implements OnInit, AfterViewInit {
  @ViewChild('mapElement', { static: true }) mapElement: ElementRef | undefined;
  map: google.maps.Map | undefined;

  port_list: any[] = [];
  companyId!: number;
  Einv: Inventory[] = [];
  noServiceAvailable: boolean = false;
  receiveddeficitportCode: any;
  receiveddeficitcontainerType: any;
  receiveddeficitcontainerSize: any;
   deficitlatitude: any;
  deficitlongitude: any;
  receivedsurplusportCode: any;
  receivedsurpluscontainerType: any;
  receivedsurpluscontainerSize: any;
  surpluslatitude: any;
  surpluslongitude: any;
  inventory_list_by_companyId: Inventory[] = [];
  filteredInventoryList: Inventory[] = [];

  service_name?: any;
  public company_id?: number;
  service_id?:number;
  services: any[] = [];
  loading:boolean = true;
  router: any;
  public carrierServices: any[] = [];
  latlong:any[]=[];
  private unsubscribe$: Subject<void> = new Subject<void>();
  portCode: any;

 
  
  matchedService:any[] = [];
  filteredInventoryData: Inventory[] = [];
  portseq_no: any;
  final_service: { [serviceId: string]: any[]; } | undefined;
  finalServiceData: { [serviceId: string]: any; } | undefined;
  portdata: {
    port_name: string | null | undefined; latitude: number; longitude: number; 
}[] | undefined;
  filteredsurplusInventoryData: Inventory[]=[];
  surplusportdata: {
    port_name: string | null | undefined; latitude: number; longitude: number; 
}[] | undefined;

portcodereceived:boolean = false;
groupeData: { [serviceId: string]: GroupedServiceData } = {};
  deficitPortData: { [serviceId: string]: { serviceName: string; portSequences: any[]; }; } | undefined;
  groupedsurplus: { [serviceId: string]: { serviceName: string; portSequences: any[]; }; } | undefined;
  surplusPortData: { [serviceId: string]: { serviceName: string; portSequences: any[]; }; } | undefined;
  showNoServiceAvailableMessage: boolean =false;
  showNoDeficitAvailableMessage: boolean = false;
  
  constructor(
    private sessionService: SessionService,
    private forecastingtableService: ForecastingTableService,
    private sharedService: SharedServiceService,
    private carrierservice:CarrierServiceService
  ) {}

  onBackButtonClick() {
    // Add logic for the back button click event
    this.router.navigateByUrl('/forecast-map');
  }

  ngOnInit(): void {
    this.loadInitialData();
   
    
    this.sharedService.valuesforis$.subscribe(valuesfordeficit => {
      this.receiveddeficitportCode = valuesfordeficit.deficitportCode;
      this.receiveddeficitcontainerType = valuesfordeficit.deficitcontainerType;
      this.receiveddeficitcontainerSize = valuesfordeficit.deficitcontainerSize;
      this.deficitlatitude = valuesfordeficit.deficitlatitude;
      this.deficitlongitude = valuesfordeficit.deficitlongitude;
      
    });


this.sharedService.valuesforsurplus$.subscribe(valuesforsurplus => {
  this.receivedsurplusportCode = valuesforsurplus.surplusportCode;
  this.receivedsurpluscontainerType = valuesforsurplus.surpluscontainerType;
  this.receivedsurpluscontainerSize = valuesforsurplus.surpluscontainerSize;
  this.surpluslatitude = valuesforsurplus.surpluslatitude;
  this.surpluslongitude = valuesforsurplus.surpluslongitude;
})


   
   
  
    
   
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

        
        if (this.receiveddeficitportCode && this.receiveddeficitcontainerType && this.receiveddeficitcontainerSize) {
          this.filterData(this.receiveddeficitportCode, this.receiveddeficitcontainerType, this.receiveddeficitcontainerSize);
      } else if(this.receivedsurplusportCode && this.receivedsurpluscontainerType && this.receivedsurpluscontainerSize) {
          this.filtersurplusData(this.receivedsurplusportCode, this.receivedsurpluscontainerType, this.receivedsurpluscontainerSize);
      }
      
      },
      (error: any) => {
        console.log('Inventory loading error:', error);
      }
    );
  }
 async filtersurplusData(receivedsurplusportCode: any, receivedsurpluscontainerType: any, receivedsurpluscontainerSize: any) {
   console.log("filtersurplusdata methos is executed");
   console.log("filtersurplusdata methos is executed port value received",receivedsurplusportCode);
   console.log("filtersurplusdata methos is executed type received" ,receivedsurpluscontainerType);
   console.log("filtersurplusdata methos is executed size received",receivedsurpluscontainerSize);
   console.log("inside filter data",this.companyId);
   
   
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
   const matchedsurplusPort = this.port_list.find((port: any) => port.port_code === receivedsurplusportCode);
 
   if (matchedsurplusPort) {
       const matchedsurplusPortId = matchedsurplusPort.port_id;
       console.log('Matched Port ID:', matchedsurplusPortId);
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
       const filteredsurplusport = this.inventory_list_by_companyId.filter((inventory: Inventory) => {
           return inventory.port_id != matchedsurplusPortId;
       });

       console.log('Filtered Inventory:', filteredsurplusport);
       const filteredsurplusByContainerType = filteredsurplusport.filter((inventory: Inventory) => {
           return inventory.container_type === this.receivedsurpluscontainerType;
       });

       console.log('Filtered Inventory by Container Type:', filteredsurplusByContainerType);
       const containerSizeInt = parseInt(receivedsurpluscontainerSize, 10);
       const filteredsurplusByContainerSize = filteredsurplusByContainerType.filter((inventory: Inventory) => {
           return parseInt(inventory.container_size, 10) === containerSizeInt;
       });

       console.log('Filtered Inventory by Container Size:', filteredsurplusByContainerSize);

       // Filter inventory data where surplus is greater than deficit
       const filteredInventoryWithSurplus = filteredsurplusByContainerSize.filter((inventory: Inventory) => {
           const surplus = inventory.surplus;
           const deficit = inventory.deficit;
           return surplus < deficit; 
       });
this.filteredsurplusInventoryData = filteredInventoryWithSurplus;
       console.log('Filtered Inventory with Surplus > Deficit:', filteredInventoryWithSurplus);

   } else {
       console.log('No matching port found.');
   }
 await this.getSurplusServices(receivedsurplusportCode);
  }
  async getSurplusServices(receivedsurplusportCode: any) {
    try {
        this.loading = true;
        // Await the retrieval of port sequence number
        this.portseq_no = await this.carrierservice.getPortSeqNo(receivedsurplusportCode).toPromise();
        console.log('Received data from the service:', this.portseq_no);

        // Get the surplus response data
        const surplusresponse: any = await this.carrierservice.getServicesforSurplus(this.companyId, receivedsurplusportCode).toPromise();
        console.log('Response received from the service for surplus', surplusresponse);

        // Initialize an object to store grouped surplus data
        const groupedsurplusData: { [serviceId: string]: GroupedServiceData } = {};

        // Loop through the filtered surplus inventory data
        for (const item of this.filteredsurplusInventoryData) {
            const portIdToMatch = item.port_id;

            // Iterate through the surplus response data
            for (const serviceId in surplusresponse) {
                if (surplusresponse.hasOwnProperty(serviceId)) {
                    const serviceData = surplusresponse[serviceId];
                    // Check for matching port sequences and group the data accordingly
                    for (const portSequence of serviceData.portSequences) {
                        if (portSequence.port_id === portIdToMatch) {
                            if (!groupedsurplusData[serviceId]) {
                                groupedsurplusData[serviceId] = {
                                    serviceName: serviceData.serviceName,
                                    portSequences: [],
                                };
                            }
                            groupedsurplusData[serviceId].portSequences.push(portSequence);
                        }
                    }
                }
            }
        }

        // Sort the port sequences for each service ID in the grouped surplus data
        for (const serviceId in groupedsurplusData) {
            if (groupedsurplusData.hasOwnProperty(serviceId)) {
                groupedsurplusData[serviceId].portSequences.sort((a, b) => a.seq_no - b.seq_no);
            }
        }

        // Log the grouped data
        console.log('Grouped data by service ID:', groupedsurplusData);

        // Update the surplus data and manage the no service available message
        this.groupedsurplus = groupedsurplusData;
        if (!this.groupedsurplus || Object.keys(this.groupedsurplus).length === 0) {
            this.showNoServiceAvailableMessage = true;
        } else {
            this.showNoServiceAvailableMessage = false;
        }

        // Call the function to get surplus latitude and longitude
        await this.getsurpluslatitudelongitude(this.groupedsurplus);
        console.log('For html', this.groupedsurplus);

    } catch (error) {
        // If an error occurs during processing, log it and throw the error
        console.error('An error occurred:', error);
        throw error;
    } finally {
        // Set loading to false after the process is completed
        this.loading = false;
    }
}


  async getsurpluslatitudelongitude(groupedsurplus: { [serviceId: string]: any }): Promise<void> {
    const portCoordinates: { [serviceId: string]: { serviceName: string, portSequences: any[] } } = {};

  for (const serviceId in groupedsurplus) {
    if (groupedsurplus.hasOwnProperty(serviceId)) {
      const serviceData = groupedsurplus[serviceId];

      // Initialize an empty array for the portSequences if it doesn't exist
      if (!portCoordinates[serviceId]) {
        portCoordinates[serviceId] = {
          serviceName: serviceData.serviceName,
          portSequences: [],
        };
      }

      for (const portSequence of serviceData.portSequences) {
        const portIdToMatch = portSequence.port_id;
        const matchingPort = this.port_list.find((port: any) => port.port_id === portIdToMatch);

        if (matchingPort) {
          const latitude = matchingPort.latitude;
          const longitude = matchingPort.longitude;
          const port_name = matchingPort.port_name;

          // Store latitude, longitude, and port_name in the portSequences array
          portCoordinates[serviceId].portSequences.push({ latitude, longitude, port_name });
        }
      }
    }
  }

  // Now portCoordinates is structured similarly to groupeData
  console.log('Port Coordinates:', portCoordinates);
 this.surplusPortData = portCoordinates;
  console.log("dfdf", this.surplusPortData);
  this.afterinitsurplusmap();
  }
  afterinitsurplusmap() {
    debugger

  // Check if the mapElement exists and if both latitude and longitude are defined
  if (this.mapElement && this.surpluslatitude !== undefined && this.surpluslongitude !== undefined) {
    const mapElement = this.mapElement.nativeElement;
    const mapOptions: google.maps.MapOptions = {
      center: { lat: this.surpluslatitude, lng: this.surpluslongitude },
      zoom: 3,
      mapId: '2b03aff8b2fb72a3'
    };

    this.map = new google.maps.Map(mapElement, mapOptions);

    // Add a red marker at the specified latitude and longitude
    const redMarker = new google.maps.Marker({
      position: { lat: this.surpluslatitude, lng: this.surpluslongitude },
      map: this.map,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        scaledSize: new google.maps.Size(30, 30)
      },
      title: this.receivedsurplusportCode
    });

    if (this.surplusPortData) {
      // Create a dictionary to store polyline colors by service ID
      const serviceIdColorMap: { [serviceId: string]: string } = {};
      const colors = ['#00FF00', '#0000FF', '#FF0000', '#FF00FF', '#FFFF00']; // Add more colors as needed

      // Iterate through each service ID in this.deficitPortData and add a marker and polyline for each
      for (const serviceId in this.surplusPortData) {
        if (this.surplusPortData.hasOwnProperty(serviceId)) {
          const serviceData = this.surplusPortData[serviceId];

          // Assign a color based on service ID if not already assigned
          if (!serviceIdColorMap[serviceId]) {
            serviceIdColorMap[serviceId] = colors[Object.keys(serviceIdColorMap).length % colors.length];
          }
          const color = serviceIdColorMap[serviceId];

          // Iterate through portSequences for this service
          for (const surplusport of serviceData.portSequences) {
            // Create a marker with a green icon
            const greenMarker = new google.maps.Marker({
              position: { lat: surplusport.latitude, lng: surplusport.longitude },
              map: this.map,
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new google.maps.Size(30, 30)
              },
              title: surplusport.port_name,
            });

            // Create a polyline with the selected color
            const polyline = new google.maps.Polyline({
              path: [
                { lat: this.surpluslatitude, lng: this.surpluslongitude },
                { lat: surplusport.latitude, lng: surplusport.longitude }
               
              ],
              geodesic: true,
              strokeColor: color,
              strokeOpacity: 1.0,
              strokeWeight: 2,
              icons: [
                {
                  icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 3,
                    fillColor: color,
                    fillOpacity: 1,
                    strokeWeight: 1,
                  },
                  offset: '100%',
                },
              ],
            });

            // Set the polyline on the map
            polyline.setMap(this.map);
          }
        }
      }
    }
  }
  }
  
  getFinalSurplusDataKeys() {
    return Object.keys(this.groupedsurplus || {});
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
    console.log('Grouped data by service ID:', groupedData) ;

    this.groupeData = groupedData;
    if (!this.groupeData || Object.keys(this.groupeData).length === 0) {
      this.showNoDeficitAvailableMessage = true;
    } else {
      this.showNoDeficitAvailableMessage = false;
    }
    await this.getlatitudelongitude( this.groupeData);
  
  } catch (error) {
    console.error('An error occurred:', error);
    this.loading = false;
    throw error;
  }
}
getFinalServiceDataKeys() {
  return Object.keys(this.groupeData || {});
}
async getlatitudelongitude(groupeData: { [serviceId: string]: any }): Promise<void> {
  const portCoordinates: { [serviceId: string]: { serviceName: string, portSequences: any[] } } = {};

  for (const serviceId in groupeData) {
    if (groupeData.hasOwnProperty(serviceId)) {
      const serviceData = groupeData[serviceId];

      // Initialize an empty array for the portSequences if it doesn't exist
      if (!portCoordinates[serviceId]) {
        portCoordinates[serviceId] = {
          serviceName: serviceData.serviceName,
          portSequences: [],
        };
      }

      for (const portSequence of serviceData.portSequences) {
        const portIdToMatch = portSequence.port_id;
        const matchingPort = this.port_list.find((port: any) => port.port_id === portIdToMatch);

        if (matchingPort) {
          const latitude = matchingPort.latitude;
          const longitude = matchingPort.longitude;
          const port_name = matchingPort.port_name;

          // Store latitude, longitude, and port_name in the portSequences array
          portCoordinates[serviceId].portSequences.push({ latitude, longitude, port_name });
        }
      }
    }
  }

  // Now portCoordinates is structured similarly to groupeData
  console.log('Port Coordinates:', portCoordinates);
 this.deficitPortData = portCoordinates;
  console.log("dfdf", this.deficitPortData);
  this.afterinitmap();
}




afterinitmap() {
  console.log("to inside initmap check", this.latlong);

  // Check if the mapElement exists and if both latitude and longitude are defined
  if (this.mapElement && this.deficitlatitude !== undefined && this.deficitlongitude !== undefined) {
    const mapElement = this.mapElement.nativeElement;
    const mapOptions: google.maps.MapOptions = {
      center: { lat: this.deficitlatitude, lng: this.deficitlongitude },
      zoom: 3,
      mapId: '2b03aff8b2fb72a3'
    };

    this.map = new google.maps.Map(mapElement, mapOptions);

    // Add a red marker at the specified latitude and longitude
    const redMarker = new google.maps.Marker({
      position: { lat: this.deficitlatitude, lng: this.deficitlongitude },
      map: this.map,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new google.maps.Size(30, 30)
      },
      title: this.receiveddeficitportCode
    });

    if (this.deficitPortData) {
      // Create a dictionary to store polyline colors by service ID
      const serviceIdColorMap: { [serviceId: string]: string } = {};
      const colors = ['#00FF00', '#0000FF', '#FF0000', '#FF00FF', '#FFFF00']; // Add more colors as needed

      // Iterate through each service ID in this.deficitPortData and add a marker and polyline for each
      for (const serviceId in this.deficitPortData) {
        if (this.deficitPortData.hasOwnProperty(serviceId)) {
          const serviceData = this.deficitPortData[serviceId];

          // Assign a color based on service ID if not already assigned
          if (!serviceIdColorMap[serviceId]) {
            serviceIdColorMap[serviceId] = colors[Object.keys(serviceIdColorMap).length % colors.length];
          }
          const color = serviceIdColorMap[serviceId];

          // Iterate through portSequences for this service
          for (const port of serviceData.portSequences) {
            // Create a marker with a green icon
            const greenMarker = new google.maps.Marker({
              position: { lat: port.latitude, lng: port.longitude },
              map: this.map,
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                scaledSize: new google.maps.Size(30, 30)
              },
              title: port.port_name,
            });

            // Create a polyline with the selected color
            const polyline = new google.maps.Polyline({
              path: [
                { lat: port.latitude, lng: port.longitude },
                { lat: this.deficitlatitude, lng: this.deficitlongitude }
              ],
              geodesic: true,
              strokeColor: color,
              strokeOpacity: 1.0,
              strokeWeight: 2,
              icons: [
                {
                  icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 3,
                    fillColor: color,
                    fillOpacity: 1,
                    strokeWeight: 1,
                  },
                  offset: '100%',
                },
              ],
            });

            // Set the polyline on the map
            polyline.setMap(this.map);
          }
        }
      }
    }
  }
}

goback() {
  console.log("go back is clicked")
  window.location.reload();
  window.location.href = '/forecast-map'; // Assuming 'forecast-map' is the route to your forecast map component
}












ngAfterViewInit() {
    this.initMap();
}
initMap() {
  console.log("to inside initmap check", this.latlong);

  // Check if the mapElement exists and if both latitude and longitude are defined
  if (this.mapElement && this.deficitlatitude !== undefined && this.deficitlongitude !== undefined) {
    const mapElement = this.mapElement.nativeElement;
    const mapOptions: google.maps.MapOptions = {
      center: { lat: this.deficitlatitude, lng: this.deficitlongitude },
      zoom: 3,
      mapId: '2b03aff8b2fb72a3'
    };

    this.map = new google.maps.Map(mapElement, mapOptions);

    // Add a red marker at the specified latitude and longitude
    const redMarker = new google.maps.Marker({
      position: { lat: this.deficitlatitude, lng: this.deficitlongitude },
      map: this.map,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/black-dot.png',
        scaledSize: new google.maps.Size(30, 30)
      },
      title: this.receiveddeficitportCode
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
    if (this.receiveddeficitportCode && this.receiveddeficitcontainerType && this.receiveddeficitcontainerSize) {
      // Set all values in the SharedService using a single function call
      this.sharedService.setValues({
        portcode: this.receiveddeficitportCode,
        containertype: this.receiveddeficitcontainerType,
        containersize: this.receiveddeficitcontainerSize,
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
