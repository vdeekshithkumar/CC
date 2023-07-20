export interface participant{
    participantId?:number,
    conversationId:number,
    userId:number,
    companyId:number,
    fname: string,
    lname:string,
    company_name:string,
    AdscompanyId:number;
}
export interface Candidate{
    user_id:number,
    company_id:number,
    fname:string,
    lname:string,
    designation:string
    selected:boolean
    company_name: string
    AdscompanyId:number;
}