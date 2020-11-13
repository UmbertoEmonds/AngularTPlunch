import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = "http://localhost:8080/stone.lunchtime/"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(credentials: any){
    // TODO: vérifier les inputs
    // rajouter {observe "response"} pour accéder à la réponse en POST
    return this.http.post(API + "login", credentials, {observe: "response"})
  }

  getUsers(token:string){

    let headers = {
      headers: {"Authorization": token}
    }

    return this.http.get(API + "user/findall", headers)
  }

  creditWallet(token:string, userId:number, amount:number){

    let headers = {
      headers: {"Authorization": token}
    }

    return this.http.post(API + "user/credit/" + userId +"?amount=" + amount, headers)
  }

  debitWallet(token:string, userId:number, amount:number){

    let headers = {
      headers: {"Authorization": token}
    }

    return this.http.post(API + "user/debit/" + userId +"?amount=" + amount, headers)
  }

}
