import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root',
})

export class HomeServices{
    
    constructor(private httpclient:HttpClient){}

    private uri = 'https://localhost:7181/appointment';

    private getApp = '/getAppointment';
    private updateapp = '/updateAppointment';
    private createapp = '/createAppointment';
    private deleteapp ='/DeleteAppointment';

    GetApp(){
        return this.httpclient.get(this.uri+this.getApp);
    }

    UpdateApp(username:string,password:string,appid:number){
        let reqbody={
            UserName:username,
            password:password,
        }

        return this.httpclient.put(this.uri+this.updateapp+'/'+appid,reqbody);
    }

    CreateApp(userId:number,name:string,date:string){

        let reqbody={
            userId:userId,
            UserName:name,
            date:date
        }

        return this.httpclient.post(this.uri+this.CreateApp,reqbody);
    }

    DeleteApp(appid:number){
        return this.httpclient.delete(this.uri+this.DeleteApp+'/'+appid);
    }
}