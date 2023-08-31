export interface conversation {
  adcompanyId:number;  
  conversationid: number;
  company_id: number;
  user_id:number;
  company_name:string;
  first_name:string;
  is_active:number;
  negotiation_id:number;
  company_logo:string;
  negotiator_company_name:string;
  negotiator_company_logo:string;
}
export interface Candidatee{
  user_id:number,
  company_id:number,
  first_name:string,
  last_name:string,
  designation:string
  selected:boolean
  company_name: string
}
      