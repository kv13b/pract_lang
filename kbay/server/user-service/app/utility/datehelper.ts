import dayjs from "dayjs"

export const TimeDifference=(fromDate:string,toDate:string,type:"d"|"h"|"m")=>{
    const startDate=dayjs(fromDate);
    const endDate=dayjs(toDate);
    return startDate.diff(endDate,type, true);
}