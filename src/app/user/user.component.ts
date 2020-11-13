import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const API = "https://jsonplaceholder.typicode.com/users/"

// component est le décorateur DE la classe UserComponent : ne rien mettre entre deux
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // injection de la route et d'httpClient pour faire des requetes http
  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient) {}

  private userId:string
  user:any = null

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params) => {
        this.userId = params.get("id")
        this.getUsers(this.userId)
      })
  }

  getUsers(id:string){
    this.httpClient.get(API + id)
    .subscribe((res: any) => {
      // effectuer les vérifications d'usage : code de retour...
      this.user = res
    })
  }

}
