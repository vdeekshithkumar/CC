import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { ViewContractsService } from './view-contracts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContractDto } from '../DTO/ContractDto';
import { MyAdService } from '../my-advertisement/my-ad.service';

@Component({
  selector: 'app-view-contracts',
  templateUrl: './view-contracts.component.html',
  styleUrls: ['./view-contracts.component.css']
})
export class ViewContractsComponent implements OnInit {
  contracts: any
  ContractForm!: FormGroup;
  userId: any
  isTitleScreen = true
  currentPage = 1;
  itemsPerPage = 6                          ;
  companyId!: number;
  userDesignation: any;
  UserPList: any[]=[];
  isUploadcontractsDisabled:boolean = false;
  isDeleteContractsDisabled: boolean=false;

  constructor(private router: Router, private sessionService: SessionService,private myadservice:MyAdService, private viewContractService: ViewContractsService) { }
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
    this.viewContractService.getAllContracts(this.companyId).subscribe(
      (data:ContractDto[])=>{
        
        this.contracts = data
      },
      error=>
      {
        console.log(error)
      }
    );
    this.sessionService.getUserDesignation().subscribe(
      (userDesignation: string) => {
        this.userDesignation = userDesignation;
        console.log('User des is :', this.userDesignation);
      },
      (error: any) => {
        console.error('Error retrieving user des:', error);
      }
    );
    this.myadservice.getPermissions(this.userId).subscribe(
      (permissions: any[]) => {
        this.UserPList = permissions;
        this.isUploadcontractsDisabled =!(this.UserPList.includes(18) || this.userDesignation ==='admin');
        this.isDeleteContractsDisabled =!(this.UserPList.includes(22) || this.userDesignation ==='admin');
       console.log("User permissions",this.UserPList);
      },
      (error: any) => {
        console.log(error);
        alert("error")
      }
    );
  }
  getTotalPages() {
    return Math.ceil(this.contracts.length / this.itemsPerPage);
  }
  getPages() {
    return Array(this.getTotalPages()).fill(0).map((_, index) => index + 1);
  }
  getIndex(index: number) {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }
  getButtonNo(index: number) {
    return index+1;
  }
  uploadContracts():void{
    this.router.navigate(['upload-contract']);
  }
  backPage(): void {
    window.history.back()
  }
  isEnd() {//for contracts
    return (this.currentPage == Math.ceil(this.contracts.length / this.itemsPerPage)) ? true : false;
  }

  async viewContract(contractId: number) {
    try {
      const blob = await this.viewContractService.ViewContract(contractId, this.userId, this.companyId);
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error viewing contract:', error);
      // Handle error as needed
    }
  }
  
  deleteContract(contractId: number) {
    
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
