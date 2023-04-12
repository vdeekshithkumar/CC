import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { SignInService } from '../sign-in/sign-in.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit{
  fileToUpload!: File;
  imageUrl!: string;

  company_id?: number;
  name?:string;
 domain_address?:string;
 licence_id?:number;
      rating?:number;
      address?:string;
      company_logo?:string
      company_location?:string
      country?:string
      
  company_list :any;
  showDiv = false;
  profileForm!:FormGroup;
 
  constructor(private formBuilder: FormBuilder,private router:Router,private profileService:ProfileService,private signInService: SignInService,private http: HttpClient){

  }
  ngOnInit(): void {
    this.profileService.getCompanyById(1).subscribe(
      data => {
          this.name=data.name,
          this.licence_id=data.licence_id,
          this.domain_address=data.domain_address,
          this.company_logo=data.company_logo,
          this.company_location=data.company_location,
      this.country=data.country,
          this.rating=data.rating,
          this.address=data.address
      },
      error => {
          console.warn("oninit error"+error);
      }
  );
  }
  onEditButtonClick(company_id: number) {
    // Assuming you have retrieved the values from your backend or from any other source
    this.profileService.getCompanyById(company_id).subscribe(data => {
      this.profileForm.patchValue(data);
    })
  }
  onFileChange(event: any) {
    this.fileToUpload = event.target.files[0];
  }
  uploadImage() {
    const formData = new FormData();
    formData.append('image', this.fileToUpload, this.fileToUpload.name);
    this.http.post<any>('https://localhost:7157/', formData).subscribe(
      (        response: {imageUrl: string; }) => {
            this.imageUrl = response.imageUrl;
        },
      (error) => {
            console.log(error);
        }
    );
    
}
}

  // const company_id = this.signInService.getCompanyById();
  // this.signInService.getCompanyById(company_id).subscribe(
  //   (data) => {
  //     this.company_list = data;
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );
  // onSubmit(){
  //  (company_id:number)=>{
  //     // this.profileService.subscribe(data=>{
  //     //   this.profileForm.patchValue(data);
  //     // })
  //   }}
  // }
    // this.editprofileForm = this.formBuilder.group({
    //   company_id: ['2', Validators.required],
    //   name: ['', Validators.required],
    //   licence_id: ['11', Validators.required],
    //   domain_address: ['www.jbg', Validators.required],
    //   company_logo: ['C:\Users\Theje\Downloads\IMG_20230213_135109.jpg', Validators.required],
    //   company_locations: ['123452345678', Validators.required],
    //   country: ['india', Validators.required],
    //   rating:['ffsssss', Validators.required],
    //   address: ['hgd', Validators.required],
    //   });
  
 
    // this.editProfileService.edit(this.editprofileForm.value).subscribe(
    //   (response)=>{
    //     console.log(response);
    //     this.router.navigate(['/profile'])
    //   },
    //   (error)=>{
    //     console.log('error',error);
    //   }
    //   );
  

