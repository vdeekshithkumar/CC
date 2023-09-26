import { Component, Input, OnInit } from '@angular/core';
import { ForecastingTableService } from '../../forecasting-table-view/forecasting-table-view.service';
import { SessionService } from 'src/app/session.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostAdComponent } from 'src/app/my-advertisement/post-ad/post-ad.component';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { PostAdService } from 'src/app/my-advertisement/post-ad/post-ad.service';

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
  surpluscontainerType:any;
  deifcitcontainerType:any;
  deficitcontainerSize:number | null = null;
  operation:any;
  from_date:any;
  expiry_date:any;
  userId: any;
  type_of_ad:any;
  container_type_id:any;
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
@Input() port_name!:string;
  @Input() portCode!: string;
  @Input() portId!: number;
  @Input() containersize!: number;
  @Input() containertype!: string;
  @Input() surplus!: number;
  @Input() deficit!: number;
  @Input() surplusPercentage!: number;
  @Input() deficitPercentage!: number;
  @Input() surplusContainerTypesByPort!: string[];
  @Input() surplusContainerSizesByPort!: number[];
  @Input() DeficitContainerTypesByPort!: string[];
  @Input() DeficitlusContainerSizesByPort!: number[];
  filteredInventoryList : Inventory[] = [];
  showFile:boolean = false
  surplusCount: number | null = null;
  deficitCount: number | null = null; 
  statusMsg?:string
  constructor(
    private forecastingtableService: ForecastingTableService,
    private sessionService: SessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog:MatDialog,
    private snackBar: MatSnackBar,
    private postAdService: PostAdService
  ) {}
  ngOnInit(): void {
  
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
 
  onDropdownChange() {
    
  if (this.surpluscontainerType && this.surpluscontainerSize) {
    this.updateSurplusCount(this.portCode, this.surpluscontainerType, this.surpluscontainerSize);
  }
}


ondeficitDropdownChange() {
  
  if (this.deifcitcontainerType && this.deficitcontainerSize) {
    this.updateDeficitCount(this.portCode, this.deifcitcontainerType, this.deficitcontainerSize);
  }
}
isOptimizedViewEnabled(): boolean {
 
  return (
    (this.surpluscontainerType && this.surpluscontainerSize) ||
    (this.deifcitcontainerType && this.deficitcontainerSize)
  );
}

DisplayPostForm() {
  this.ad_type = 'container';
  console.log('Before opening dialog');
  debugger;

  // Assuming this.portCode is the selected portCode
  const selectedPort = this.port_list.find((port: { port_code: any; }) => port.port_code === this.portCode);
  const portName = selectedPort ? selectedPort.port_name : '';
 console.log("in form",portName);
  const dialogRef = this.dialog.open(PostAdComponent, {
    data: {
      type: this.ad_type,
      ContinueDraft: 0,
      Approve: 0,
      containerType: this.surpluscontainerType,
      containerSize: this.surpluscontainerSize,
      portCode: this.portCode,
      portName: portName // Pass the portName here
    
    }
  });
console.log("to post ad",portName)
  debugger;
}



updateSurplusCount(portCode: any, surpluscontainerType: any, surpluscontainerSize: any) {
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
    console.log("Inventory after filtering by container type:", inventoryForContainerType);
    console.log("Selected surpluscontainerSize:", surpluscontainerSize);
  const targetSize = parseInt(surpluscontainerSize, 10);
  const inventoryForContainerSize = inventoryForContainerType.filter((item: Inventory) => {
    const itemSize = typeof item.container_size === 'number' ? item.container_size : parseInt(item.container_size, 10);
    return itemSize === targetSize;
  });
console.log("Inventory after filtering by container size:", inventoryForContainerSize);
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
updateDeficitCount(portCode: any, deifcitcontainerType: any, deficitcontainerSize: any) {
  debugger;
  console.log('Current portCode:', portCode);
  console.log('Port List:', this.port_list);
  const selectedPort = this.port_list.find((port: { port_code: any; }) => port.port_code === portCode);
  console.log("Selected Port:", selectedPort);
  if (selectedPort) {
    const port_id = selectedPort.port_id;
    console.log("Port ID for selected portCode:", port_id);
    const inventoryForPort = this.inventory_list_by_companyId.filter((item: Inventory) => {
      return item.port_id === port_id;
    });
    console.log("Inventory for Port:", inventoryForPort);
    const inventoryForContainerType = inventoryForPort.filter((item: Inventory) => {
      return item.container_type === deifcitcontainerType;
    });
    console.log("Inventory after filtering by container type:", inventoryForContainerType);
    console.log("Selected surpluscontainerSize:", deficitcontainerSize);
  const targetSize = parseInt(deficitcontainerSize, 10);

  const inventoryForContainerSize = inventoryForContainerType.filter((item: Inventory) => {
    const itemSize = typeof item.container_size === 'number' ? item.container_size : parseInt(item.container_size, 10);
    return itemSize === targetSize;
  });
console.log("Inventory after filtering by container size:", inventoryForContainerSize);
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
