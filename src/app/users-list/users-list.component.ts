import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

interface Credential {
  email:string,
  password:string
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private userService: UserService) {}

  users: User[] = []
  private token:string
  credentials: Credential = {email: "toto@gmail.com", password: "bonjour"}
  wallet: number

  ngOnInit(): void {
    this.login(this.credentials)
  }

  getUsers(token: string){
    this.userService.getUsers(token)
    .subscribe((res: any) => {
      this.users = res
    })
  }

  login(credential: Credential){
    this.userService.login(credential)
      .subscribe((res: any) => {
        this.token = res.headers.get("Authorization")
        this.getUsers(this.token)
      })
  }

  addToWallet(userId: number, amount:number){
    this.userService.creditWallet(this.token, userId, amount)
      .subscribe((res: any) => {
        console.log(res)
      })
  }

  removeToWallet(userId: number, amount: number){
    this.userService.debitWallet(this.token, userId, amount)
      .subscribe((res: any) => {
        console.log(res)
      })
  }
}