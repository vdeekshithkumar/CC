import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ForecastingTableService } from '../../forecasting-table-view/forecasting-table-view.service';
import { SessionService } from 'src/app/session.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostAdComponent } from 'src/app/my-advertisement/post-ad/post-ad.component';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { PostAdService } from 'src/app/my-advertisement/post-ad/post-ad.service';
import { SharedServiceService } from 'src/app/shared-service.service';
import { map, zip } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  port_of_departure:any;
port_of_arrival:any;
PortName: string = '';
  public isButtonDisabled: boolean = false;
  ad_type!: string;
  inventory_list_by_companyId: Inventory[] = [];
  companyId: any;
  isLoading:any;
  type:any;
  description!: any;
  title!: any;
  surpluscontainerSize: number | null = null;
  port_list: any[] = [];
  portcode: any;
  container_types:any;
  container_size:any;
  deifcit_Type:any;
  deficit_Size:any
  surpluscontainerType:any;
  deifcitcontainerType:any;
  deficitcontainerSize:any;
  operation:any;
  from_date:any;
  expiry_date:any;
  userId: any;
  type_of_ad:any;
  container_type_id:any;
  totalSurplus: number = 0;
  totalDeficit:number = 0;
  container_type:any;
  fileName?: string
  file?: File
  price:any;
status:any;
quantity:any;
size:any;
port_id:any;
contents:any;
free_days:any;
per_diem:any;
port_of_ad:any;
pickup_charges:any;
@Input() isSurplusAreaSelected: boolean = false ;
@Input() isDeficitAreaSelected:boolean = false;

@Input() portData!:any;


@Input() port_name!:string;
  @Input() portCode!: string;
  @Input() portId!: number;
  @Input() Totalsurplus: any;
  @Input() portlatitude: any;
  @Input() portlongitude: any;
  @Input() containersize!: number;
  @Input() containertype!: string;
  @Input() containerTypes!: string[];
  @Input() containerSizes!: string[];
  @Input() deficitTypes!: string[];
  @Input() deficitSizes!: string[];
  @Input() Totaldeficit!: any;
  @Input() surplus!: number;
  @Input() deficit!: number;
  @Input() surplusPercentage!: number;
  @Input() deficitPercentage!: number;
  @Input() surplusContainerTypesByPort!: string[];
  @Input() surplusContainerSizesByPort!: number[];
  @Input() DeficitContainerTypesByPort!: string[];
  @Input() DeficitlusContainerSizesByPort!: number[];
  ssurplusCount: any; 
  @Output() optimizedViewRequested = new EventEmitter<void>();
  @Output() dataToChild = new EventEmitter<any>();
  deficit_services: any[] = [];
  router: any;
  get filteredContainerTypes(): string[] {
    if (this.portCode) {
      // Filter and remove the port code prefix from container types based on the selected port code
      const filteredTypes = this.containerTypes
        .filter(containertype => containertype.startsWith(this.portCode))
        .map(containertype => containertype.replace(`${this.portCode}: `, ''));
  
      // Remove duplicates from the filtered container types
      const uniqueFilteredTypes = [...new Set(filteredTypes)];
  
      return uniqueFilteredTypes;
    } else {
      // If no port code is selected, return all container types without modification
      return this.containerTypes;
    }
  }
  
  get filteredContainerSizes(): number[] {
    if (this.portCode) {
      // Filter containerSizes based on selectedPortCodes and extract integer values
      const filteredSizes = this.containerSizes
        .filter(containerSize => this.portCode.includes(containerSize.split(':')[0]))
        .map(containerSize => {
          const intValue = parseInt(containerSize.split(':')[1].trim(), 10);
          return isNaN(intValue) ? 0 : intValue;
        });
  
      // Remove duplicates from the filtered container sizes
      const uniqueFilteredSizes = [...new Set(filteredSizes)];
  
      return uniqueFilteredSizes;
    } else {
      // If no port codes are selected, show all container size integer values
      return this.containerSizes.map(containerSize => {
        const intValue = parseInt(containerSize.split(':')[1].trim(), 10);
        return isNaN(intValue) ? 0 : intValue;
      });
    }
  }
  
  getSurplusValueForPortCode(portCode: string): string {
    debugger
    const matchedSurplusValue = this.Totalsurplus[portCode];
    return matchedSurplusValue ? matchedSurplusValue : '';
  }
  get filteredDeficitTypes(): string[] {
    if (this.portCode) {
      // Filter and remove the port code prefix from deficit types based on the selected port code
      const filteredTypes = this.deficitTypes
        .filter(deficitType => deficitType.startsWith(this.portCode))
        .map(deficitType => deficitType.replace(`${this.portCode}: `, ''));
  
      // Remove duplicates from the filtered deficit types
      const uniqueFilteredTypes = [...new Set(filteredTypes)];
  
      return uniqueFilteredTypes;
    } else {
      // If no port code is selected, return all deficit types without modification
      return this.deficitTypes;
    }
  }
  
  get filteredDeficitSizes(): number[] {
    if (this.portCode) {
      // Filter deficitSizes based on selectedPortCodes and extract integer values
      const filteredSizes = this.deficitSizes
        .filter(deficitSize => this.portCode.includes(deficitSize.split(':')[0]))
        .map(deficitSize => {
          const intValue = parseInt(deficitSize.split(':')[1].trim(), 10);
          return isNaN(intValue) ? 0 : intValue;
        });
  
      // Remove duplicates from the filtered deficit sizes
      const uniqueFilteredSizes = [...new Set(filteredSizes)];
  
      return uniqueFilteredSizes;
    } else {
      // If no port codes are selected, show all deficit size integer values
      return this.deficitSizes.map(deficitSize => {
        const intValue = parseInt(deficitSize.split(':')[1].trim(), 10);
        return isNaN(intValue) ? 0 : intValue;
      });
    }
  }
  
  getDeficitValueForPortCode(portCode: string): string {
    const matchedDeficitValue = this.Totaldeficit[portCode];
    return matchedDeficitValue ? matchedDeficitValue : '';
  }
  get uniqueSurplusContainerTypes(): string[] {
    // Use a Set to filter out duplicates
    const uniqueTypes = new Set(this.surplusContainerTypesByPort);
    return Array.from(uniqueTypes);
  }
  get uniqueContainerSizes(): number[] {
    // Use a Set to filter out duplicate numbers
    const uniqueSizes = Array.from(new Set(this.surplusContainerSizesByPort));
    return uniqueSizes;
  }
  get uniqueDeficitContainerTypes(): string[] {
    // Use a Set to filter out duplicates
    const uniqueTypes = new Set(this.DeficitContainerTypesByPort);
    return Array.from(uniqueTypes);
  }
  get uniqueDeficitContainerSizes(): number[] {
    // Use a Set to filter out duplicate numbers
    const uniqueSizes = Array.from(new Set(this.DeficitlusContainerSizesByPort));
    return uniqueSizes;
  }
  
  filteredInventoryList : Inventory[] = [];
  showFile:boolean = false
  surplusCount: number | null = null;
  deficitCount: number | null = null; 
  statusMsg?:string

  constructor(
    private forecastingtableService: ForecastingTableService,
    private sessionService: SessionService,

    private dialog:MatDialog,
    
    
    private sharedservice: SharedServiceService
  ) {
    
  }

  ngOnInit(): void {

  console.log("in form value s passed",this.isSurplusAreaSelected)
  console.log("in form value d passed",this.isDeficitAreaSelected)
  console.log("in form",this.surplus);
  console.log("in form d",this.deficit);
 console.log(this.surplusContainerTypesByPort);
  console.log("in form dfddfd",this.deficitPercentage);
  console.log("in form ct passed to check",this.containerTypes);
  console.log("in form cs passed",this.containerSizes);
  console.log("in form fggfg passed",this.portData);
  console.log("in form surplus",this.Totalsurplus);
  console.log("in form yt",this.containerTypes);

    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        console.log('company ID is:', companyId);
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
      (data: any[]) => {   
        this.port_list = data;
        console.log("Port list fetched: ", this.port_list); 
      },
      error => {
        console.log("ports loading error:" +error);
      }
    );
   
   
  }
 
  // openForm(portCode: string) {
  //   this.portCode = portCode;
  //   this.updateSurplusCount(this.portcode,this.surpluscontainerType,this.surpluscontainerSize);
  //   this.updateDeficitCount(this.portcode,this.deifcitcontainerType,this.deficitcontainerSize);
  // }
 
  async onDropdownChange() {
  
    if (this.surpluscontainerType && this.surpluscontainerSize) {
      debugger
      await this.updateSurplusCount(this.portCode, this.surpluscontainerType, this.surpluscontainerSize);
    }
  }
  async updateSurplusCount(portCode: any, surpluscontainerType: any, surpluscontainerSize: any) {
    debugger;
    console.log('Current portCode:', portCode);
    console.log('Port List:', this.port_list);
    const selectedPort = this.port_list.find((port: { port_code: any; }) => port.port_code === portCode);
    console.log("Selected Port:", selectedPort);
    if (selectedPort) {
      const selectedPortName = selectedPort.port_name;
      console.log("Selected Port Name:", selectedPortName);
      const port_id = selectedPort.port_id;
      console.log("Port ID for selected portCode:", port_id);
      const inventoryForPort = this.inventory_list_by_companyId.filter((item: Inventory) => {
        return item.port_id === port_id;
      });
      console.log("Inventory for Port:", inventoryForPort);
      const inventoryForContainerType = inventoryForPort.filter((item: Inventory) => {
        return item.container_type === surpluscontainerType;
      });
    
    const targetSize = parseInt(surpluscontainerSize, 10);
    const inventoryForContainerSize = inventoryForContainerType.filter((item: Inventory) => {
      const itemSize = typeof item.container_size === 'number' ? item.container_size : parseInt(item.container_size, 10);
      return itemSize === targetSize;
    });
  
      const finalFilteredInventory = inventoryForContainerSize;
  
      if (finalFilteredInventory.length > 0) {
        const selectedInventory = finalFilteredInventory[0];
        this.surplusCount = selectedInventory.surplus;
        console.log("Surplus Count:", this.surplusCount);
      } else {
        this.surplusCount = null;
        console.log("No matching inventory found.");
      }
    } else {
      console.log("Port with the selected portCode does not exist.");
    }
  }
async onSelectionChange() {
  debugger
if (this.container_types && this.container_size) {
  debugger
  await this.SurplusCount(this.portCode, this.container_types, this.container_size);
}
}
async SurplusCount(portCode: string, container_types: any, container_size: any) {
  debugger
  console.log("This method is called with:", portCode, container_types, container_size);
  let selectedPortId: number | null = null;
  this.totalSurplus = 0; // Initialize totalSurplus to 0
  
  // Find the selectedPortId based on portCode
  for (const port of this.port_list) {
    if (port.port_code === portCode) {
      selectedPortId = port.port_id;
      break;
    }
  }
  
  if (selectedPortId !== null) {
    console.log("Selected Port ID:", selectedPortId);

    // Step 1: Filter items with matching port_id
    const matchingPortItems = this.inventory_list_by_companyId.filter(item => item.port_id === selectedPortId);

    // Step 2: Filter items with matching container_type
    const matchingTypeItems = matchingPortItems.filter(item => item.container_type === container_types);

    // Step 3: Filter items with matching container_size and calculate total surplus
    matchingTypeItems
    .filter(item => {
      // Parse the selected container_size to an integer
      const selectedSize = container_size !== null ? parseInt(container_size, 10) : null;
      // Convert the item's container_size to a number
      const itemSize = typeof item.container_size === 'number' ? item.container_size : parseInt(item.container_size, 10);
      // Check if the item's container_size matches the selectedSize
      return selectedSize === null || itemSize === selectedSize;
    })
    .forEach(item => {
      this.totalSurplus += item.surplus; // Add the item's surplus to the total
    });

    // Now, totalSurplus contains the sum of surplus values for matching items
    console.log("Total Surplus Value for Matching Items:", this.totalSurplus);

    // You can use or display the totalSurplus value as needed
  } else {
    console.log("Invalid portCode. No matching port_id found.");
  }
}

onDeficitChange() {
  debugger
if (this.deifcit_Type && this.deficit_Size) {
  debugger
  this.DeficitCount(this.portCode, this.deifcit_Type, this.deficit_Size);
}
}

DeficitCount(portCode: string, deifcit_Type: any, deficit_Size: any) {
  debugger
  console.log("This method is called with:", portCode, deifcit_Type, deficit_Size);
  let selecteddeficitPortId: number | null = null;
  this.totalDeficit = 0; // Initialize totalSurplus to 0
  
  // Find the selectedPortId based on portCode
  for (const port of this.port_list) {
    if (port.port_code === portCode) {
      selecteddeficitPortId = port.port_id;
      break;
    }
  }
  
  if (selecteddeficitPortId !== null) {
    console.log("Selected Port ID:", selecteddeficitPortId);

    // Step 1: Filter items with matching port_id
    const matchingPortdeficitItems = this.inventory_list_by_companyId.filter(item => item.port_id === selecteddeficitPortId);

    // Step 2: Filter items with matching container_type
    const matchingdeficitTypeItems = matchingPortdeficitItems.filter(item => item.container_type === deifcit_Type);

    // Step 3: Filter items with matching container_size and calculate total surplus
    matchingdeficitTypeItems
    .filter(item => {
      // Parse the selected container_size to an integer
      const selecteddeficitSize = deficit_Size !== null ? parseInt(deficit_Size, 10) : null;
      // Convert the item's container_size to a number
      const itemSize = typeof item.container_size === 'number' ? item.container_size : parseInt(item.container_size, 10);
      // Check if the item's container_size matches the selectedSize
      return selecteddeficitSize === null || itemSize === selecteddeficitSize;
    })
    .forEach(item => {
      this.totalDeficit += item.deficit; // Add the item's surplus to the total
    });

    // Now, totalSurplus contains the sum of surplus values for matching items
    console.log("Total Surplus Value for Matching Items:", this.totalDeficit);

    // You can use or display the totalSurplus value as needed
  } else {
    console.log("Invalid portCode. No matching port_id found.");
  }
}

async ondeficitDropdownChange() {
  if (this.deifcitcontainerType && this.deficitcontainerSize) {
    await this.updateDeficitCount(this.portCode, this.deifcitcontainerType, this.deficitcontainerSize);
  }
}

async updateDeficitCount(portCode: any, deifcitcontainerType: any, deficitcontainerSize: any) {
  debugger;
  console.log('Current portCode:', portCode);
 
  const selectedPort = this.port_list.find((port: { port_code: any; }) => port.port_code === portCode);
 
  if (selectedPort) {
    const port_id = selectedPort.port_id;
   
    const inventoryForPort = this.inventory_list_by_companyId.filter((item: Inventory) => {
      return item.port_id === port_id;
    });
   
    const inventoryForContainerType = inventoryForPort.filter((item: Inventory) => {
      return item.container_type === deifcitcontainerType;
    });
  
    const targetSize = parseInt(deficitcontainerSize, 10);

    const inventoryForContainerSize = inventoryForContainerType.filter((item: Inventory) => {
      const itemSize = typeof item.container_size === 'number' ? item.container_size : parseInt(item.container_size, 10);
      return itemSize === targetSize;
    });

    const finalFilteredInventory = inventoryForContainerSize;
    if (finalFilteredInventory.length > 0) {
      const selectedInventory = finalFilteredInventory[0];
      this.deficitCount = selectedInventory.deficit;
      console.log("Deficit Count:", this.deficitCount);
    } else {
      this.surplusCount = null;
      console.log("No matching inventory found.");
    }
  } else {
    console.log("Port with the selected portCode does not exist.");
  }
}
// Define your method to handle the button click
onOptimizedViewButtonClick() {
  debugger;
  if (this.isOptimizedViewEnabled()) {
    if (this.deifcitcontainerType && this.deficitcontainerSize) {
      // Set values for deficit
      this.sharedservice.setisvaluesfordeficit({
        deficitportCode: this.portCode,
        deficitcontainerType: this.deifcitcontainerType,
        deficitcontainerSize: this.deficitcontainerSize,
        deficitlatitude: this.portlatitude,
        deficitlongitude: this.portlongitude,
      });
      // Logging the values for deficit
      console.log("from form to ov for deficit", this.portCode);
      console.log("from form to ov for deficit", this.deifcitcontainerType);
      console.log("from form to ov for deficit", this.deficitcontainerSize);
      console.log("from form to ov for deficit", this.portlatitude);
      console.log("from form to ov for deficit", this.portlongitude);

     
    } else if (this.surpluscontainerType && this.surpluscontainerSize) {
      debugger;
      // Set values for surplus
      this.sharedservice.setisvaluesforsurplus({
        surplusportCode: this.portCode,
        surpluscontainerType: this.surpluscontainerType,
        surpluscontainerSize: this.surpluscontainerSize,
        surpluslatitude: this.portlatitude, // Set your desired latitude value
        surpluslongitude: this.portlongitude, // Set your desired longitude value
      });
      // Logging the values for surplus
      console.log("from form to ov for surplus", this.portCode);
      console.log("from form to ov for surplus", this.surpluscontainerType);
      console.log("from form to ov for surplus", this.surpluscontainerSize);
      console.log("from form to ov for surplus", this.portlatitude);
      console.log("from form to ov for surplus", this.portlongitude);
    }
  }
}







isOptimizedViewEnabled(): boolean {
  const surplusTypeValid = this.surpluscontainerType !== 'Select the Type';
  const surplusSizeValid = typeof this.surpluscontainerSize === 'string' && this.surpluscontainerSize !== 'Select the Size';

  const deficitTypeValid = this.deifcitcontainerType !== 'Select the Type';
  const deficitSizeValid = typeof this.deficitcontainerSize === 'string' && this.deficitcontainerSize !== 'Select the Size';

  return (surplusTypeValid && surplusSizeValid) || (deficitTypeValid && deficitSizeValid);
}




DisplayPostForm() {
  this.ad_type = 'container';
  console.log('Before opening dialog');
  debugger;

  // Assuming this.portCode is the selected portCode
  const selectedPort = this.port_list.find((port: { port_code: any; }) => port.port_code === this.portCode);
const selectedPortid = this.port_list.find((port: { port_code: any; }) => port.port_code === this.portCode);
const portName = selectedPort ? selectedPort.port_name : '';
const port_id = selectedPortid ? selectedPortid.port_id : null;
console.log("in form", portName);
console.log("in form", port_id);
const dialogRef = this.dialog.open(PostAdComponent, {
  data: {
    type: this.ad_type,
    ContinueDraft: 0,
    Approve: 0,
    containerType: this.surpluscontainerType,
    containerSize: this.surpluscontainerSize,
    portCode: this.portCode,
    portName: portName ,
    port_id:port_id
  }
});

  
console.log("to post ad",portName)
  debugger;
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
}
