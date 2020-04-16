import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  albums: any;
  selectedAlbum: any;
  constructor(http: HttpClient, private router: Router) {
    http.get<any[]>("https://jsonplaceholder.typicode.com/albums").subscribe(
      (result) => {
        this.albums = result;
      },
      (error) => console.error(error)
    );
  }

  loadAlbum() {
    this.router.navigate(["album/" + this.selectedAlbum]);
  }
}
