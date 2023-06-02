import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { ViewContractsService } from './view-contracts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-contracts',
  templateUrl: './view-contracts.component.html',
  styleUrls: ['./view-contracts.component.css']
})
export class ViewContractsComponent implements OnInit{
 
  showModal=false;
  updated_date_time:any;
  records:any[]=[];
  port_list:any;
  companyID?:any
 
  contracts:any
  ContractForm!:FormGroup;
  titles:any
  userId: any
  isTitleScreen= true
  currentPage = 1;
  itemsPerPage = 5; 
  companyId: any;
  isLoading = true
  title:any;
  searchTerm:any;
  contract_list_by_companyId=[];
  constructor(private router:Router,private sessionService:SessionService,private formBuilder: FormBuilder, private viewContractService:ViewContractsService) {  }
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
       this.ContractForm = this.formBuilder.group({
        contract_id: [],
        date_created: ['2023-03-28'],
        updated_date_time: formattedDate,
        company_id: this.companyId,
        content: ['', Validators.required],
        title: ['', Validators.required],
        uploaded_file: ['', Validators.required],
        updated_by: this.userId,
      });
      debugger
      this.viewContractService.getContractByIdCID(this.companyId).subscribe(
        data => {
          this.contract_list_by_companyId = data;
          console.log("contract list by company id is fetched: ", this.contract_list_by_companyId); 
        },
        error => {
          console.log("contract loading error:", error);
        }
      );
      } 
      getContractName(portId: number): string {
        const port = this.port_list.find((p: { port_id: number, port_name: string }) => p.port_id === portId);
        return port ? port.port_name : '';
    }
    options = ['Map', 'Table', 'Surplus','Deficit'];
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
    
      
      get totalPages(): number {
        return Math.ceil(this.records.length / 5);
      }
    
  
  getIndex(index: number) {
  return (this.currentPage - 1) * this.itemsPerPage + index + 1;
}
getDateOnly(date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  const timestamp = newDate.getTime();
  const dateOnly=new Date(timestamp);
  const dateString = dateOnly.toLocaleDateString('en-GB');
  this.updated_date_time=dateString.toString().slice(0, 10);
  return this.updated_date_time;
}
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  nextPage() {
    if (this.currentPage < Math.ceil(this.titles.length / this.itemsPerPage)) {
      this.currentPage++;
    }
  }
  revert(){
    this.isTitleScreen=!this.isTitleScreen
  }
 
  truncateContent(element: EventTarget | null) {
    if (element instanceof HTMLElement) {
      element.classList.add('truncate', 'max-w-[10ch]');
      element.setAttribute('title', element.innerText);
    }
  }
  
  expandContent(element: EventTarget | null) {
    if (element instanceof HTMLElement) {
      element.classList.remove('truncate', 'max-w-[10ch]');
      element.removeAttribute('title');
    }
  }
  showTooltip(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.offsetWidth < target.scrollWidth) {
      target.setAttribute('data-tooltip', target.innerHTML);
    }
  }
  
  hideTooltip(event: MouseEvent) {
    const target = event.target as HTMLElement;
    target.removeAttribute('data-tooltip');
  }
  
  getContentClass(content: string): string {
    return content.length > 10 ? 'truncate-10' : '';
  }
  getContracts(title: string, companyId: number) {
    debugger;
    this.isTitleScreen = !this.isTitleScreen;
    this.viewContractService.getContracts(title, companyId).subscribe(
      data => {
        debugger;
        this.contracts = data;
        this.reset();
      },
      error => {
        console.log(error);
      }
    );
  }
  
  reset(){
    this.currentPage = 1;
    this.itemsPerPage = 5;
  }
  isEndT()
  {
    return (this.currentPage == Math.ceil(this.titles.length / this.itemsPerPage))? true : false;
  }
  isEnd (){//for contracts
    return (this.currentPage == Math.ceil(this.contracts.length / this.itemsPerPage))? true : false;
  }

  viewContract(contractId: number) {
    debugger;
    this.viewContractService.ViewContract(contractId, this.userId, this.companyId).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }
  deleteContract(contractId:number){
    debugger
    this.viewContractService.DeleteContract(contractId).subscribe(
      response => {
        window.location.reload()
        // handle success
      },
      error => {
        console.log('Error deleting contract:', error);
        // handle error
      }
    );
  }
  replaceNewlines(content: string): string {
    return content.replace(/\n/g, '<br>');
  }
  getFileNumber(uploadedFile: string): string {
    const fileNumber = uploadedFile.split(",")[0];
    return fileNumber;
  }
  downloadFile(fileUrl: string) {
    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = 'filename.pdf'; // Set the desired file name here
    anchor.click();
  }
  
  
  getFileName(uploadedFile: string): string {
    return uploadedFile.split(",")[0];
  }
}
