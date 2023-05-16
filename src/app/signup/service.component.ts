import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root',
})

export class SignupService{
    private uri = "https://localhost:7181/loginController/AddUser"

    constructor(private httpClient:HttpClient){}

    AddUser(username:string,password:string){
        let reqbody={
            UserName:username,
            password:password,
            Role:"user"
        }

        return this.httpClient.post(this.uri,reqbody);
    }
}