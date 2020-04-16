import { Component, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs/operators";

@Component({
  selector: "album",
  templateUrl: "./album.component.html",
  styleUrls: ["./album.component.css"],
})
export class AlbumComponent {
  photos: any[];
  comments: any[] = null;
  selectedPhoto: number;
  commentsLoading = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      const albumId = params.id;

      http
        .get<any[]>(
          "https://jsonplaceholder.typicode.com/photos?albumId=" + albumId
        )
        .subscribe(
          (result) => {
            this.photos = result;
          },
          (error) => console.error(error)
        );
    });
  }
  loadComments(photoId: number) {
    this.commentsLoading = true;
    this.comments = null;
    this.selectedPhoto = photoId;
    this.http
      .get<any[]>(
        "https://jsonplaceholder.typicode.com/comments?postId=" +
          this.selectedPhoto
      )
      .pipe(
        finalize(() => {
          this.commentsLoading = false;
        })
      )
      .subscribe(
        (result) => {
          this.comments = result;
        },
        (error) => console.error(error)
      );
  }
}
