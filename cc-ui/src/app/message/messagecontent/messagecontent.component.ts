import { Component } from '@angular/core';
@Component({
  selector: 'app-messagecontent',
  templateUrl: './messagecontent.component.html',
  styleUrls: ['./messagecontent.component.css']
})
export class MessagecontentComponent {
  messages: { sender: string, content: string }[] = [];
  newMessage: string = '';

  sendMessage() {
      if (this.newMessage !== '') {
          const message = {
              sender: 'User',
              content: this.newMessage
          };
          this.messages.push(message);
          this.newMessage = '';
      }
  }
  handleFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;

    if (files && files.length > 0) {
      // Process the selected file(s) here
      const selectedFile = files[0];
      console.log('Selected file:', selectedFile);
      
      // You can perform further operations with the file, such as uploading it to a server.
      // You may need to use a separate service or API for that purpose.
      // Example: this.fileUploadService.uploadFile(selectedFile);
    }
  }
}
