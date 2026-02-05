import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/session.service';

import { ForecastingTableService } from './forecasting-table-view.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-forecasting-table-view',
  templateUrl: './forecasting-table-view.component.html',
  styleUrls: ['./forecasting-table-view.component.css']
})
export class ForecastingTableViewComponent implements OnInit {
  isSearchIconClicked!: boolean;
  showForm: boolean = false;
  showModal = false;
  inv: Inventory[] = []

  isClicked: boolean = false;
  searchTerm: any;
  data: any;
  surplus: any;
  deficit: any;
  ForecastingForm!: FormGroup;
  currentUser: any;
  userId: any;
  companyId: any;
  p: any;
  inventoryId: any;
  inventory_list = null;
  inventory_data: any;
  port_id: any;
  containerTypeFilter: string = '';
  containerSizeFilter: string = '';
  availableFilter: string = '';
  deficitFilter: string = '';
  surplusFilter: string = '';
  inventory_list_by_companyId = [];
  filteredInventoryList = [];
  // sortedData: Inventory[] = [];
  port_list: any;
  port_name = "";
  port_code = "";
  itemsPerPage: number = 5;
  currentPage: number = 1;
  records: any[] = [];
  // inventory_list_by_companyId: any[] = [];
  contracts: any;
  containerType: string = '';
  containerSize: number = 0;
  available: number = 0;
  Einv: Inventory[] = [];

  // Add loading state property
  isLoadingTable: boolean = false;


  constructor(private formBuilder: FormBuilder, private sessionService: SessionService, private router: Router, private forecastingtableService: ForecastingTableService) {
  }
  ngOnInit(): void {
    //user id from session 
    this.sessionService.getUserId().subscribe(
      (userId: number) => {
        this.userId = userId;
        console.log('User ID is :', userId);
      },
      (error: any) => {
        console.error('Error retrieving user ID:', error);
      }
    );
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        console.log('company ID is :', companyId);
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // get date in format yyyy-mm-dd
    this.ForecastingForm = this.formBuilder.group({
      inventory_id: ['8'],
      date_created: ['2023-03-28'],
      last_modified: formattedDate,
      company_id: this.companyId,
      container_type: ['', Validators.required],
      available: ['', Validators.required],
      maximum: ['', Validators.required],
      minimum: ['', Validators.required],
      port_id: ['', Validators.required],
      updated_by: this.userId,
      container_size: ['', Validators.required],
      deficit: ['', Validators.required],
      surplus: ['', Validators.required]

    });

    // Set loading to true before starting data fetch
    this.isLoadingTable = true;

    this.forecastingtableService.getAllPorts().subscribe(
      data => {
        this.port_list = data;
        console.log("Port list fetched: ", this.port_list);
      },
      error => {
        console.log("ports loading error:" + error);
        this.isLoadingTable = false; // Stop loading on error
      }
    );
    this.forecastingtableService.getAllInventory().subscribe(
      data => {
        this.inventory_list = data;
        console.log("inv list fetched: ", this.inventory_list);
      },
      error => {
        console.log("inv loading error:" + error);
        this.isLoadingTable = false; // Stop loading on error
      }
    );
    this.forecastingtableService.getInventoryByIdCID(this.companyId).subscribe(
      data => {
        this.inventory_list_by_companyId = data;
        console.log("inv list by company id is fetched: ", this.inventory_list_by_companyId);
        this.filteredInventoryList = this.inventory_list_by_companyId;
        // this.sortedData = this.inventory_list_by_companyId;

        // Stop loading after main data is loaded
        this.isLoadingTable = false;
      },
      error => {
        console.log("inv loading error:" + error);
        this.isLoadingTable = false; // Stop loading on error
      }
    );
    this.sessionService.getCurrentUser().subscribe(user => {
      // if (user.id==null && user.token==null) {  // use this once token is used for a user
      if (user.user_id == null) {
        // if user session is null, redirect to login page
        this.router.navigate(['/sign-in']);
      }
      else {
        this.currentUser = user;
        console.log('From session inside inventory ' + this.currentUser.email + '   id here ' + this.currentUser.user_id)

      }
      // store the user session information in a property

    })
    // this.sortedData = this.data;
  }
  // sortData(sortOrder: string): void {
  //   if (sortOrder === 'asc') {
  //     this.sortedData = this.inventory_list_by_companyId.sort((a, b) => a.surplus - b.surplus);
  //   } else if (sortOrder === 'desc') {
  //     this.sortedData = this.inventory_list_by_companyId.sort((a, b) => b.surplus - a.surplus);
  //   } 
  // }

  getPortName(portId: number): string {
    const port = this.port_list.find((p: { port_id: number, port_name: string }) => p.port_id === portId);
    return port ? port.port_name : '';
  }
  getPortById(portId: number) {
    return this.port_list.find((port: { port_id: number; }) => port.port_id === portId);
  }
  getPortCode(portId: number): string {
    const port = this.getPortById(portId);
    if (port) {
      return ` ${port.port_code}`;
    }
    return ''; // Handle the case when the port is not found or portList is not loaded
  }
  options = ['Map', 'Table', 'Surplus', 'Deficit'];
  selectedOption = 0;
  selectOption(index: number) {
    this.selectedOption = index;
    if (this.options[index] === 'Table') {
      this.router.navigate(['/forecasting-table-view']);
    }
    if (this.options[index] === 'Map') {
      this.router.navigate(['/forecast-map']);
    }
  }

  getInventoryById(inv_id: number) {

    this.forecastingtableService.getInventoryById(inv_id)
      .subscribe(
        (data: any) => {

          this.inventory_data = data;

          console.log("single inventory received" + this.inventory_data);
          // console.log(this.inventory_data.inventory_id);



        },
        (error: any) => console.log(error));
  }

  get totalPages(): number {
    return Math.ceil(this.inventory_list_by_companyId.length / this.itemsPerPage);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  backPage() {
    this.router.navigate(['forecast-map']);
  }
  onSubmit() {

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

  onExport() {
    const worksheetName = 'Inventory';
    const excelFileName = 'Inventory.xlsx';
    const header = ['Port Name', 'Container Type', 'Container Size', 'Available', 'Surplus', 'Deficit'];
    const data = this.Einv.map((iv) => [iv.port_name, iv.container_type, iv.container_size, iv.available, iv.surplus, iv.deficit]);

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
  clearSearch() {
    this.searchTerm = '';
  }

  setSearchIconClicked() {
    this.isSearchIconClicked = true;
  }
  toggleForm() {
    this.isClicked = !this.isClicked;
  }
  getTotalPages() {
    return Math.ceil(this.inventory_list_by_companyId.length / this.itemsPerPage);
  }
  getPages() {
    return Array(this.getTotalPages()).fill(0).map((_, index) => index + 1);
  }

  filterData(): void {

    this.filteredInventoryList = this.inventory_list_by_companyId.filter((inv: any) => {
      const containerType = inv.container_type.toLowerCase();
      const containerSize = inv.container_size.toString().toLowerCase();
      const available = inv.available.toString().toLowerCase();
      const surplus = inv.surplus.toString().toLowerCase();
      const deficit = inv.deficit.toString().toLowerCase();
      // Check if the filter criteria match the corresponding properties of the inventory item
      const containerTypeMatches = containerType.includes(this.containerTypeFilter.toLowerCase());
      const containerSizeMatches = containerSize.includes(this.containerSizeFilter.toLowerCase());
      const availableMatches = available.includes(this.availableFilter.toLowerCase());
      const surplusMatches = surplus.includes(this.surplusFilter.toLowerCase());
      const deficitMatches = deficit.includes(this.deficitFilter.toLowerCase());

      // Return true only if all filter criteria match
      return containerTypeMatches && containerSizeMatches && availableMatches && surplusMatches && deficitMatches;
    });
    console.log('Filters applied! Filtered inventory:', this.filteredInventoryList);
  }
  applyFilter(): void {

    this.filterData(); // Apply the filters and update the filteredInventoryList

    // Perform additional actions based on the filtered data
    // For example, you can display a message or trigger another function
    console.log('Filters applied! Filtered inventory:', this.filteredInventoryList);
  }
  showClearButton() {
    const clearButton = document.getElementById("clearButton");
    if (clearButton) {
      clearButton.style.display = "inline-block";
    }
  }
  hideClearButton() {
    const clearButton = document.getElementById("clearButton");
    if (clearButton) {
      clearButton.style.display = "none";
    }
  }
  formatContainerType(containerType: string): string {
    const words = containerType.split('_');
    const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return formattedWords.join(' ');
  }
  filterInventory() {

    this.filteredInventoryList = this.inventory_data.filter((inv: { container_type: string; container_size: number; available: number; surplus: any; deficit: any; }) => {
      let isMatch = true;
      if (this.containerType && inv.container_type !== this.containerType) {
        isMatch = false;
      }
      if (this.containerSize && inv.container_size !== this.containerSize) {
        isMatch = false;
      }
      if (this.available && inv.available !== this.available) {
        isMatch = false;
      }
      if (this.surplus && inv.surplus !== this.surplus) {
        isMatch = false;
      }
      if (this.deficit && inv.deficit !== this.deficit) {
        isMatch = false;
      }
      return isMatch;
    });
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
