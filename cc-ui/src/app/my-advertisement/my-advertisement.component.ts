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

 
  companyId:any;
  companyName:any;
  company_logo:any;
  currentUser: any;
  licenceId:any;
  showDiv = false;
  data: any;
  public isButtonDisabled: boolean = false;
  userId: any;
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

   
  onExportClick() {

    console.log("Button clicked");
    alert("button clicked")
  }
}







 
 
 
 


  
  
 

