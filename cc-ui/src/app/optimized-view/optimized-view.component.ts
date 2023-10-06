import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../session.service';
import { ForecastingTableService } from '../forecasting/forecasting-table-view/forecasting-table-view.service';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-optimized-view',
  templateUrl: './optimized-view.component.html',
  styleUrls: ['./optimized-view.component.css']
})
export class OptimizedViewComponent implements OnInit, AfterViewInit {

  @ViewChild('mapElement', { static: true }) mapElement: ElementRef | undefined;
  map: google.maps.Map | undefined;
  port_list: any;
  companyId!: number;
  Einv: Inventory[] = [];
  port_id: any;
  Port_code: any;
  Container_type: any;
  Container_size: any;
  inventory_list_by_companyId: Inventory[] = [];
  filteredInventoryList : Inventory[] = [];
portCode:any;
  constructor(
    private sessionService: SessionService,
    private forecastingtableService: ForecastingTableService,
    private sharedService: SharedServiceService
  ) {}

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnInit(): void {
    this.sharedService.getData().subscribe((data) => {
      this.Port_code = data.port_code;
      this.Container_type = data.container_type;
      this.Container_size = data.container_size;
      console.log('Received data from service:', data.port_code, data.container_type, data.container_size);
      const matchingPort = this.port_list.find((port: { port_code: string; }) => port.port_code === this.Port_code);
  
      if (matchingPort) {
        this.port_id = matchingPort.port_id;
        console.log('Matching port name:', this.port_id);
        const containerSizeAsInt = parseInt(this.Container_size, 10);
        this.filterAndStoreSurplusInventory(this.port_id, this.Container_type, containerSizeAsInt);
      } else {
        console.log('No matching port found for Port_code:', this.Port_code);
      }
    });
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );
  
    
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
    this.forecastingtableService.getAllPorts().subscribe(
      (data: any) => {
        this.port_list = data;
        console.log("Port list fetched: ", this.port_list);

        // Check for the matching port here
      }
    );

   
  }
  filterAndStoreSurplusInventory(port_id: any, Container_type: any, containerSizeAsInt: number) {
    debugger;
    console.log("inside method", port_id);
    console.log("inside method", Container_type);
    console.log("inside method", containerSizeAsInt);
  
    // Fetch the inventory data
    this.forecastingtableService.getInventoryByIdCID(this.companyId).subscribe(
      (data: Inventory[]) => {
        this.inventory_list_by_companyId = data;
        console.log('inv list by company id is fetched:', this.inventory_list_by_companyId);
  
        // Step 1: Filter and store inventory items from non-matching ports
        const nonMatchingInventory: Inventory[] = this.inventory_list_by_companyId.filter((item: Inventory) => {
          return item.port_id !== port_id; // Exclude matching port
        });
  
        console.log('Non-Matching Inventory:', nonMatchingInventory);
  
        // Step 2: Filter and store inventory items with similar container types
        const matchingContainerTypeInventory: Inventory[] = nonMatchingInventory.filter((item: Inventory) => {
          return item.container_type === Container_type; // Filter by container type
        });
  
        console.log('Matching Container Type Inventory:', matchingContainerTypeInventory);
  
        // Step 3: Filter and store inventory items with matching container sizes
        const finalInventory: Inventory[] = matchingContainerTypeInventory.filter((item: Inventory) => {
          return item.container_size === containerSizeAsInt; // Filter by container size
        });
  
        console.log('Final Inventory:', finalInventory);
      },
      (error: any) => {
        console.log('inv loading error:', error);
      }
    );
  }
  
  
  
  

  initMap() {
    if (this.mapElement) {
      const mapElement = this.mapElement.nativeElement;
      // Set the initial map options (customize as needed)
      const mapOptions: google.maps.MapOptions = {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 10,
        mapId: '2b03aff8b2fb72a3'
      };

      // Create a new Google Map instance and display it in the mapElement
      this.map = new google.maps.Map(mapElement, mapOptions);
    }
  }

  onPortSelected(selectedPortName: string) {
    if (selectedPortName === 'Select Port') {
      window.location.reload();
   
      if (this.map) {
        this.map.setCenter({ lat: 0, lng: 0 }); // Set the center to your original coordinates
        this.map.setZoom(3); // Set the original zoom level
      }
    } else {
      // Find the selected port based on port_name in your port_list
      const selectedPort = this.port_list.find((port: { port_name: string; }) => port.port_name === selectedPortName);

      if (selectedPort && this.map) {
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

  getPortName(portId: number): string {
    const port = this.port_list.find((p: { port_id: number, port_name: string }) => p.port_id === portId);
    return port ? port.port_name : '';
  }

  onExport() {
    const worksheetName = 'Inventory';
    const excelFileName = 'Inventory.xlsx';
    const header = ['Port Name', 'Container Type', 'Container Size', 'Available', 'Surplus', 'Deficit'];
    const data = this.Einv.map((iv) => [iv.port_name, iv.container_type, iv.container_size, iv.available, iv.surplus, iv.deficit]);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([header, ...data]);
    const columnWidths = [
      { wch: 15 }, // Port Name width: 15
      { wch: 15 }, // Container Type width: 15
    ];

    // Apply column widths to worksheet
    worksheet['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
    XLSX.writeFile(workbook, excelFileName);
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
      (error: any) => console.log(error)
    );
  }
}

interface Inventory {
  port_name: string;
  port_id: number;
  container_type: string;
  container_size: number;
  available: number;
  surplus: number;
  deficit: number;
  // Add other properties if necessary
}
