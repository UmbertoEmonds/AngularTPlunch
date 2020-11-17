import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = "http://localhost:8080/stone.lunchtime/"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  login(credentials: any){
    // rajouter {observe "response"} pour accéder à la réponse en POST
    return this.http.post(API + "login", credentials, {observe: "response"})
  }

  getUsers(token:string){

    let options = {
      headers: {"Authorization": token}
    }

    return this.http.get(API + "user/findall", options)
  }

  addToWallet(token: string, userId:number, amount:number, type:string){

    let options = {
      headers: {"Authorization": token}
    }

    let URL = 'user/' + type + '/' + userId + '?amount=' + amount;

    return this.http.post(API + URL, options, { headers : options.headers , observe : "response"})
    
  }

}