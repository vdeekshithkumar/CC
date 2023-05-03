import { Component } from '@angular/core';
import { MyAdService } from './my-ad.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../session.service';


@Component({
  selector: 'app-my-advertisement',
  templateUrl: './my-advertisement.component.html',
  styleUrls: ['./my-advertisement.component.css']
})
export class MyAdvertisementComponent {
  contractForm!: FormGroup;
  description!: any;
  companyId: any;
  
  userId: any;
  ad_id:any;
  title!: any;
  port_name="";
  C_Type="";

  fileName?: string
  file?: File
  port_list:any;
  CType_list:any;
  statusMsg?:string
  showFile:boolean = false
  showform:boolean=true;
date_created:any;
  from_date:any;
  expiry_date:any;
  type_of_ad:any;
  operation:any;
  container_type_id:any;
  price:any;
status:any;
quantity:any;
port_id:any;
contents:any;
port_of_departure:any;
port_of_arrival:any;
free_days:any;
per_diem:any;
pickup_charges:any;
 ContinueDraft:any;
 Approve:any;
 adId:any;

  companyName:any;
  company_logo:any;
  currentUser: any;
  licenceId:any;
  showDiv = false;
  data: any;
  public isButtonDisabled: boolean = false;

  PList: any[] = [];

  constructor(private sessionService: SessionService,private formBuilder: FormBuilder,private router:Router,private myadservice: MyAdService){
  }

  
  ngOnInit(): void {
   
   
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        this.companyName=this.companyName;
        console.log('company ID is :', companyId);
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );
    this.sessionService.getUserId().subscribe(
      (userId: number) => {
        this.userId = userId;
        console.log('User ID is :', userId);
      },
      (error: any) => {
        console.error('Error retrieving user ID:', error);
      }
    );
    
    this.myadservice.getPermissions(this.userId).subscribe(
      (permissions: any[]) => {
        this.PList = permissions;
        this.isButtonDisabled = !this.PList.includes(2);
        console.log("permissions are "+this.PList);
      
      },
      (error: any) => {
        console.log(error);
        alert("error")
      }
    );

   
     
   }
   
     
  onCancel() {
    // this.editprofileForm.reset()
    window.location.reload()
}
  
//   async onEdit(){
//     debugger;
 
    
  
//     const response = await this.myadservice.updatecompany(this.companyId,this.myadForm.value).toPromise();
//     console.log('edit'+response)
//     await this.router.navigateByUrl('profile',{skipLocationChange:true});
//     await this.router.navigate(['profile']);
//     await window.location.reload();
//  }

   DisplayPostForm(){
    this.showDiv = !this.showDiv;
    this.ContinueDraft=0;
   }
   DisplayDraftForm(adId: number){
    this.showDiv = !this.showDiv;
    this.ContinueDraft=1;
    this.adId=adId;

   }
   DisplayApproveForm(adId: number){
    this.showDiv = !this.showDiv;
    this.Approve=1;
    this.adId=adId;

   }
   edit(adId: number){
    this.adId=adId;
    if (this.port_id && this.container_type_id && this.file) {


      this.myadservice.updateAd(adId,this.file,this.from_date,this.expiry_date,this.type_of_ad,this.container_type_id,this.price,this.quantity,this.port_id, this.userId, this.companyId, this.contents,this.port_of_departure,this.port_of_arrival,this.free_days,this.per_diem,this.pickup_charges,this.operation).subscribe((response: any) => {
    
      
       if (response.message === 'Success') {
         this.statusMsg = 'Success';
         setTimeout(()=> {this.statusMsg = ""},2000)
         this.clear()
         window.location.reload()
       } else {
         this.statusMsg = 'Failed';
         console.log(response.status) ;
       }
     });
   }
   else{
     alert("Please Fill the Mandatory Fields")
   }

   }
  onExportClick() {

    console.log("Button clicked");
    alert("button clicked")
  }
  clear(){
    this.title= null
    this.description = null
  }
}







 
 
 
 


  
  
 

