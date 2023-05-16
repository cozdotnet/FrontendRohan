import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root',
})


export class LoginServices{
    private url = 'https://localhost:7181/loginController/login';

    constructor(private http: HttpClient) { }

    async LoginCredential(uId: string, pass: string): Promise<any> {
        let reqbody = {
            UserName: uId,
            password: pass,
        };

        try {
            const response = this.http.post(this.url, reqbody).toPromise();
            return response;
        } catch (error) {
            throw new Error('Invalid user name or password');
        }
    }
}