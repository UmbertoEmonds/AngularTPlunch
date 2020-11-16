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

  updateWallet(userId: number, amount: number, type:string){

    if(amount != 0){
      this.userService.addToWallet(this.token, userId, amount, type)
      .subscribe((res: any) => {
        this.updateUI(userId, type, amount)
      })
    } else {
      alert("Veuillez saisir un montant")
    }
    
  }

  updateUI(userId: number, type:string, amount: number){
    this.users.forEach((user : User) => {
      if (user.id == userId){
        let newWallet: number
        if(type == "credit"){
          newWallet = user.wallet + amount
        } else {
          newWallet = user.wallet - amount
        }
        user.wallet = newWallet
      }
    })
  }

}