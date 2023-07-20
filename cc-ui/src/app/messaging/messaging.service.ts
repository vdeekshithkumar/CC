import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { conversation } from '../DTO/conversation';
import { Message } from '../DTO/Message';
import { participant,Candidate } from '../DTO/Participant';

export interface Negotiation{
  negotiation_id: number;
  user_id:number;
  ad_id:number;
  price:number;
  negotiation_type:string;
  container_type:string;
  quantity: number;
  status: string;
  company_id:number;
  contract_id:any;
  date_created:Date;
  expiry_date:Date;
  updated_by:number;
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private http : HttpClient) { }
  getConversationByCompanyId(companyId:number){
    return this.http.get<conversation[]>(`https://localhost:7157/GetConversationByCompanyId?companyId=${companyId}`);
  }
  getConversationByAdCompanyId(AdscompanyId:number){
    return this.http.get<conversation[]>(`https://localhost:7157/GetConversationByAdCompanyId?AdscompanyId=${AdscompanyId}`);
  }
  getconversationbyconid(ConversationId:number){
    return this.http.get<conversation[]>(`https://localhost:7157/GetConversationByConversationId?ConversationId=${ConversationId}`);
  }
  getconversationbynegid(negotiation_id:number){
    return this.http.get<conversation[]>(`https://localhost:7157/GetConversationByNegotationId?negotiation_id=${negotiation_id}`);
  }
  getMessges(conversationId:number)
  {
    return this.http.get<Message[]>(`https://localhost:7157/GetMessagesByConversationId?conversationId=${conversationId}`);
  }
  sendMessage(message:Message)
  {
    return this.http.post (`https://localhost:7157/SendMessage`,message)
  }
  GetParticipants(convoID:number)
  {
    return this.http.get<participant[]>(`https://localhost:7157/GetParticipantsByConversationId?convoid=${convoID}`)
  }
  GetUsersAsync(convoID:number , companyId:number)
  {
    return this.http.get<Candidate[]> (`https://localhost:7157/GetUsers?convoid=${convoID}&companyId=${companyId}`)
  }
   AddParticipant (participant:participant)
  {
    debugger
    return  this.http.post(`https://localhost:7157/AddParticipant`, participant)
  }
  // CreateConversation(conversation:conversation){
  //   return this.http.post(`https://localhost:7157/CreateConversation`,conversation)
  // }
  createConversation(conversation: any) {
    return this.http.post('https://localhost:7157/CreateConversation', conversation);
  }


}
