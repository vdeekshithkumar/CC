import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { ViewContractsService } from './view-contracts.service';

@Component({
  selector: 'app-view-contracts',
  templateUrl: './view-contracts.component.html',
  styleUrls: ['./view-contracts.component.css']
})
export class ViewContractsComponent implements OnInit{
  /**
   *
   */
  companyID?:any
  contracts:any
  titles:any
  userId: any
  isTitleScreen= true

  //for Pagination of the table
  currentPage = 1;
  itemsPerPage = 5; // set the number of items per page 
  isLoading = true

  constructor(private sessionService:SessionService, private viewContractService:ViewContractsService) {  }
  ngOnInit(): void {
    debugger
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyID = companyId;
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );  
    this.sessionService.getUserId().subscribe(
      (userId:number) =>
      {
        this.userId= userId;
      },
      (error:any)=> {
        console.error('Error while retrieving user ID:', error);
      }
    )
    debugger
    this.viewContractService.getAllTitles(this.companyID).subscribe((data:any)=> {
      this.isLoading=false
      this.titles= data
    })
    // this.viewContractService.getAllContracts(this.companyID).subscribe((data: any) => {
    //   this.isLoading = false
    //   this.contracts = data;
    // });
  }
  getIndex(index: number) {
  return (this.currentPage - 1) * this.itemsPerPage + index + 1;
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
  // prevPageT() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //   }
  // }
  // nextPageT() {
  //   if (this.currentPage < Math.ceil(this.titles.length / this.itemsPerPage)) {
  //     this.currentPage++;
  //   }
  // }
  revert(){
    this.isTitleScreen=!this.isTitleScreen
  }
  getContracts(title:string)
  {
    debugger
    this.isTitleScreen = !this.isTitleScreen
    this.viewContractService.getContracts(title,this.companyID).subscribe(data=>
      {
        debugger
        this.contracts = data
        this.reset()
      },
      (error)=>
      {console.log(error)})
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

  viewContract(contractId:number)
  {
    debugger
    this.viewContractService.ViewContract(contractId,this.userId,this.companyID).subscribe(blob => {
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
  
}
