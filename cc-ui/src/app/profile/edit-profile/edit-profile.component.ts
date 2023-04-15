import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditProfileService } from './edit-profile.service';
import { Observable, Subscriber } from 'rxjs';
import { ProfileComponent } from '../profile.component';
import { response } from 'express';
import { Console } from 'console';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit{
  editprofileForm!:FormGroup;
  title = 'imgtobase64';
  myimage!: Observable<any>;
  base64code!: any
  productImage: any;
  constructor(private profileComponent:ProfileComponent,private formBuilder: FormBuilder,private router:Router,private editProfileService:EditProfileService){
  }

  ngOnInit(): void {
    this.editprofileForm = this.formBuilder.group({
     company_id:['1',Validators.required],
     licence_id:['5',Validators.required],
      name: ['Yak PVT LTD', Validators.required],
      domain_address: ['hh', Validators.required],
      company_logo: ['', Validators.required],
      company_location: ['imfa', Validators.required],
      country: ['uk', Validators.required],
      rating:['9 ', Validators.required],
      address: ['hfgf', Validators.required],
      });
  }

  onCancel() {
    // Call the reset method on the form group to reset the form
    this.editprofileForm.reset();
  }
  
  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file)
  };
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d) => {
      console.log(d)
      this.myimage = d
     this.editprofileForm.get('company_logo')?.setValue(d.split(',')[1]);
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
  
  UploadImage(image: any) {
    this.productImage = image;
  }
  // onEdit(){
  //   this.editProfileService.edit(this.editprofileForm.value).subscribe(
  //     (response)=>{
  //       console.log(response);
  //       this.router.navigate(['/profile'])
  //     },
  //     (error)=>{
  //       console.log('error',error);
  //     }
  //     );
  
  // }
  async onEdit(){
    console.log("submit form va;ue goes below"+ this.editprofileForm);
    
    // this.editProfileService.updatecompany(this.editprofileForm.value)  
    //             .subscribe((data) => {  
    //                 this.router.navigate(['/dashboard']);
    //                 // this.resetForm();  
    //             })  
    //           }

    {
      try {
        const response = await this.editProfileService.updatecompany(this.editprofileForm.value).toPromise();
        console.log(response);
        
        this.router.navigate(['/sign-in'], { queryParams: { registered: true }});
        await this.router.navigateByUrl('/upload-inventory', { skipLocationChange: true });
        await this.router.navigate(['/upload-inventory']);
        await window.location.reload()
      } 
      catch (error) {
        console.log('Error uploading inventory:', error);
        console.log(this.editprofileForm.value);
      }
    }
}
}

      
              