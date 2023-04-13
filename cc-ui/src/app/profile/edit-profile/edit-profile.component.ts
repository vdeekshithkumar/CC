import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditProfileService } from './edit-profile.service';
import { Observable, Subscriber } from 'rxjs';
import { ProfileComponent } from '../profile.component';

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
     company_id:[this.profileComponent.company_id,Validators.required],
      name: [this.profileComponent.name, Validators.required],
      domain_address: [this.profileComponent.domain_address, Validators.required],
      company_logo: [this.profileComponent.company_logo, Validators.required],
      company_location: [this.profileComponent.company_location, Validators.required],
      country: [this.profileComponent.country, Validators.required],
      rating:[ this.profileComponent.rating, Validators.required],
      address: [this.profileComponent.address, Validators.required],
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
  onEdit(){
    this.editProfileService.updatecompany(this.editprofileForm.value)  
                .subscribe((data) => {  
                    this.router.navigate(['/dashboard']);
                    // this.resetForm();  
                })  
              }
            
    // onEdit() {
    //             this.editProfileService.updatecompany(company_id).subscribe(data => {
    //               this.editprofileForm.patchValue(data);
    //             })
    //           }
  
  GetAllCompany() {
    throw new Error('Method not implemented.');
  }
//   onSubmit(){
//   var updatemodel = {     
//     company_id:this.editprofileForm.value.company_id,
//   name: this.editprofileForm.value.firstName,
//   licence_id: this.editprofileForm.value.licence_id,
//   domain_address: this.editprofileForm.value.domain_address,
//   company_location: this.editprofileForm.value.company_location,
//   country: this.editprofileForm.value.country,
//   rating: this.editprofileForm.value.rating,
//   address: this.editprofileForm.value.address,
 
// }

// this.editProfileService.updatecompany(updatemodel).subscribe(data=>{
// this.GetAllCompany();

// })
// }
  // resetForm(){
  //   this.editprofileForm.value.company_id=''
  //   this.editprofileForm.value.name=''
  //   this.editprofileForm.value.domain_address=''
  //   this.editprofileForm.value.rating=''
  //   this.editprofileForm.value.address=''
  // }
}
