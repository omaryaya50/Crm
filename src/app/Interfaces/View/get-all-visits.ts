import { DateFilterModel } from "ag-grid-community";

export interface GetAllVisits {

    visitsNo?: number;
    customerCode?: number;
    customerName?: string;
   customerLatName?: string;
    salesRepId?: number;
    salesRepName?: string;
     salesRepLatName?: string;
   regionName?: string;
     sectorName?: string;
    territoryName?: string;
     governorateName?: string;
     cclName?: string;
    adress?: string;
     companyName?: string;
    salesFieldName?:string;
   productGroupName?:string;
   date?:Date;
   territoryId?:number;
   sectorId?:number


}
