import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { MessagingService } from './messaging.service';
import { conversation } from '../DTO/conversation';
import { Message } from '../DTO/Message';
import { Candidate, participant } from '../DTO/Participant';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  companyId!: number
  userId: number = 0
  conversations: conversation[] = [];
  messages: Message[] = []
  participants: participant[] = []
  conversationID!:number
  content!:string
  users: Candidate[] = []
  constructor(private sessionService: SessionService, private messageService: MessagingService) { }

  ngOnInit(): void {
    //get company id from session
    this.sessionService.getCompanyId().subscribe({
      next: (companyId: number) => {
        this.companyId = companyId;
      },
      error: (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    });

    //user id from session 
    this.sessionService.getUserId().subscribe({
      next: (userId: number) => {
        this.userId = userId;
      },
      error: (error: any) => {
        console.error('Error retrieving user ID:', error);
      }
    });

    this.messageService.getConversationByCompanyId(this.companyId).subscribe({
      next: data => {
        this.conversations = data;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  getsortedMessages() {
    return this.messages.slice().sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }

  getMessages(convoID: number) {
    this.conversationID = convoID
    this.messageService.getMessges(convoID).subscribe({
      next: data => {
        debugger
        this.messages = data
        
      },
      error: error => {
        console.log(error);
      }
    });
    this.getParticipants()
  }
  
  sendMessage(content:string){
    if(content.length==0){
      return
    }
    let message:Message=
    {
      content: content,
      senderId: this.userId,
      conversationId: this.conversationID,
      timestamp: new Date()
    }
    
    this.messageService.sendMessage(message).subscribe({
      next: data =>{ 
        this.getMessages(this.conversationID)
        this.content=''
      },
      error: error=>{
        console.error("failed to send the message");
      }
    })
  }
  getParticipants()
  {
    this.messageService.GetParticipants(this.conversationID).subscribe({
      next: data => {
        debugger
        this.participants = data
      },
      error: error => {
        console.log(error);
      }
    });
  }
  getUsers(){
    this.messageService.GetUsersAsync(this.conversationID, this.companyId).subscribe({
      next:data=>{
        this.users = data
      },
      error :error=>{
        console.error(error)
      }
    })
  }
  async addParticipant(candidate: Candidate) {
    const participant: participant = {
      conversationId: this.conversationID,
      userId: candidate.user_id,
      companyId: this.companyId,
      fname: candidate.fname,
      lname: candidate.lname,
      company_name: candidate.company_name
    };
    this.messageService.AddParticipant(participant).subscribe({
      next: data => {
        // Handle the response
      },
      error: error => {
        // Handle the error
      }
    });
    
  }
  
  // async sendMessage(senderId:number, content:string , )  
  addParticipants() {
    this.users.forEach(user => {
      if (user.selected) {
        this.addParticipant(user);
      }
    });
    this.getParticipants()
    this.getUsers()
  }
}
