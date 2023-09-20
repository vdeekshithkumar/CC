export interface participant{
    participantId?:number,
    conversationId:number,
    userId:number,
    companyId:number,
    first_name: string,
    last_name:string,
    company_name:string,
    AdscompanyId:number;
}
export interface Candidate{
    user_id:number,
    company_id:number,
    first_name:string,
    last_name:string,
    designation:string
    selected:boolean
    company_name: string
    AdscompanyId:number;
}