import { HttpClient } from '@angular/common/http';
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

    let headers = {
      headers: {"Authorization": token}
    }

    return this.http.get(API + "user/findall", headers)
  }

  addToWallet(token: string, userId:number, amount:number, type:string){

    let headers = {
      headers: {"Authorization": token}
    }

    if(type == "credit") return this.http.post(API + "user/credit/" + userId +"?amount=" + amount, headers)
    else return this.http.post(API + "user/debit/" + userId +"?amount=" + amount, headers)
    
  }
}