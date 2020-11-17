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
    let token = localStorage.getItem("token")
    if(token != null){
      this.token = token
      this.getUsers(this.token)
    } else {
      this.login(this.credentials)
    }
  }

  getUsers(token: string){
    this.userService.getUsers(token)
    .subscribe((res: any) => {
      this.users = res
    }, (error) => {
      alert("Une erreur s'est produite")
    })
  }

  login(credential: Credential){
    this.userService.login(credential)
      .subscribe((res: any) => {
        this.token = res.headers.get("Authorization")
        localStorage.setItem("token", this.token)
        this.getUsers(this.token)
      }, (error) => {
        alert("Une erreur s'est produite lors de la connexion")
      })
  }

  updateWallet(userId: number, amount: string, type:string, index:number){

    let newAmount = parseFloat(amount)

    if(newAmount != 0){
      this.userService.addToWallet(this.token, userId, newAmount, type)
      .subscribe(
        (response) => {

        this.updateUI(userId, type, newAmount, index)

      }, (error) => {

        alert(error.error.exceptionMessage)

      })
    } else {
      alert("Veuillez saisir un montant")
    }
    
  }

  updateUI(userId: number, type:string, amount: number, index:number){

    if(type == "credit"){
      this.users[index].wallet += amount
    } else {
      this.users[index].wallet -= amount
    }

  }

}