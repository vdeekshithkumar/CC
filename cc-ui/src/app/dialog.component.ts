import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';




@Component({

  selector: 'app-dialog',

  template: `

    <style>

      .error-dialog {

        max-width: 400px;

        padding: 20px;

        background-color: #f8f8f8;

        border: 2px;

        text-align: center;

        font-family: "Poppins", sans-serif;

      }

      .error-dialog-title {

        font-size: 20px;

        margin: 0;

        margin-bottom: 10px;

        color: #333;

       

      }




      .error-dialog-message {

        font-size: 16px;

        margin-bottom: 20px;

        color: #666;

       

      }




      .error-dialog-button {

        background-color: #2F54EB;

        color: #f8f8f8;

        border: 2px;

     

        border-radius: 4px;

        border: #333;

        cursor: pointer;

        font-size: 10px;

        height: 20px;

        width:68px;  

        align-items: center;

        text-align: center;

      }




      .error-dialog-button:hover {

     

      }

     

    </style>

    <div class="bg-black">

      <div class="error-dialog">

        <h2 class="error-dialog-title">Error</h2>

        <div class="error-dialog-message">

          {{ data.message }}

        </div>

        <div  align="end">

          <button class="error-dialog-button "  mat-dialog-close>

            Ok

          </button>

        </div>

      </div>

    </div>

  `,

})

export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}