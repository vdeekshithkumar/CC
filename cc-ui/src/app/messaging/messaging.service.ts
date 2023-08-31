import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { conversation } from '../DTO/conversation';
import { Message } from '../DTO/Message';
import { participant,Candidate } from '../DTO/Participant';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/internal/Observable';

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

  constructor(private http : HttpClient,private apiService: ApiService) { }
  
  private countUrl = 'https://localhost:7157/GetmessageCount';
  getConversationByCompanyId(companyId:number){

    const url = this.apiService.getFullUrl(`GetConversationByCompanyId?companyId=${companyId}`);
    return this.http.get<conversation[]>(url);
  }
  getConversationByAdCompanyId(AdscompanyId:number){
    const url = this.apiService.getFullUrl(`GetConversationByAdCompanyId?AdscompanyId=${AdscompanyId}`);
    return this.http.get<conversation[]>(url);
  }
  getconversationbyconid(ConversationId:number){
    const url = this.apiService.getFullUrl(`GetConversationByConversationId?ConversationId=${ConversationId}`);
    return this.http.get<conversation[]>(url);
  }
  getconversationbynegid(negotiation_id:number){
    const url = this.apiService.getFullUrl(`GetConversationByNegotationId?negotiation_id=${negotiation_id}`);
    return this.http.get<conversation[]>(url);
  }
  getMessges(conversationId:number)
  {
    const url = this.apiService.getFullUrl(`GetMessagesByConversationId?conversationId=${conversationId}`);
    return this.http.get<Message[]>(url);
  }
  sendMessage(message:Message)
  {
    const url = this.apiService.getFullUrl(`SendMessage`);
    return this.http.post (url,message)
  }
  GetParticipants(convoID:number)
  {
    const url = this.apiService.getFullUrl(`GetParticipantsByConversationId?convoid=${convoID}`);
    return this.http.get<participant[]>(url)
  }
  GetUsersAsync(convoID:number , companyId:number)
  {
    const url = this.apiService.getFullUrl(`GetUsers?convoid=${convoID}&companyId=${companyId}`);
    return this.http.get<Candidate[]> (url)

  }
   AddParticipant (participant:participant)
  {
    debugger

    const url = this.apiService.getFullUrl(`AddParticipant`);
    return  this.http.post(url, participant)
  }
  // CreateConversation(conversation:conversation){
  //   return this.http.post(`https://localhost:7157/CreateConversation`,conversation)
  // }
  createConversation(conversation: any) {
    const url = this.apiService.getFullUrl(`CreateConversation`);
    return this.http.post(url, conversation);

  }

  getMessageCount(companyId: number): Observable<any> {
    const url = this.apiService.getFullUrl(`GetmessageCount?companyId=${companyId}`);
    return this.http.get(url);
  }
  EditMessagestatus(conversationID:number,companyId: number): Observable<any> {
    const url = this.apiService.getFullUrl(`Editmessagestatus?conversationID=${conversationID}&companyId=${companyId}`);
    return this.http.put(url,null);
  }
}
