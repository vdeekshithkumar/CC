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
        border: 1px solid #ccc;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        text-align: center;
      }

      .error-dialog-title {
        font-size: 24px;
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
        background-color: #f44336;
        color: #f8f8f8;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        border: #333;
        cursor: pointer;
        font-size: 12px;
        height: 10px;
        width:20px;
        transition: background-color 0.3s ease;
      }

      .error-dialog-button:hover {
        background-color: #d32f2f;
      }
    </style>
    <div class="bg-black">
      <div class="error-dialog">
        <h2 class="error-dialog-title">Error</h2>
        <div class="error-dialog-message">
          {{ data.message }}
        </div>
        <div class="error-dialog-actions" align="end">
          <button class="error-dialog-button" mat-button mat-dialog-close>
            Close
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
