import { Component, ViewChild, ElementRef,  OnInit, ChangeDetectorRef } from '@angular/core';
import { SessionService } from '../session.service';
import { MessagingService } from './messaging.service';
import { Candidatee, conversation } from '../DTO/conversation';
import { Message } from '../DTO/Message';
import { Candidate, participant } from '../DTO/Participant';
import { DatePipe, formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NegotiationsService } from '../negotiations/negotiations.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
 
})

export class MessagingComponent implements OnInit {

  @ViewChild('conversationsRef') container!: ElementRef;
  conversationsRef!: ElementRef;
  isBold: boolean = false;
  tempContent: string = "";
  selectedConversationData!:any;
  isItalic:boolean=false;
  todayHeadingDisplayed = false;
  companyId!: number
  adcompanyId!:number
  userId: number = 0
  conversations: conversation[] = [];
  convid: conversation[] = [];
  filteredConversations: conversation[]=[];
  messages: Message[] = []
  lastMessages: { [key: number]: Message | undefined } = {};
  participants: participant[] = []
  conversationID!:number
  negotiation_id:any
  user_id:any;
  AdscompanyId!: number;
  ad_id!: number;
  selectedNegotiationId!:any;
  selectedNegotiation: any; // Replace 'any' with the appropriate type of negotiation
  content!:string
  users: Candidate[] = []
  use:Candidatee[]=[]
  loadUsers = true
  ads_list:any;

  negotiationId!: string;
  selectedConversationName!: string;
  selectedConversationDesc!: string;
  selectedcompanyname!:string;
  first_name!:string;
  selectedConversationLogo!:string;
  selectedConversationIndex: number = -1;
  showPopup: boolean = false;
  company_list:any;
  selectedConversation: any;


  companyNames: { [companyId: number]: string } = {};
  AdscompanyNames: { [ad_id: number]: string } = {};
  constructor(private negotiationservice:NegotiationsService, private route: ActivatedRoute,private cdr: ChangeDetectorRef,private sessionService: SessionService, private messageService: MessagingService) { }

  ngOnInit(): void {
  
    this.getAllConversations();
   
    // this.route.params.subscribe(params => {
    //   this.negotiation_id = params['negotiation_id'];
    //   console.log(this.negotiation_id);
    
    // });
    this.loadSelectedUsers();
    // get company id from session
    this.sessionService.getCompanyId().subscribe({
      next: (companyId: number) => {
        this.companyId = companyId;
        this.retrieveConversationsByCompanyId();
      },
      error: (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    });
   
  
    // user id from session
    this.sessionService.getUserId().subscribe({
      next: (userId: number) => {
        this.userId = userId;
      },
      error: (error: any) => {
        console.error('Error retrieving user ID:', error);
      }
    });
  
    this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
  }
  retrieveConversationsByCompanyId(): void {
   
    this.sessionService.getCompanyId().subscribe({
      next: companyId => {
        this.companyId = companyId;
        // this.adcompanyId = this.getConversationByAdCompanyId();// Assuming  is a number
        // Assuming getAdCompanyId() retrieves adCompanyId
        this.messageService.getConversationByCompanyId(this.companyId).subscribe({
          next: data => {
            this.conversations = data;
            console.log(this.conversations);
            this.filterConversationsByNegotiationId();
          },
          error: error => {
            console.log(error);
          }
        });
      },
      error: error => {
        console.log(error);
      }
    });
  }
  EditMessageStatusForConversation() {
    debugger
    this.messageService.EditMessagestatus(this.conversationID, this.companyId).subscribe({
      next: (response: any) => {
        // Handle the response after editing the message status
        console.log(`Message status edited for conversation ${this.conversationID}`);
      },
      error: (error: any) => {
        console.error(`Error editing message status for conversation ${this.conversationID}:`, error);
      }
    });
  }
  // EditMessageStatus():void{
  // this.messageService.EditMessagestatus()
  // }
  
  // filterConversationsByNegotiationId(): void {
  //   debugger
  //   if (this.companyId && this.conversations &&this.adcompanyId) {
      
  //     this.filteredConversations = this.conversations.map(convo => {
  //       console.log(this.adcompanyId);
  //       return {
  //         ...convo,
  //         companyName: (convo.adcompanyId === this.companyId) ? convo.negotiator_company_name : convo.company_name
  //       };
  //     });
  //   }
  // }
  
  filterConversationsByNegotiationId(): void {
  
    if (this.companyId && this.conversations) {
      // Filter the conversations based on the companyId and adCompanyId
      // this.filteredConversations = this.conversations.filter(
      //   convo => convo.company_id === this.companyId || convo.adcompanyId === this.adcompanyId
      // );
      this.filteredConversations = this.conversations.map(convo => {
           return {
           ...convo,
              companyName: (convo.company_id === this.companyId) ? convo.negotiator_company_name : convo.company_name
             
            };
            
       });
          }
    }
  
  
  
  selectConversation(index: number, conversation: any) {
   
    this.selectedConversationIndex = index;
    // Perform any necessary actions with the selected conversation
    this.getMessages(conversation.conversationId);
    this.selectedConversationName = conversation.company_name;
    this.selectedConversationDesc = conversation.first_name;
    console.log("in msg",this.selectedConversationDesc);
    this.selectedConversationLogo = conversation.company_logo;
  }
  getAllConversations() {
    // Implement the logic to fetch all conversations
    // Assign the fetched conversations to a property in your MessagingComponent
  }
  
  loadSelectedUsers() {
    const storedUsers = localStorage.getItem('selectedUsers');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }
  getsortedMessages() {
    return this.messages.slice().sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }

    // this.selectedNegotiationId = negotiation_id;
  getMessages(conversationId: number) {
   
  this.loadUsers = false;
  this.conversationID = conversationId;
  this.messageService.getMessges(conversationId).subscribe({
    next: data => {
      this.messages = data;
      if (data && data.length > 0) {
        this.lastMessages[conversationId] = data[data.length - 1];
      } else {
        this.lastMessages[conversationId] = undefined;
      } // Store the last message in lastMessage variable
    },
    error: error => {
      console.log(error);
    }
  });
  this.getParticipants();
  this.selectedConversationData = this.conversations.filter(convo => convo.company_id === this.selectedNegotiationId);
}
  
  setSelectedConversationIndex(index: number): void {
    this.selectedConversationIndex = index;
  }
  setSelectedConversation(convo: any) { // Replace 'any' with the appropriate type of conversation
    this.selectedNegotiation = convo;
    this.selectedConversationName = convo.conversationName;
    this.selectedConversationDesc = convo.convoDesc;
  }
  applyBold() {
    if (this.isBold) {
      this.content += "<b>" + this.tempContent + "</b>";
    } else {
      this.content += this.tempContent;
    }
    this.tempContent = "";
  }
  
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault(); // Prevents the default behavior of "Enter" key
        this.sendMessage(this.content);
      }
    }
  }
  toggleBold(textArea: HTMLTextAreaElement) {
    this.isBold = !this.isBold;
    if (this.isBold) {
      textArea.style.fontWeight = 'bold';
    } else {
      textArea.style.fontWeight = 'normal';
    }
  }
  // getCompanyName(companyId: number): string {
  //   const port = this.company_list.find((p: { company_id: number, company_name: string }) => p.company_id === companyId);
  //   return port ? port.company_name : '';
  // }
//   getCompanyName(adId: number): string {
//     debugger
//     this.AdscompanyId = this.AdscompanyNames[adId];
//     console.log(this.companyNames[this.AdscompanyId])
//    return this.companyNames[this.AdscompanyId] || 'Unknown Company';
//  }
  toggleItalic(textArea: HTMLTextAreaElement) {
    this.isItalic = !this.isItalic;
    if (this.isItalic) {
      textArea.style.fontWeight = 'italic';
    } else {
      textArea.style.fontWeight = 'normal';
    }
  }
  hasTodayMessages(): boolean {
    const today = new Date().setHours(0, 0, 0, 0); // Get the start of the current day
    return this.messages.some(message => this.isToday(message.timestamp));
  }
  
  isFirstMessageOrDateChanged(index: number): boolean {
    if (index === 0) {
      return true; // It's the first message
    } else {
      const currentMessage = this.messages[index];
      const previousMessage = this.messages[index - 1];
      const currentDate = new Date(currentMessage.timestamp).toDateString();
      const previousDate = new Date(previousMessage.timestamp).toDateString();
      return currentDate !== previousDate;
    }
  }
  // scrollToBottom() {
  //   if (this.conversationsRef) {
  //     this.conversationsRef.nativeElement.scrollTop = this.conversationsRef.nativeElement.scrollHeight;
  //   }
  // }
  isToday(date: Date) {
    const today = new Date();
    return date.setHours(0,0,0,0) === today.setHours(0,0,0,0);
  }
  timestampToDate(timestamp: number) {
    return new Date(timestamp);
  }
  // scrollToBottom() {
  //   if (this.conversationsRef) {
  //     this.conversationsRef.nativeElement.scrollTop = this.conversationsRef.nativeElement.scrollHeight;
  //   }
  // }
  sendMessage(content: string) {
    if (content.length == 0) {
      return;
    }
    
    const message: Message = {
      content: content,
      senderid: this.userId,
      conversationid: this.conversationID,
      timestamp: new Date(),
  
      // negotiation_id:this.negotiation_id,
    };
 
    this.messageService.sendMessage(message).subscribe({
      next: data => {
        this.getMessages(this.conversationID);
        this.content = '';
        this.scrollToBottom(); // Scroll to bottom after retrieving messages
      },
      error: error => {
        console.error("Failed to send the message");
      }
    });
  }
  
  getParticipants()
  {
    this.messageService.GetParticipants(this.conversationID).subscribe({
      next: data => {
       
        this.participants = data
      },
      error: error => {
        console.log(error);
      }
    });
  }
  getSenderName(senderId: number): string {
   
    const participant = this.participants.find(p => p.userId === senderId);
    return participant ? participant.first_name : '';
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
      first_name: candidate.first_name,
      last_name: candidate.last_name,
      company_name: candidate.company_name,
      AdscompanyId:candidate.AdscompanyId
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
   
  togglePopup() {
    this.showPopup = !this.showPopup;
  }
  scrollToBottom() {
    const container = this.conversationsRef.nativeElement;
    container.scrollTop = container.scrollHeight;
  }
  // async sendMessage(senderId:number, content:string , )  
  addParticipants() {

    const selectedUsers = this.users.filter(user => user.selected);
    this.users.forEach(user => {
      if (user.selected) {
        this.addParticipant(user);
        console.log(user)
      }
    });
    this.getParticipants()
    this.getUsers()


    // Trigger change detection to update the view
    this.cdr.detectChanges();
  }
  addParticipantss() {
  
    const selectedUsers = this.users.filter(user => user.selected);
    this.users.forEach(user => {
      if (user.selected) {
        this.addParticipant(user);
        console.log(user)
      }
    });
    this.getParticipants()
    this.getUsers()
    location.reload();
    localStorage.setItem('selectedUsers', JSON.stringify(selectedUsers));
  }
  closeForm() {
    this.showPopup = false;
  }
  toggleSelection(user: any) {
    user.selected = !user.selected;
    this.saveSelectedUsers();
  }

  saveSelectedUsers() {
    const selectedUsers = this.users.filter(user => user.selected);
    localStorage.setItem('selectedUsers', JSON.stringify(selectedUsers));
  }
}
